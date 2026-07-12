#!/usr/bin/env node
/**
 * Find NOLA duplicate clusters (v2, v3, -1, near-identical titles).
 * Picks keeper by: no variant suffix > shortest clean title > first alphabetically.
 * Outputs delete list for user-approved removal from source archive.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, basename } from "node:path";

import { resolvePoetryRoot } from "./resolve-poetry-root.mjs";

const POETRY_ROOT = resolvePoetryRoot();

const NOLA_DIR = join(POETRY_ROOT, "nola");

function normalizeTitle(name) {
  return basename(name, ".md")
    .replace(/\s*\(v\d+[^)]*\)/gi, "")
    .replace(/-\d+$/, "")
    .replace(/\s*….*$/, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function variantPenalty(filename) {
  const base = basename(filename, ".md");
  let score = 0;
  if (/\(v\d+/i.test(base)) score += 10;
  if (/-\d+$/.test(base)) score += 8;
  if (/…/.test(base)) score += 5;
  score += base.length * 0.01;
  return score;
}

function pickKeeper(files) {
  return [...files].sort((a, b) => variantPenalty(a) - variantPenalty(b))[0];
}

async function main() {
  const entries = await readdir(NOLA_DIR);
  const mdFiles = entries.filter((f) => f.endsWith(".md"));
  const clusters = new Map();

  for (const file of mdFiles) {
    const key = normalizeTitle(file);
    if (!clusters.has(key)) clusters.set(key, []);
    clusters.get(key).push(file);
  }

  const duplicates = [];
  const keepers = [];
  const deleteList = [];

  for (const [key, files] of clusters) {
    if (files.length < 2) continue;
    const keeper = pickKeeper(files);
    const losers = files.filter((f) => f !== keeper);
    duplicates.push({ key, keeper, losers, count: files.length });
    keepers.push(join(NOLA_DIR, keeper));
    for (const loser of losers) {
      deleteList.push(join(NOLA_DIR, loser));
    }
  }

  duplicates.sort((a, b) => b.count - a.count);

  const report = {
    generated_at: new Date().toISOString(),
    nola_total: mdFiles.length,
    cluster_count: duplicates.length,
    files_to_delete: deleteList.length,
    files_after_dedupe: mdFiles.length - deleteList.length,
    clusters: duplicates,
    delete_paths: deleteList,
  };

  const outPath = join(process.cwd(), "scripts/verse/nola-dedupe-report.json");
  await writeFile(outPath, JSON.stringify(report, null, 2));

  console.log(`NOLA: ${mdFiles.length} files → ${report.files_after_dedupe} after dedupe`);
  console.log(`Clusters: ${duplicates.length} · Delete: ${deleteList.length}`);
  console.log(`Report: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
