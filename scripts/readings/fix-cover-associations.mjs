#!/usr/bin/env node
/**
 * Reassign manifest source_path using vision-verify results.
 * Greedy bipartite match: each reading gets the source file whose detected
 * cover text best matches that reading's expected title/author.
 * Handles swaps and longer permutation chains.
 *
 * Usage: node fix-cover-associations.mjs [options]
 *   --report PATH   vision-verify-report.json (default)
 *   --dry-run       plan only, no manifest/asset writes
 *   --min-score N   minimum match score (default 0.82)
 *   --resync        re-trim assets after manifest update
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
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
const DEFAULT_REPORT = join(DIR, "vision-verify-report.json");
const FIX_REPORT = join(DIR, "fix-cover-associations-report.json");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const REPORT_PATH = argValue("--report") || DEFAULT_REPORT;
const DRY_RUN = process.argv.includes("--dry-run");
const RESYNC = process.argv.includes("--resync");
const MIN_SCORE = argValue("--min-score") ? parseFloat(argValue("--min-score")) : 0.82;

const visionReport = JSON.parse(await readFile(REPORT_PATH, "utf8"));
const results = visionReport.results || [];
if (!results.length) {
  console.error(`No results in ${REPORT_PATH}. Run vision-verify-covers.mjs first.`);
  process.exit(1);
}

const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const indexes = buildManifestIndexes(manifest.entries);
const mdFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));

const slugMeta = new Map();
for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const meta = parseFrontmatter(await readFile(join(READINGS_DIR, file), "utf8"));
  slugMeta.set(slug, meta);
}

const visionBySlug = new Map(results.map((r) => [r.slug, r]));

/** Current source_path per slug (from manifest). */
const sourceBySlug = new Map();
for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const meta = slugMeta.get(slug);
  const resolved = resolveManifestEntry(meta, slug, indexes);
  if (resolved.entry?.source_path) {
    sourceBySlug.set(slug, resolved.entry.source_path);
  }
}

const slugs = [...sourceBySlug.keys()].filter((slug) => {
  const v = visionBySlug.get(slug);
  return v && v.detected_title && v.cover_readable !== false && !v.error;
});

/** Unique source paths and which slug currently owns each. */
const slugBySource = new Map();
for (const [slug, src] of sourceBySlug) {
  slugBySource.set(src, slug);
}

const uniqueSources = [...new Set(sourceBySlug.values())];

/** What each source file actually shows (from vision on current slug asset). */
const detectedBySource = new Map();
for (const src of uniqueSources) {
  const owner = slugBySource.get(src);
  const v = visionBySlug.get(owner);
  if (v) {
    detectedBySource.set(src, {
      title: v.detected_title,
      author: v.detected_author || "",
    });
  }
}

/** Greedy maximum matching: reading slug -> source path. */
const pairs = [];
for (const slug of slugs) {
  const meta = slugMeta.get(slug);
  const expected = { title: meta.title, author: meta.author, category: meta.category };
  for (const src of uniqueSources) {
    const det = detectedBySource.get(src);
    if (!det?.title) continue;
    const { score, titleScore, authorScore } = scoreCoverMatch(
      expected.title,
      expected.author,
      det.title,
      det.author,
      expected.category,
    );
    if (score >= MIN_SCORE && titleScore >= 0.72) {
      pairs.push({ score, slug, src, titleScore, authorScore, detected: det });
    }
  }
}
pairs.sort((a, b) => b.score - a.score);

const assignedSlug = new Set();
const assignedSource = new Set();
const assignment = new Map();

for (const p of pairs) {
  if (assignedSlug.has(p.slug) || assignedSource.has(p.src)) continue;
  assignment.set(p.slug, p);
  assignedSlug.add(p.slug);
  assignedSource.add(p.src);
}

const report = {
  generated_at: new Date().toISOString(),
  dry_run: DRY_RUN,
  min_score: MIN_SCORE,
  vision_results: results.length,
  slugs_with_vision: slugs.length,
  unique_sources: uniqueSources.length,
  assignments: assignment.size,
  fixed: [],
  unchanged: [],
  skipped_no_assignment: [],
  errors: [],
};

for (const slug of slugs) {
  const meta = slugMeta.get(slug);
  const resolved = resolveManifestEntry(meta, slug, indexes);
  if (!resolved.entry) {
    report.skipped_no_assignment.push({ slug, reason: "no_manifest_entry" });
    continue;
  }

  const currentSrc = sourceBySlug.get(slug);
  const assign = assignment.get(slug);

  if (!assign) {
    const v = visionBySlug.get(slug);
    const cur = scoreCoverMatch(
      meta.title,
      meta.author,
      v?.detected_title,
      v?.detected_author,
      meta.category,
    );
    if (cur.score >= 0.92) {
      report.unchanged.push({ slug, title: meta.title, score: cur.score });
    } else {
      report.skipped_no_assignment.push({
        slug,
        title: meta.title,
        reason: "no_donor",
        current_score: cur.score,
        detected: v?.detected_title,
      });
    }
    continue;
  }

  if (assign.src === currentSrc) {
    report.unchanged.push({ slug, title: meta.title, score: assign.score });
    continue;
  }

  const fix = {
    slug,
    title: meta.title,
    author: meta.author,
    score: assign.score,
    prev_source: currentSrc,
    new_source: assign.src,
    detected_on_new: assign.detected,
    prev_detected: visionBySlug.get(slug)?.detected_title,
  };
  report.fixed.push(fix);

  if (!DRY_RUN) {
    try {
      resolved.entry.source_path = assign.src;
      if (RESYNC) {
        const assetName = meta.cover ? basename(meta.cover) : `${slug}.jpg`;
        preprocessCover(assign.src, join(ASSETS_DIR, assetName));
      }
    } catch (err) {
      report.errors.push({ slug, error: String(err.message) });
    }
  }
}

if (!DRY_RUN) {
  manifest.entries.sort((a, b) => a.id.localeCompare(b.id));
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

await writeFile(FIX_REPORT, JSON.stringify(report, null, 2));

console.log(`Fix cover associations ${DRY_RUN ? "(DRY RUN)" : ""}`);
console.log(`  Vision results:     ${results.length}`);
console.log(`  Assignments:        ${assignment.size}`);
console.log(`  Fixed:              ${report.fixed.length}`);
console.log(`  Unchanged (ok):     ${report.unchanged.length}`);
console.log(`  Skipped:            ${report.skipped_no_assignment.length}`);
console.log(`  Errors:             ${report.errors.length}`);
console.log(`  Report: ${FIX_REPORT}`);

if (report.fixed.length) {
  console.log("\nSample fixes:");
  for (const f of report.fixed.slice(0, 10)) {
    console.log(
      `  ${f.slug}: "${f.prev_detected}" → "${f.detected_on_new.title}" (score ${f.score.toFixed(2)})`,
    );
  }
}

if (!DRY_RUN && report.fixed.length && !RESYNC) {
  console.log("\nRe-sync trimmed assets: node scripts/readings/sync-reading-covers.mjs --force");
}
