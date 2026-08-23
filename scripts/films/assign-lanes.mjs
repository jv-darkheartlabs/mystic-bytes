/**
 * Set film `lane` from source reading category. Strip spice when lane != romance.
 *
 * Usage: node scripts/films/assign-lanes.mjs [--dry-run]
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const FILMS = join(ROOT, "_films");
const READINGS = join(ROOT, "_readings");
const YAML = join(ROOT, "_data/reading_categories.yml");
const dryRun = process.argv.includes("--dry-run");

function parseLanes(yaml) {
  const lanes = {};
  let current = null;
  for (const line of yaml.split("\n")) {
    const cat = line.match(/^  ([a-z0-9-]+):\s*$/);
    if (cat) current = cat[1];
    const lane = line.match(/^\s+lane:\s*(\S+)/);
    if (lane && current) lanes[current] = lane[1];
  }
  return lanes;
}

function parseFront(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  return { front: m[1], body: m[2] };
}

function field(front, key) {
  const m = front.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
}

function setField(front, key, value) {
  const re = new RegExp(`^${key}:.*$`, "m");
  const line = `${key}: ${value}`;
  if (re.test(front)) return front.replace(re, line);
  return `${front}\n${line}`;
}

function removeField(front, key) {
  return front.replace(new RegExp(`^${key}:.*\\n?`, "m"), "");
}

function firstSourceSlug(front) {
  const block = front.match(/^source_readings:\n((?:  - .+\n)+)/m);
  if (!block) {
    const inline = front.match(/^source_readings:\s*\[(.+)\]/m);
    if (inline) return inline[1].split(",")[0].trim().replace(/^["']|["']$/g, "");
    return "";
  }
  const first = block[1].match(/  - ["']?([^"'\n]+)["']?/);
  return first ? first[1].trim() : "";
}

const lanes = parseLanes(await readFile(YAML, "utf8"));
const readingCat = {};
for (const file of await readdir(READINGS)) {
  if (!file.endsWith(".md")) continue;
  const raw = await readFile(join(READINGS, file), "utf8");
  const parsed = parseFront(raw);
  if (!parsed) continue;
  readingCat[file.replace(/\.md$/, "")] = field(parsed.front, "category");
}

const missing = [];
let changed = 0;
for (const file of (await readdir(FILMS)).filter((f) => f.endsWith(".md"))) {
  const path = join(FILMS, file);
  const raw = await readFile(path, "utf8");
  const parsed = parseFront(raw);
  if (!parsed) continue;
  let { front, body } = parsed;
  const src = firstSourceSlug(front);
  const cat = src ? readingCat[src] : "";
  let lane = (cat && lanes[cat]) || "canon";
  if (!src || !cat) missing.push({ file, src, cat, lane });
  let next = setField(front, "lane", lane);
  if (lane !== "romance" && /^spice:/m.test(next)) next = removeField(next, "spice");
  if (next !== front) {
    changed += 1;
    if (!dryRun) await writeFile(path, `---\n${next}\n---\n${body}`);
  }
}
console.log(JSON.stringify({ dryRun, changed, missing }, null, 2));
