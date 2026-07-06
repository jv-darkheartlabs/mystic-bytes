#!/usr/bin/env node
/**
 * Resolve remaining unmatched reading covers (stragglers).
 *
 * Strategies (in order):
 *  1. sort_key archive PNG
 *  2. Dek words in filename (duplicate titles)
 *  3. Slug/author fuzzy filename match (any category)
 *  4. Title token overlap in filename
 *
 * Usage: node fix-straggler-covers.mjs [--dry-run]
 */
import { readFile, writeFile, readdir, access } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import {
  MANIFEST_PATH,
  READINGS_DIR,
  BOOK_ROOT,
  ARCHIVE_ROOT,
  IMAGE_EXT,
  parseFrontmatter,
  buildManifestIndexes,
  resolveManifestEntry,
  slugify,
  norm,
  fuzzyRatio,
} from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const STRAGGLER_REPORT = join(DIR, "apply-vision-rename-report.json");
const OUT_REPORT = join(DIR, "fix-stragglers-report.json");

const DRY_RUN = process.argv.includes("--dry-run");

/** Hand-curated when automation cannot disambiguate. */
const MANUAL = {
  "altair-university": "bully-romance/altair-university-the-ruthless-rivalry--amber-vant.jpeg",
  "altair-university-2": "bully-romance/altair-university-the-bleak-beginning--amber-vant.jpeg",
  "a-savage-fae": "bully-romance/savage-fae--caroline-peckham-susanne-valenti.jpeg",
  "losers-2": "reverse-harem/losers-part-2--harley-laroux.jpeg",
  "filthy-rich-vampires-for-eternity": "vampire-paranormal/filthy-rich-vampires-2.jpeg",
  "deadly-throne": "stalker-obsession/symphony-for-a-deadly-throne--e-j-mellow.jpeg",
  "forever-rains": "stalker-obsession/song-of-the-forever-rains--e-j-mellow.jpeg",
  "song-of-the-forever-rain": "stalker-obsession/song-of-the-forever-rains--e-j-mellow.jpeg",
  "symphony-for-a-deadly-thrill": "stalker-obsession/symphony-for-a-deadly-throne--e-j-mellow.jpeg",
  "house-of-earth-and-blood": "bully-romance/crescent-city-house-of-earth-and-blood--sarah-j-maas.jpeg",
  "the-newspaper-nanny": "fantasy-romance/the-newspaper-nanny--maren-moore.jpeg",
  "runaway-groomsmen": "enemies-to-lovers/runaway-groomsman--meghan-quinn.jpeg",
  "four": "fantasy-romance/four--sara-cate-rachel-leigh.jpeg",
  "five": "fantasy-romance/five--sara-cate-rachel-leigh.jpeg",
  "fairydale-2": "vampire-paranormal/fairydale--veronica-lancet.jpeg",
  "dear-reader-2": "stalker-obsession/dear-reader--tate-james.jpeg",
  "watch-your-back-2": "stalker-obsession/watch-your-back--tate-james.jpeg",
  "youre-next-2": "stalker-obsession/youre-next--tate-james.jpeg",
  "dare-series-collection": "bully-romance/dare--shantel-tessier.jpeg",
};

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function archivePath(sortKey) {
  const n = parseInt(sortKey, 10);
  if (Number.isNaN(n)) return null;
  return join(ARCHIVE_ROOT, `${n}.png`);
}

function fileSlug(name) {
  const base = name.replace(IMAGE_EXT, "");
  const idx = base.indexOf("--");
  return idx === -1 ? base : base.slice(0, idx);
}

function dekTokens(dek) {
  if (!dek) return [];
  return norm(dek).split(" ").filter((w) => w.length > 2);
}

async function indexAllCovers() {
  const files = [];
  async function walk(dir, category) {
    const items = await readdir(dir, { withFileTypes: true });
    for (const item of items) {
      const p = join(dir, item.name);
      if (item.isDirectory()) {
        if (item.name.startsWith("_")) continue;
        await walk(p, item.name);
      } else if (IMAGE_EXT.test(item.name)) {
        files.push({
          path: p,
          category,
          name: item.name,
          file_slug: fileSlug(item.name),
          norm_name: norm(item.name.replace(IMAGE_EXT, "")),
        });
      }
    }
  }
  await walk(BOOK_ROOT, "");
  return files;
}

