#!/usr/bin/env node
/**
 * Full Literary Analysis shelf: assign date_read + era-voice review rewrite.
 *
 * Usage:
 *   node run-reading-life-full.mjs --dry-run
 *   node run-reading-life-full.mjs --dates-only
 *   node run-reading-life-full.mjs --parallel 4 --resume
 *   node run-reading-life-full.mjs --limit 100 --offset 0
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getOpenAIConfig, requireOpenAIConfig } from "./openai-env.mjs";
import { assignDateRead } from "./reading-life-map.mjs";
import {
  buildSystemPrompt,
  buildUserPrompt,
  eraFromYear,
} from "./review-voice-by-era.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const READINGS_DIR = join(ROOT, "_readings");
const MANIFEST_PATH = join(DIR, "manifest.json");
const PILOT_PATH = join(DIR, "pilot-reading-life.json");
const PROGRESS_PATH = join(DIR, "reading-life-progress.json");
const ASSIGNMENTS_PATH = join(DIR, "reading-life-assignments.json");

const args = process.argv.slice(2);
function has(name) {
  return args.includes(name);
}
function flag(name) {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : null;
}

const dryRun = has("--dry-run");
const datesOnly = has("--dates-only");
const reviewsOnly = has("--reviews-only");
const resume = has("--resume");
const parallel = Math.max(1, Number(flag("--parallel") || 3));
const model = flag("--model") || "gpt-4o-mini";
const limit = flag("--limit") ? Number(flag("--limit")) : null;
const offset = flag("--offset") ? Number(flag("--offset")) : 0;

if (!dryRun && !datesOnly && !getOpenAIConfig().apiKey) {
  console.error("OPENAI_API_KEY required (see .env.example)");
  process.exit(1);
}

const { entries: manifestEntries } = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const pilotOverrides = new Map(
  JSON.parse(await readFile(PILOT_PATH, "utf8")).entries.map((e) => [e.slug, e.date_read])
);

function parseFrontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: "", body: md.trim() };
  return { front: m[1], body: m[2].trim() };
}

function setFrontField(front, key, value) {
  const re = new RegExp(`^${key}:.*$`, "m");
  const line = `${key}: ${value}`;
  if (re.test(front)) return front.replace(re, line);
  return `${front}\n${line}`;
}

function findManifestEntry(title, author) {
  const norm = (s) =>
    (s || "").toLowerCase().replace(/['']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  return manifestEntries.find(
    (e) => norm(e.title) === norm(title) && norm(e.author || "") === norm(author || "")
  );
}

function hasBookClubBody(body) {
  return /^## Hook & thesis/m.test(body) && /\*\*Questions for the room:\*\*/m.test(body);
}

function sanitizeBody(body) {
  return body
    .replace(/^<markdown[^>]*>\s*/i, "")
    .replace(/^<markdown string>\s*/i, "")
    .replace(/\s*<\/markdown string>$/i, "")
    .replace(/\s*<\/markdown>$/i, "")
    .trim();
}

async function loadReadings() {
  const files = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md")).sort();
  const rows = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = await readFile(join(READINGS_DIR, file), "utf8");
    const { front, body } = parseFrontMatter(raw);
    const title = front.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1] || slug;
    const author = front.match(/^author:\s*"?(.+?)"?\s*$/m)?.[1] || "";
    const sort_key = front.match(/^sort_key:\s*(\d+)/m)?.[1] || "0";
    const category = front.match(/^category:\s*(\S+)/m)?.[1];
    const tagMatches = front.match(/tags:\n((?:\s+-\s+.+\n?)+)/);
    const tags = tagMatches
      ? [...tagMatches[1].matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1])
      : [];
    const manifestEntry = findManifestEntry(title, author);
    const pubYear =
      manifestEntry?.original_pub_year ??
      manifestEntry?.year_published ??
      null;

    let assignment;
    if (pilotOverrides.has(slug)) {
      const date_read = pilotOverrides.get(slug);
      const year = Number(date_read.slice(0, 4));
      assignment = {
        date_read,
        era: eraFromYear(year),
        source: "pilot-override",
        rationale: "pilot-approved date",
      };
    } else {
      assignment = await assignDateRead({
        slug,
        title,
        author,
        category,
        tags,
        sort_key,
        original_pub_year: pubYear,
      });
    }

    rows.push({
      slug,
      file,
      title,
      author,
      front,
      body,
      category,
      sort_key: Number(sort_key),
      assignment,
    });
  }
  return rows;
}

