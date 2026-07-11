#!/usr/bin/env node
/**
 * Import rated Goodreads reads into manifest.json (pilot batches).
 *
 * Usage:
 *   node import-goodreads-batch.mjs /path/to/goodreads_library_export.csv [options]
 *
 * Options:
 *   --limit N          Max new entries (default 25)
 *   --min-rating N     Minimum star rating (default 4)
 *   --dry-run          Preview without writes
 *   --skip-metadata    Skip OpenAI category/spice step (uses fantasy-romance / 3)
 *   --skip-covers      Skip Open Library cover fetch
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { requireOpenAIConfig } from "./openai-env.mjs";
import { resolveDateRead, BIRTH_YEAR } from "./goodreads-date-read.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const MANIFEST_PATH = join(DIR, "manifest.json");
const READINGS_DIR = join(ROOT, "_readings");
const CATEGORIES_PATH = join(ROOT, "_data/reading_categories.yml");
const COVER_ROOT = join(homedir(), "Pictures/bookish/BookCovers/goodreads-import");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const CSV_PATH = process.argv.find((a) => a.endsWith(".csv"));
const LIMIT = argValue("--limit") ? parseInt(argValue("--limit"), 10) : 25;
const MIN_RATING = argValue("--min-rating") ? parseFloat(argValue("--min-rating")) : 4;
const DRY_RUN = process.argv.includes("--dry-run");
const SKIP_METADATA = process.argv.includes("--skip-metadata");
const SKIP_COVERS = process.argv.includes("--skip-covers");

if (!CSV_PATH) {
  console.error("Usage: node import-goodreads-batch.mjs <goodreads.csv> [--limit N]");
  process.exit(1);
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

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

function cleanIsbn(raw) {
  if (!raw) return null;
  const digits = String(raw).replace(/\D/g, "");
  return digits.length === 10 || digits.length === 13 ? digits : null;
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
    for (let h = 0; h < headers.length; h++) {
      row[headers[h]] = readField();
    }
    if (Object.values(row).some((v) => v)) rows.push(row);
    if (text[i] === "\r") i++;
    if (text[i] === "\n") i++;
  }
  return rows;
}

async function loadExistingKeys() {
  const titles = new Set();
  const keys = new Set();
  const slugs = new Set();

  const { readdir } = await import("node:fs/promises");
  for (const f of await readdir(READINGS_DIR)) {
    if (!f.endsWith(".md")) continue;
    slugs.add(f.replace(/\.md$/, ""));
    const text = await readFile(join(READINGS_DIR, f), "utf8");
    const tm = text.match(/^title:\s*"?(.+?)"?\s*$/m);
    const am = text.match(/^author:\s*"?(.+?)"?\s*$/m);
    if (tm) {
      titles.add(coreTitle(tm[1]));
      keys.add(`${coreTitle(tm[1])}::${norm(am?.[1] || "")}`);
    }
  }

  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  for (const e of manifest.entries) {
    titles.add(coreTitle(e.title));
    keys.add(`${coreTitle(e.title)}::${norm(e.author || "")}`);
    slugs.add(slugify(e.title));
  }

  return { titles, keys, slugs };
}

function isDuplicate(row, existing) {
  const core = coreTitle(row.Title);
  const key = `${core}::${norm(row.Author)}`;
  const slug = slugify(row.Title);
  return existing.titles.has(core) || existing.keys.has(key) || existing.slugs.has(slug);
}

function sortByDateRead(a, b) {
  const da = a["Date Read"] || "";
  const db = b["Date Read"] || "";
  return db.localeCompare(da);
}

async function downloadCover(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "mystic-bytes-readings-import/1.0" },
  });
  if (!res.ok) return null;
  const contentType = res.headers.get("content-type") || "";
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1500) return null;
  if (contentType.includes("gif") || buf.slice(0, 3).toString() === "GIF") return null;
  return buf;
}

async function fetchGoodreadsCover(bookId) {
  const pageUrl = `https://www.goodreads.com/book/show/${bookId}`;
  const res = await fetch(pageUrl, {
    headers: { "User-Agent": "mystic-bytes-readings-import/1.0" },
    redirect: "follow",
  });
  if (!res.ok) return null;
  const html = await res.text();
  const m = html.match(
    /https:\/\/[^\s"']+compressed\.photo\.goodreads\.com\/books\/[^\s"']+\.jpg/i
  );
  if (!m) return null;
  return downloadCover(m[0]);
}

async function fetchOpenLibraryCover({ isbn13, isbn10, title, author }) {
  if (isbn13) {
    const buf = await downloadCover(`https://covers.openlibrary.org/b/isbn/${isbn13}-L.jpg`);
    if (buf) return buf;
  }
  if (isbn10) {
    const buf = await downloadCover(`https://covers.openlibrary.org/b/isbn/${isbn10}-L.jpg`);
    if (buf) return buf;
  }

  const searchUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=1`;
  const searchRes = await fetch(searchUrl);
  if (searchRes.ok) {
    const data = await searchRes.json();
    const coverId = data.docs?.[0]?.cover_i;
    if (coverId) {
      const buf = await downloadCover(`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`);
      if (buf) return buf;
    }
  }

  return null;
}

async function fetchBookCover({ isbn13, isbn10, title, author, bookId }) {
  let buf = await fetchOpenLibraryCover({ isbn13, isbn10, title, author });
  if (buf) return buf;
  if (bookId) {
    buf = await fetchGoodreadsCover(bookId);
    if (buf) return buf;
  }
  return null;
}

async function saveCover(buf, category, filename) {
  const dir = join(COVER_ROOT, category);
  await mkdir(dir, { recursive: true });
  const dest = join(dir, filename);
  await writeFile(dest, buf);
  return dest;
}

async function fetchMetadata(book, categories, catTags) {
  if (SKIP_METADATA) {
    return {
      category: "fantasy-romance",
      spice: 3,
      content_warnings: [],
      tags: [...(catTags["fantasy-romance"] || []), "goodreads-import"],
      dek: "",
      author_confidence: "high",
    };
  }

  const { chatCompletionsUrl, apiKey } = requireOpenAIConfig();
  const categoryList = categories.join(", ");

  const res = await fetch(chatCompletionsUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You classify books for a dark romance / gothic literary analysis shelf ("The Orchid Room").
Return JSON: category (one of: ${categoryList}), spice (1-5 integer), content_warnings (string[]), tags (string[]), dek (optional series/subtitle string), author_confidence ("high"|"low").
Pick the best-fit category even for literary fiction or nonfiction; use dark-thriller for crime, gothic-horror-romance for gothic, enemies-to-lovers when applicable.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            title: book.title,
            author: book.author,
            rating: book.rating,
            original_pub_year: book.original_pub_year,
          }),
        },
      ],
      max_tokens: 500,
      temperature: 0.3,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI metadata ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const parsed = JSON.parse(data.choices[0].message.content);
  const category = categories.includes(parsed.category) ? parsed.category : "fantasy-romance";
  const tags = [
    ...new Set([...(catTags[category] || []), ...(parsed.tags || []), "goodreads-import", "literaryanalysis"]),
  ];
  return {
    category,
    spice: Math.min(5, Math.max(1, parseInt(parsed.spice, 10) || 3)),
    content_warnings: parsed.content_warnings || [],
    tags,
    dek: parsed.dek || "",
    author_confidence: parsed.author_confidence === "high" ? "high" : "low",
  };
}

const catYaml = await readFile(CATEGORIES_PATH, "utf8");
const catSection = catYaml.split(/^categories:/m)[1] || catYaml;
const categories = [...catSection.matchAll(/^\s{2}([\w-]+):/gm)].map((m) => m[1]);
const catTags = {};
for (const m of catSection.matchAll(
  /^\s{2}([\w-]+):\n(?:.*\n)*?\s+tags:\s*\[(.*?)\]/gm
)) {
  catTags[m[1]] = m[2].split(",").map((t) => t.trim());
}

const csvText = await readFile(CSV_PATH, "utf8");
const rows = parseCsv(csvText);
const existing = await loadExistingKeys();

const candidates = rows
  .filter((r) => r["Exclusive Shelf"] === "read")
  .filter((r) => parseFloat(r["My Rating"] || 0) >= MIN_RATING)
  .filter((r) => !isDuplicate(r, existing))
  .sort(sortByDateRead);

console.log(
  `Goodreads import: ${candidates.length} eligible (≥${MIN_RATING}★, read, not on site). Birth year ${BIRTH_YEAR}. Limit ${LIMIT}.`
);

const batch = candidates;
const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const report = {
  generated_at: new Date().toISOString(),
  csv: CSV_PATH,
  limit: LIMIT,
  dry_run: DRY_RUN,
  imported: [],
  skipped: [],
  errors: [],
};

let fileCounter = 1;
async function nextCoverFilename() {
  const { readdir } = await import("node:fs/promises");
  await mkdir(COVER_ROOT, { recursive: true });
  const files = await readdir(COVER_ROOT);
  const nums = files.map((f) => parseInt(f.replace(/\D/g, ""), 10)).filter((n) => !Number.isNaN(n));
  const n = nums.length ? Math.max(...nums, fileCounter) + 1 : fileCounter;
  fileCounter = n + 1;
  return `${n}.jpeg`;
}

for (const row of batch) {
  if (report.imported.length >= LIMIT) break;

  const title = row.Title.trim();
  const author = row.Author.trim();
  const slug = slugify(title);
  const isbn13 = cleanIsbn(row.ISBN13);
  const isbn10 = cleanIsbn(row.ISBN);
  const originalPub = row["Original Publication Year"] || row["Year Published"];

  const dateInfo = resolveDateRead({
    title,
    author,
    original_pub_year: originalPub,
    year_published: row["Year Published"],
    goodreads_date_read: row["Date Read"],
  });

  let meta;
  try {
    meta = await fetchMetadata(
      { title, author, rating: row["My Rating"], original_pub_year: originalPub },
      categories,
      catTags
    );
  } catch (err) {
    report.errors.push({ title, error: `metadata: ${err.message}` });
    continue;
  }

  const filename = DRY_RUN ? `${slug}.jpeg` : await nextCoverFilename();
  let sourcePath = DRY_RUN ? join(COVER_ROOT, meta.category, filename) : null;

  if (!SKIP_COVERS) {
    try {
      const buf = await fetchBookCover({
        isbn13,
        isbn10,
        title,
        author,
        bookId: row["Book Id"],
      });
      if (buf && !DRY_RUN) {
        sourcePath = await saveCover(buf, meta.category, filename);
      } else if (!buf) {
        report.errors.push({ title, error: "cover not found" });
      }
    } catch (err) {
      report.errors.push({ title, error: `cover fetch: ${err.message}` });
    }
  }

  if (!sourcePath && !SKIP_COVERS && !DRY_RUN) {
    report.skipped.push({ title, reason: "no cover" });
    continue;
  }

  const entry = {
    id: `goodreads-import/${filename}`,
    category: meta.category,
    source_path: sourcePath,
    title,
    author,
    author_confidence: meta.author_confidence,
    dek: meta.dek,
    body: "",
    spice: meta.spice,
    content_warnings: meta.content_warnings,
    tags: meta.tags,
    confidence: "high",
    date_read: dateInfo.date_read,
    date_read_source: dateInfo.source,
    ...(dateInfo.grade != null ? { school_grade: dateInfo.grade } : {}),
    goodreads_book_id: row["Book Id"],
    goodreads_rating: parseFloat(row["My Rating"] || 0),
  };

  if (!DRY_RUN) manifest.entries.push(entry);
  existing.titles.add(coreTitle(title));
  existing.keys.add(`${coreTitle(title)}::${norm(author)}`);
  existing.slugs.add(slug);

  report.imported.push({
    title,
    author,
    slug,
    category: meta.category,
    spice: meta.spice,
    date_read: dateInfo.date_read,
    date_read_source: dateInfo.source,
    school_grade: dateInfo.grade,
    cover: sourcePath,
  });

  console.log(
    `+ ${title.slice(0, 50)} | ${meta.category} | read ${dateInfo.date_read} (${dateInfo.source})`
  );
}

if (!DRY_RUN && report.imported.length) {
  manifest.entries.sort((a, b) => a.id.localeCompare(b.id));
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

const reportPath = join(DIR, "goodreads-import-report.json");
await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n");
console.log(`\nImported ${report.imported.length} → manifest (${DRY_RUN ? "dry-run" : "written"})`);
console.log(`Report: ${reportPath}`);
