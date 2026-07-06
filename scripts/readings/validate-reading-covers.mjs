#!/usr/bin/env node
/**
 * Validate reading ↔ manifest ↔ source ↔ asset associations.
 * Writes scripts/readings/validate-covers-report.json + .txt summary.
 *
 * Organizational checks (e.g. source file not under BookCovers/{category}/) are
 * reported separately — they do not affect pass rate. Fix with fix-category-folders.mjs.
 *
 * Usage: node validate-reading-covers.mjs
 */
import { readFile, writeFile, readdir, access, stat } from "node:fs/promises";
import { join, basename } from "node:path";
import {
  MANIFEST_PATH,
  READINGS_DIR,
  ASSETS_DIR,
  loadCategories,
  parseFrontmatter,
  buildManifestIndexes,
  resolveManifestEntry,
  sourceInCategory,
  norm,
} from "./cover-utils.mjs";

const JSON_REPORT = new URL("./validate-covers-report.json", import.meta.url);
const TXT_REPORT = new URL("./validate-covers-report.txt", import.meta.url);

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

const { categories } = await loadCategories();
const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const indexes = buildManifestIndexes(manifest.entries);
const mdFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));

const report = {
  generated_at: new Date().toISOString(),
  totals: {
    readings: mdFiles.length,
    manifest_entries: manifest.entries.length,
    categories: categories.length,
  },
  ok: 0,
  issues: {
    no_manifest_match: [],
    ambiguous_match: [],
    title_mismatch: [],
    author_mismatch: [],
    category_mismatch: [],
    missing_source: [],
    missing_asset: [],
    stale_asset: [],
    slug_drift: [],
    duplicate_title_collisions: [],
  },
  /** Folder layout only — not a visual/cover mismatch. Does not affect pass rate. */
  organizational: {
    wrong_category_folder: [],
  },
  match_methods: {},
  samples: [],
};

for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const text = await readFile(join(READINGS_DIR, file), "utf8");
  const meta = parseFrontmatter(text);
  const resolved = resolveManifestEntry(meta, slug, indexes);

  if (!resolved.entry) {
    report.issues.no_manifest_match.push({
      slug,
      title: meta.title,
      category: meta.category,
      method: resolved.method,
      candidates: resolved.candidates?.map((c) => c.id),
    });
    continue;
  }

  if (resolved.method === "ambiguous") {
    report.issues.ambiguous_match.push({
      slug,
      title: meta.title,
      candidates: resolved.candidates.map((c) => ({ id: c.id, dek: c.dek })),
    });
    continue;
  }

  report.match_methods[resolved.method] = (report.match_methods[resolved.method] || 0) + 1;
  const entry = resolved.entry;
  let hasIssue = false;

  if (meta.title && norm(meta.title) !== norm(entry.title)) {
    report.issues.title_mismatch.push({ slug, reading: meta.title, manifest: entry.title });
    hasIssue = true;
  }
  if (meta.author && entry.author && norm(meta.author) !== norm(entry.author)) {
    report.issues.author_mismatch.push({ slug, reading: meta.author, manifest: entry.author });
    hasIssue = true;
  }
  if (meta.category && entry.category && meta.category !== entry.category) {
    report.issues.category_mismatch.push({ slug, reading: meta.category, manifest: entry.category });
    hasIssue = true;
  }
  if (resolved.warning === "slug-metadata-drift") {
    report.issues.slug_drift.push({ slug, title: meta.title, manifest_id: entry.id });
    hasIssue = true;
  }
  if (entry.source_path && !sourceInCategory(entry.source_path, entry.category)) {
    report.organizational.wrong_category_folder.push({
      slug,
      source_path: entry.source_path,
      category: entry.category,
      fix: "node scripts/readings/fix-category-folders.mjs --resync",
    });
  }
  if (!entry.source_path || !(await exists(entry.source_path))) {
    report.issues.missing_source.push({ slug, title: entry.title, source_path: entry.source_path });
    hasIssue = true;
  }

  const assetName = meta.cover ? basename(meta.cover) : `${slug}.jpg`;
  const assetPath = join(ASSETS_DIR, assetName);
  if (!(await exists(assetPath))) {
    report.issues.missing_asset.push({ slug, asset: assetPath });
    hasIssue = true;
  } else if (entry.source_path && (await exists(entry.source_path))) {
    const [srcStat, destStat] = await Promise.all([stat(entry.source_path), stat(assetPath)]);
    if (srcStat.mtimeMs > destStat.mtimeMs + 1000) {
      report.issues.stale_asset.push({ slug, title: entry.title, source: entry.source_path });
      hasIssue = true;
    }
  }

  if (!hasIssue) report.ok++;
}

// Duplicate title collisions within same category (vision import risk)
const byLoose = new Map();
for (const e of manifest.entries) {
  if (!e.title) continue;
  const k = `${norm(e.title)}::${e.category}`;
  if (!byLoose.has(k)) byLoose.set(k, []);
  byLoose.get(k).push({ id: e.id, author: e.author, dek: e.dek });
}
for (const [key, group] of byLoose) {
  if (group.length > 1) {
    report.issues.duplicate_title_collisions.push({ key, entries: group });
  }
}

const issueCount = Object.values(report.issues).reduce((n, arr) => n + arr.length, 0);
const organizationalCount = Object.values(report.organizational).reduce((n, arr) => n + arr.length, 0);
report.summary = {
  ok: report.ok,
  issue_count: issueCount,
  organizational_count: organizationalCount,
  pass_rate: `${((report.ok / mdFiles.length) * 100).toFixed(1)}%`,
};

// Human-readable summary
const lines = [
  `Reading Cover Validation — ${report.generated_at}`,
  `Readings: ${mdFiles.length} | Manifest: ${manifest.entries.length} | Pass: ${report.ok} (${report.summary.pass_rate})`,
  "",
  "Match methods:",
  ...Object.entries(report.match_methods).map(([k, v]) => `  ${k}: ${v}`),
  "",
  "Issues:",
];

for (const [kind, items] of Object.entries(report.issues)) {
  if (!items.length) continue;
  lines.push(`  ${kind}: ${items.length}`);
  for (const item of items.slice(0, 5)) {
    lines.push(`    - ${JSON.stringify(item)}`);
  }
  if (items.length > 5) lines.push(`    ... +${items.length - 5} more`);
}

const orgItems = Object.entries(report.organizational).filter(([, items]) => items.length);
if (orgItems.length) {
  lines.push("", "Organizational (not visual — fix with fix-category-folders.mjs):");
  for (const [kind, items] of orgItems) {
    lines.push(`  ${kind}: ${items.length}`);
    for (const item of items.slice(0, 5)) {
      lines.push(`    - ${JSON.stringify(item)}`);
    }
    if (items.length > 5) lines.push(`    ... +${items.length - 5} more`);
  }
}

report.samples = [
  ...report.issues.no_manifest_match.slice(0, 3),
  ...report.issues.category_mismatch.slice(0, 3),
  ...report.issues.stale_asset.slice(0, 3),
  ...report.issues.duplicate_title_collisions.slice(0, 3),
];

await writeFile(JSON_REPORT, JSON.stringify(report, null, 2));
await writeFile(TXT_REPORT, lines.join("\n") + "\n");

console.log(lines.join("\n"));
console.log(`\nJSON: ${JSON_REPORT.pathname}`);
console.log(`TXT:  ${TXT_REPORT.pathname}`);

if (issueCount > report.issues.stale_asset.length + report.issues.duplicate_title_collisions.length) {
  process.exitCode = 1;
}