async function generateReview(meta, readYear, attempt = 1) {
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
        { role: "system", content: buildSystemPrompt(readYear) },
        { role: "user", content: buildUserPrompt({ ...meta, reading_year: readYear }) },
      ],
      max_tokens: 1800,
      temperature: 0.75,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    if (attempt < 4 && (res.status === 429 || res.status >= 500)) {
      await new Promise((r) => setTimeout(r, attempt * 2000));
      return generateReview(meta, readYear, attempt + 1);
    }
    throw new Error(`OpenAI ${res.status}: ${err.slice(0, 400)}`);
  }

  const data = await res.json();
  let content = data.choices?.[0]?.message?.content;
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    if (attempt < 3) return generateReview(meta, readYear, attempt + 1);
    throw new Error("Invalid JSON from model");
  }
  if (!parsed.body || !hasBookClubBody(parsed.body)) {
    if (attempt < 3) return generateReview(meta, readYear, attempt + 1);
    throw new Error("Invalid response: missing book-club sections");
  }
  return sanitizeBody(parsed.body.trim());
}

let progress = { completed: [], failed: [], updated_at: null };
try {
  progress = JSON.parse(await readFile(PROGRESS_PATH, "utf8"));
} catch {
  /* fresh */
}

// Seed pilot completions if resuming fresh progress file
if (resume && progress.completed.length === 0) {
  try {
    const pilotReport = JSON.parse(
      await readFile(join(DIR, "reading-life-pilot-report.json"), "utf8")
    );
    for (const e of pilotReport.entries || []) {
      if (e.status === "ok" && !progress.completed.includes(e.slug)) {
        progress.completed.push(e.slug);
      }
    }
  } catch {
    /* no pilot report */
  }
}

const completedSet = new Set(progress.completed || []);
let allReadings = await loadReadings();

// Persist assignment map for audit
const assignmentEntries = allReadings.map((r) => ({
  slug: r.slug,
  title: r.title,
  date_read: r.assignment.date_read,
  era: r.assignment.era,
  source: r.assignment.source,
  rationale: r.assignment.rationale,
}));

const assignmentSummary = {
  generated_at: new Date().toISOString(),
  total: allReadings.length,
  by_source: {},
  by_era: {},
  entries: assignmentEntries,
};

for (const r of allReadings) {
  const src = r.assignment.source;
  assignmentSummary.by_source[src] = (assignmentSummary.by_source[src] || 0) + 1;
  assignmentSummary.by_era[r.assignment.era] = (assignmentSummary.by_era[r.assignment.era] || 0) + 1;
}
if (!dryRun) {
  await writeFile(ASSIGNMENTS_PATH, JSON.stringify(assignmentSummary, null, 2), "utf8");
}

let queue = allReadings;
if (offset) queue = queue.slice(offset);
if (limit) queue = queue.slice(0, limit);

console.log(
  `Reading-life full run: ${queue.length}/${allReadings.length} titles (parallel: ${parallel}, model: ${model})`
);
console.log(
  `Assignments by era: ${JSON.stringify(assignmentSummary.by_era)}`
);

if (dryRun) {
  for (let i = 0; i < Math.min(20, queue.length); i++) {
    const r = queue[i];
    const old = r.front.match(/^date_read:\s*(\S+)/m)?.[1];
    console.log(`${r.slug}: ${old} → ${r.assignment.date_read} (${r.assignment.source})`);
  }
  if (queue.length > 20) console.log(`… and ${queue.length - 20} more`);
  process.exit(0);
}

let manifestDirty = false;
const MANIFEST_EVERY = 25;
let writeChain = Promise.resolve();

function lockedWrite(fn) {
  writeChain = writeChain.then(fn, fn);
  return writeChain;
}