function scoreFileCandidate(reading, file) {
  const { slug, meta } = reading;
  let score = 0;

  if (file.file_slug === slug) score += 1.0;
  else if (file.file_slug === slug.replace(/-\d+$/, "")) score += 0.95;
  else score += fuzzyRatio(slug, file.file_slug) * 0.85;

  const titleSlug = slugify(meta.title);
  if (file.file_slug === titleSlug) score = Math.max(score, 0.98);
  score = Math.max(score, fuzzyRatio(titleSlug, file.file_slug) * 0.9);

  const authorSlug = slugify(meta.author || "");
  if (authorSlug && file.norm_name.includes(authorSlug.replace(/-/g, " "))) score += 0.15;
  if (authorSlug && file.name.includes(authorSlug)) score += 0.2;

  if (meta.category && file.category === meta.category) score += 0.05;

  const dekWords = dekTokens(meta.dek);
  if (dekWords.length) {
    const matched = dekWords.filter((w) => file.norm_name.includes(w)).length;
    score += (matched / dekWords.length) * 0.35;
  }

  const titleWords = norm(meta.title).split(" ").filter((w) => w.length > 2);
  const matchedTitle = titleWords.filter((w) => file.norm_name.includes(w)).length;
  if (titleWords.length) score += (matchedTitle / titleWords.length) * 0.25;

  return Math.min(1.5, score);
}

const stragglerData = JSON.parse(await readFile(STRAGGLER_REPORT, "utf8"));
const slugs = stragglerData.no_match.map((m) => m.slug);

const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const indexes = buildManifestIndexes(manifest.entries);
const allFiles = await indexAllCovers();

const readings = [];
for (const slug of slugs) {
  const text = await readFile(join(READINGS_DIR, `${slug}.md`), "utf8");
  const meta = parseFrontmatter(text);
  const resolved = resolveManifestEntry(meta, slug, indexes);
  readings.push({ slug, meta, entry: resolved.entry });
}

const report = { fixed: [], still_missing: [] };

for (const reading of readings) {
  const { slug, meta, entry } = reading;
  if (!entry) {
    report.still_missing.push({ slug, reason: "no_manifest_entry" });
    continue;
  }

  let source = null;
  let method = null;

  if (MANUAL[slug]) {
    const p = join(BOOK_ROOT, MANUAL[slug]);
    if (await exists(p)) {
      source = p;
      method = "manual";
    }
  }

  if (!source && meta.sort_key) {
    const ap = archivePath(meta.sort_key);
    if (ap && (await exists(ap))) {
      source = ap;
      method = "archive_sort_key";
    }
  }

  if (!source) {
    let best = null;
    let bestScore = 0;
    for (const file of allFiles) {
      const s = scoreFileCandidate(reading, file);
      if (s > bestScore) {
        bestScore = s;
        best = file;
      }
    }
    if (best && bestScore >= 0.72) {
      source = best.path;
      method = `fuzzy_filename:${bestScore.toFixed(2)}`;
    }
  }

  if (!source) {
    report.still_missing.push({
      slug,
      title: meta.title,
      author: meta.author,
      category: meta.category,
      sort_key: meta.sort_key,
    });
    continue;
  }

  report.fixed.push({
    slug,
    title: meta.title,
    method,
    source,
    prev_source: entry.source_path,
  });

  if (!DRY_RUN) {
    entry.source_path = source;
  }
}

if (!DRY_RUN) {
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}
await writeFile(OUT_REPORT, JSON.stringify(report, null, 2));

console.log(`Fix stragglers ${DRY_RUN ? "(DRY RUN)" : ""}`);
console.log(`  Fixed:          ${report.fixed.length}`);
console.log(`  Still missing:  ${report.still_missing.length}`);
console.log(`  Report: ${OUT_REPORT}`);

if (report.still_missing.length) {
  console.log("\nStill missing:");
  for (const m of report.still_missing) {
    console.log(`  ${m.slug}: ${m.title}`);
  }
}

process.exitCode = report.still_missing.length ? 1 : 0;
