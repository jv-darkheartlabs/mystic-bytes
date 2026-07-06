#!/usr/bin/env node
/**
 * Copy manifest cover sources into BookCovers/{category}/ when the file
 * lives in a different category subfolder (vision reconcile often picks
 * the first filename match regardless of folder).
 *
 * Updates manifest source_path in place. Does not delete originals.
 *
 * Usage: node fix-category-folders.mjs [--dry-run] [--resync] [--slug a,b]
 */
import { readFile, writeFile, readdir, copyFile, access, mkdir, stat } from "node:fs/promises";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import {
  BOOK_ROOT,
  MANIFEST_PATH,
  READINGS_DIR,
  parseFrontmatter,
  buildManifestIndexes,
  resolveManifestEntry,
  sourceInCategory,
} from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const REPORT = join(DIR, "fix-category-folders-report.json");

const DRY_RUN = process.argv.includes("--dry-run");
const RESYNC = process.argv.includes("--resync");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const SLUG_FILTER = argValue("--slug")
  ? new Set(argValue("--slug").split(",").map((s) => s.trim()).filter(Boolean))
  : null;

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
const entryById = new Map(manifest.entries.map((e) => [e.id, e]));

let mdFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md")).sort();
if (SLUG_FILTER) {
  mdFiles = mdFiles.filter((f) => SLUG_FILTER.has(f.replace(/\.md$/, "")));
}

const report = {
  generated_at: new Date().toISOString(),
  dry_run: DRY_RUN,
  scanned: mdFiles.length,
  already_ok: 0,
  repointed_existing: 0,
  copied: 0,
  skipped: [],
  changes: [],
  errors: [],
};

for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  const text = await readFile(join(READINGS_DIR, file), "utf8");
  const meta = parseFrontmatter(text);
  const resolved = resolveManifestEntry(meta, slug, indexes);
  const entry = resolved.entry;
  if (!entry?.source_path || !meta.category) {
    report.skipped.push({ slug, reason: "no_entry_or_category" });
    continue;
  }

  if (sourceInCategory(entry.source_path, meta.category)) {
    report.already_ok++;
    continue;
  }

  const name = basename(entry.source_path);
  const dest = join(BOOK_ROOT, meta.category, name);
  const prev = entry.source_path;

  if (prev === dest) {
    report.already_ok++;
    continue;
  }

  try {
    if (!(await exists(prev))) {
      report.errors.push({ slug, reason: "missing_source", source: prev });
      continue;
    }

    if (await exists(dest)) {
      const [a, b] = await Promise.all([stat(prev), stat(dest)]);
      if (a.size === b.size) {
        if (!DRY_RUN) entry.source_path = dest;
        report.repointed_existing++;
        report.changes.push({ slug, action: "repoint", from: prev, to: dest, category: meta.category });
        continue;
      }
      // Same basename in category folder but different bytes — overwrite with manifest source.
      if (!DRY_RUN) {
        await copyFile(prev, dest);
        entry.source_path = dest;
      }
      report.copied++;
      report.changes.push({
        slug,
        action: "overwrite",
        from: prev,
        to: dest,
        category: meta.category,
        replaced_size: b.size,
        source_size: a.size,
      });
      continue;
    }

    if (!DRY_RUN) {
      await mkdir(dirname(dest), { recursive: true });
      await copyFile(prev, dest);
      entry.source_path = dest;
    }
    report.copied++;
    report.changes.push({ slug, action: "copy", from: prev, to: dest, category: meta.category });
  } catch (err) {
    report.errors.push({ slug, reason: err.message, source: prev, dest });
  }
}

report.summary = {
  fixed: report.repointed_existing + report.copied,
  still_wrong: report.errors.length,
};

if (!DRY_RUN) {
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

await writeFile(REPORT, JSON.stringify(report, null, 2));

console.log(`Fix category folders ${DRY_RUN ? "(DRY RUN)" : ""}`);
console.log(`  Scanned:            ${report.scanned}`);
console.log(`  Already OK:         ${report.already_ok}`);
console.log(`  Repointed existing: ${report.repointed_existing}`);
console.log(`  Copied:             ${report.copied}`);
console.log(`  Errors:             ${report.errors.length}`);
console.log(`  Report:             ${REPORT}`);

if (report.errors.length) {
  console.log("\nFirst errors:");
  for (const e of report.errors.slice(0, 8)) console.log(`  ${e.slug}: ${e.reason}`);
}

if (RESYNC && !DRY_RUN && report.summary.fixed > 0) {
  console.log("\nResyncing assets...");
  execFileSync("node", [join(DIR, "sync-reading-covers.mjs"), "--force"], {
    stdio: "inherit",
    cwd: join(DIR, "../.."),
  });
}

if (report.errors.length) process.exitCode = 1;
