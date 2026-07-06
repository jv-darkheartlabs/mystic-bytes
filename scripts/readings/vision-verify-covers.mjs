#!/usr/bin/env node
/**
 * Vision-verify reading cover assets against expected title/author from front matter.
 *
 * Usage: node vision-verify-covers.mjs [options]
 *   --limit N       max readings to verify (after offset)
 *   --offset N      skip first N readings (sorted by slug)
 *   --slug a,b,c    only these slugs
 *   --resume        skip slugs already in vision-verify-report.json
 *   --dry-run       no API calls; list targets only
 *   --fix           run fix-cover-associations.mjs after verify (needs --resync in fix)
 *   --target source|asset   image to verify (default: source)
 *   --escalate      re-check low/mismatch with gpt-4o
 */
import { readFile, writeFile, readdir, access } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { requireOpenAIConfig } from "./openai-env.mjs";
import {
  MANIFEST_PATH,
  READINGS_DIR,
  ASSETS_DIR,
  parseFrontmatter,
  buildManifestIndexes,
  resolveManifestEntry,
  fuzzyRatio,
  norm,
  titleKey,
  scoreCoverMatch,
} from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const REPORT_PATH = join(DIR, "vision-verify-report.json");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const LIMIT = argValue("--limit") ? parseInt(argValue("--limit"), 10) : null;
const OFFSET = argValue("--offset") ? parseInt(argValue("--offset"), 10) : 0;
const SLUG_FILTER = argValue("--slug")
  ? new Set(argValue("--slug").split(",").map((s) => s.trim()).filter(Boolean))
  : null;
const RESUME = process.argv.includes("--resume");
const DRY_RUN = process.argv.includes("--dry-run");
const FIX = process.argv.includes("--fix");
const ESCALATE = process.argv.includes("--escalate");
const TARGET = argValue("--target") || "source";

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function classifyMatch(expectedTitle, expectedAuthor, detectedTitle, detectedAuthor, category) {
  let titleScore = fuzzyRatio(expectedTitle, detectedTitle);
  const e = norm(expectedTitle);
  const d = norm(detectedTitle);
  if (e && d) {
    if (d.includes(e) || e.includes(d)) titleScore = Math.max(titleScore, 0.92);
    const words = e.split(" ").filter((w) => w.length > 2);
    if (words.length && words.every((w) => d.includes(w))) titleScore = Math.max(titleScore, 0.9);
  }

  const authorScore =
    expectedAuthor && detectedAuthor ? fuzzyRatio(expectedAuthor, detectedAuthor) : null;
  const confidence = titleScore * 0.65 + (authorScore != null ? authorScore * 0.35 : titleScore * 0.35);

  if (titleScore >= 0.88 && (authorScore == null || authorScore >= 0.8)) {
    return { match: "high", confidence, titleScore, authorScore };
  }
  if (titleScore >= 0.72 || (authorScore != null && authorScore >= 0.82 && titleScore >= 0.5)) {
    return { match: "low", confidence, titleScore, authorScore };
  }
  return { match: "mismatch", confidence, titleScore, authorScore };
}

