#!/usr/bin/env node
/**
 * Vision-batch remaining inventory covers via OpenAI (same schema as manual Read passes).
 * Skips ids already present in manifest.json.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const INVENTORY = join(DIR, "inventory.json");
const MANIFEST = join(DIR, "manifest.json");
const CATEGORIES = join(ROOT, "_data/reading_categories.yml");

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error("OPENAI_API_KEY required");
  process.exit(1);
}

const catYaml = await readFile(CATEGORIES, "utf8");
const catTags = {};
for (const m of catYaml.matchAll(/^\s{2}([\w-]+):\n(?:.*\n)*?\s+tags:\s*\[(.*?)\]/gm)) {
  catTags[m[1]] = m[2].split(",").map((t) => t.trim());
}

const { files } = JSON.parse(await readFile(INVENTORY, "utf8"));
let manifest = { entries: [] };
try {
  manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
} catch {}

const done = new Set(manifest.entries.map((e) => e.id));
const pending = files.filter((f) => !done.has(f.id));
console.log(`Pending: ${pending.length} / ${files.length}`);

const SYSTEM = `You extract book cover metadata for a dark romance reading log ("The Orchid Room").
Return ONLY valid JSON object with keys:
title, author (optional string), author_confidence ("high"|"low"), author_url (optional, ONLY if author_confidence high AND you know verified Goodreads URL), dek (optional tagline), body (2-4 sentence literary gothic micro-blurb ending with hashtags on new line), spice (1-5 integer), content_warnings (string array), tags (string array), confidence ("high"|"retry"|"skip").

Rules:
- author_confidence "high" ONLY if title AND author 100% legible on cover
- Omit author_url unless high confidence AND verified Goodreads author page
- Merge category default tags provided in user message with book-specific tags (no duplicates)
- Voice: Orchid Room — JV, literary reading-chair tone
- If unreadable after careful look: confidence "skip", title best guess or "Unknown"`;

async function visionEntry(file) {
  const b64 = Buffer.from(await readFile(file.source_path)).toString("base64");
  const defaults = catTags[file.category] || [];
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `category: ${file.category}\ncategory_default_tags: ${JSON.stringify(defaults)}\nid: ${file.id}`,
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${b64}` },
            },
          ],
        },
      ],
      max_tokens: 800,
    }),
  });
  if (!res.ok) throw new Error(`${file.id}: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const parsed = JSON.parse(data.choices[0].message.content);
  return {
    id: file.id,
    category: file.category,
    source_path: file.source_path,
    ...parsed,
    tags: [...new Set([...defaults, ...(parsed.tags || [])])],
  };
}

const BATCH = 5;
let skipped = 0;
let generated = 0;

for (let i = 0; i < pending.length; i += BATCH) {
  const chunk = pending.slice(i, i + BATCH);
  const results = await Promise.all(
    chunk.map(async (f) => {
      try {
        let entry = await visionEntry(f);
        if (entry.confidence === "retry") {
          entry = await visionEntry(f);
        }
        if (entry.confidence === "skip") {
          skipped++;
          entry.note = "Skipped after retry — cover unreadable";
        } else {
          generated++;
        }
        if (entry.author_confidence !== "high") delete entry.author_url;
        return entry;
      } catch (e) {
        skipped++;
        return {
          id: f.id,
          category: f.category,
          source_path: f.source_path,
          title: "Unknown",
          author_confidence: "low",
          dek: "",
          body: "",
          spice: 3,
          content_warnings: [],
          tags: catTags[f.category] || [],
          confidence: "skip",
          note: String(e.message),
        };
      }
    }),
  );
  const byId = new Map(manifest.entries.map((e) => [e.id, e]));
  for (const e of results) byId.set(e.id, e);
  manifest.entries = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Progress: ${Math.min(i + BATCH, pending.length)}/${pending.length} (manifest ${manifest.entries.length})`);
}

console.log(`Vision batch done. Generated: ${generated}, Skipped: ${skipped}, Total manifest: ${manifest.entries.length}`);
