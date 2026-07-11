#!/usr/bin/env node
/**
 * Generate Projection Room adaptation review bodies.
 *
 * Usage:
 *   OPENAI_API_KEY=... node generate-film-reviews.mjs --slug twilight-2008
 *   OPENAI_API_KEY=... node generate-film-reviews.mjs --all --resume
 *
 * Options:
 *   --slug <slug>       Single film by _films filename (no .md)
 *   --limit N           Max entries
 *   --offset N          Skip first N eligible entries
 *   --all               Process entire Projection Room shelf
 *   --resume            Skip entries whose body already has "## Hook & thesis"
 *   --dry-run           Print metadata only
 *   --model gpt-4o-mini OpenAI model
 *   --watch-year Y      Override era voice year (default: date_watched year)
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getOpenAIConfig, requireOpenAIConfig } from "../readings/openai-env.mjs";
import { buildFilmSystemPrompt, buildFilmUserPrompt } from "./film-voice-by-era.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const FILMS_DIR = join(ROOT, "_films");
const READINGS_DIR = join(ROOT, "_readings");
const PROGRESS_PATH = join(DIR, "film-review-progress.json");

const args = process.argv.slice(2);
function flag(name) {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : null;
}
function has(name) {
  return args.includes(name);
}

const slugArg = flag("--slug");
const limitArg = flag("--limit");
const offsetArg = flag("--offset");
const model = flag("--model") || "gpt-4o-mini";
const watchYearArg = flag("--watch-year");
const parallel = Math.max(1, Number(flag("--parallel") || 3));
const dryRun = has("--dry-run");
const resume = has("--resume");
const processAll = has("--all");

const OPENAI_KEY = getOpenAIConfig().apiKey;
if (!dryRun && !OPENAI_KEY) {
  console.error("OPENAI_API_KEY required (see .env.example)");
  process.exit(1);
}

function parseFrontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: "", body: md.trim() };
  return { front: m[1], body: m[2].trim() };
}

function hasProjectionRoomBody(body) {
  return (
    /^## Hook & thesis/m.test(body) &&
    /^## Adaptation ledger/m.test(body) &&
    /\*\*Questions for the room:\*\*/m.test(body)
  );
}

function parseYamlList(front, key) {
  const lines = front.split("\n");
  const out = [];
  let inList = false;
  for (const line of lines) {
    if (line.startsWith(`${key}:`)) {
      inList = true;
      continue;
    }
    if (inList) {
      if (/^\s+-\s+/.test(line)) {
        out.push(line.replace(/^\s+-\s+/, "").replace(/^"|"$/g, ""));
      } else if (line.trim() && !line.startsWith(" ")) {
        break;
      }
    }
  }
  return out;
}

function frontScalar(front, key) {
  const m = front.match(new RegExp(`^${key}:\\s*"?(.+?)"?\\s*$`, "m"));
  return m?.[1] || null;
}

async function loadReadingTitles(slugs) {
  const titles = [];
  for (const slug of slugs) {
    try {
      const raw = await readFile(join(READINGS_DIR, `${slug}.md`), "utf8");
      const title = frontScalar(raw, "title");
      if (title) titles.push(title);
    } catch {
      titles.push(slug);
    }
  }
  return titles;
}

async function loadFilmSlugs() {
  const files = (await readdir(FILMS_DIR)).filter((f) => f.endsWith(".md"));
  const map = new Map();
  for (const f of files) {
    const slug = f.replace(/\.md$/, "");
    const raw = await readFile(join(FILMS_DIR, f), "utf8");
    const { front, body } = parseFrontMatter(raw);
    map.set(slug, { slug, file: f, front, body, raw });
  }
  return map;
}

function resolveWatchYear(film) {
  if (watchYearArg) return Number(watchYearArg);
  const dw = film.front.match(/^date_watched:\s*(\S+)/m)?.[1];
  if (dw && /^\d{4}/.test(dw)) return Number(dw.slice(0, 4));
  const y = film.front.match(/^year:\s*(\d+)/m)?.[1];
  if (y) return Number(y);
  return 2015;
}

