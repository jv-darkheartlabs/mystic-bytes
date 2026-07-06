#!/usr/bin/env node
/** Sync review bodies from _readings/*.md into manifest.json */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const READINGS_DIR = join(ROOT, "_readings");
const MANIFEST_PATH = join(DIR, "manifest.json");

function parseFrontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: "", body: md.trim() };
  return { front: m[1], body: m[2].trim() };
}

const norm = (s) =>
  (s || "").toLowerCase().replace(/['']/g, "").replace(/[^a-z0-9]+/g, " ").trim();

const { entries } = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const byKey = new Map(
  entries.map((e) => [`${norm(e.title)}::${norm(e.author || "")}`, e])
);

const files = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));
let updated = 0;

for (const f of files) {
  const raw = await readFile(join(READINGS_DIR, f), "utf8");
  const { front, body } = parseFrontMatter(raw);
  const title = front.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1];
  const author = front.match(/^author:\s*"?(.+?)"?\s*$/m)?.[1];
  if (!title) continue;
  const entry = byKey.get(`${norm(title)}::${norm(author || "")}`);
  if (entry && entry.body !== body) {
    entry.body = body;
    updated++;
  }
}

await writeFile(MANIFEST_PATH, JSON.stringify({ entries }, null, 2), "utf8");
console.log(`Manifest sync: ${updated} bodies updated.`);
