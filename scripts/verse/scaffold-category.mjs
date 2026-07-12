#!/usr/bin/env node
/**
 * Scaffold verse frontmatter for a source poetry file.
 * Sync target: _verse/<slug>.md in mystic-bytes + source archive update on rewrite.
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assignDateWritten,
  assignPublishDate,
  defaultContentWarnings,
  isPersonalLoreOffSite,
} from "./verse-life-map.mjs";
import { getVerseProfile } from "./verse-voice-by-era.mjs";

const REPO_ROOT = join(fileURLToPath(import.meta.url), "../../..");
const POETRY_ROOT =
  process.env.POETRY_ROOT ||
  "/Users/jenthedev/Documents/Documents - Jennifer's MacBook Pro/Active/dark-heart-labs/poetry";
const VERSE_OUT = join(REPO_ROOT, "_verse");

const CATEGORY_ORDER = [
  "spirituality",
  "grief-loss-resilience",
  "love",
  "nola",
  "nature",
  "curiosity",
  "life",
  "justice",
  "misc",
  "mind-and-self",
];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseSourceFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { meta: {}, body: raw.trim() };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  const body = raw.slice(m[0].length).trim();
  return { meta, body };
}

function shortenTitle(title) {
  return title
    .replace(/\s*-\s*A\s+(Symphony|Journey|Tapestry|Poetic|Heartwarming|Tribute).*$/i, "")
    .replace(/\s*\(v\d+[^)]*\)/gi, "")
    .replace(/\s*….*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function scaffoldFrontmatter({
  title,
  slug,
  category,
  date_written,
  era,
  sort_key,
  content_warnings,
  shelf,
  source_path,
}) {
  const date = assignPublishDate(sort_key, date_written);
  const num = `V${String(sort_key).padStart(4, "0")}`;
  const cwYaml =
    content_warnings.length > 0
      ? `content_warnings:\n${content_warnings.map((c) => `  - "${c}"`).join("\n")}`
      : "content_warnings: []";

  return `---
layout: verse
title: "${title.replace(/"/g, '\\"')}"
dek: ""
number: ${num}
sort_key: ${sort_key}
date: ${date}
date_written: ${date_written}
category: ${category}
form: free-verse
era: ${era}
tags:
  - verse
  - ${category === "nola" ? "neworleans" : category}
  - darkheartlabs
${cwYaml}
shelf: ${shelf}
source_path: "${source_path.replace(/"/g, '\\"')}"
rewrite_status: pending
---

`;
}

async function listCategoryFiles(category) {
  const dir = join(POETRY_ROOT, category);
  try {
    const files = await readdir(dir);
    return files.filter((f) => f.endsWith(".md")).map((f) => join(dir, f));
  } catch {
    return [];
  }
}

async function main() {
  const category = process.argv[2] || "spirituality";
  const limit = Number(process.argv[3] || 0);
  await mkdir(VERSE_OUT, { recursive: true });

  let files = await listCategoryFiles(category);
  files.sort();

  const manifest = [];
  let sortStart = 100;
  if (category === "spirituality") sortStart = 100;
  if (category === "grief-loss-resilience") sortStart = 200;
  if (category === "love") sortStart = 300;

  let n = 0;
  for (const filePath of files) {
    const raw = await readFile(filePath, "utf8");
    const { meta } = parseSourceFrontmatter(raw);
    const sourceTitle = meta.title || basename(filePath, ".md");
    const title = shortenTitle(sourceTitle);
    const slug = slugify(title);
    const offSite = isPersonalLoreOffSite({ slug, title: sourceTitle });
    const { date_written, era } = assignDateWritten({
      slug,
      category,
      title: sourceTitle,
    });
    const cw = defaultContentWarnings(category, sourceTitle, []);
    const profile = getVerseProfile(Number.parseInt(date_written.slice(0, 4), 10));
    const sort_key = sortStart + n + 1;
    const shelf = offSite ? false : true;

    const header = scaffoldFrontmatter({
      title,
      slug,
      category,
      date_written,
      era: profile.era,
      sort_key,
      content_warnings: cw,
      shelf,
      source_path: filePath,
    });

    const outPath = join(VERSE_OUT, `${slug}.md`);
    const placeholder = `${header}<!-- rewrite pending: ${category} / ${profile.label} -->\n\nJV · Dark Heart Labs\n`;

    await writeFile(outPath, placeholder, "utf8");
    manifest.push({ slug, title, filePath, outPath, era: profile.era, shelf, rewrite_status: "pending" });
    n += 1;
    if (limit > 0 && n >= limit) break;
  }

  const manifestPath = join(REPO_ROOT, "scripts/verse/manifests", `${category}-scaffold.json`);
  await mkdir(join(REPO_ROOT, "scripts/verse/manifests"), { recursive: true });
  await writeFile(manifestPath, JSON.stringify({ category, count: manifest.length, entries: manifest }, null, 2));

  console.log(`Scaffolded ${manifest.length} ${category} → _verse/`);
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
