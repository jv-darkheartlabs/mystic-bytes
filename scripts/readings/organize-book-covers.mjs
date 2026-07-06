#!/usr/bin/env node
/**
 * Organize ~/Pictures/bookish/BookCovers after reconcile-manifest-sources.mjs:
 * - Ensure 19 category subfolders exist
 * - Archive remaining root-level sort_key PNGs (originals kept in _archive)
 * - Move non-sort_key orphans to _unorganized/
 *
 * Run reconcile-manifest-sources.mjs FIRST — it copies root {sort_key}.png
 * into category folders as r{sort_key}.jpeg.
 *
 * Usage: node organize-book-covers.mjs [--dry-run]
 */
import { readFile, writeFile, readdir, mkdir, rename, access } from "node:fs/promises";
import { join } from "node:path";
import {
  BOOK_ROOT,
  READINGS_DIR,
  loadCategories,
  parseFrontmatter,
} from "./cover-utils.mjs";

const DRY_RUN = process.argv.includes("--dry-run");
const REPORT = new URL("./organize-covers-report.json", import.meta.url);
const ARCHIVE = join(BOOK_ROOT, "_archive", `root-${new Date().toISOString().slice(0, 10)}`);
const UNORG = join(BOOK_ROOT, "_unorganized", "root-export");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

const { categories } = await loadCategories();
const mdFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));
const sortKeys = new Set();
for (const file of mdFiles) {
  const text = await readFile(join(READINGS_DIR, file), "utf8");
  const meta = parseFrontmatter(text);
  if (meta.sort_key) sortKeys.add(String(parseInt(meta.sort_key, 10)));
}

for (const cat of categories) {
  if (!DRY_RUN) await mkdir(join(BOOK_ROOT, cat), { recursive: true });
}

const rootFiles = (await readdir(BOOK_ROOT)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

const report = {
  generated_at: new Date().toISOString(),
  dry_run: DRY_RUN,
  root_files: rootFiles.length,
  archived_sort_key: [],
  unorganized: [],
  note: "Originals preserved in BookCovers/_archive/root-YYYY-MM-DD/ — not deleted.",
};

for (const file of rootFiles) {
  const num = file.replace(/\.(jpe?g|png|webp)$/i, "");
  const rootPath = join(BOOK_ROOT, file);

  if (/^\d+$/.test(num) && sortKeys.has(num)) {
    const archiveDest = join(ARCHIVE, file);
    if (!DRY_RUN) {
      await mkdir(ARCHIVE, { recursive: true });
      await rename(rootPath, archiveDest);
    }
    report.archived_sort_key.push({ file, sort_key: num, archive: archiveDest });
    continue;
  }

  const dest = join(UNORG, file);
  if (!DRY_RUN) {
    await mkdir(UNORG, { recursive: true });
    await rename(rootPath, dest);
  }
  report.unorganized.push({ file, dest, reason: sortKeys.has(num) ? "unknown" : "non-sort-key" });
}

await writeFile(REPORT, JSON.stringify(report, null, 2));

console.log(`Organize BookCovers ${DRY_RUN ? "(DRY RUN)" : ""}`);
console.log(`  Root files scanned:     ${report.root_files}`);
console.log(`  Archived (sort_key):    ${report.archived_sort_key.length}`);
console.log(`  Unorganized:            ${report.unorganized.length}`);
console.log(`  Backup note: ${report.note}`);
console.log(`  Report: ${REPORT.pathname}`);
