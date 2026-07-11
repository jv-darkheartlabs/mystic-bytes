#!/usr/bin/env node
/**
 * Export all shelf readings to Goodreads-compatible CSV (sample_export format).
 *
 * Usage:
 *   node export-goodreads-csv.mjs [output.csv] [--goodreads /path/to/goodreads_library_export.csv]
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontmatter, norm } from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const READINGS_DIR = join(DIR, "../../_readings");
const MANIFEST_PATH = join(DIR, "manifest.json");
const DEFAULT_GOODREADS = join(process.env.HOME, "Downloads/goodreads_library_export.csv");
const DEFAULT_OUT = join(process.env.HOME, "Downloads/mystic-bytes_library_export.csv");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const OUT_PATH = process.argv.find((a) => a.endsWith(".csv") && !a.includes("goodreads_library")) || DEFAULT_OUT;
const GOODREADS_PATH = argValue("--goodreads") || DEFAULT_GOODREADS;

const HEADER =
  "Title, Author, ISBN, My Rating, Average Rating, Publisher, Binding, Year Published, Original Publication Year, Date Read, Date Added,Shelves, Bookshelves, My Review";

function coreTitle(title) {
  let n = norm(title);
  for (const stop of [
    " book ",
    " the nice ",
    " a savage ",
    " tales of ",
    " confessions of ",
    " saga of ",
    " essential wisdom ",
    " and its all small stuff ",
  ]) {
    if (n.includes(stop)) n = n.split(stop)[0].trim();
  }
  return n;
}

function matchKey(title, author) {
  return `${coreTitle(title)}::${norm(author || "")}`;
}

function parseCsv(text) {
  const rows = [];
  let i = 0;
  const len = text.length;

  function readField() {
    let field = "";
    if (text[i] === '"') {
      i++;
      while (i < len) {
        if (text[i] === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i += 2;
          } else {
            i++;
            break;
          }
        } else {
          field += text[i++];
        }
      }
      if (text[i] === ",") i++;
      return field;
    }
    while (i < len && text[i] !== "," && text[i] !== "\n" && text[i] !== "\r") {
      field += text[i++];
    }
    if (text[i] === ",") i++;
    return field;
  }

  const headers = [];
  while (i < len && text[i] !== "\n" && text[i] !== "\r") headers.push(readField());
  if (text[i] === "\r") i++;
  if (text[i] === "\n") i++;

  while (i < len) {
    const row = {};
    for (let h = 0; h < headers.length; h++) row[headers[h]] = readField();
    if (Object.values(row).some((v) => v)) rows.push(row);
    if (text[i] === "\r") i++;
    if (text[i] === "\n") i++;
  }
  return rows;
}

function csvEscape(value) {
  const s = sanitizeUtf8(value == null ? "" : value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** Strict clean UTF-8 text for importers (Goodreads, Excel, Ruby). */
function sanitizeUtf8(value) {
  let s = String(value ?? "");
  s = s.replace(/\uFEFF/g, "");
  s = s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
  s = s.normalize("NFC");
  s = s
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[\u200B-\u200D\u2060]/g, "")
    .replace(/\u2022/g, "-");
  return Buffer.from(s, "utf8").toString("utf8");
}

function pickFront(front, key) {
  const q = front.match(new RegExp(`^${key}: \"(.+)\"`, "m"));
  if (q) return q[1];
  const plain = front.match(new RegExp(`^${key}: (.+)`, "m"));
  return plain ? plain[1].replace(/^"|"$/g, "").trim() : "";
}

function parseTags(front) {
  const block = front.match(/^tags:\n((?:  - .+\n)+)/m);
  if (!block) return [];
  return [...block[1].matchAll(/^  - "?(.+?)"?\s*$/gm)].map((m) => m[1]);
}

