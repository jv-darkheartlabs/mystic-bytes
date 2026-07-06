/**
 * Shared cover matching utilities for reading-log sync pipeline.
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

export const BOOK_ROOT = join(homedir(), "Pictures/bookish/BookCovers");
export const ARCHIVE_ROOT = join(BOOK_ROOT, "_archive", "root-2026-07-05");
export const TRASH = join(homedir(), "Pictures/bookish/_trash/duplicates");
export const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

const DIR = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(DIR, "../..");
export const MANIFEST_PATH = join(DIR, "manifest.json");
export const READINGS_DIR = join(ROOT, "_readings");
export const ASSETS_DIR = join(ROOT, "assets/readings");
export const CATEGORIES_PATH = join(ROOT, "_data/reading_categories.yml");

export function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[''""`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[''""`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function parseFrontmatter(text) {
  const pick = (key) => {
    const q = text.match(new RegExp(`^${key}: \"(.+)\"`, "m"));
    if (q) return q[1];
    const plain = text.match(new RegExp(`^${key}: (.+)`, "m"));
    return plain ? plain[1].replace(/^"|"$/g, "").trim() : null;
  };
  return {
    title: pick("title"),
    author: pick("author"),
    category: pick("category"),
    dek: pick("dek"),
    cover: pick("cover"),
    number: pick("number"),
    sort_key: pick("sort_key"),
  };
}

export function matchKey({ title, author, category, dek }) {
  return `${norm(title)}::${norm(author || "")}::${category || ""}::${norm(dek || "")}`;
}

export function looseKey({ title, author, category }) {
  return `${norm(title)}::${norm(author || "")}::${category || ""}`;
}

export function titleKey(title) {
  return norm(title);
}

/** Levenshtein ratio 0–1 (1 = identical). */
export function fuzzyRatio(a, b) {
  const s = norm(a);
  const t = norm(b);
  if (!s || !t) return 0;
  if (s === t) return 1;
  const m = s.length;
  const n = t.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return 1 - dp[m][n] / Math.max(m, n);
}

export async function loadCategories() {
  const yaml = await readFile(CATEGORIES_PATH, "utf8");
  const categories = [...yaml.matchAll(/^\s{2}([\w-]+):/gm)].map((m) => m[1]);
  const families = [...yaml.matchAll(/^\s{2}([\w-]+):\n\s+label:/gm)].map((m) => m[1]);
  return { categories, families };
}

/** Build manifest indexes in generation order (matches generate-from-manifest.mjs). */
export function buildManifestIndexes(entries) {
  const sorted = [...entries].sort((a, b) => a.id.localeCompare(b.id));
  const slugCounts = {};
  const bySlug = new Map();
  const byMatchKey = new Map();
  const byLooseKey = new Map();
  const byTitle = new Map();
  const byId = new Map();

  for (const e of sorted) {
    if (!e.title || e.confidence === "skip") continue;
    byId.set(e.id, e);

    let slug = slugify(e.title);
    slugCounts[slug] = (slugCounts[slug] || 0) + 1;
    if (slugCounts[slug] > 1) slug = `${slug}-${slugCounts[slug]}`;
    bySlug.set(slug, e);

    const mk = matchKey(e);
    if (!byMatchKey.has(mk)) byMatchKey.set(mk, e);

    const lk = looseKey(e);
    if (!byLooseKey.has(lk)) byLooseKey.set(lk, []);
    byLooseKey.get(lk).push(e);

    const tk = titleKey(e.title);
    if (!byTitle.has(tk)) byTitle.set(tk, []);
    byTitle.get(tk).push(e);
  }

  return { sorted, bySlug, byMatchKey, byLooseKey, byTitle, byId, slugCounts };
}

/**
 * Resolve manifest entry for a reading file.
 * Priority: exact match key → loose key (disambiguate by dek/sort) → slug → fuzzy title in category.
 */
