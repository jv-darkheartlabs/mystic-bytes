#!/usr/bin/env node
/**
 * Match readings to vision-cataloged sources; update manifest + optional resync.
 *
 * Usage: node reconcile-covers-from-catalog.mjs [--dry-run] [--resync] [--min-score 0.82]
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import {
  MANIFEST_PATH,
  READINGS_DIR,
  ASSETS_DIR,
  parseFrontmatter,
  buildManifestIndexes,
  resolveManifestEntry,
  scoreCoverMatch,
  preprocessCover,
} from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = join(DIR, "vision-source-catalog.json");
const REPORT_PATH = join(DIR, "reconcile-covers-report.json");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const DRY_RUN = process.argv.includes("--dry-run");
const RESYNC = process.argv.includes("--resync");
const MIN_SCORE = argValue("--min-score") ? parseFloat(argValue("--min-score")) : 0.82;
const CROSS_CAT_MIN = 0.9;

const catalog = JSON.parse(await readFile(CATALOG_PATH, "utf8"));
const sources = Object.entries(catalog.entries || {})
  .filter(
    ([path, v]) =>
      existsSync(path) &&
      v.detected_title &&
      v.cover_readable !== false &&
      !v.error,
  )
  .map(([path, v]) => ({
    path,
    detected_title: v.detected_title,
    detected_author: v.detected_author || "",
    category: path.match(/BookCovers\/([^/]+)\//)?.[1] || "_archive",
  }));

const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const indexes = buildManifestIndexes(manifest.entries);
const mdFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));

const readings = [];
for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const meta = parseFrontmatter(await readFile(join(READINGS_DIR, file), "utf8"));
  const resolved = resolveManifestEntry(meta, slug, indexes);
  readings.push({ slug, meta, entry: resolved.entry });
}

const pairs = [];
for (const reading of readings) {
  const { slug, meta } = reading;
  if (!meta.title) continue;

  for (const src of sources) {
    const sameCat = src.category === meta.category;
    const { score, titleScore } = scoreCoverMatch(
      meta.title,
      meta.author,
      src.detected_title,
      src.detected_author,
      meta.category,
    );
    const threshold = sameCat ? MIN_SCORE : CROSS_CAT_MIN;
    if (titleScore >= 0.7 && score >= threshold) {
      pairs.push({
        score,
        titleScore,
        slug,
        src: src.path,
        detected: { title: src.detected_title, author: src.detected_author },
        sameCat,
      });
    }
  }
}

pairs.sort((a, b) => b.score - a.score);

const assignedSlug = new Set();
const assignedSrc = new Set();
const assignment = new Map();
for (const p of pairs) {
  if (assignedSlug.has(p.slug) || assignedSrc.has(p.src)) continue;
  assignment.set(p.slug, p);
  assignedSlug.add(p.slug);
  assignedSrc.add(p.src);
}

const report = {
  generated_at: new Date().toISOString(),
  dry_run: DRY_RUN,
  catalog_sources: sources.length,
  assignments: assignment.size,
  fixed: [],
  unchanged: [],
  no_match: [],
  wrong_before: [],
  resync_errors: [],
};

for (const reading of readings) {
  const { slug, meta, entry } = reading;
  if (!entry) {
    report.no_match.push({ slug, reason: "no_manifest" });
    continue;
  }

  const assign = assignment.get(slug);
  const current = entry.source_path;

  if (!assign) {
    report.no_match.push({ slug, title: meta.title, category: meta.category });
    continue;
  }

  const curDet = catalog.entries[current];
  const curScore = curDet?.detected_title
    ? scoreCoverMatch(meta.title, meta.author, curDet.detected_title, curDet.detected_author, meta.category).score
    : 0;

  if (curScore < 0.88 && assign.score > curScore + 0.05) {
    report.wrong_before.push({
      slug,
      title: meta.title,
      cur_score: curScore,
      new_score: assign.score,
      was: current,
      detected_was: curDet?.detected_title,
      detected_new: assign.detected.title,
    });
  }

  if (assign.src === current && curScore >= 0.88) {
    report.unchanged.push({ slug, title: meta.title, score: curScore });
    continue;
  }

  if (assign.src === current) {
    report.unchanged.push({ slug, title: meta.title, score: assign.score });
    continue;
  }

  report.fixed.push({
    slug,
    title: meta.title,
    score: assign.score,
    prev_source: current,
    new_source: assign.src,
    detected: assign.detected,
  });

  if (!DRY_RUN) {
    entry.source_path = assign.src;
    if (RESYNC) {
      const assetName = meta.cover ? basename(meta.cover) : `${slug}.jpg`;
      const dest = join(ASSETS_DIR, assetName);
      if (!existsSync(assign.src)) {
        report.resync_errors.push({ slug, source: assign.src, error: "missing_source" });
      } else {
        try {
          preprocessCover(assign.src, dest);
        } catch (err) {
          report.resync_errors.push({
            slug,
            source: assign.src,
            error: err.message?.split("\n")[0] || String(err),
          });
        }
      }
    }
  }
}

if (!DRY_RUN) {
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}
await writeFile(REPORT_PATH, JSON.stringify(report, null, 2));

console.log(`Reconcile from catalog ${DRY_RUN ? "(DRY RUN)" : ""}`);
console.log(`  Catalog sources: ${sources.length}`);
console.log(`  Fixed:           ${report.fixed.length}`);
console.log(`  Unchanged:       ${report.unchanged.length}`);
console.log(`  No match:        ${report.no_match.length}`);
console.log(`  Wrong before:    ${report.wrong_before.length}`);
if (report.resync_errors.length) {
  console.log(`  Resync errors:   ${report.resync_errors.length}`);
}
console.log(`  Report: ${REPORT_PATH}`);

if (report.fixed.length) {
  console.log("\nSample fixes:");
  for (const f of report.fixed.slice(0, 12)) {
    console.log(`  ${f.slug}: → "${f.detected.title}" (${f.score.toFixed(2)})`);
  }
}
