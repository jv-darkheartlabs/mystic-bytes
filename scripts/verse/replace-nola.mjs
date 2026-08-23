/**
 * Replace standalone NOLA with New Orleans in verse title/dek/source_title/body.
 * Does not rename category key `nola`.
 *
 * Usage: node scripts/verse/replace-nola.mjs [--dry-run]
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "../../_verse");
const dryRun = process.argv.includes("--dry-run");
const NOLA = /\bNOLA\b/g;

function parseFront(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  return { front: m[1], body: m[2] };
}

function replaceFrontFields(front) {
  return front
    .split("\n")
    .map((line) => {
      if (/^category:\s*nola\s*$/.test(line)) return line;
      if (/^(title|dek|source_title):/.test(line)) {
        return line.replace(NOLA, "New Orleans");
      }
      return line;
    })
    .join("\n");
}

let changed = 0;
for (const file of (await readdir(DIR)).filter((f) => f.endsWith(".md"))) {
  const path = join(DIR, file);
  const raw = await readFile(path, "utf8");
  const parsed = parseFront(raw);
  if (!parsed) continue;
  const front = replaceFrontFields(parsed.front);
  const body = parsed.body.replace(NOLA, "New Orleans");
  if (front !== parsed.front || body !== parsed.body) {
    changed += 1;
    if (!dryRun) await writeFile(path, `---\n${front}\n---\n${body}`);
  }
}
console.log(JSON.stringify({ dryRun, changed }));