export function resolveManifestEntry(meta, slug, indexes, { fuzzyThreshold = 0.88 } = {}) {
  const { bySlug, byMatchKey, byLooseKey, byTitle } = indexes;

  if (meta.title && meta.author && meta.category && meta.dek) {
    const exact = byMatchKey.get(matchKey(meta));
    if (exact) return { entry: exact, method: "exact", confidence: "high" };
  }

  if (meta.title && meta.author && meta.category) {
    const candidates = byLooseKey.get(looseKey(meta)) || [];
    if (candidates.length === 1) return { entry: candidates[0], method: "loose", confidence: "high" };
    if (candidates.length > 1 && meta.dek) {
      const dekMatch = candidates.find((c) => norm(c.dek) === norm(meta.dek));
      if (dekMatch) return { entry: dekMatch, method: "loose+dek", confidence: "high" };
    }
    if (candidates.length > 1 && meta.sort_key) {
      const sortMatch = candidates.find((c) => c.source_path?.includes(`/r${String(meta.sort_key).padStart(4, "0")}.`));
      if (sortMatch) return { entry: sortMatch, method: "loose+sort_key", confidence: "high" };
    }
    if (candidates.length > 1) {
      const slugEntry = bySlug.get(slug);
      if (slugEntry && candidates.some((c) => c.id === slugEntry.id)) {
        return { entry: slugEntry, method: "loose+slug", confidence: "medium" };
      }
      return { entry: null, method: "ambiguous", confidence: "low", candidates };
    }
  }

  const slugEntry = bySlug.get(slug);
  if (slugEntry) {
    const ok =
      (!meta.title || norm(meta.title) === norm(slugEntry.title)) &&
      (!meta.category || meta.category === slugEntry.category);
    if (ok) return { entry: slugEntry, method: "slug", confidence: "high" };
    return { entry: slugEntry, method: "slug", confidence: "medium", warning: "slug-metadata-drift" };
  }

  if (meta.title && meta.category) {
    const pool = (byTitle.get(titleKey(meta.title)) || []).filter((e) => e.category === meta.category);
    let best = null;
    let bestScore = 0;
    for (const c of pool) {
      const score = fuzzyRatio(meta.title, c.title) * 0.6 + fuzzyRatio(meta.author || "", c.author || "") * 0.4;
      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
    }
    if (best && bestScore >= fuzzyThreshold) {
      return { entry: best, method: "fuzzy", confidence: "medium", score: bestScore };
    }
  }

  return { entry: null, method: "none", confidence: "none" };
}

export function numericStem(filename) {
  const base = filename.replace(IMAGE_EXT, "");
  const m = base.match(/^(\d+)/);
  return m ? m[1] : null;
}

export function sourceInCategory(sourcePath, category) {
  if (!sourcePath || !category) return false;
  return sourcePath.includes(`/BookCovers/${category}/`);
}

export function sortKeyRootPath(sortKey) {
  const n = parseInt(sortKey, 10);
  if (Number.isNaN(n)) return null;
  const live = join(BOOK_ROOT, `${n}.png`);
  if (existsSync(live)) return live;
  const archived = join(ARCHIVE_ROOT, `${n}.png`);
  if (existsSync(archived)) return archived;
  return live;
}

/** Stable key for cover title/author matching (category optional for disambiguation). */
export function coverKey(title, author, category = "") {
  return `${norm(title)}::${norm(author || "")}::${category || ""}`;
}

/** Score how well detected cover text matches expected reading metadata. */
export function scoreCoverMatch(expectedTitle, expectedAuthor, detectedTitle, detectedAuthor, category = "") {
  const titleScore = fuzzyRatio(expectedTitle, detectedTitle);
  const authorScore =
    expectedAuthor && detectedAuthor ? fuzzyRatio(expectedAuthor, detectedAuthor) : null;
  let score = titleScore * 0.65 + (authorScore != null ? authorScore * 0.35 : titleScore * 0.35);
  if (category && detectedTitle) score = Math.min(1, score);
  return { score, titleScore, authorScore };
}

const PREPROCESS_PY = join(DIR, "cover-preprocess.py");
const VENV_PYTHON = join(ROOT, ".venv-readings/bin/python3");

/** Trim whitespace borders, center-crop to 2:3, write JPG. Returns dimension stats. */
export function preprocessCover(src, dest, { panel = null } = {}) {
  const python = existsSync(VENV_PYTHON) ? VENV_PYTHON : "python3";
  const args = [PREPROCESS_PY, src, dest, "--json"];
  if (panel) {
    args.splice(3, 0, "--panel", panel);
  }
  const out = execFileSync(python, args, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
  return JSON.parse(out.trim());
}
