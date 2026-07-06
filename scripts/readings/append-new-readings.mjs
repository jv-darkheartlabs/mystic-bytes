#!/usr/bin/env node
/**
 * Append readings for manifest entries that don't yet have _readings/{slug}.md
 * Preserves existing R001–R### numbering; new entries continue from max+1.
 */
import { readFile, writeFile, mkdir, copyFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { dateReadFromPublished, readingDateEnd } from "./reading-dates.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const MANIFEST = join(DIR, "manifest.json");
const READINGS_DIR = join(ROOT, "_readings");
const ASSETS_DIR = join(ROOT, "assets/readings");

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function yamlString(s) {
  if (!s) return '""';
  if (/[:#\n[\]{}|>&*]/.test(s) || s.startsWith(" ") || s.endsWith(" ")) {
    return JSON.stringify(s);
  }
  return `"${s}"`;
}

function compressImage(src, dest) {
  try {
    execSync(`sips -Z 800 -s format jpeg -s formatOptions 75 "${src}" --out "${dest}"`, {
      stdio: "pipe",
    });
  } catch {
    return copyFile(src, dest);
  }
}

async function maxReadingNumber() {
  const files = await readdir(READINGS_DIR);
  let max = 0;
  for (const f of files) {
    if (!f.endsWith(".md")) continue;
    const text = await readFile(join(READINGS_DIR, f), "utf8");
    const m = text.match(/^number: R(\d+)/m);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max;
}

const { entries } = JSON.parse(await readFile(MANIFEST, "utf8"));
const existingSlugs = new Set(
  (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")),
);

const pending = entries.filter((e) => e.title && e.confidence !== "skip");
let nextNum = (await maxReadingNumber()) + 1;
let written = 0;
const slugCounts = {};

await mkdir(ASSETS_DIR, { recursive: true });

for (const e of pending) {
  let slug = slugify(e.title);
  slugCounts[slug] = (slugCounts[slug] || 0) + 1;
  if (slugCounts[slug] > 1) slug = `${slug}-${slugCounts[slug]}`;
  if (existingSlugs.has(slug)) continue;

  const num = String(nextNum).padStart(3, "0");
  const assetName = `${slug}.jpg`;
  const assetPath = `/assets/readings/${assetName}`;

  if (e.source_path) {
    await compressImage(e.source_path, join(ASSETS_DIR, assetName));
  }

  const tags = [...new Set([...(e.tags || []), "theorchidroom", "darkheartlabs"])];
  const cw = e.content_warnings || [];
  // Past dates only — publication yesterday at latest; read within 14 days prior.
  const published = readingDateEnd();
  published.setDate(published.getDate() - written);
  const publishedIso = published.toISOString().slice(0, 10);
  const dateRead = dateReadFromPublished(publishedIso, nextNum);

  const lines = [
    "---",
    "layout: reading",
    `title: ${yamlString(e.title)}`,
  ];
  if (e.author && e.author_confidence === "high") {
    lines.push(`author: ${yamlString(e.author)}`);
    if (e.author_url) lines.push(`author_url: ${yamlString(e.author_url)}`);
  } else if (e.author) {
    lines.push(`author: ${yamlString(e.author)}`);
  }
  lines.push(
    `dek: ${yamlString(e.dek || "")}`,
    `number: R${num}`,
    `sort_key: ${num}`,
    `date: ${publishedIso}`,
    `date_read: ${dateRead}`,
    `category: ${e.category}`,
    `cover: ${assetPath}`,
    `spice: ${e.spice || 3}`,
    "content_warnings:",
    ...cw.map((c) => `  - ${yamlString(c)}`),
    "tags:",
    ...tags.map((t) => `  - ${t}`),
    "---",
    "",
    e.body || "",
    "",
  );

  await writeFile(join(READINGS_DIR, `${slug}.md`), lines.join("\n"));
  existingSlugs.add(slug);
  written++;
  nextNum++;
  console.log(`R${num} ${e.title}`);
}

console.log(`Appended ${written} new readings`);
