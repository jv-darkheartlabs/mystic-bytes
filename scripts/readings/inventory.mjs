#!/usr/bin/env node
/**
 * Scan ~/Pictures/bookish/BookCovers and write scripts/readings/inventory.json
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { homedir } from "node:os";

const BOOK_ROOT = join(homedir(), "Pictures/bookish/BookCovers");
const OUT = new URL("./inventory.json", import.meta.url);
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const full = join(dir, ent.name);
    if (ent.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (IMAGE_EXT.test(ent.name)) {
      const category = relative(BOOK_ROOT, dir);
      files.push({
        id: `${category}/${ent.name}`,
        category,
        filename: ent.name,
        source_path: full,
      });
    }
  }
  return files;
}

const files = (await walk(BOOK_ROOT)).sort((a, b) => a.id.localeCompare(b.id));
await writeFile(OUT, JSON.stringify({ generated_at: new Date().toISOString(), count: files.length, files }, null, 2));
console.log(`Wrote ${files.length} entries to ${OUT.pathname}`);
