#!/usr/bin/env node
/**
 * Scan a source folder for images → scripts/gallery/inventory.json
 *
 * Usage: node scripts/gallery/inventory.mjs [sourceDir]
 * Default sourceDir: ~/Pictures/dhl-gallery (create when ready)
 */
import { readdir, writeFile, mkdir } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, "inventory.json");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic"]);

const source =
  process.argv[2] || join(homedir(), "Pictures", "dhl-gallery");

async function walk(dir, base = dir) {
  const entries = [];
  let names;
  try {
    names = await readdir(dir, { withFileTypes: true });
  } catch {
    console.error(`Source not found: ${source}`);
    console.error("Create the folder and drop photos, or pass a path.");
    process.exit(1);
  }
  for (const ent of names) {
    const full = join(dir, ent.name);
    if (ent.isDirectory()) {
      entries.push(...(await walk(full, base)));
    } else if (IMAGE_EXT.has(extname(ent.name).toLowerCase())) {
      const rel = full.slice(base.length + 1);
      entries.push({
        id: rel.replace(/\\/g, "/"),
        source_path: full,
        filename: ent.name,
        folder: dirname(rel).replace(/\\/g, "/"),
      });
    }
  }
  return entries;
}

const files = (await walk(source)).sort((a, b) => a.id.localeCompare(b.id));
const payload = {
  generated_at: new Date().toISOString(),
  source,
  count: files.length,
  files,
};
await mkdir(DIR, { recursive: true });
await writeFile(OUT, JSON.stringify(payload, null, 2) + "\n");
console.log(`Wrote ${files.length} images to ${OUT}`);
