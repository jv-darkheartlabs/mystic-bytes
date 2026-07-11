#!/usr/bin/env node
/**
 * Import full classic series canons (Nancy Drew 1–56, Hardy Boys 1–58).
 *
 * Usage:
 *   node import-series-collection.mjs [--series nancy-drew|hardy-boys|all]
 *   node import-series-collection.mjs --dry-run
 *   node import-series-collection.mjs --skip-covers
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { dateReadFromGrade } from "./goodreads-date-read.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const MANIFEST_PATH = join(DIR, "manifest.json");
const READINGS_DIR = join(ROOT, "_readings");
const CANONS_PATH = join(DIR, "series-canons.json");
const COVER_ROOT = join(homedir(), "Pictures/bookish/BookCovers/series-import");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const SERIES_ARG = argValue("--series") || "all";
const DRY_RUN = process.argv.includes("--dry-run");
const SKIP_COVERS = process.argv.includes("--skip-covers");

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function seriesSlug(seriesKey, num, title) {
  const base = slugify(title);
  return `${seriesKey}-${String(num).padStart(2, "0")}-${base}`.slice(0, 80);
}

function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function gradeForIndex(index, total, gradeStart, gradeEnd) {
  if (total <= 1) return gradeStart;
  const span = gradeEnd - gradeStart;
  return gradeStart + Math.floor((index * span) / (total - 1));
}

async function downloadCover(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "mystic-bytes-series-import/1.0" },
  });
  if (!res.ok) return null;
  const contentType = res.headers.get("content-type") || "";
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1500) return null;
  if (contentType.includes("gif") || buf.slice(0, 3).toString() === "GIF") return null;
  return buf;
}

async function fetchCover(title, author, seriesLabel) {
  const queries = [
    `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=1`,
    `https://openlibrary.org/search.json?q=${encodeURIComponent(`${seriesLabel} ${title}`)}&limit=1`,
    `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=1`,
  ];

  for (const url of queries) {
    const res = await fetch(url);
    if (!res.ok) continue;
    const data = await res.json();
    const coverId = data.docs?.[0]?.cover_i;
    if (!coverId) continue;
    const buf = await downloadCover(`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`);
    if (buf) return buf;
  }
  return null;
}

async function loadExisting() {
  const slugs = new Set();
  const keys = new Set();
  for (const f of await readdir(READINGS_DIR)) {
    if (!f.endsWith(".md")) continue;
    slugs.add(f.replace(/\.md$/, ""));
    const text = await readFile(join(READINGS_DIR, f), "utf8");
    const tm = text.match(/^title:\s*"?(.+?)"?\s*$/m);
    const am = text.match(/^author:\s*"?(.+?)"?\s*$/m);
    if (tm) keys.add(`${norm(tm[1])}::${norm(am?.[1] || "")}`);
  }
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  for (const e of manifest.entries) {
    slugs.add(slugify(e.title));
    keys.add(`${norm(e.title)}::${norm(e.author || "")}`);
  }
  return { slugs, keys };
}

const canons = JSON.parse(await readFile(CANONS_PATH, "utf8"));
const seriesKeys =
  SERIES_ARG === "all" ? Object.keys(canons) : SERIES_ARG.split(",").map((s) => s.trim());

const existing = await loadExisting();
const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const report = { imported: [], skipped: [], errors: [], generated_at: new Date().toISOString() };

async function nextFile(seriesKey) {
  const dir = join(COVER_ROOT, seriesKey);
  await mkdir(dir, { recursive: true });
  const files = await readdir(dir);
  const nums = files.map((f) => parseInt(f.replace(/\D/g, ""), 10)).filter((n) => !Number.isNaN(n));
  return `${(nums.length ? Math.max(...nums) : 0) + 1}.jpeg`;
}

for (const seriesKey of seriesKeys) {
  const series = canons[seriesKey];
  if (!series) {
    console.error(`Unknown series: ${seriesKey}`);
    continue;
  }

  const total = series.books.length;
  console.log(`\n=== ${series.label} (${total} volumes) ===`);

  for (let i = 0; i < series.books.length; i++) {
    const book = series.books[i];
    const slug = seriesSlug(seriesKey, book.num, book.title);
    const key = `${norm(book.title)}::${norm(series.author)}`;

    if (existing.slugs.has(slug) || existing.keys.has(key)) {
      report.skipped.push({ series: seriesKey, num: book.num, title: book.title, reason: "exists" });
      continue;
    }

    const grade = gradeForIndex(i, total, series.grade_start, series.grade_end);
    const date_read = dateReadFromGrade(grade);
    const dek = `${series.label} #${book.num}`;

    let sourcePath = null;
    if (!SKIP_COVERS) {
      try {
        const buf = await fetchCover(book.title, series.author, series.label);
        if (buf && !DRY_RUN) {
          const filename = await nextFile(seriesKey);
          sourcePath = join(COVER_ROOT, seriesKey, filename);
          await writeFile(sourcePath, buf);
        } else if (!buf) {
          report.errors.push({ series: seriesKey, num: book.num, title: book.title, error: "no cover" });
        }
      } catch (err) {
        report.errors.push({ series: seriesKey, num: book.num, title: book.title, error: err.message });
      }
    }

    if (!sourcePath && !SKIP_COVERS && !DRY_RUN) {
      report.skipped.push({ series: seriesKey, num: book.num, title: book.title, reason: "no cover" });
      continue;
    }

    const filename = sourcePath ? sourcePath.split("/").pop() : `${book.num}.jpeg`;
    const entry = {
      id: `series-import/${seriesKey}/${filename}`,
      category: series.category,
      source_path: sourcePath || join(COVER_ROOT, seriesKey, filename),
      title: book.title,
      author: series.author,
      author_confidence: "high",
      dek,
      body: "",
      spice: series.spice,
      content_warnings: series.content_warnings || [],
      tags: [...series.tags, seriesKey.replace("-", "")],
      confidence: "high",
      date_read,
      date_read_source: "school-grade-series",
      school_grade: grade,
      series: seriesKey,
      series_number: book.num,
      slug,
      original_pub_year: book.year,
    };

    if (!DRY_RUN) manifest.entries.push(entry);
    existing.slugs.add(slug);
    existing.keys.add(key);
    report.imported.push({ slug, title: book.title, series: seriesKey, num: book.num, date_read, grade });
    console.log(`+ #${book.num} ${book.title.slice(0, 45)} | grade ${grade} | ${date_read}`);

    await new Promise((r) => setTimeout(r, 120));
  }
}

if (!DRY_RUN && report.imported.length) {
  manifest.entries.sort((a, b) => a.id.localeCompare(b.id));
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

const reportPath = join(DIR, "series-import-report.json");
await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n");
console.log(`\nImported ${report.imported.length}, skipped ${report.skipped.length}, cover errors ${report.errors.length}`);
console.log(`Report: ${reportPath}`);
