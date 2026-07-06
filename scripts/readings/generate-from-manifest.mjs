#!/usr/bin/env node
/**
 * Generate _readings/*.md and assets/readings/* from scripts/readings/manifest.json
 *
 * Manifest entry shape:
 * {
 *   id, category, title, author?, author_url?, author_confidence?,
 *   dek?, body, spice (1-5), content_warnings[], tags[], confidence
 * }
 */
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import {
  assignPublicationDates,
  dateReadFromPublished,
  readingDateEnd,
} from "./reading-dates.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const MANIFEST = join(dirname(fileURLToPath(import.meta.url)), "manifest.json");
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

function assignDates(count) {
  return assignPublicationDates(count, readingDateEnd());
}

async function compressImage(src, dest) {
  try {
    execSync(`sips -Z 800 -s format jpeg -s formatOptions 75 "${src}" --out "${dest}"`, {
      stdio: "pipe",
    });
  } catch {
    return copyFile(src, dest);
  }
}

const { entries } = JSON.parse(await readFile(MANIFEST, "utf8"));
const sorted = [...entries].sort((a, b) => a.id.localeCompare(b.id));
const dates = assignDates(sorted.length);

await mkdir(READINGS_DIR, { recursive: true });
await mkdir(ASSETS_DIR, { recursive: true });

const slugCounts = {};
let written = 0;

for (let i = 0; i < sorted.length; i++) {
  const e = sorted[i];
  if (!e.title || e.confidence === "skip") continue;

  let slug = slugify(e.title);
  slugCounts[slug] = (slugCounts[slug] || 0) + 1;
  if (slugCounts[slug] > 1) slug = `${slug}-${slugCounts[slug]}`;

  const num = String(i + 1).padStart(3, "0");
  const assetName = `${slug}.jpg`;
  const assetPath = `/assets/readings/${assetName}`;

  if (e.source_path) {
    await compressImage(e.source_path, join(ASSETS_DIR, assetName));
  }

  const tags = [...new Set([...(e.tags || []), "theorchidroom", "darkheartlabs"])];
  const cw = e.content_warnings || [];
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

  const sortNum = parseInt(num, 10);
  const published = dates[i];
  const dateRead = dateReadFromPublished(published, sortNum);

  lines.push(
    `dek: ${yamlString(e.dek || "")}`,
    `number: R${num}`,
    `sort_key: ${num}`,
    `date: ${published}`,
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
  written++;
}

console.log(`Generated ${written} readings in ${READINGS_DIR}`);
