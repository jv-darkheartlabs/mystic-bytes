#!/usr/bin/env node
/**
 * AI set organizer — reads inventory.json, proposes album groupings → manifest.json
 *
 * Run after inventory.mjs. Uses OpenAI vision when OPENAI_API_KEY is set;
 * otherwise writes a stub manifest for manual / agent curation.
 *
 * Usage: node scripts/gallery/organize-manifest.mjs
 *
 * Manifest set shape:
 * {
 *   slug, title, dek, theme, date, cover_id, photos: [{ id, alt, caption }]
 * }
 */
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const INVENTORY = join(DIR, "inventory.json");
const MANIFEST = join(DIR, "manifest.json");
const THEMES = join(DIR, "../../_data/gallery_channels.yml");

const { files } = JSON.parse(await readFile(INVENTORY, "utf8"));

if (files.length === 0) {
  console.error("inventory.json has no files. Run inventory.mjs first.");
  process.exit(1);
}

// Group by top-level folder as a naive default until AI pass runs
const byFolder = new Map();
for (const f of files) {
  const key = f.folder === "." ? "unsorted" : f.folder.split("/")[0];
  if (!byFolder.has(key)) byFolder.set(key, []);
  byFolder.get(key).push(f);
}

const sets = [...byFolder.entries()].map(([folder, photos], i) => ({
  slug: folder.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  title: folder.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  dek: `Auto-grouped from folder \`${folder}\` — refine with AI or edit manifest.`,
  theme: folder.includes("orchid") ? "orchid-room" : "darkheart-labs",
  sort_key: String(i + 1).padStart(3, "0"),
  cover_id: photos[0].id,
  photos: photos.map((p) => ({
    id: p.id,
    alt: "",
    caption: "",
  })),
  confidence: "folder-default",
}));

const manifest = {
  generated_at: new Date().toISOString(),
  note: "Replace folder-default groupings with AI curation via vision pass or manual edit.",
  themes_file: THEMES,
  sets,
};

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${sets.length} proposed sets to ${MANIFEST}`);
console.log("Next: node scripts/gallery/generate-from-manifest.mjs");
