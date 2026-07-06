#!/usr/bin/env node
/** Strip LLM markdown wrapper artifacts from _readings bodies */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const READINGS_DIR = join(dirname(fileURLToPath(import.meta.url)), "../../_readings");

function sanitize(body) {
  return body
    .replace(/^<markdown[^>]*>\s*/i, "")
    .replace(/^<markdown string>\s*/i, "")
    .replace(/\s*<\/markdown string>$/i, "")
    .replace(/\s*<\/markdown>$/i, "")
    .trim();
}

const files = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));
let fixed = 0;

for (const f of files) {
  const path = join(READINGS_DIR, f);
  const raw = await readFile(path, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) continue;
  const cleaned = sanitize(m[2].trim());
  if (cleaned !== m[2].trim()) {
    await writeFile(path, `---\n${m[1]}\n---\n\n${cleaned}\n`, "utf8");
    fixed++;
  }
}

console.log(`Cleaned ${fixed} reading files.`);