function suggestRematch(detectedTitle, detectedAuthor, category, indexes) {
  const pool = (indexes.byTitle.get(titleKey(detectedTitle)) || []).filter(
    (e) => !category || e.category === category,
  );
  let best = null;
  let bestScore = 0;
  for (const c of pool) {
    const { score } = scoreCoverMatch(detectedTitle, detectedAuthor, c.title, c.author, category);
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  if (best && bestScore >= 0.88) {
    return {
      suggested_action: "rematch_manifest",
      suggested_manifest_id: best.id,
      suggested_manifest_title: best.title,
      suggested_manifest_author: best.author,
      suggested_source_path: best.source_path,
      rematch_score: bestScore,
    };
  }
  return { suggested_action: "manual_review", rematch_score: bestScore };
}

const SYSTEM = `You read book cover images for a reading log shelf audit.
Return ONLY valid JSON:
{
  "detected_title": "primary title text visible on cover",
  "detected_author": "author if legible, else empty string",
  "cover_readable": true|false,
  "notes": "brief note if partial/obstructed"
}
Rules:
- Read the MAIN title on the cover (largest prominent text)
- Ignore series branding watermarks if a distinct book title is visible
- For series books, include series subtitle if it's the distinguishing text
- If unreadable/blank: cover_readable false, best-guess title or empty string`;

async function visionVerify(imagePath, expected, cfg, model = "gpt-4o-mini") {
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
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Expected title: ${expected.title}\nExpected author: ${expected.author || "(unknown)"}\nCategory: ${expected.category || ""}\nVerify what this cover actually shows.`,
            },
            {
              type: "image_url",
              image_url: { url: `data:image/${ext};base64,${b64}`, detail: "low" },
            },
          ],
        },
      ],
      max_tokens: 300,
    }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

let prior = { results: [], mismatches: [], stats: {} };
if (RESUME && (await exists(REPORT_PATH))) {
  prior = JSON.parse(await readFile(REPORT_PATH, "utf8"));
}

const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const indexes = buildManifestIndexes(manifest.entries);
let mdFiles = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md")).sort();
if (SLUG_FILTER) {
  mdFiles = mdFiles.filter((f) => SLUG_FILTER.has(f.replace(/\.md$/, "")));
}
if (OFFSET > 0) mdFiles = mdFiles.slice(OFFSET);
if (LIMIT != null && LIMIT > 0) mdFiles = mdFiles.slice(0, LIMIT);

const doneSlugs = new Set((prior.results || []).map((r) => r.slug));
const results = RESUME ? [...(prior.results || [])] : [];
const mismatches = RESUME ? [...(prior.mismatches || [])] : [];

if (DRY_RUN) {
  const targets = [];
  for (const file of mdFiles) {
    const slug = file.replace(/\.md$/, "");
    if (RESUME && doneSlugs.has(slug)) continue;
    const meta = parseFrontmatter(await readFile(join(READINGS_DIR, file), "utf8"));
    targets.push({ slug, title: meta.title, author: meta.author });
  }
  console.log(`Dry run: ${targets.length} targets`);
  for (const t of targets.slice(0, 20)) console.log(`  ${t.slug}: ${t.title}`);
  if (targets.length > 20) console.log(`  ... +${targets.length - 20} more`);
  process.exit(0);
}

let cfg;
try {
  cfg = requireOpenAIConfig();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const BATCH = 6;
let verified = 0;
let high = 0;
let low = 0;
let mismatch = 0;
let errors = 0;

const pending = [];
for (const file of mdFiles) {
  const slug = file.replace(/\.md$/, "");
  if (RESUME && doneSlugs.has(slug)) continue;
  pending.push(file);
}

function recountStats() {
  high = results.filter((r) => r.match === "high").length;
  low = results.filter((r) => r.match === "low").length;
  mismatch = results.filter((r) => r.match === "mismatch").length;
  errors = results.filter((r) => r.error).length;
  verified = results.filter((r) => !r.error).length;
}

async function processOne(file) {
  const slug = file.replace(/\.md$/, "");
  const text = await readFile(join(READINGS_DIR, file), "utf8");
  const meta = parseFrontmatter(text);
  const assetName = meta.cover ? basename(meta.cover) : `${slug}.jpg`;
  const assetPath = join(ASSETS_DIR, assetName);
  const resolved = resolveManifestEntry(meta, slug, indexes);
  const sourcePath = resolved.entry?.source_path || null;
  const imagePath = TARGET === "asset" ? assetPath : sourcePath || assetPath;

  const base = {
    slug,
    expected_title: meta.title,
    expected_author: meta.author,
    category: meta.category,
    asset: assetPath,
    source: sourcePath,
    verify_target: TARGET,
    image_verified: imagePath,
    manifest_id: resolved.entry?.id || null,
  };

  if (!(await exists(imagePath))) {
    errors++;
    return {
      ...base,
      match: "mismatch",
      error: TARGET === "source" ? "missing_source" : "missing_asset",
      suggested_action: "sync_cover",
    };
  }

  try {
    let vision = await visionVerify(imagePath, meta, cfg, "gpt-4o-mini");
    let classified = classifyMatch(
      meta.title,
      meta.author,
      vision.detected_title,
      vision.detected_author,
      meta.category,
    );

    if (ESCALATE && classified.match !== "high") {
      const retry = await visionVerify(imagePath, meta, cfg, "gpt-4o");
      const retryClass = classifyMatch(
        meta.title,
        meta.author,
        retry.detected_title,
        retry.detected_author,
        meta.category,
      );
      if (retryClass.confidence > classified.confidence) {
        vision = retry;
        classified = retryClass;
        classified.escalated = true;
      }
    }

    const row = {
      ...base,
      ...classified,
      detected_title: vision.detected_title,
      detected_author: vision.detected_author || "",
      cover_readable: vision.cover_readable !== false,
      notes: vision.notes || "",
    };

    if (classified.match === "mismatch") {
      const rematch = suggestRematch(
        vision.detected_title,
        vision.detected_author,
        meta.category,
        indexes,
      );
      Object.assign(row, rematch);
      mismatches.push(row);
    }

    return row;
  } catch (err) {
    errors++;
    return { ...base, match: "mismatch", error: String(err.message), suggested_action: "retry" };
  }
}

for (let i = 0; i < pending.length; i += BATCH) {
  const chunk = pending.slice(i, i + BATCH);
  const chunkResults = await Promise.all(chunk.map(processOne));
  results.push(...chunkResults);
  recountStats();

  await writeFile(
    REPORT_PATH,
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        options: {
          limit: LIMIT,
          offset: OFFSET,
          slug_filter: SLUG_FILTER ? [...SLUG_FILTER] : null,
          resume: RESUME,
          escalate: ESCALATE,
        },
        stats: { verified, high, low, mismatch, errors, total_results: results.length },
        mismatches: mismatches.sort((a, b) => (a.confidence ?? 0) - (b.confidence ?? 0)),
        results,
      },
      null,
      2,
    ),
  );
  console.log(
    `Progress: ${Math.min(i + BATCH, pending.length)}/${pending.length} (high=${high} low=${low} mismatch=${mismatch} err=${errors})`,
  );
}

recountStats();
console.log(`\nDone. Verified=${verified} high=${high} low=${low} mismatch=${mismatch} errors=${errors}`);
console.log(`Report: ${REPORT_PATH}`);

if (mismatches.length) {
  console.log(`\nMismatches: ${mismatches.length}`);
  for (const m of mismatches.slice(0, 8)) {
    console.log(
      `  ${m.slug}: expected "${m.expected_title}" → detected "${m.detected_title}" (${m.suggested_action || "manual_review"})`,
    );
  }
}

if (FIX && mismatches.length) {
  console.log("\nRunning fix-cover-associations.mjs --resync ...");
  execFileSync("node", [join(DIR, "fix-cover-associations.mjs"), "--resync"], {
    stdio: "inherit",
    cwd: join(DIR, "../.."),
  });
}
