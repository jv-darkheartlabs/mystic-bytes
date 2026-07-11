#!/usr/bin/env node
/**
 * Reading-life pilot: assign date_read + regenerate era-voice reviews.
 *
 * Usage:
 *   node run-reading-life-pilot.mjs [--dry-run] [--dates-only] [--parallel N]
 */
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getOpenAIConfig, requireOpenAIConfig } from "./openai-env.mjs";
import {
  buildSystemPrompt,
  buildUserPrompt,
  eraFromYear,
  getVoiceProfile,
} from "./review-voice-by-era.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const READINGS_DIR = join(ROOT, "_readings");
const MANIFEST_PATH = join(DIR, "manifest.json");
const PILOT_PATH = join(DIR, "pilot-reading-life.json");
const REPORT_PATH = join(DIR, "reading-life-pilot-report.json");

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
const parallel = Math.max(1, Number(flag("--parallel") || 2));
const model = flag("--model") || "gpt-4o-mini";
const bucketsArg = flag("--buckets");
const bucketsFilter = bucketsArg
  ? new Set(bucketsArg.split(",").map((s) => s.trim()).filter(Boolean))
  : null;

if (!dryRun && !datesOnly && !getOpenAIConfig().apiKey) {
  console.error("OPENAI_API_KEY required (see .env.example)");
  process.exit(1);
}

const { entries: pilotEntriesAll } = JSON.parse(await readFile(PILOT_PATH, "utf8"));
const pilotEntries = bucketsFilter
  ? pilotEntriesAll.filter((e) => bucketsFilter.has(e.era_bucket))
  : pilotEntriesAll;
const { entries: manifestEntries } = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));

function parseFrontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: "", body: md.trim() };
  return { front: m[1], body: m[2].trim() };
}

function hasBookClubBody(body) {
  return /^## Hook & thesis/m.test(body) && /\*\*Questions for the room:\*\*/m.test(body);
}

function setFrontField(front, key, value) {
  const re = new RegExp(`^${key}:.*$`, "m");
  const line =
    typeof value === "string" && value.includes(":") && !value.startsWith('"')
      ? `${key}: "${value}"`
      : `${key}: ${value}`;
  if (re.test(front)) return front.replace(re, line);
  return `${front}\n${key}: ${typeof value === "string" ? `"${value}"` : value}`;
}

