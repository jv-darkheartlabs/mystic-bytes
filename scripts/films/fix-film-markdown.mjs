#!/usr/bin/env node
/**
 * Fix Projection Room review markdown for proper Jekyll/kramdown rendering.
 *
 * - Strip AI <markdown string> wrappers (breaks bold/italic/lists)
 * - Remove redundant hashtag footer lines (tags live in frontmatter)
 * - Normalize section spacing
 *
 * Usage: node fix-film-markdown.mjs [--dry-run]
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const FILMS_DIR = join(DIR, "../../_films");
const dryRun = process.argv.includes("--dry-run");

function parseFrontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: "", body: md.trim() };
  return { front: m[1], body: m[2].trim() };
}

function sanitizeBody(body) {
  let text = body
    .replace(/^<markdown[^>]*>\s*/i, "")
    .replace(/^<markdown string>\s*/i, "")
    .replace(/\s*<\/markdown string>$/i, "")
    .replace(/\s*<\/markdown>$/i, "")
    .trim();

  // Remove AI hashtag footer lines (tags are in frontmatter + layout)
  text = text
    .split("\n")
    .filter((line) => !/^#[A-Za-z][\w#]*(?:\s+#[\w]+)*\s*$/.test(line.trim()))
    .join("\n");

  // Ensure blank line before each h2 section
  text = text.replace(/([^\n])\n(## )/g, "$1\n\n$2");

  // Collapse 3+ blank lines
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

const files = (await readdir(FILMS_DIR)).filter((f) => f.endsWith(".md"));
let fixed = 0;

for (const file of files) {
  const path = join(FILMS_DIR, file);
  const raw = await readFile(path, "utf8");
  const { front, body } = parseFrontMatter(raw);
  const cleaned = sanitizeBody(body);

  if (cleaned === body) continue;

  if (dryRun) {
    console.log(`would fix ${file}`);
  } else {
    await writeFile(path, `---\n${front}\n---\n\n${cleaned}\n`, "utf8");
    console.log(`fixed ${file}`);
  }
  fixed += 1;
}

console.log(`\nDone: ${fixed} files ${dryRun ? "would be " : ""}updated`);
