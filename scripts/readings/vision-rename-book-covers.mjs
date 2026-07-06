#!/usr/bin/env node
/**
 * Vision-read BookCovers source images and rename to detected title slug.
 * Does NOT touch reading log — produces rename map for later reconciliation.
 *
 * Usage:
 *   node vision-rename-book-covers.mjs [--dry-run] [--resume] [--parallel 6]
 *   node vision-rename-book-covers.mjs --limit 50
 *   node vision-rename-book-covers.mjs --category age-gap
 *   node vision-rename-book-covers.mjs --include-archive
 */
import { readFile, writeFile, rename, readdir, access } from "node:fs/promises";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { requireOpenAIConfig } from "./openai-env.mjs";
import { BOOK_ROOT, slugify, loadCategories, IMAGE_EXT } from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const REPORT_PATH = join(DIR, "vision-rename-report.json");
const LOG_PATH = join(DIR, "vision-rename-run.log");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const DRY_RUN = process.argv.includes("--dry-run");
const RESUME = process.argv.includes("--resume");
const INCLUDE_ARCHIVE = process.argv.includes("--include-archive");
const LIMIT = argValue("--limit") ? parseInt(argValue("--limit"), 10) : null;
const PARALLEL = Math.max(1, parseInt(argValue("--parallel") || "6", 10));
const CATEGORY_FILTER = argValue("--category");

const SKIP_DIRS = new Set(["_archive", "_unorganized", "passion", "power", "gothic", "bond", "edge"]);

const SYSTEM = `You read book cover images. Return ONLY valid JSON:
{
  "detected_title": "main title on cover (largest prominent book title text)",
  "detected_author": "author name if legible, else empty string",
  "cover_readable": true|false,
  "notes": "brief note if partial"
}
Rules:
- Read the MAIN book title visible on the front cover
- Ignore publisher logos and tiny legal text
- For series, include distinguishing subtitle if needed to tell books apart
- If blank/unreadable/back cover only: cover_readable false, detected_title empty`;

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function safeFilename(title, author, ext, usedInDir) {
  let base = slugify(title);
  if (!base) base = "unknown-cover";
  if (author) {
    const withAuthor = `${base}--${slugify(author)}`;
    if (!usedInDir.has(withAuthor)) {
      usedInDir.add(withAuthor);
      return `${withAuthor}${ext}`;
    }
  }
  let candidate = base;
  let n = 2;
  while (usedInDir.has(candidate)) {
    candidate = `${base}-${n}`;
    n++;
  }
  usedInDir.add(candidate);
  return `${candidate}${ext}`;
}

