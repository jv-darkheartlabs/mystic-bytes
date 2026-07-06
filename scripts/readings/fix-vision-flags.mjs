#!/usr/bin/env node
/**
 * Resolve vision-verify low/mismatch flags: align reading frontmatter with
 * cover text, fetch/repoint wrong sources, update manifest, resync assets.
 *
 * Usage: node fix-vision-flags.mjs [--dry-run]
 */
import { readFile, writeFile, copyFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import {
  BOOK_ROOT,
  MANIFEST_PATH,
  READINGS_DIR,
  parseFrontmatter,
  buildManifestIndexes,
  resolveManifestEntry,
} from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes("--dry-run");

/** Reading frontmatter fields to set (title/author/dek). */
const METADATA = {
  "a-dark-fate": { title: "Dark Fae" },
  "a-heart-of-powder-and-plot": { title: "A House of Powder and Plot" },
  "a-heart-of-secrets-and-shadows": { author: "A.P. Beswick & Cara Clare" },
  "a-savage-fae": { title: "Savage Fae" },
  "a-war-of-fae-and-fate": { title: "Warrior Fae" },
  "bewitched": { title: "Bewitched Book One" },
  "breaking-hailey": { title: "Breaking Hailee", author: "I. A. Dice" },
  "dance-of-a-burning-sea": { author: "E.J. Mellow" },
  "dare-series-collection": { title: "Dare", dek: "Series Collection" },
  "deadly-throne": { title: "Symphony for a Deadly Throne" },
  "forever-rains": { title: "Song of the Forever Rains" },
  "four": { author: "Sara Cate & Rachel Leigh" },
  "fragile-allegiance": { title: "Fragile Longing" },
  "i-just-want-to-be-yours": { author: "Heather Garvin" },
  "john-dies-at-the-end": { title: "John Dies @ the End" },
  "just-dont-call-me-yours": { author: "Heather Garvin" },
  "kate": { title: "Kate", dek: "Madison Kate #4" },
  "never": { title: "Never Say Never" },
  "part-of-you": { title: "Pictures of You" },
  "peace-honey": { title: "Peaches & Honey" },
  "pine-poison": { title: "Pits & Poison" },
  "pray-for-us": { title: "Scream For Us" },
  "sins-of-the-past": { title: "Bound By The Past" },
  "take-me-apart": { author: "Brea Alepou & Skyler Snow" },
  "the-blood-we-crave-part-two": { title: "The Blood We Crave", dek: "Part Two" },
  "the-duke-and-i": { title: "The Duke & I" },
  "the-final-score": { author: "Maren Moore" },
  "the-lawless-god": { title: "Lawless God" },
  "the-newspaper-nanny": { author: "Maren Moore" },
  "the-once-and-future-king": { title: "The Once & Future King", author: "T. H. White" },
  "the-ritual-of-bone": { title: "The Primal of Blood and Bone" },
  "the-shades-of-magic": { title: "A Darker Shade of Magic" },
  "the-three-body-problem": { author: "Liu Cixin" },
  "the-vegas-rule": { title: "The Heartbreak Rule" },
  "villain": { title: "Villain Era" },
  "white-lines": { title: "Across State Lines" },
  "house-of-earth-and-blood": { title: "Crescent City: House of Earth and Blood", dek: "Book One" },
};

/** Copy existing file or download URL → category-relative path under BookCovers. */
const COVER_FIXES = {
  "dance-of-a-burning-sea": {
    copyFrom: "stalker-obsession/dance-of-a-burning-sea--e-j-mellow.jpeg",
    rel: "fantasy-romance/dance-of-a-burning-sea--e-j-mellow.jpeg",
  },
  "fragile-allegiance": {
    copyFrom: "fantasy-romance/fragile-longing--cora-reilly.jpeg",
    rel: "mafia-boss-and-innocent/fragile-longing--cora-reilly.jpeg",
  },
  "sins-of-the-past": {
    copyFrom: "fantasy-romance/bound-by-the-past--cora-reilly.jpeg",
    rel: "mafia-boss-and-innocent/bound-by-the-past--cora-reilly.jpeg",
  },
  "the-way-of-kings": {
    url: "https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg",
    rel: "fantasy-romance/the-way-of-kings--brandon-sanderson.jpeg",
  },
  "the-shadow-glass": {
    url: "https://covers.openlibrary.org/b/isbn/9781789098617-L.jpg",
    rel: "gothic-horror-romance/the-shadow-glass--josh-winning.jpeg",
  },
  "the-oath-we-give": {
    url: "https://dynamic.indigoimages.ca/v1/books/books/9798228554856/1.jpg?width=810&maxHeight=810&quality=85",
    rel: "forbidden-love/the-oath-we-give--monty-jay.jpeg",
  },
  "little-stranger": {
    url: "https://www.booktopia.com.au/covers/big/9781739433062/4807/little-stranger.jpg",
    rel: "stalker-obsession/little-stranger--leigh-rivers.jpeg",
  },
};

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function patchFrontmatter(text, updates) {
  let out = text;
  for (const [key, value] of Object.entries(updates)) {
    const quoted = new RegExp(`^${key}: \"[^\"]*\"`, "m");
    const plain = new RegExp(`^${key}: .+$`, "m");
    const line = `${key}: "${value}"`;
    if (quoted.test(out)) out = out.replace(quoted, line);
    else if (plain.test(out)) out = out.replace(plain, line);
    else {
      out = out.replace(/^---\n/, `---\n${line}\n`);
    }
  }
  return out;
}

async function downloadCover(url, destPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", Accept: "image/*" },
  });
  if (!res.ok) throw new Error(`fetch ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) throw new Error(`tiny response ${buf.length}b`);
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, buf);
  return buf.length;
}

const report = { metadata: [], covers: [], manifest: [], errors: [] };

for (const [slug, updates] of Object.entries(METADATA)) {
  const path = join(READINGS_DIR, `${slug}.md`);
  if (!(await exists(path))) {
    report.errors.push({ slug, reason: "missing_reading" });
    continue;
  }
  const text = await readFile(path, "utf8");
  const patched = patchFrontmatter(text, updates);
  if (patched !== text) {
    if (!DRY_RUN) await writeFile(path, patched);
    report.metadata.push({ slug, updates });
  }
}

for (const [slug, fix] of Object.entries(COVER_FIXES)) {
  const dest = join(BOOK_ROOT, fix.rel);
  try {
    if (fix.readingTitle) {
      const path = join(READINGS_DIR, `${slug}.md`);
      const extra = { title: fix.readingTitle };
      if (fix.readingDek) extra.dek = fix.readingDek;
      const text = await readFile(path, "utf8");
      const patched = patchFrontmatter(text, extra);
      if (!DRY_RUN) await writeFile(path, patched);
      report.metadata.push({ slug, updates: extra, note: "cover-driven title fix" });
    }
    if (fix.copyFrom) {
      const src = join(BOOK_ROOT, fix.copyFrom);
      if (!(await exists(src))) throw new Error(`missing copy source ${fix.copyFrom}`);
      if (!DRY_RUN) {
        await mkdir(dirname(dest), { recursive: true });
        await copyFile(src, dest);
      }
      report.covers.push({ slug, action: "copy", from: fix.copyFrom, to: fix.rel });
    } else if (fix.url) {
      if (!DRY_RUN) await downloadCover(fix.url, dest);
      report.covers.push({ slug, action: "download", url: fix.url, to: fix.rel });
    }
  } catch (err) {
    report.errors.push({ slug, reason: err.message });
  }
}

if (!DRY_RUN) {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  const indexes = buildManifestIndexes(manifest.entries);

  for (const slug of [...Object.keys(METADATA), ...Object.keys(COVER_FIXES)]) {
    const path = join(READINGS_DIR, `${slug}.md`);
    if (!(await exists(path))) continue;
    const meta = parseFrontmatter(await readFile(path, "utf8"));
    const { entry } = resolveManifestEntry(meta, slug, indexes);
    if (!entry) continue;

    const updates = {};
    if (meta.title && meta.title !== entry.title) updates.title = meta.title;
    if (meta.author && meta.author !== entry.author) updates.author = meta.author;
    if (meta.category && meta.category !== entry.category) updates.category = meta.category;

    const fix = COVER_FIXES[slug];
    if (fix?.rel) {
      const dest = join(BOOK_ROOT, fix.rel);
      if (await exists(dest)) updates.source_path = dest;
    }

    if (Object.keys(updates).length) {
      Object.assign(entry, updates);
      report.manifest.push({ slug, updates });
    }
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  execFileSync("node", [join(DIR, "fix-category-folders.mjs")], { stdio: "inherit" });
  execFileSync("node", [join(DIR, "sync-reading-covers.mjs"), "--force", "--slug", [...Object.keys(METADATA), ...Object.keys(COVER_FIXES)].join(",")], {
    stdio: "inherit",
  });
}

await writeFile(join(DIR, "fix-vision-flags-report.json"), JSON.stringify(report, null, 2));
console.log(`Metadata: ${report.metadata.length} | Covers: ${report.covers.length} | Manifest: ${report.manifest.length} | Errors: ${report.errors.length}`);
if (report.errors.length) {
  for (const e of report.errors) console.log("  ERROR", e.slug, e.reason);
  process.exitCode = 1;
}
