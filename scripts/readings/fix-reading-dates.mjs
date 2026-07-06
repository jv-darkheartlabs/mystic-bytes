#!/usr/bin/env node
/**
 * Reassign publication + read dates on all _readings/*.md
 * - No future publication dates
 * - date_read within 14 days before publication (inclusive)
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assignPublicationDates,
  dateReadFromPublished,
  daysBetween,
  readingDateEnd,
} from "./reading-dates.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const READINGS_DIR = join(ROOT, "_readings");
const dryRun = process.argv.includes("--dry-run");

function parseFrontMatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  return { front: m[1], body: m[2] };
}

function sortKeyFromFront(front) {
  const m = front.match(/^sort_key:\s*(\d+)/m);
  if (m) return Number(m[1]);
  const n = front.match(/^number:\s*R(\d+)/m);
  return n ? Number(n[1]) : 0;
}

function upsertDateFields(front, date, dateRead) {
  let f = front;
  if (/^date:\s*.+$/m.test(f)) {
    f = f.replace(/^date:\s*.+$/m, `date: ${date}`);
  } else {
    f = `${f}\ndate: ${date}`;
  }
  if (/^date_read:\s*.+$/m.test(f)) {
    f = f.replace(/^date_read:\s*.+$/m, `date_read: ${dateRead}`);
  } else {
    f = f.replace(/^date:\s*.+$/m, `date: ${date}\ndate_read: ${dateRead}`);
  }
  return f;
}

const files = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));
const entries = [];

for (const file of files) {
  const raw = await readFile(join(READINGS_DIR, file), "utf8");
  const parsed = parseFrontMatter(raw);
  if (!parsed) {
    console.warn(`skip (no front matter): ${file}`);
    continue;
  }
  entries.push({
    file,
    raw,
    front: parsed.front,
    body: parsed.body,
    sortKey: sortKeyFromFront(parsed.front),
  });
}

entries.sort((a, b) => a.sortKey - b.sortKey);
const end = readingDateEnd();
const pubDates = assignPublicationDates(entries.length, end);

let updated = 0;
let violations = 0;

for (let i = 0; i < entries.length; i++) {
  const e = entries[i];
  const date = pubDates[i];
  const dateRead = dateReadFromPublished(date, e.sortKey || i + 1);
  const gap = daysBetween(dateRead, date);

  if (gap < 0 || gap > 14) {
    violations++;
    console.warn(`gap ${gap}d: ${e.file}`);
  }

  const newFront = upsertDateFields(e.front, date, dateRead);
  const next = `---\n${newFront}\n---\n${e.body}`;

  if (next !== e.raw) {
    updated++;
    if (!dryRun) {
      await writeFile(join(READINGS_DIR, e.file), next);
    }
  }
}

console.log(
  `${dryRun ? "[dry-run] " : ""}Updated ${updated}/${entries.length} readings. End date: ${end.toISOString().slice(0, 10)}. Violations: ${violations}.`,
);
