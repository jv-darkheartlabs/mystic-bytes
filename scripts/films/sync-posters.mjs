#!/usr/bin/env node
/**
 * Copy source reading covers into assets/films/ and set poster frontmatter.
 *
 * Usage:
 *   node sync-posters.mjs
 *   node sync-posters.mjs --dry-run
 */
import { readFile, writeFile, mkdir, copyFile, readdir } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const FILMS_DIR = join(ROOT, "_films");
const READINGS_DIR = join(ROOT, "_readings");
const ASSETS_FILMS = join(ROOT, "assets/films");
const ASSETS_READINGS = join(ROOT, "assets/readings");

const dryRun = process.argv.includes("--dry-run");

function parseFrontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: "", body: md.trim() };
  return { front: m[1], body: m[2].trim() };
}

function frontScalar(front, key) {
  const m = front.match(new RegExp(`^${key}:\\s*"?(.+?)"?\\s*$`, "m"));
  return m?.[1] || null;
}

function parseYamlList(front, key) {
  const lines = front.split("\n");
  const out = [];
  let inList = false;
  for (const line of lines) {
    if (line.startsWith(`${key}:`)) {
      inList = true;
      continue;
    }
    if (inList) {
      if (/^\s+-\s+/.test(line)) {
        out.push(line.replace(/^\s+-\s+/, "").replace(/^"|"$/g, ""));
      } else if (line.trim() && !line.startsWith(" ")) {
        break;
      }
    }
  }
  return out;
}

function setPoster(front, posterPath) {
  if (/^poster:/m.test(front)) {
    return front.replace(/^poster:.*$/m, `poster: ${posterPath}`);
  }
  const lines = front.split("\n");
  const idx = lines.findIndex((l) => l.startsWith("year:"));
  if (idx !== -1) {
    lines.splice(idx + 1, 0, `poster: ${posterPath}`);
    return lines.join("\n");
  }
  return `${front}\nposter: ${posterPath}`;
}

await mkdir(ASSETS_FILMS, { recursive: true });

const filmFiles = (await readdir(FILMS_DIR)).filter((f) => f.endsWith(".md"));
let synced = 0;
let skipped = 0;

for (const file of filmFiles) {
  const slug = file.replace(/\.md$/, "");
  const filmPath = join(FILMS_DIR, file);
  const raw = await readFile(filmPath, "utf8");
  const { front, body } = parseFrontMatter(raw);

  const sources = parseYamlList(front, "source_readings");
  if (!sources.length) {
    console.log(`skip ${slug} — no source_readings`);
    skipped += 1;
    continue;
  }

  let coverPath = null;
  for (const sourceSlug of sources) {
    try {
      const readingRaw = await readFile(join(READINGS_DIR, `${sourceSlug}.md`), "utf8");
      const cover = frontScalar(readingRaw, "cover");
      if (cover) {
        coverPath = cover;
        break;
      }
    } catch {
      /* try next source */
    }
  }

  if (!coverPath) {
    console.log(`skip ${slug} — no cover on source`);
    skipped += 1;
    continue;
  }

  const ext = basename(coverPath).includes(".") ? basename(coverPath).split(".").pop() : "jpg";
  const destRel = `/assets/films/${slug}.${ext}`;
  const srcAbs = join(ROOT, coverPath.replace(/^\//, ""));
  const destAbs = join(ROOT, destRel.replace(/^\//, ""));

  if (!existsSync(srcAbs)) {
    console.log(`skip ${slug} — missing ${srcAbs}`);
    skipped += 1;
    continue;
  }

  if (dryRun) {
    console.log(`would copy ${srcAbs} → ${destAbs}`);
  } else {
    await copyFile(srcAbs, destAbs);
    const newFront = setPoster(front, destRel);
    await writeFile(filmPath, `---\n${newFront}\n---\n\n${body}\n`, "utf8");
    console.log(`synced ${slug} ← ${basename(srcAbs)}`);
  }
  synced += 1;
}

console.log(`\nPoster sync: ${synced} synced, ${skipped} skipped`);