async function filmMeta(film) {
  const sourceSlugs = parseYamlList(film.front, "source_readings");
  return {
    title: frontScalar(film.front, "title") || film.slug,
    year: Number(frontScalar(film.front, "year") || 0) || null,
    director: frontScalar(film.front, "director"),
    category: frontScalar(film.front, "category"),
    format: frontScalar(film.front, "format"),
    fidelity: frontScalar(film.front, "fidelity"),
    source_readings: sourceSlugs,
    source_titles: await loadReadingTitles(sourceSlugs),
    spice: Number(frontScalar(film.front, "spice") || 0) || null,
    mpaa_rating: frontScalar(film.front, "mpaa_rating"),
    tags: parseYamlList(film.front, "tags"),
    content_warnings: parseYamlList(film.front, "content_warnings"),
    dek: frontScalar(film.front, "dek"),
    cast: parseYamlList(film.front, "cast"),
    body: film.body,
  };
}

async function generateReview(meta, watchYear, attempt = 1) {
  const { apiKey, chatCompletionsUrl } = requireOpenAIConfig();
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
        { role: "system", content: buildFilmSystemPrompt(watchYear) },
        { role: "user", content: buildFilmUserPrompt({ ...meta, watch_year: watchYear }) },
      ],
      max_tokens: 2000,
      temperature: 0.75,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    if (attempt < 4 && (res.status === 429 || res.status >= 500)) {
      await new Promise((r) => setTimeout(r, attempt * 2000));
      return generateReview(meta, watchYear, attempt + 1);
    }
    throw new Error(`OpenAI ${res.status}: ${err.slice(0, 400)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  const parsed = JSON.parse(content);
  if (!parsed.body || !hasProjectionRoomBody(parsed.body)) {
    if (attempt < 3) return generateReview(meta, watchYear, attempt + 1);
    throw new Error("Invalid response: missing Projection Room sections");
  }
  return parsed.body.trim();
}

function sanitizeBody(body) {
  return body
    .replace(/^<markdown[^>]*>\s*/i, "")
    .replace(/^<markdown string>\s*/i, "")
    .replace(/\s*<\/markdown string>$/i, "")
    .replace(/\s*<\/markdown>$/i, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function injectReviewFormat(front) {
  if (/^review_format:/m.test(front)) {
    return front.replace(/^review_format:.*$/m, "review_format: projection-room");
  }
  return `${front}\nreview_format: projection-room`;
}

const slugMap = await loadFilmSlugs();
let queue = [...slugMap.values()].sort((a, b) => {
  const ka = a.front.match(/^sort_key:\s*(\d+)/m)?.[1] || "9999";
  const kb = b.front.match(/^sort_key:\s*(\d+)/m)?.[1] || "9999";
  return Number(ka) - Number(kb);
});

if (slugArg) {
  const one = slugMap.get(slugArg);
  if (!one) {
    console.error(`Unknown slug: ${slugArg}`);
    process.exit(1);
  }
  queue = [one];
} else if (!processAll && !limitArg) {
  console.error("Specify --slug, --limit N, or --all");
  process.exit(1);
}

if (resume) queue = queue.filter((f) => !hasProjectionRoomBody(f.body));
if (offsetArg) queue = queue.slice(Number(offsetArg));
if (limitArg) queue = queue.slice(0, Number(limitArg));

console.log(`Projection Room batch: ${queue.length} entries (model: ${model}, parallel: ${parallel})`);

async function processFilm(film) {
  const meta = await filmMeta(film);
  const watchYear = resolveWatchYear(film);
  console.log(`→ ${film.slug} (${watchYear})`);

  if (dryRun) {
    console.log(JSON.stringify({ ...meta, watch_year: watchYear }, null, 2));
    return;
  }

  const body = sanitizeBody(await generateReview(meta, watchYear));
  const front = injectReviewFormat(film.front);
  await writeFile(join(FILMS_DIR, film.file), `---\n${front}\n---\n\n${body}\n`, "utf8");
  console.log(`  ✓ wrote ${film.file}`);
}

for (let i = 0; i < queue.length; i += parallel) {
  const batch = queue.slice(i, i + parallel);
  const results = await Promise.allSettled(batch.map(processFilm));
  for (const r of results) {
    if (r.status === "rejected") {
      console.error(`  ✗ ${r.reason?.message || r.reason}`);
    }
  }
}

console.log("Done.");