function markdownToPlain(body) {
  return sanitizeUtf8(
    body
      .replace(/^#+\s+/gm, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/^[-*]\s+/gm, "- ")
      .replace(/\n#(?:TheOrchidRoom|BookReport|Grade\d+|LiteraryAnalysis)[^\n]*/gi, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

function cleanIsbn(raw) {
  if (!raw) return "";
  let s = String(raw).trim();
  // Goodreads Excel export: ="9780123456789" or =""""
  if (s.startsWith('="') && s.endsWith('"')) s = s.slice(2, -1);
  if (s === '=""' || s === "") return "";
  const digits = s.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 13 ? digits : s;
}

function normalizeDate(raw) {
  if (!raw) return "";
  const s = String(raw).trim();
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const slash = s.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})/);
  if (slash) {
    return `${slash[1]}-${slash[2].padStart(2, "0")}-${slash[3].padStart(2, "0")}`;
  }
  return s;
}

function formatDateAdded(raw) {
  const d = normalizeDate(raw);
  return d ? ` ${d}` : "";
}

/** Sample export uses a leading space on several text columns. */
function prefixedField(value) {
  const s = sanitizeUtf8(value);
  return s ? ` ${s}` : "";
}

async function loadGoodreadsIndex() {
  let text;
  try {
    text = await readFile(GOODREADS_PATH, "utf8");
  } catch {
    console.warn(`Goodreads CSV not found at ${GOODREADS_PATH}; metadata columns will be sparse.`);
    return { byId: new Map(), byKey: new Map() };
  }

  const rows = parseCsv(text);
  const byId = new Map();
  const byKey = new Map();
  for (const row of rows) {
    if (row["Book Id"]) byId.set(String(row["Book Id"]), row);
    const key = matchKey(row.Title, row.Author);
    if (!byKey.has(key)) byKey.set(key, row);
  }
  return { byId, byKey, count: rows.length };
}

async function loadManifestIndex() {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  const byKey = new Map();
  const byTitle = new Map();
  for (const e of manifest.entries) {
    const key = matchKey(e.title, e.author);
    if (!byKey.has(key)) byKey.set(key, e);
    const tk = coreTitle(e.title);
    if (!byTitle.has(tk)) byTitle.set(tk, e);
  }
  return { byKey, byTitle, count: manifest.entries.length };
}

async function loadReadings() {
  const files = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));
  const readings = [];
  for (const f of files) {
    const slug = f.replace(/\.md$/, "");
    const text = await readFile(join(READINGS_DIR, f), "utf8");
    const fm = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const front = fm?.[1] || "";
    const body = fm?.[2]?.trim() || "";
    const meta = parseFrontmatter(text);
    readings.push({
      slug,
      title: meta.title || "",
      author: meta.author || "",
      category: pickFront(front, "category"),
      date_read: pickFront(front, "date_read"),
      date_added: pickFront(front, "date"),
      sort_key: Number(pickFront(front, "sort_key") || 99999),
      tags: parseTags(front),
      review: markdownToPlain(body),
    });
  }
  readings.sort((a, b) => a.sort_key - b.sort_key || a.title.localeCompare(b.title));
  return readings;
}

function buildRow(reading, manifestEntry, grRow) {
  const isbn = cleanIsbn(grRow?.ISBN13 || grRow?.ISBN || "");
  const grRating = parseFloat(grRow?.["My Rating"] || 0);
  const myRating =
    manifestEntry?.goodreads_rating ||
    (grRating > 0 ? grRating : 5);
  const avgRating = grRow?.["Average Rating"] || grRow?.["Average Rating"] || "";
  const publisher = grRow?.Publisher || "";
  const binding = grRow?.Binding || "";
  const yearPublished = grRow?.["Year Published"] || manifestEntry?.year_published || "";
  const originalPub =
    grRow?.["Original Publication Year"] ||
    manifestEntry?.original_pub_year ||
    yearPublished ||
    "";

  const dateRead = normalizeDate(reading.date_read || grRow?.["Date Read"] || "");
  const dateAdded = normalizeDate(grRow?.["Date Added"] || reading.date_added || "");

  const shelfTags = reading.tags.filter(
    (t) => !["literaryanalysis", "darkheartlabs", "goodreads-import"].includes(t)
  );
  const bookshelves = [
    reading.category?.replace(/-/g, " "),
    ...shelfTags.slice(0, 4),
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return [
    sanitizeUtf8(reading.title),
    prefixedField(reading.author),
    isbn,
    myRating,
    avgRating,
    prefixedField(publisher),
    prefixedField(binding),
    yearPublished,
    originalPub,
    dateRead || " ",
    formatDateAdded(dateAdded),
    "read",
    prefixedField(bookshelves),
    reading.review,
  ];
}

async function main() {
  const [readings, manifestIdx, grIdx] = await Promise.all([
    loadReadings(),
    loadManifestIndex(),
    loadGoodreadsIndex(),
  ]);

  const lines = [HEADER];
  let grMatched = 0;
  let manifestMatched = 0;

  for (const reading of readings) {
    const key = matchKey(reading.title, reading.author);
    const manifestEntry = manifestIdx.byKey.get(key) || manifestIdx.byTitle.get(coreTitle(reading.title));
    if (manifestEntry) manifestMatched++;

    let grRow = null;
    if (manifestEntry?.goodreads_book_id) {
      grRow = grIdx.byId.get(String(manifestEntry.goodreads_book_id)) || null;
    }
    if (!grRow) grRow = grIdx.byKey.get(key) || null;
    if (grRow) grMatched++;

    lines.push(buildRow(reading, manifestEntry, grRow).map(csvEscape).join(","));
  }

  await writeFile(OUT_PATH, lines.join("\n") + "\n", { encoding: "utf8" });

  console.log(`Exported ${readings.length} readings → ${OUT_PATH}`);
  console.log(`Manifest matches: ${manifestMatched}/${readings.length}`);
  console.log(`Goodreads metadata matches: ${grMatched}/${readings.length}`);
  if (grIdx.count) console.log(`Goodreads source rows: ${grIdx.count}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
