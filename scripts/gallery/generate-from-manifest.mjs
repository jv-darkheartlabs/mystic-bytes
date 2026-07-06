#!/usr/bin/env node
/**
 * Generate _gallery/*.md + assets/gallery/* from scripts/gallery/manifest.json
 */
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const DIR = dirname(fileURLToPath(import.meta.url));
const MANIFEST = join(DIR, "manifest.json");
const GALLERY_DIR = join(ROOT, "_gallery");
const ASSETS_DIR = join(ROOT, "assets/gallery");

function yamlString(s) {
  if (!s) return '""';
  if (/[:#\n[\]{}|>&*]/.test(s) || s.startsWith(" ") || s.endsWith(" ")) {
    return JSON.stringify(s);
  }
  return `"${s}"`;
}

function compressImage(src, dest) {
  try {
    execSync(`sips -Z 1200 -s format jpeg -s formatOptions 80 "${src}" --out "${dest}"`, {
      stdio: "pipe",
    });
  } catch {
    return copyFile(src, dest);
  }
}

let manifest;
try {
  manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
} catch {
  console.error("manifest.json not found. Run organize-manifest.mjs first.");
  process.exit(1);
}

const { files: inventoryFiles } = JSON.parse(
  await readFile(join(DIR, "inventory.json"), "utf8"),
);
const pathById = new Map(inventoryFiles.map((f) => [f.id, f.source_path]));

await mkdir(GALLERY_DIR, { recursive: true });
await mkdir(ASSETS_DIR, { recursive: true });

let written = 0;
for (const set of manifest.sets) {
  const setAssetDir = join(ASSETS_DIR, set.slug);
  await mkdir(setAssetDir, { recursive: true });

  const photos = [];
  for (const p of set.photos) {
    const src = pathById.get(p.id);
    if (!src) continue;
    const name = basename(p.id).replace(/\.[^.]+$/, ".jpg");
    const rel = `/assets/gallery/${set.slug}/${name}`;
    await compressImage(src, join(ROOT, rel.slice(1)));
    photos.push({ src: rel, alt: p.alt || "", caption: p.caption || "" });
  }

  const cover = photos[0]?.src || "";
  const fm = [
    "---",
    "layout: gallery-set",
    `title: ${yamlString(set.title)}`,
    set.dek ? `dek: ${yamlString(set.dek)}` : null,
    `number: G${set.sort_key}`,
    `sort_key: ${set.sort_key}`,
    set.theme ? `theme: ${yamlString(set.theme)}` : null,
    set.date ? `date: ${set.date}` : `date: ${new Date().toISOString().slice(0, 10)}`,
    cover ? `cover: ${yamlString(cover)}` : null,
    "photos:",
    ...photos.flatMap((ph) => [
      "  -",
      `    src: ${yamlString(ph.src)}`,
      ph.alt ? `    alt: ${yamlString(ph.alt)}` : '    alt: ""',
      ph.caption ? `    caption: ${yamlString(ph.caption)}` : null,
    ].filter(Boolean)),
    "published: false",
    "---",
    "",
  ].filter(Boolean).join("\n");

  await writeFile(join(GALLERY_DIR, `${set.slug}.md`), fm);
  written++;
}

console.log(`Generated ${written} gallery sets in ${GALLERY_DIR} (published: false — flip when ready)`);
