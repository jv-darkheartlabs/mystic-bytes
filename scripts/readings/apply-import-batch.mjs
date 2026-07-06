#!/usr/bin/env node
/**
 * Apply a vision batch JSON to BookCovers + manifest. Trashes duplicates.
 *
 * Batch entry: { crop_path, title, author?, author_confidence?, author_url?, dek?, body, spice, content_warnings, tags, category, confidence, duplicate?: boolean }
 */
import { readFile, writeFile, copyFile, mkdir, rename } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const MANIFEST = join(DIR, "manifest.json");
const CATEGORIES = join(DIR, "../../_data/reading_categories.yml");
const BOOK_ROOT = join(homedir(), "Pictures/bookish/BookCovers");
const TRASH = join(homedir(), "Pictures/bookish/_trash/duplicates");

const BATCH = process.argv[2];
if (!BATCH) {
  console.error("Usage: node apply-import-batch.mjs <batch.json>");
  process.exit(1);
}

const catYaml = await readFile(CATEGORIES, "utf8");
const categories = [...catYaml.matchAll(/^\s{2}([\w-]+):/gm)].map((m) => m[1]);
const catTags = {};
for (const m of catYaml.matchAll(/^\s{2}([\w-]+):\n(?:.*\n)*?\s+tags:\s*\[(.*?)\]/gm)) {
  catTags[m[1]] = m[2].split(",").map((t) => t.trim());
}

function norm(s) {
  return (s || "").toLowerCase().replace(/['']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
const seenTitles = new Set(manifest.entries.map((e) => norm(e.title)));
const seenKeys = new Set(manifest.entries.map((e) => `${norm(e.title)}::${norm(e.author || "")}`));

const batch = JSON.parse(await readFile(BATCH, "utf8"));
const stats = { imported: 0, dup: 0, skip: 0 };

async function nextFilename(category) {
  const dir = join(BOOK_ROOT, category);
  await mkdir(dir, { recursive: true });
  const { readdir } = await import("node:fs/promises");
  const files = await readdir(dir);
  const nums = files.map((f) => parseInt(f.replace(/\D/g, ""), 10)).filter((n) => !Number.isNaN(n));
  return `${nums.length ? Math.max(...nums) + 1 : 1}.jpeg`;
}

async function trash(src) {
  await mkdir(TRASH, { recursive: true });
  const dest = join(TRASH, `${basename(src, ".jpg")}-${Date.now()}.jpg`);
  try {
    await rename(src, dest);
  } catch {
    /* crop may already be moved */
  }
}

for (const item of batch) {
  const src = item.crop_path;
  if (!item.title || item.confidence === "skip") {
    if (src) await trash(src);
    stats.skip++;
    continue;
  }

  const tk = norm(item.title);
  const dk = `${tk}::${norm(item.author || "")}`;
  if (item.duplicate || seenTitles.has(tk) || seenKeys.has(dk)) {
    if (src) await trash(src);
    stats.dup++;
    continue;
  }

  let category = item.category;
  if (!categories.includes(category)) category = "fantasy-romance";

  const filename = await nextFilename(category);
  const dest = join(BOOK_ROOT, category, filename);
  if (src) await copyFile(src, dest);

  const entry = {
    id: `${category}/${filename}`,
    category,
    source_path: dest,
    title: item.title,
    ...(item.author ? { author: item.author } : {}),
    author_confidence: item.author_confidence || "low",
    ...(item.author_confidence === "high" && item.author_url ? { author_url: item.author_url } : {}),
    dek: item.dek || "",
    body: item.body || "",
    spice: item.spice || 3,
    content_warnings: item.content_warnings || [],
    tags: [...new Set([...(catTags[category] || []), ...(item.tags || [])])],
    confidence: "high",
  };
  if (entry.author_confidence !== "high") delete entry.author_url;

  manifest.entries.push(entry);
  seenTitles.add(tk);
  seenKeys.add(dk);
  stats.imported++;
}

manifest.entries.sort((a, b) => a.id.localeCompare(b.id));
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Applied ${BATCH}: +${stats.imported} dup=${stats.dup} skip=${stats.skip} → manifest ${manifest.entries.length}`);