function findManifestEntry(title, author) {
  const norm = (s) =>
    (s || "").toLowerCase().replace(/['']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  return manifestEntries.find(
    (e) => norm(e.title) === norm(title) && norm(e.author || "") === norm(author || "")
  );
}

function sanitizeBody(body) {
  return body
    .replace(/^<markdown[^>]*>\s*/i, "")
    .replace(/^<markdown string>\s*/i, "")
    .replace(/\s*<\/markdown string>$/i, "")
    .replace(/\s*<\/markdown>$/i, "")
    .trim();
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
  const content = data.choices?.[0]?.message?.content;
  const parsed = JSON.parse(content);
  if (!parsed.body || !hasBookClubBody(parsed.body)) {
    if (attempt < 3) return generateReview(meta, readYear, attempt + 1);
    throw new Error("Invalid response: missing book-club sections");
  }
  return sanitizeBody(parsed.body.trim());
}

async function processEntry(entry, idx, total) {
  const path = join(READINGS_DIR, `${entry.slug}.md`);
  let raw;
  try {
    raw = await readFile(path, "utf8");
  } catch {
    return { ...entry, status: "missing", error: "file not found" };
  }

  const { front, body } = parseFrontMatter(raw);
  const title = front.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1] || entry.slug;
  const author = front.match(/^author:\s*"?(.+?)"?\s*$/m)?.[1];
  const oldDateRead = front.match(/^date_read:\s*(\S+)/m)?.[1];
  const readYear = Number(entry.date_read.slice(0, 4));
  const voiceEra = eraFromYear(readYear);
  const profile = getVoiceProfile(readYear);

  const report = {
    slug: entry.slug,
    title,
    era_bucket: entry.era_bucket,
    date_read: entry.date_read,
    voice_era: voiceEra,
    voice_label: profile.label,
    old_date_read: oldDateRead,
    status: "pending",
  };

  if (dryRun) {
    report.status = "dry-run";
    console.log(
      `[${idx + 1}/${total}] ${entry.slug} → ${entry.date_read} (${voiceEra}) was ${oldDateRead}`
    );
    return report;
  }

  let newFront = setFrontField(front, "date_read", entry.date_read);
  newFront = setFrontField(newFront, "review_format", "book-club");

  if (datesOnly) {
    const md = `---\n${newFront}\n---\n\n${body}\n`;
    await writeFile(path, md, "utf8");
    const manifestEntry = findManifestEntry(title, author);
    if (manifestEntry) manifestEntry.date_read = entry.date_read;
    report.status = "dates-only";
    console.log(`[${idx + 1}/${total}] ${entry.slug} date_read → ${entry.date_read}`);
    return report;
  }

  const spice = front.match(/^spice:\s*(\d)/m)?.[1];
  const tagMatches = front.match(/tags:\n((?:\s+-\s+.+\n?)+)/);
  const tags = tagMatches
    ? [...tagMatches[1].matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1])
    : [];
  const dek = front.match(/^dek:\s*"?(.+?)"?\s*$/m)?.[1];
  const category = front.match(/^category:\s*(\S+)/m)?.[1];
  const cwMatch = front.match(/content_warnings:\n((?:\s+-\s+.+\n?)*)/);
  const content_warnings = cwMatch
    ? [...cwMatch[1].matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1])
    : [];

  try {
    console.log(`[${idx + 1}/${total}] ${entry.slug} (${readYear}, ${voiceEra})…`);
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
    const md = `---\n${newFront}\n---\n\n${newBody}\n`;
    await writeFile(path, md, "utf8");

    const manifestEntry = findManifestEntry(title, author);
    if (manifestEntry) {
      manifestEntry.date_read = entry.date_read;
      manifestEntry.body = newBody;
    }

    report.status = "ok";
    report.body_preview = newBody.slice(0, 280).replace(/\n/g, " ");
    report.word_estimate = newBody.split(/\s+/).length;
  } catch (err) {
    report.status = "failed";
    report.error = err.message;
    console.error(`FAILED ${entry.slug}:`, err.message);
  }

  return report;
}

console.log(
  `Reading-life pilot: ${pilotEntries.length} titles (parallel: ${parallel}, model: ${model})`
);

const results = [];
let cursor = 0;

async function worker() {
  while (true) {
    const idx = cursor++;
    if (idx >= pilotEntries.length) break;
    const report = await processEntry(pilotEntries[idx], idx, pilotEntries.length);
    results.push(report);
    if (!dryRun && !datesOnly) await new Promise((r) => setTimeout(r, 200));
  }
}

await Promise.all(Array.from({ length: parallel }, () => worker()));

if (!dryRun) {
  await writeFile(MANIFEST_PATH, JSON.stringify({ entries: manifestEntries }, null, 2), "utf8");
}

results.sort((a, b) => a.slug.localeCompare(b.slug));

const summary = {
  run_at: new Date().toISOString(),
  total: results.length,
  ok: results.filter((r) => r.status === "ok").length,
  failed: results.filter((r) => r.status === "failed").length,
  dry_run: dryRun,
  dates_only: datesOnly,
  by_era: Object.fromEntries(
    [...new Set(results.map((r) => r.era_bucket))].map((bucket) => [
      bucket,
      results.filter((r) => r.era_bucket === bucket).length,
    ])
  ),
  entries: results,
};

await writeFile(REPORT_PATH, JSON.stringify(summary, null, 2), "utf8");

console.log(`\nPilot complete: ${summary.ok} ok, ${summary.failed} failed`);
console.log(`Report: ${REPORT_PATH}`);

if (summary.failed > 0) process.exit(1);
