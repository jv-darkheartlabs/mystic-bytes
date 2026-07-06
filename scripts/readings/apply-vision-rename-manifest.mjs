#!/usr/bin/env node
/**
 * Wire reading log manifest sources to vision-renamed BookCovers files.
 *
 * Matching priority:
 *  1. Filename slug match ({slug}.jpeg or {slug}--author.jpeg) in reading category
 *  2. Vision title/author score in reading category
 *  3. Vision title/author score in any category (high confidence)
 *
 * Usage: node apply-vision-rename-manifest.mjs [--dry-run] [--min-score 0.82]
 */
import { readFile, writeFile, readdir, access } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import {
  MANIFEST_PATH,
  READINGS_DIR,
  BOOK_ROOT,
  IMAGE_EXT,
  scoreCoverMatch,
  parseFrontmatter,
  buildManifestIndexes,
  resolveManifestEntry,
  slugify,
  loadCategories,
} from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const RENAME_REPORT = join(DIR, "vision-rename-report.json");
const OUT_REPORT = join(DIR, "apply-vision-rename-report.json");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const DRY_RUN = process.argv.includes("--dry-run");
const MIN_SCORE = argValue("--min-score") ? parseFloat(argValue("--min-score")) : 0.82;
const CROSS_CAT_MIN = 0.9;

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function fileSlug(name) {
  const base = name.replace(IMAGE_EXT, "");
  const idx = base.indexOf("--");
  return idx === -1 ? base : base.slice(0, idx);
}

const renameReport = JSON.parse(await readFile(RENAME_REPORT, "utf8"));
const covers = [];
const seenPaths = new Set();

for (const row of renameReport.results || []) {
  const path = row.new_path || row.original_path;
  if (!path || seenPaths.has(path)) continue;
  if (row.status === "error" || row.status === "unreadable") continue;
  if (!row.detected_title) continue;
  if (!(await exists(path))) continue;
  seenPaths.add(path);
  covers.push({
    path,
    category: row.category,
    detected_title: row.detected_title,
    detected_author: row.detected_author || "",
    file_slug: fileSlug(basename(path)),
  });
}

const { categories } = await loadCategories();
const bySlugInCategory = new Map();
for (const cat of categories) {
  const catDir = join(BOOK_ROOT, cat);
  if (!(await exists(catDir))) continue;
  const files = await readdir(catDir);
  for (const f of files) {
    if (!IMAGE_EXT.test(f)) continue;
    const slug = fileSlug(f);
    const key = `${cat}::${slug}`;
    if (!bySlugInCategory.has(key)) {
      bySlugInCategory.set(key, join(catDir, f));
    }
  }
}

const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const indexes = buildManifestIndexes(manifest.entries);
const mdFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));

const readings = [];
for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const meta = parseFrontmatter(await readFile(join(READINGS_DIR, file), "utf8"));
  const resolved = resolveManifestEntry(meta, slug, indexes);
  readings.push({ slug, meta, entry: resolved.entry, prev_source: resolved.entry?.source_path || null });
}

const pairs = [];

for (const reading of readings) {
  const { meta, slug } = reading;
  if (!meta.title || !meta.category) continue;

  const slugPath = bySlugInCategory.get(`${meta.category}::${slug}`);
  if (slugPath) {
    pairs.push({
      score: 1.0,
      method: "slug_filename",
      slug,
      title: meta.title,
      cover_path: slugPath,
      detected_title: meta.title,
      detected_author: meta.author || "",
    });
    continue;
  }

  const altSlug = slug.replace(/-\d+$/, "");
  if (altSlug !== slug) {
    const altPath = bySlugInCategory.get(`${meta.category}::${altSlug}`);
    if (altPath) {
      pairs.push({
        score: 0.98,
        method: "slug_filename_alt",
        slug,
        title: meta.title,
        cover_path: altPath,
        detected_title: meta.title,
        detected_author: meta.author || "",
      });
      continue;
    }
  }

  for (const cover of covers) {
    const { score, titleScore } = scoreCoverMatch(
      meta.title,
      meta.author,
      cover.detected_title,
      cover.detected_author,
      meta.category,
    );
    const slugBonus = slug === cover.file_slug ? 0.08 : 0;
    const sameCat = cover.category === meta.category;
    const finalScore = Math.min(1, score + slugBonus);
    const threshold = sameCat ? MIN_SCORE : CROSS_CAT_MIN;

    if (titleScore >= 0.72 && finalScore >= threshold) {
      pairs.push({
        score: finalScore,
        method: sameCat ? "vision_category" : "vision_cross_category",
        slug,
        title: meta.title,
        cover_path: cover.path,
        detected_title: cover.detected_title,
        detected_author: cover.detected_author,
      });
    }
  }
}

pairs.sort((a, b) => b.score - a.score);

const assignedSlug = new Set();
const assignedCover = new Set();
const assignment = new Map();

for (const p of pairs) {
  if (assignedSlug.has(p.slug) || assignedCover.has(p.cover_path)) continue;
  assignment.set(p.slug, p);
  assignedSlug.add(p.slug);
  assignedCover.add(p.cover_path);
}

const report = {
  generated_at: new Date().toISOString(),
  dry_run: DRY_RUN,
  covers_indexed: covers.length,
  readings: readings.length,
  assignments: assignment.size,
  updated: [],
  unchanged: [],
  no_match: [],
};

for (const reading of readings) {
  const { slug, meta, entry, prev_source } = reading;
  if (!entry) {
    report.no_match.push({ slug, title: meta.title, reason: "no_manifest_entry" });
    continue;
  }

  const assign = assignment.get(slug);
  if (!assign) {
    report.no_match.push({
      slug,
      title: meta.title,
      author: meta.author,
      category: meta.category,
      reason: "no_cover_match",
      prev_source,
    });
    continue;
  }

  if (assign.cover_path === prev_source) {
    report.unchanged.push({ slug, title: meta.title, score: assign.score, method: assign.method });
    continue;
  }

  report.updated.push({
    slug,
    title: meta.title,
    score: assign.score,
    method: assign.method,
    prev_source,
    new_source: assign.cover_path,
    detected_title: assign.detected_title,
    detected_author: assign.detected_author,
  });

  if (!DRY_RUN) {
    entry.source_path = assign.cover_path;
  }
}

if (!DRY_RUN) {
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}
await writeFile(OUT_REPORT, JSON.stringify(report, null, 2));

const byMethod = {};
for (const u of report.updated) byMethod[u.method] = (byMethod[u.method] || 0) + 1;

console.log(`Apply vision rename ${DRY_RUN ? "(DRY RUN)" : ""}`);
console.log(`  Covers indexed:  ${covers.length}`);
console.log(`  Updated:         ${report.updated.length}`, byMethod);
console.log(`  Unchanged:       ${report.unchanged.length}`);
console.log(`  No match:        ${report.no_match.length}`);
console.log(`  Report: ${OUT_REPORT}`);

if (report.no_match.length) {
  console.log("\nUnmatched (first 8):");
  for (const m of report.no_match.slice(0, 8)) {
    console.log(`  ${m.slug}: ${m.title}`);
  }
}

process.exitCode = report.no_match.length > 50 ? 1 : 0;