async function visionRead(imagePath, cfg, model = "gpt-4o-mini") {
  const { apiKey, chatCompletionsUrl } = cfg;
  const buf = await readFile(imagePath);
  const b64 = buf.toString("base64");
  const ext = imagePath.toLowerCase().endsWith(".png") ? "png" : "jpeg";
  const res = await fetch(chatCompletionsUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: [
            { type: "text", text: `Read the book title and author from this cover image. Path hint: ${basename(imagePath)}` },
            { type: "image_url", image_url: { url: `data:image/${ext};base64,${b64}`, detail: "low" } },
          ],
        },
      ],
      max_tokens: 250,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 3000));
      return visionRead(imagePath, cfg, model);
    }
    throw new Error(`${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

async function collectImages(categories) {
  const images = [];
  const roots = [BOOK_ROOT];
  if (INCLUDE_ARCHIVE) {
    roots.push(join(BOOK_ROOT, "_archive", "root-2026-07-05"));
    roots.push(join(BOOK_ROOT, "_unorganized"));
  }

  for (const root of roots) {
    if (!(await exists(root))) continue;
    const entries = await readdir(root, { withFileTypes: true });

    if (root === BOOK_ROOT) {
      for (const cat of categories) {
        if (CATEGORY_FILTER && cat !== CATEGORY_FILTER) continue;
        const catDir = join(BOOK_ROOT, cat);
        if (!(await exists(catDir))) continue;
        const files = await readdir(catDir);
        for (const f of files) {
          if (IMAGE_EXT.test(f)) {
            images.push({ path: join(catDir, f), category: cat, original_name: f });
          }
        }
      }
      continue;
    }

    async function walk(dir, category = "_archive") {
      const items = await readdir(dir, { withFileTypes: true });
      for (const item of items) {
        const p = join(dir, item.name);
        if (item.isDirectory()) await walk(p, category);
        else if (IMAGE_EXT.test(item.name)) {
          images.push({ path: p, category, original_name: item.name });
        }
      }
    }
    await walk(root);
  }

  return images.sort((a, b) => a.path.localeCompare(b.path));
}

let prior = { results: [], stats: {} };
if (RESUME && (await exists(REPORT_PATH))) {
  prior = JSON.parse(await readFile(REPORT_PATH, "utf8"));
}

const donePaths = new Set((prior.results || []).map((r) => r.original_path));

if (DRY_RUN) {
  const { categories } = await loadCategories();
  const images = await collectImages(categories);
  const pending = images.filter((i) => !donePaths.has(i.path));
  const slice = LIMIT ? pending.slice(0, LIMIT) : pending;
  console.log(`Dry run: ${slice.length} images (${images.length} total, ${donePaths.size} done)`);
  for (const img of slice.slice(0, 15)) {
    console.log(`  [${img.category}] ${img.original_name}`);
  }
  process.exit(0);
}

let cfg;
try {
  cfg = requireOpenAIConfig();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const { categories } = await loadCategories();
let images = await collectImages(categories);
images = images.filter((i) => !donePaths.has(i.path));
if (LIMIT) images = images.slice(0, LIMIT);

console.log(`Vision rename: ${images.length} images (parallel=${PARALLEL})`);

const results = RESUME ? [...(prior.results || [])] : [];
const usedByDir = new Map();

for (const r of results) {
  if (r.new_path && r.status === "renamed") {
    const dir = dirname(r.new_path);
    if (!usedByDir.has(dir)) usedByDir.set(dir, new Set());
    usedByDir.get(dir).add(basename(r.new_path, extname(r.new_path)));
  }
}

let processed = 0;
let renamed = 0;
let skipped = 0;
let errors = 0;
let unreadable = 0;

async function processImage(img) {
  const dir = dirname(img.path);
  if (!usedByDir.has(dir)) usedByDir.set(dir, new Set());
  const used = usedByDir.get(dir);
  const ext = extname(img.path).toLowerCase() || ".jpeg";

  try {
    const vision = await visionRead(img.path, cfg);
    const title = (vision.detected_title || "").trim();
    const author = (vision.detected_author || "").trim();

    if (!vision.cover_readable || !title) {
      unreadable++;
      const row = {
        original_path: img.path,
        original_name: img.original_name,
        category: img.category,
        new_path: null,
        detected_title: title,
        detected_author: author,
        status: "unreadable",
        notes: vision.notes || "",
      };
      return row;
    }

    const newName = safeFilename(title, author, ext, used);
    const newPath = join(dir, newName);

    if (newPath === img.path) {
      skipped++;
      return {
        original_path: img.path,
        original_name: img.original_name,
        category: img.category,
        new_path: img.path,
        detected_title: title,
        detected_author: author,
        status: "unchanged",
      };
    }

    if (await exists(newPath) && newPath !== img.path) {
      const altName = safeFilename(`${title}-copy`, author, ext, used);
      const altPath = join(dir, altName);
      if (!DRY_RUN) await rename(img.path, altPath);
      renamed++;
      return {
        original_path: img.path,
        original_name: img.original_name,
        category: img.category,
        new_path: altPath,
        detected_title: title,
        detected_author: author,
        status: "renamed_collision",
      };
    }

    if (!DRY_RUN) await rename(img.path, newPath);
    renamed++;
    return {
      original_path: img.path,
      original_name: img.original_name,
      category: img.category,
      new_path: newPath,
      detected_title: title,
      detected_author: author,
      status: "renamed",
    };
  } catch (err) {
    errors++;
    return {
      original_path: img.path,
      original_name: img.original_name,
      category: img.category,
      status: "error",
      error: err.message,
    };
  }
}

async function saveProgress() {
  await writeFile(
    REPORT_PATH,
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        book_root: BOOK_ROOT,
        stats: {
          processed: results.length,
          renamed,
          skipped,
          unreadable,
          errors,
        },
        results,
      },
      null,
      2,
    ),
  );
}

let cursor = 0;
async function worker() {
  while (true) {
    const idx = cursor++;
    if (idx >= images.length) break;
    const row = await processImage(images[idx]);
    results.push(row);
    processed++;
    if (processed % 10 === 0 || processed === images.length) {
      await saveProgress();
      const line = `Progress: ${processed}/${images.length} renamed=${renamed} unreadable=${unreadable} err=${errors}`;
      console.log(line);
      await writeFile(LOG_PATH, `${new Date().toISOString()} ${line}\n`, { flag: "a" });
    }
    await new Promise((r) => setTimeout(r, 120));
  }
}

await Promise.all(Array.from({ length: PARALLEL }, () => worker()));
await saveProgress();

console.log(`\nDone. renamed=${renamed} skipped=${skipped} unreadable=${unreadable} errors=${errors}`);
console.log(`Report: ${REPORT_PATH}`);