async function processReading(reading, idx, total) {
  const { slug, front, body, title, author, category, assignment } = reading;
  const readYear = Number(assignment.date_read.slice(0, 4));

  if (!reviewsOnly) {
    let newFront = setFrontField(front, "date_read", assignment.date_read);
    newFront = setFrontField(newFront, "review_format", "book-club");
    if (datesOnly) {
      await writeFile(
        join(READINGS_DIR, reading.file),
        `---\n${newFront}\n---\n\n${body}\n`,
        "utf8"
      );
      const manifestEntry = findManifestEntry(title, author);
      if (manifestEntry) manifestEntry.date_read = assignment.date_read;
      manifestDirty = true;
      if ((idx + 1) % 100 === 0) console.log(`[dates ${idx + 1}/${total}] ${slug}`);
      return { slug, status: "dates-only" };
    }
  }

  if (resume && completedSet.has(slug)) {
    return { slug, status: "skipped" };
  }

  const spice = front.match(/^spice:\s*(\d)/m)?.[1];
  const tagMatches = front.match(/tags:\n((?:\s+-\s+.+\n?)+)/);
  const tags = tagMatches
    ? [...tagMatches[1].matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1])
    : [];
  const dek = front.match(/^dek:\s*"?(.+?)"?\s*$/m)?.[1];
  const cwMatch = front.match(/content_warnings:\n((?:\s+-\s+.+\n?)*)/);
  const content_warnings = cwMatch
    ? [...cwMatch[1].matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1])
    : [];

  try {
    console.log(`[${idx + 1}/${total}] ${slug} (${readYear}, ${assignment.era})…`);
    const newBody = await generateReview(
      {
        title,
        author,
        category,
        spice: spice ? Number(spice) : null,
        tags,
        dek,
        content_warnings,
      },
      readYear
    );

    let newFront = setFrontField(front, "date_read", assignment.date_read);
    newFront = setFrontField(newFront, "review_format", "book-club");
    await writeFile(
      join(READINGS_DIR, reading.file),
      `---\n${newFront}\n---\n\n${newBody}\n`,
      "utf8"
    );

    await lockedWrite(async () => {
      const manifestEntry = findManifestEntry(title, author);
      if (manifestEntry) {
        manifestEntry.date_read = assignment.date_read;
        manifestEntry.body = newBody;
        manifestDirty = true;
      }
      if (!progress.completed.includes(slug)) progress.completed.push(slug);
      completedSet.add(slug);
      progress.failed = (progress.failed || []).filter((f) => f.slug !== slug);
      progress.updated_at = new Date().toISOString();
      await writeFile(PROGRESS_PATH, JSON.stringify(progress, null, 2), "utf8");
      if (manifestDirty && progress.completed.length % MANIFEST_EVERY === 0) {
        await writeFile(MANIFEST_PATH, JSON.stringify({ entries: manifestEntries }, null, 2), "utf8");
        manifestDirty = false;
        console.log(`  manifest checkpoint (${progress.completed.length})`);
      }
    });

    return { slug, status: "ok" };
  } catch (err) {
    console.error(`FAILED ${slug}:`, err.message);
    await lockedWrite(async () => {
      progress.failed = (progress.failed || []).filter((f) => f.slug !== slug);
      progress.failed.push({ slug, error: err.message, at: new Date().toISOString() });
      progress.updated_at = new Date().toISOString();
      await writeFile(PROGRESS_PATH, JSON.stringify(progress, null, 2), "utf8");
    });
    return { slug, status: "failed", error: err.message };
  }
}

if (datesOnly) {
  for (let i = 0; i < queue.length; i++) {
    await processReading(queue[i], i, queue.length);
  }
  await writeFile(MANIFEST_PATH, JSON.stringify({ entries: manifestEntries }, null, 2), "utf8");
  console.log(`Dates applied to ${queue.length} readings. Assignments: ${ASSIGNMENTS_PATH}`);
  process.exit(0);
}

const pending = queue.filter((r) => !resume || !completedSet.has(r.slug));
console.log(`Pending reviews: ${pending.length} (${completedSet.size} already done)`);

let cursor = 0;
const results = [];

async function worker() {
  while (true) {
    const idx = cursor++;
    if (idx >= pending.length) break;
    const result = await processReading(pending[idx], idx, pending.length);
    results.push(result);
    await new Promise((r) => setTimeout(r, 150));
  }
}

await Promise.all(Array.from({ length: parallel }, () => worker()));
await writeChain;

if (manifestDirty) {
  await writeFile(MANIFEST_PATH, JSON.stringify({ entries: manifestEntries }, null, 2), "utf8");
}

const ok = results.filter((r) => r.status === "ok").length;
const failed = results.filter((r) => r.status === "failed").length;
const skipped = results.filter((r) => r.status === "skipped").length;

console.log(`\nBatch done: ${ok} ok, ${failed} failed, ${skipped} skipped`);
console.log(`Total completed: ${progress.completed.length} / ${allReadings.length}`);
console.log(`Progress: ${PROGRESS_PATH}`);

if (failed > 0) process.exit(1);
