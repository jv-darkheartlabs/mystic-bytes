#!/usr/bin/env node
/**
 * One-shot fix for the 15 screenshot-flagged reading covers (Jul 2026).
 * Usage: node scripts/readings/fix-problematic-covers.mjs [--dry-run]
 */
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  MANIFEST_PATH,
  READINGS_DIR,
  ASSETS_DIR,
  parseFrontmatter,
  buildManifestIndexes,
  resolveManifestEntry,
  preprocessCover,
} from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes("--dry-run");
const REPORT_PATH = join(DIR, "fix-problematic-covers-report.json");

/** slug → { panel?: string, fetch?: boolean } */
const FIXES = {
  "the-paradise-problem": {},
  "the-unmaking-of-june-farrow": {},
  "the-unseelie-kings-rebel": { panel: "top-left" },
  "the-wolf-and-the-witch": { fetch: true },
  "unravel-me": { panel: "center" },
  "the-ippos-king": {},
  "throne-of-vengeance": { panel: "top" },
  "times-convert": {},
  "vampire-academy": { panel: "left" },
  "vow-of-thieves": { panel: "left" },
  "vows-ruins": { panel: "bottom" },
  "what-the-river-knows": {},
  "zodiac-academy-heartless-sky": { panel: "top" },
  "zodiac-academy-origins-of-an-academy": { panel: "right" },
  "us-dark-few": { panel: "top-left" },
};

const WOLF_SOURCE =
  "/Users/jenthedev/Pictures/bookish/BookCovers/fantasy-romance/the-wolf-and-the-witch--charissa-weaks.jpeg";
const OPEN_LIBRARY_COVER =
  "https://covers.openlibrary.org/b/id/14641716-L.jpg";

async function fetchWolfCover() {
  const res = await fetch(OPEN_LIBRARY_COVER);
  if (!res.ok) throw new Error(`Open Library fetch failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("Downloaded cover too small");
  await mkdir(dirname(WOLF_SOURCE), { recursive: true });
  if (existsSync(WOLF_SOURCE)) {
    await copyFile(WOLF_SOURCE, `${WOLF_SOURCE}.bak-${Date.now()}`);
  }
  await writeFile(WOLF_SOURCE, buf);
  return WOLF_SOURCE;
}

const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const indexes = buildManifestIndexes(manifest.entries);
const report = {
  generated_at: new Date().toISOString(),
  dry_run: DRY_RUN,
  fixed: [],
  errors: [],
};

for (const [slug, opts] of Object.entries(FIXES)) {
  const mdPath = join(READINGS_DIR, `${slug}.md`);
  const front = await readFile(mdPath, "utf8");
  const meta = parseFrontmatter(front);
  const resolved = resolveManifestEntry(meta, slug, indexes);
  if (!resolved.entry?.source_path) {
    report.errors.push({ slug, error: "no manifest source_path" });
    continue;
  }

  let src = resolved.entry.source_path;
  const assetName = meta.cover?.split("/").pop() || `${slug}.jpg`;
  const dest = join(ASSETS_DIR, assetName);

  try {
    if (opts.fetch) {
      if (DRY_RUN) {
        report.fixed.push({ slug, action: "fetch", dest });
        continue;
      }
      src = await fetchWolfCover();
    }

    if (DRY_RUN) {
      report.fixed.push({
        slug,
        title: meta.title,
        src,
        dest,
        panel: opts.panel ?? null,
        fetch: Boolean(opts.fetch),
      });
      continue;
    }

    const stats = preprocessCover(src, dest, { panel: opts.panel ?? null });
    report.fixed.push({
      slug,
      title: meta.title,
      number: meta.number,
      src,
      dest,
      panel: opts.panel ?? null,
      fetch: Boolean(opts.fetch),
      stats,
    });
    console.log(`OK ${meta.number} ${slug}${opts.panel ? ` [${opts.panel}]` : ""}`);
  } catch (err) {
    report.errors.push({ slug, title: meta.title, error: String(err.message || err) });
    console.error(`FAIL ${slug}:`, err.message || err);
  }
}

await writeFile(REPORT_PATH, JSON.stringify(report, null, 2));
console.log(`\nFixed: ${report.fixed.length}, errors: ${report.errors.length}`);
console.log(`Report: ${REPORT_PATH}`);
if (report.errors.length) process.exitCode = 1;
