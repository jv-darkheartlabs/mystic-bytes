#!/usr/bin/env node
/**
 * Scaffold _films/*.md stubs from film-adaptation-registry.json for entries
 * whose source_readings exist on the literary shelf.
 *
 * Usage:
 *   node scaffold-adaptations.mjs
 *   node scaffold-adaptations.mjs --dry-run
 *   node scaffold-adaptations.mjs --slug twilight-2008
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const READINGS_DIR = join(ROOT, "_readings");
const FILMS_DIR = join(ROOT, "_films");
const REGISTRY_PATH = join(DIR, "film-adaptation-registry.json");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const slugArg = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;

const registry = JSON.parse(await readFile(REGISTRY_PATH, "utf8"));
const readingFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));
const readingSlugs = new Set(readingFiles.map((f) => f.replace(/\.md$/, "")));

await mkdir(FILMS_DIR, { recursive: true });

let filmFiles = [];
try {
  filmFiles = (await readdir(FILMS_DIR)).filter((f) => f.endsWith(".md"));
} catch {
  filmFiles = [];
}
const filmSlugs = new Set(filmFiles.map((f) => f.replace(/\.md$/, "")));

let sortKey = 1;
for (const f of filmFiles) {
  const raw = await readFile(join(FILMS_DIR, f), "utf8");
  const m = raw.match(/^sort_key:\s*(\d+)/m);
  if (m) sortKey = Math.max(sortKey, Number(m[1]) + 1);
}

function yamlList(key, items) {
  if (!items?.length) return "";
  return `${key}:\n${items.map((i) => `  - "${String(i).replace(/"/g, '\\"')}"`).join("\n")}\n`;
}

function buildFrontmatter(entry, number, key) {
  const lines = [
    "layout: film",
    `title: "${entry.title.replace(/"/g, '\\"')}"`,
    `dek: "${(entry.dek || "").replace(/"/g, '\\"')}"`,
    `number: F${String(number).padStart(4, "0")}`,
    `sort_key: ${key}`,
    `date: ${new Date().toISOString().slice(0, 10)}`,
    `date_watched: ${entry.release_date || `${entry.year}-06-15`}`,
    `year: ${entry.year}`,
  ];
  if (entry.runtime) lines.push(`runtime: ${entry.runtime}`);
  if (entry.country) lines.push(`country: "${entry.country}"`);
  if (entry.language) lines.push(`language: "${entry.language}"`);
  if (entry.director) lines.push(`director: "${entry.director.replace(/"/g, '\\"')}"`);
  lines.push(yamlList("screenwriters", entry.screenwriters).trimEnd());
  if (entry.cinematographer) lines.push(`cinematographer: "${entry.cinematographer.replace(/"/g, '\\"')}"`);
  if (entry.composer) lines.push(`composer: "${entry.composer.replace(/"/g, '\\"')}"`);
  lines.push(yamlList("cast", entry.cast).trimEnd());
  lines.push(`category: ${entry.category}`);
  lines.push(`format: ${entry.format}`);
  lines.push(`fidelity: ${entry.fidelity}`);
  if (entry.mpaa_rating) lines.push(`mpaa_rating: "${entry.mpaa_rating}"`);
  if (entry.spice) lines.push(`spice: ${entry.spice}`);
  lines.push(yamlList("content_warnings", entry.content_warnings).trimEnd());
  lines.push(yamlList("source_readings", entry.source_readings).trimEnd());
  if (entry.imdb_url) lines.push(`imdb_url: "${entry.imdb_url}"`);
  if (entry.letterboxd_url) lines.push(`letterboxd_url: "${entry.letterboxd_url}"`);
  lines.push(`tags:`);
  lines.push(`  - theprojectionroom`);
  lines.push(`  - filmadaptation`);
  lines.push(`  - literaryanalysis`);
  lines.push(`  - darkheartlabs`);
  lines.push(`review_format: projection-room`);
  return lines.filter(Boolean).join("\n");
}

let created = 0;
let skipped = 0;
let number = sortKey;

for (const entry of registry.adaptations) {
  if (slugArg && entry.slug !== slugArg) continue;

  const sources = entry.source_readings || [];
  const hasSource = sources.some((s) => readingSlugs.has(s));
  if (!hasSource) {
    console.log(`skip ${entry.slug} — no source on shelf`);
    skipped += 1;
    continue;
  }

  if (filmSlugs.has(entry.slug)) {
    console.log(`exists ${entry.slug}`);
    skipped += 1;
    continue;
  }

  const front = buildFrontmatter(entry, number, sortKey);
  const body = `<!-- Generate with: node scripts/films/generate-film-reviews.mjs --slug ${entry.slug} -->`;
  const content = `---\n${front}\n---\n\n${body}\n`;

  if (dryRun) {
    console.log(`would create _films/${entry.slug}.md`);
  } else {
    await writeFile(join(FILMS_DIR, `${entry.slug}.md`), content, "utf8");
    console.log(`created _films/${entry.slug}.md`);
  }
  created += 1;
  sortKey += 1;
  number += 1;
}

console.log(`\nScaffold complete: ${created} created, ${skipped} skipped`);
