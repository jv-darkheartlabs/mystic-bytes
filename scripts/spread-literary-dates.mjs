/**
 * Spread publish dates for readings, films, verse across 2026-01-01..2026-08-23.
 * Clamp historical date fields after that day. Does not call reading-dates.mjs.
 *
 * Usage: node scripts/spread-literary-dates.mjs [--dry-run]
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const START = new Date("2026-01-01T12:00:00");
const END = new Date("2026-08-23T12:00:00");
const END_ISO = "2026-08-23";
const dryRun = process.argv.includes("--dry-run");

const COLLECTIONS = [
  { dir: join(ROOT, "_readings"), extra: ["date_read"] },
  { dir: join(ROOT, "_films"), extra: ["date_watched"] },
  { dir: join(ROOT, "_verse"), extra: ["date_written"] },
];

function parseFront(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  return { front: m[1], body: m[2] };
}

function sortKey(front) {
  const m = front.match(/^sort_key:\s*(\d+)/m);
  if (m) return Number(m[1]);
  const n = front.match(/^number:\s*[A-Z]?(\d+)/m);
  return n ? Number(n[1]) : 0;
}

function setField(front, key, value) {
  const re = new RegExp(`^${key}:\\s*.*$`, "m");
  const line = `${key}: ${value}`;
  if (re.test(front)) return front.replace(re, line);
  return `${front}\n${line}`;
}

function field(front, key) {
  const m = front.match(new RegExp(`^${key}:\\s*(\\S+)`, "m"));
  return m ? m[1].trim() : "";
}

function assignDates(count) {
  if (count <= 0) return [];
  if (count === 1) return [END_ISO];
  const span = END.getTime() - START.getTime();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(START.getTime() + Math.round((i * span) / (count - 1)));
    if (d > END) d.setTime(END.getTime());
    return d.toISOString().slice(0, 10);
  });
}

async function spread(dir, extraKeys) {
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
  const items = [];
  for (const file of files) {
    const path = join(dir, file);
    const raw = await readFile(path, "utf8");
    const parsed = parseFront(raw);
    if (!parsed) continue;
    items.push({ path, file, ...parsed, sk: sortKey(parsed.front) });
  }
  items.sort((a, b) => a.sk - b.sk);
  const dates = assignDates(items.length);
  let changed = 0;
  let clamped = 0;
  for (let i = 0; i < items.length; i++) {
    let { front, body, path } = items[i];
    const nextDate = dates[i];
    let next = setField(front, "date", nextDate);
    for (const key of extraKeys) {
      const v = field(next, key);
      if (v && v > END_ISO) {
        next = setField(next, key, END_ISO);
        clamped += 1;
      }
    }
    if (next !== front) {
      changed += 1;
      if (!dryRun) await writeFile(path, `---\n${next}\n---\n${body}`);
    }
  }
  return { dir, n: items.length, changed, clamped };
}

const results = [];
for (const c of COLLECTIONS) {
  results.push(await spread(c.dir, c.extra));
}
console.log(JSON.stringify({ dryRun, results }, null, 2));
