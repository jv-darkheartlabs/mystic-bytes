#!/usr/bin/env node
/**
 * Reassociate manifest source_path with reading sort_key root PNGs.
 * Root BookCovers/{sort_key}.png is the canonical per-reading export.
 * Copies to BookCovers/{category}/r{sort_key}.jpeg and updates manifest.
 *
 * Usage: node reconcile-manifest-sources.mjs [--dry-run]
 */
import { readFile, writeFile, readdir, mkdir, copyFile, access, stat } from "node:fs/promises";
import { join, basename } from "node:path";
import {
  BOOK_ROOT,
  MANIFEST_PATH,
  READINGS_DIR,
  parseFrontmatter,
  buildManifestIndexes,
  resolveManifestEntry,
  sortKeyRootPath,
} from "./cover-utils.mjs";

const DRY_RUN = process.argv.includes("--dry-run");
const REPORT = new URL("./reconcile-sources-report.json", import.meta.url);

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const indexes = buildManifestIndexes(manifest.entries);
const mdFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));

const report = {
  generated_at: new Date().toISOString(),
  dry_run: DRY_RUN,
  updated: [],
  unchanged: [],
  missing_root: [],
  no_manifest: [],
  errors: [],
};

const entryById = new Map(manifest.entries.map((e) => [e.id, e]));

for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const text = await readFile(join(READINGS_DIR, file), "utf8");
  const meta = parseFrontmatter(text);
  const resolved = resolveManifestEntry(meta, slug, indexes);

  if (!resolved.entry) {
    report.no_manifest.push({ slug, title: meta.title });
    continue;
  }

  const entry = resolved.entry;
  const rootSrc = meta.sort_key ? sortKeyRootPath(meta.sort_key) : null;

  if (!rootSrc || !(await exists(rootSrc))) {
    report.missing_root.push({ slug, title: meta.title, sort_key: meta.sort_key, expected: rootSrc });
    continue;
  }

  const destName = `r${String(meta.sort_key).padStart(4, "0")}.jpeg`;
  const destPath = join(BOOK_ROOT, meta.category || entry.category, destName);
  const prevPath = entry.source_path;

  let needsUpdate = prevPath !== destPath;
  if (!needsUpdate && (await exists(destPath))) {
    try {
      const [a, b] = await Promise.all([stat(rootSrc), stat(destPath)]);
      needsUpdate = a.mtimeMs > b.mtimeMs || a.size > b.size * 1.05;
    } catch {
      needsUpdate = true;
    }
  }

  if (!needsUpdate) {
    report.unchanged.push({ slug, source_path: prevPath });
    continue;
  }

  if (!DRY_RUN) {
    try {
      await mkdir(join(BOOK_ROOT, meta.category || entry.category), { recursive: true });
      await copyFile(rootSrc, destPath);
      entry.source_path = destPath;
      entry.id = `${meta.category || entry.category}/${destName}`;
    } catch (err) {
      report.errors.push({ slug, error: String(err) });
      continue;
    }
  }

  report.updated.push({
    slug,
    title: meta.title,
    sort_key: meta.sort_key,
    root_src: rootSrc,
    prev_source: prevPath,
    new_source: destPath,
  });
}

if (!DRY_RUN) {
  manifest.entries.sort((a, b) => a.id.localeCompare(b.id));
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

await writeFile(REPORT, JSON.stringify(report, null, 2));

console.log(`Reconcile manifest sources ${DRY_RUN ? "(DRY RUN)" : ""}`);
console.log(`  Updated:        ${report.updated.length}`);
console.log(`  Unchanged:      ${report.unchanged.length}`);
console.log(`  Missing root:   ${report.missing_root.length}`);
console.log(`  No manifest:    ${report.no_manifest.length}`);
console.log(`  Errors:         ${report.errors.length}`);
console.log(`  Report: ${REPORT.pathname}`);

if (report.updated.length) {
  console.log("\nSample updates:");
  for (const u of report.updated.slice(0, 5)) {
    console.log(`  ${u.slug}: ${basename(u.prev_source)} → ${basename(u.new_source)}`);
  }
}
