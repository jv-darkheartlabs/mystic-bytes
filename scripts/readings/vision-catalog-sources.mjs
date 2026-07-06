#!/usr/bin/env node
/**
 * Vision-catalog BookCovers source files (Tetrate/OpenAI).
 * Reuses vision-rename-report.json when available; calls API for gaps.
 *
 * Usage: node vision-catalog-sources.mjs [--resume] [--limit N] [--parallel 6]
 */
import { readFileSync } from "node:fs";
import { readFile, writeFile, readdir, access } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { requireOpenAIConfig } from "./openai-env.mjs";
import {
  BOOK_ROOT,
  ARCHIVE_ROOT,
  IMAGE_EXT,
  MANIFEST_PATH,
  loadCategories,
} from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const RENAME_REPORT = join(DIR, "vision-rename-report.json");
const CATALOG_PATH = join(DIR, "vision-source-catalog.json");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const RESUME = process.argv.includes("--resume");
const LIMIT = argValue("--limit") ? parseInt(argValue("--limit"), 10) : null;
const PARALLEL = Math.max(1, parseInt(argValue("--parallel") || "6", 10));

const SYSTEM = `You read book cover images. Return ONLY valid JSON:
{"detected_title":"","detected_author":"","cover_readable":true|false,"notes":""}
Read the MAIN title on the front cover. If unreadable, cover_readable false.`;

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function collectPaths() {
  const paths = new Set();
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  for (const e of manifest.entries) {
    if (e.source_path) paths.add(e.source_path);
  }

  const { categories } = await loadCategories();
  for (const cat of categories) {
    const catDir = join(BOOK_ROOT, cat);
    if (!(await exists(catDir))) continue;
    for (const f of await readdir(catDir)) {
      if (IMAGE_EXT.test(f)) paths.add(join(catDir, f));
    }
  }

  if (await exists(ARCHIVE_ROOT)) {
    for (const f of await readdir(ARCHIVE_ROOT)) {
      if (IMAGE_EXT.test(f)) paths.add(join(ARCHIVE_ROOT, f));
    }
  }

  return [...paths].sort();
}

function loadRenameCache() {
  const cache = new Map();
  try {
    const report = JSON.parse(readFileSync(RENAME_REPORT, "utf8"));
    for (const row of report.results || []) {
      const path = row.new_path || row.original_path;
      if (!path || !row.detected_title || row.status === "unreadable") continue;
      cache.set(path, {
        detected_title: row.detected_title,
        detected_author: row.detected_author || "",
        cover_readable: true,
        source: "rename_report",
      });
      if (row.original_path && row.original_path !== path) {
        cache.set(row.original_path, cache.get(path));
      }
    }
  } catch {
    /* no report */
  }
  return cache;
}

async function visionRead(imagePath, cfg) {
  const { apiKey, chatCompletionsUrl } = cfg;
  const b64 = Buffer.from(await readFile(imagePath)).toString("base64");
  const ext = imagePath.toLowerCase().endsWith(".png") ? "png" : "jpeg";
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
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: [
            { type: "text", text: `Catalog this cover. File: ${basename(imagePath)}` },
            { type: "image_url", image_url: { url: `data:image/${ext};base64,${b64}`, detail: "low" } },
          ],
        },
      ],
      max_tokens: 250,
    }),
  });
  if (!res.ok) {
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 2500));
      return visionRead(imagePath, cfg);
    }
    throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  const data = await res.json();
  const parsed = JSON.parse(data.choices[0].message.content);
  return { ...parsed, source: "vision_api" };
}

let catalog = { generated_at: new Date().toISOString(), entries: {} };
if (RESUME && (await exists(CATALOG_PATH))) {
  catalog = JSON.parse(await readFile(CATALOG_PATH, "utf8"));
}

const renameCache = loadRenameCache();
let paths = await collectPaths();
if (RESUME) paths = paths.filter((p) => !catalog.entries[p]);
if (LIMIT) paths = paths.slice(0, LIMIT);

let fromCache = 0;
let fromApi = 0;
let errors = 0;

const needsApi = [];
for (const p of paths) {
  if (renameCache.has(p)) {
    catalog.entries[p] = renameCache.get(p);
    fromCache++;
  } else {
    needsApi.push(p);
  }
}

console.log(`Catalog: ${paths.length} paths, ${fromCache} from rename report, ${needsApi.length} need API`);

if (needsApi.length) {
  const cfg = requireOpenAIConfig();
  let cursor = 0;

  async function worker() {
    while (true) {
      const idx = cursor++;
      if (idx >= needsApi.length) break;
      const p = needsApi[idx];
      try {
        catalog.entries[p] = await visionRead(p, cfg);
        fromApi++;
      } catch (err) {
        errors++;
        catalog.entries[p] = {
          detected_title: "",
          detected_author: "",
          cover_readable: false,
          error: err.message,
          source: "error",
        };
      }
      if ((fromApi + errors) % 20 === 0 || idx === needsApi.length - 1) {
        catalog.generated_at = new Date().toISOString();
        catalog.stats = {
          total: Object.keys(catalog.entries).length,
          from_cache: fromCache,
          from_api: fromApi,
          errors,
        };
        await writeFile(CATALOG_PATH, JSON.stringify(catalog, null, 2));
        console.log(`  API progress: ${fromApi + errors}/${needsApi.length}`);
      }
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  await Promise.all(Array.from({ length: PARALLEL }, () => worker()));
}

catalog.generated_at = new Date().toISOString();
catalog.stats = {
  total: Object.keys(catalog.entries).length,
  from_cache: fromCache,
  from_api: fromApi,
  errors,
};
await writeFile(CATALOG_PATH, JSON.stringify(catalog, null, 2));
console.log(`Done. catalog=${catalog.stats.total} cache=${fromCache} api=${fromApi} err=${errors}`);
console.log(`Wrote ${CATALOG_PATH}`);
