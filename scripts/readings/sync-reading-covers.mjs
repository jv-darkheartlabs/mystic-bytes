#!/usr/bin/env node
/**
 * Sync assets/readings/*.jpg from manifest source_path (~/Pictures/bookish/BookCovers).
 * Applies trim + 2:3 center-crop before writing JPG assets.
 *
 * Usage: node sync-reading-covers.mjs [options]
 *   --force           re-process all covers even if asset mtime is newer
 *   --limit N         process at most N readings (after offset)
 *   --offset N        skip first N readings (sorted by slug)
 *   --slug a,b,c      only process these slugs
 */
import { readFile, writeFile, copyFile, access, readdir, stat } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import {
  TRASH,
  MANIFEST_PATH,
  READINGS_DIR,
  ASSETS_DIR,
  parseFrontmatter,
  buildManifestIndexes,
  resolveManifestEntry,
  sourceInCategory,
  preprocessCover,
} from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const REPORT = join(DIR, "sync-covers-report.json");
const CROP_REPORT = join(DIR, "crop-pipeline-report.json");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const FORCE = process.argv.includes("--force");
const LIMIT = argValue("--limit") ? parseInt(argValue("--limit"), 10) : null;
const OFFSET = argValue("--offset") ? parseInt(argValue("--offset"), 10) : 0;
const SLUG_FILTER = argValue("--slug")
  ? new Set(argValue("--slug").split(",").map((s) => s.trim()).filter(Boolean))
  : null;

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function restoreFromTrash(sourcePath) {
  const name = basename(sourcePath);
  const trashPath = join(TRASH, name);
  if (!(await exists(trashPath))) return false;
  await copyFile(trashPath, sourcePath);
  return true;
}

const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const indexes = buildManifestIndexes(manifest.entries);
let mdFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md")).sort();
if (SLUG_FILTER) {
  mdFiles = mdFiles.filter((f) => SLUG_FILTER.has(f.replace(/\.md$/, "")));
}
if (OFFSET > 0) mdFiles = mdFiles.slice(OFFSET);
if (LIMIT != null && LIMIT > 0) mdFiles = mdFiles.slice(0, LIMIT);

const report = {
  generated_at: new Date().toISOString(),
  force: FORCE,
  limit: LIMIT,
  offset: OFFSET,
  slug_filter: SLUG_FILTER ? [...SLUG_FILTER] : null,
  processed: mdFiles.length,
  synced: 0,
  skipped_unchanged: 0,
  restored_from_trash: 0,
  missing_source: [],
  no_manifest_match: [],
  ambiguous_match: [],
  title_mismatch: [],
  match_methods: {},
  accuracy: { readings: mdFiles.length, manifest_entries: manifest.entries.length },
  organizational: {
    wrong_category_folder: [],
  },
};

const cropStats = [];

for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const front = await readFile(join(READINGS_DIR, file), "utf8");
  const meta = parseFrontmatter(front);
  const resolved = resolveManifestEntry(meta, slug, indexes);

  if (!resolved.entry) {
    report.no_manifest_match.push({ slug, title: meta.title, method: resolved.method });
    continue;
  }
  if (resolved.method === "ambiguous") {
    report.ambiguous_match.push({
      slug,
      title: meta.title,
      candidates: resolved.candidates.map((c) => c.id),
    });
    continue;
  }

  report.match_methods[resolved.method] = (report.match_methods[resolved.method] || 0) + 1;
  const entry = resolved.entry;

  if (meta.title && meta.title !== entry.title) {
    report.title_mismatch.push({ slug, reading_title: meta.title, manifest_title: entry.title, method: resolved.method });
  }
  if (entry.source_path && !sourceInCategory(entry.source_path, entry.category)) {
    report.organizational.wrong_category_folder.push({
      slug,
      source_path: entry.source_path,
      category: entry.category,
    });
  }

  let src = entry.source_path;
  if (!src || !(await exists(src))) {
    if (src && (await restoreFromTrash(src))) {
      report.restored_from_trash++;
    } else {
      report.missing_source.push({ slug, title: entry.title, source_path: src });
      continue;
    }
  }

  const assetName = meta.cover ? basename(meta.cover) : `${slug}.jpg`;
  const dest = join(ASSETS_DIR, assetName);

  let shouldSync = FORCE;
  if (!shouldSync) {
    try {
      const [srcStat, destStat] = await Promise.all([stat(src), stat(dest)]);
      if (destStat.mtimeMs >= srcStat.mtimeMs && destStat.size > 0) {
        shouldSync = false;
      } else {
        shouldSync = true;
      }
    } catch {
      shouldSync = true;
    }
  }

  if (!shouldSync) {
    report.skipped_unchanged++;
    continue;
  }

  try {
    const stats = preprocessCover(src, dest);
    cropStats.push({ slug, title: meta.title, ...stats });
    report.synced++;
  } catch (err) {
    report.missing_source.push({ slug, title: entry.title, source_path: src, error: String(err.message) });
  }
}

await writeFile(REPORT, JSON.stringify(report, null, 2));
await writeFile(
  CROP_REPORT,
  JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      processed: cropStats.length,
      target_dimensions: { w: 533, h: 800, ratio: "2:3" },
      entries: cropStats,
      summary: {
        avg_trim_left: avg(cropStats.map((s) => s.trim_px?.left ?? 0)),
        avg_trim_top: avg(cropStats.map((s) => s.trim_px?.top ?? 0)),
        avg_trim_right: avg(cropStats.map((s) => s.trim_px?.right ?? 0)),
        avg_trim_bottom: avg(cropStats.map((s) => s.trim_px?.bottom ?? 0)),
      },
    },
    null,
    2,
  ),
);

function avg(nums) {
  if (!nums.length) return 0;
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10;
}

console.log(`Processed: ${report.processed}`);
console.log(`Synced: ${report.synced}`);
console.log(`Unchanged (skipped): ${report.skipped_unchanged}`);
console.log(`Restored from trash: ${report.restored_from_trash}`);
console.log(`Missing source: ${report.missing_source.length}`);
console.log(`No manifest match: ${report.no_manifest_match.length}`);
console.log(`Ambiguous match: ${report.ambiguous_match.length}`);
console.log(
  `Wrong category folder (organizational): ${report.organizational.wrong_category_folder.length}`,
);
console.log(`Title mismatches: ${report.title_mismatch.length}`);
console.log(`Match methods:`, report.match_methods);
console.log(`Sync report: ${REPORT}`);
console.log(`Crop report: ${CROP_REPORT}`);

if (report.missing_source.length || report.no_manifest_match.length) {
  for (const m of report.missing_source) {
    console.log(`  MISSING: ${m.title} (${m.slug})`);
  }
  for (const m of report.no_manifest_match) {
    console.log(`  NO MATCH: ${m.title} (${m.slug})`);
  }
  process.exitCode = 1;
}
