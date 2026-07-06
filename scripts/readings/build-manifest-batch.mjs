#!/usr/bin/env node
/** Merge batch entries into manifest.json */
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const MANIFEST = join(DIR, "manifest.json");
const BATCH = process.argv[2];
if (!BATCH) {
  console.error("Usage: node build-manifest-batch.mjs <batch.json>");
  process.exit(1);
}

const batch = JSON.parse(await readFile(BATCH, "utf8"));
let manifest = { entries: [] };
try {
  manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
} catch {}

const byId = new Map(manifest.entries.map((e) => [e.id, e]));
for (const e of batch) byId.set(e.id, e);
manifest.entries = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest: ${manifest.entries.length} entries`);
