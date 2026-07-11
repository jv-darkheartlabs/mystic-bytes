#!/usr/bin/env node
/**
 * Discover film adaptation candidates by matching registry source_readings
 * against the literary analysis shelf (_readings/).
 *
 * Usage:
 *   node discover-adaptations.mjs
 *   node discover-adaptations.mjs --json
 */
import { readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const READINGS_DIR = join(ROOT, "_readings");
const FILMS_DIR = join(ROOT, "_films");
const REGISTRY_PATH = join(DIR, "film-adaptation-registry.json");

const jsonOut = process.argv.includes("--json");

const registry = JSON.parse(await readFile(REGISTRY_PATH, "utf8"));
const readingFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));
const readingSlugs = new Set(readingFiles.map((f) => f.replace(/\.md$/, "")));

let filmFiles = [];
try {
  filmFiles = (await readdir(FILMS_DIR)).filter((f) => f.endsWith(".md"));
} catch {
  filmFiles = [];
}
const filmSlugs = new Set(filmFiles.map((f) => f.replace(/\.md$/, "")));

const matched = [];
const missingSources = [];
const pendingScaffold = [];

for (const entry of registry.adaptations) {
  const sources = entry.source_readings || [];
  const found = sources.filter((s) => readingSlugs.has(s));
  const missing = sources.filter((s) => !readingSlugs.has(s));

  if (found.length === 0) {
    missingSources.push({ slug: entry.slug, title: entry.title, missing });
    continue;
  }

  matched.push({
    slug: entry.slug,
    title: entry.title,
    sources_found: found,
    sources_missing: missing,
    scaffolded: filmSlugs.has(entry.slug),
  });

  if (!filmSlugs.has(entry.slug)) {
    pendingScaffold.push(entry);
  }
}

const report = {
  registry_total: registry.adaptations.length,
  shelf_match: matched.length,
  missing_all_sources: missingSources.length,
  already_scaffolded: matched.filter((m) => m.scaffolded).length,
  pending_scaffold: pendingScaffold.length,
  matched,
  missing_sources: missingSources,
  pending: pendingScaffold.map((e) => e.slug),
};

if (jsonOut) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Projection Room discovery`);
  console.log(`  Registry entries:     ${report.registry_total}`);
  console.log(`  Shelf matches:        ${report.shelf_match}`);
  console.log(`  Already scaffolded:   ${report.already_scaffolded}`);
  console.log(`  Pending scaffold:     ${report.pending_scaffold}`);
  console.log(`  No source on shelf:   ${report.missing_all_sources}`);
  if (pendingScaffold.length) {
    console.log(`\nPending scaffold (run scaffold-adaptations.mjs):`);
    pendingScaffold.forEach((e) => console.log(`  - ${e.slug} ← ${e.source_readings.join(", ")}`));
  }
  if (missingSources.length) {
    console.log(`\nRegistry entries with no shelf source:`);
    missingSources.forEach((e) => console.log(`  - ${e.slug}: missing ${e.missing.join(", ")}`));
  }
}
