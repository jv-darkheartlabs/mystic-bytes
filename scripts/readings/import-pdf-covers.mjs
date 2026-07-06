#!/usr/bin/env node
/**
 * Import front-cover PDF pages into ~/Pictures/bookish/BookCovers/{category}/
 * Vision-classify, dedupe by title+author vs manifest, trash duplicates, append manifest.
 *
 * Prereq: pdftoppm extract → ~/Pictures/bookish/_incoming/_FrontCovers/page-*.jpg
 * Usage: node scripts/readings/import-pdf-covers.mjs [incomingDir]
 */
import { readFile, writeFile, readdir, copyFile, mkdir, rename } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const MANIFEST = join(DIR, "manifest.json");
const CATEGORIES = join(ROOT, "_data/reading_categories.yml");
const BOOK_ROOT = join(homedir(), "Pictures/bookish/BookCovers");
const TRASH = join(homedir(), "Pictures/bookish/_trash/duplicates");
const INCOMING =
  process.argv[2] || join(homedir(), "Pictures/bookish/_incoming/_FrontCovers");

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error("OPENAI_API_KEY required");
  process.exit(1);
}

const catYaml = await readFile(CATEGORIES, "utf8");
const categories = [...catYaml.matchAll(/^\s{2}([\w-]+):/gm)].map((m) => m[1]);
const catTags = {};
for (const m of catYaml.matchAll(/^\s{2}([\w-]+):\n(?:.*\n)*?\s+tags:\s*\[(.*?)\]/gm)) {
  catTags[m[1]] = m[2].split(",").map((t) => t.trim());
}

function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function dupKey(title, author) {
  return `${norm(title)}::${norm(author || "")}`;
}

function titleKey(title) {
  return norm(title);
}

const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
const existingByTitle = new Map();
const existingKeys = new Set();
for (const e of manifest.entries) {
  if (!e.title) continue;
  existingKeys.add(dupKey(e.title, e.author));
  existingByTitle.set(titleKey(e.title), e);
}

const SYSTEM = `You extract book cover metadata for a dark romance reading log ("The Orchid Room").
Return ONLY valid JSON:
{
  "title": string,
  "author": string (optional),
  "author_confidence": "high"|"low",
  "author_url": string (optional, Goodreads author URL ONLY if high confidence),
  "dek": string (optional tagline from cover),
  "body": string (2-4 sentence Orchid Room micro-blurb, final line hashtags),
  "spice": integer 1-5,
  "content_warnings": string[],
  "tags": string[],
  "category": one of ${JSON.stringify(categories)},
  "confidence": "high"|"retry"|"skip"|"duplicate"
}

Rules:
- Pick the single best category from the allowed list
- author_confidence "high" ONLY if author name is clearly legible
- Voice: JV, literary reading-chair tone
- If cover is blank, template-only, or unreadable: confidence "skip"`;

async function visionEntry(imagePath) {
  const b64 = Buffer.from(await readFile(imagePath)).toString("base64");
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
              text: `Classify this cover. Allowed categories: ${categories.join(", ")}`,
            },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${b64}` } },
          ],
        },
      ],
      max_tokens: 900,
    }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

async function nextFilename(category) {
  const dir = join(BOOK_ROOT, category);
  await mkdir(dir, { recursive: true });
  const files = await readdir(dir);
  const nums = files
    .map((f) => parseInt(f.replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const n = nums.length ? Math.max(...nums) + 1 : 1;
  return `${n}.jpeg`;
}

async function trashFile(src, reason) {
  await mkdir(TRASH, { recursive: true });
  const dest = join(TRASH, `${basename(src, ".jpg")}-${Date.now()}.jpg`);
  await rename(src, dest);
  return { dest, reason };
}

const pages = (await readdir(INCOMING))
  .filter((f) => /\.jpe?g$/i.test(f))
  .sort();

console.log(`Processing ${pages.length} pages from ${INCOMING}`);

const report = { imported: [], duplicates: [], skipped: [], errors: [] };

for (const page of pages) {
  const src = join(INCOMING, page);
  try {
    let meta = await visionEntry(src);
    if (meta.confidence === "retry") meta = await visionEntry(src);

    if (!meta.title || meta.confidence === "skip") {
      await trashFile(src, "unreadable");
      report.skipped.push({ page, note: meta.title || "skip" });
      continue;
    }

    const tk = titleKey(meta.title);
    const dk = dupKey(meta.title, meta.author);
    const dup =
      existingKeys.has(dk) ||
      (existingByTitle.has(tk) &&
        (!meta.author ||
          !existingByTitle.get(tk).author ||
          norm(meta.author) === norm(existingByTitle.get(tk).author)));

    if (dup) {
      const hit = existingByTitle.get(tk);
      await trashFile(src, `duplicate of ${hit?.title || tk}`);
      report.duplicates.push({ page, title: meta.title, author: meta.author, existing: hit?.id });
      continue;
    }

    let category = meta.category;
    if (!categories.includes(category)) {
      category = "forbidden-love";
    }

    const filename = await nextFilename(category);
    const dest = join(BOOK_ROOT, category, filename);
    await copyFile(src, dest);

    const entry = {
      id: `${category}/${filename}`,
      category,
      source_path: dest,
      title: meta.title,
      ...(meta.author ? { author: meta.author } : {}),
      author_confidence: meta.author_confidence || "low",
      ...(meta.author_confidence === "high" && meta.author_url ? { author_url: meta.author_url } : {}),
      dek: meta.dek || "",
      body: meta.body || "",
      spice: meta.spice || 3,
      content_warnings: meta.content_warnings || [],
      tags: [...new Set([...(catTags[category] || []), ...(meta.tags || [])])],
      confidence: "high",
      imported_from: page,
    };
    if (entry.author_confidence !== "high") delete entry.author_url;

    manifest.entries.push(entry);
    existingKeys.add(dk);
    existingByTitle.set(tk, entry);
    report.imported.push({ page, id: entry.id, title: entry.title });
    console.log(`+ ${entry.title} → ${entry.id}`);
  } catch (e) {
    report.errors.push({ page, error: String(e.message) });
    console.error(`! ${page}: ${e.message}`);
  }
}

manifest.entries.sort((a, b) => a.id.localeCompare(b.id));
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
await writeFile(
  join(DIR, "import-report.json"),
  JSON.stringify({ generated_at: new Date().toISOString(), ...report, manifest_count: manifest.entries.length }, null, 2) + "\n",
);

console.log(
  `\nDone: ${report.imported.length} imported, ${report.duplicates.length} duplicates trashed, ${report.skipped.length} skipped, ${report.errors.length} errors`,
);
console.log(`Manifest: ${manifest.entries.length} entries`);
