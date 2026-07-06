#!/usr/bin/env node
/**
 * Retrofit Orchid Room readings with book-club critique bodies.
 *
 * Usage:
 *   OPENAI_API_KEY=... node generate-book-club-reviews.mjs --slug birthday-girl
 *   # Tetrate: set OPENAI_BASE_URL in .env or shell (see .env.example)
 *   OPENAI_API_KEY=... node generate-book-club-reviews.mjs --limit 10 --offset 0
 *   OPENAI_API_KEY=... node generate-book-club-reviews.mjs --all --resume
 *
 * Options:
 *   --slug <slug>     Single reading by _readings filename (no .md)
 *   --limit N         Max entries to process
 *   --offset N        Skip first N eligible entries (by sort_key)
 *   --all             Process entire shelf (respects --limit if set)
 *   --resume          Skip entries whose body already has "## Hook & thesis"
 *   --dry-run         Print prompt metadata only
 *   --model gpt-4o    OpenAI model (default gpt-4o-mini)
 *   --parallel N      Concurrent API calls (default 1)
 *   --progress-file   Progress JSON path (default book-club-progress.json)
 *   --skip-manifest   Skip manifest writes during run (sync after)
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getOpenAIConfig, requireOpenAIConfig } from "./openai-env.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const READINGS_DIR = join(ROOT, "_readings");
const MANIFEST_PATH = join(DIR, "manifest.json");
const PROGRESS_PATH = join(DIR, "book-club-progress.json");

const BOOK_CLUB_SECTIONS = [
  {
    label: "Hook & thesis",
    allocation: 15,
    objective:
      "Introduce the book, the author's primary objective, and your definitive verdict.",
    prompts: [
      "What is the book's true engine — the central human conflict beneath the trope?",
      "What is your verdict in one sharp sentence?",
    ],
  },
  {
    label: "The contextual pivot",
    allocation: 20,
    objective: "Ground the book in its genre; outline scope without plot summary.",
    prompts: [
      "Where does this sit in the genre landscape and the author's body of work?",
      "Who is the invisible audience — and does the book bridge niche tropes to general readers?",
    ],
  },
  {
    label: "Deep-dive critique",
    allocation: 45,
    objective:
      "Analyze craft, structure, thematic success, and mechanical flaws with specific evidence.",
    prompts: [
      "How does structure (pacing, POV, timeline) serve or sabotage the thesis?",
      "Where does craft excel or falter — prose, character, dialogue, world-building?",
      "Is the ending earned?",
    ],
  },
  {
    label: "Discussion launchpad",
    allocation: 20,
    objective: "Present open questions and polarizing elements for group debate.",
    prompts: [
      "What polarities will split a room for 45 minutes?",
      "What remains unsaid — gaps, biases, unresolved questions?",
    ],
  },
];

const VOICE = `Orchid Room book club — JV's reading-chair voice. Literary, precise, sharp, gothic-romance fluent.
Verdict-forward and a little dangerous. Never recap plot beat-by-beat. Analyze how and why the book works.
Provoke discussion. Reference heat and desire implicitly through craft — never cite spice numbers (1–5).`;

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
const parallel = Math.max(1, Number(flag("--parallel") || 1));
const progressPath = flag("--progress-file") || PROGRESS_PATH;
const skipManifest = has("--skip-manifest");
const dryRun = has("--dry-run");
const resume = has("--resume");
const processAll = has("--all");

const OPENAI_KEY = getOpenAIConfig().apiKey;
if (!dryRun && !OPENAI_KEY) {
  console.error("OPENAI_API_KEY required (set in .env or shell — see .env.example)");
  process.exit(1);
}

const { entries: manifestEntries } = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseFrontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: "", body: md.trim() };
  return { front: m[1], body: m[2].trim() };
}

function hasBookClubBody(body) {
  return /^## Hook & thesis/m.test(body) && /\*\*Questions for the room:\*\*/m.test(body);
}

async function loadReadingSlugs() {
  const files = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));
  const map = new Map();
  for (const f of files) {
    const slug = f.replace(/\.md$/, "");
    const raw = await readFile(join(READINGS_DIR, f), "utf8");
    const { front, body } = parseFrontMatter(raw);
    const titleMatch = front.match(/^title:\s*"?(.+?)"?\s*$/m);
    map.set(slug, {
      slug,
      file: f,
      title: titleMatch?.[1] || slug,
      front,
      body,
      raw,
    });
  }
  return map;
}

function buildSystemPrompt() {
  const sections = BOOK_CLUB_SECTIONS.map(
    (s) =>
      `## ${s.label} (~${s.allocation}%)\n${s.objective}\nQuestions: ${s.prompts.join(" ")}`
  ).join("\n\n");

  return `You write Orchid Room book-club critiques for a dark romance reading log.

${VOICE}

Return ONLY valid JSON: { "body": "<markdown string>" }

The body MUST use exactly these four h2 headings in order:
${BOOK_CLUB_SECTIONS.map((s) => `## ${s.label}`).join("\n")}

${sections}

Rules:
- 400–550 words total across all four sections (bullets in launchpad count toward total)
- Hook & thesis MUST include **Verdict:** one bold sharp sentence
- No plot recap or chapter-by-chapter summary — analyze how and why the book works
- Contextual pivot: compare freely to authors and landmark titles when it grounds genre placement
- Name specific craft choices (structure, POV, pacing, dialogue, ending) in deep-dive
- Never cite spice level numbers; analyze tension and desire through craft and content warnings only
- Discussion launchpad: (1) short prose on polarities and unsaid gaps, then (2) **Questions for the room:** with 3–5 markdown bullet debate prompts
- Final line: hashtags including #TheOrchidRoom and 3–5 book-specific tags
- Voice: precise, provocative, never breathy marketing copy
- If author/genre unknown, infer from title and category; note uncertainty lightly in context section only`;
}

function buildUserPrompt(meta) {
  return JSON.stringify(
    {
      title: meta.title,
      author: meta.author || null,
      category: meta.category || null,
      spice: meta.spice ?? null,
      tags: meta.tags || [],
      content_warnings: meta.content_warnings || [],
      dek: meta.dek || null,
      previous_blurb: meta.body?.slice(0, 500) || null,
    },
    null,
    2
  );
}

async function generateReview(meta, attempt = 1) {
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
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(meta) },
      ],
      max_tokens: 1600,
      temperature: 0.75,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    if (attempt < 4 && (res.status === 429 || res.status >= 500)) {
      const wait = attempt * 2000;
      console.warn(`  retry ${attempt}/3 after ${wait}ms (${res.status})`);
      await new Promise((r) => setTimeout(r, wait));
      return generateReview(meta, attempt + 1);
    }
    throw new Error(`OpenAI ${res.status}: ${err.slice(0, 400)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  const parsed = JSON.parse(content);
  if (!parsed.body || !hasBookClubBody(parsed.body)) {
    if (attempt < 3) {
      console.warn(`  retry ${attempt}/2 — invalid section structure`);
      return generateReview(meta, attempt + 1);
    }
    throw new Error("Invalid response: missing book-club sections or debate questions");
  }
  return sanitizeBody(parsed.body.trim());
}

function sanitizeBody(body) {
  return body
    .replace(/^<markdown[^>]*>\s*/i, "")
    .replace(/^<markdown string>\s*/i, "")
    .replace(/\s*<\/markdown string>$/i, "")
    .replace(/\s*<\/markdown>$/i, "")
    .trim();
}

function injectReviewFormat(front) {
  if (/^review_format:/m.test(front)) {
    return front.replace(/^review_format:.*$/m, "review_format: book-club");
  }
  return `${front}\nreview_format: book-club`;
}

function writeReadingFile(front, body) {
  const updatedFront = injectReviewFormat(front);
  return `---\n${updatedFront}\n---\n\n${body}\n`;
}

function findManifestEntry(title, author) {
  const norm = (s) =>
    (s || "").toLowerCase().replace(/['']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  return manifestEntries.find(
    (e) => norm(e.title) === norm(title) && norm(e.author || "") === norm(author || "")
  );
}

const slugMap = await loadReadingSlugs();
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

const offset = Number(offsetArg || 0);

if (resume) queue = queue.filter((r) => !hasBookClubBody(r.body));

if (offset) queue = queue.slice(offset);

const limit = limitArg ? Number(limitArg) : queue.length;
queue = queue.slice(0, limit);

console.log(
  `Book-club review batch: ${queue.length} entries (model: ${model}, parallel: ${parallel}, base: ${getOpenAIConfig().baseUrl})`
);

async function loadAllCompleted() {
  const set = new Set();
  const files = (await readdir(DIR)).filter(
    (f) => f.startsWith("book-club-progress") && f.endsWith(".json")
  );
  for (const f of files) {
    try {
      const p = JSON.parse(await readFile(join(DIR, f), "utf8"));
      for (const slug of p.completed || []) set.add(slug);
    } catch {
      /* skip corrupt */
    }
  }
  return set;
}

let progress = { completed: [], failed: [], updated_at: new Date().toISOString() };
try {
  progress = JSON.parse(await readFile(progressPath, "utf8"));
} catch {
  /* fresh run */
}

const completedSet = await loadAllCompleted();
for (const slug of progress.completed || []) completedSet.add(slug);

let manifestDirty = false;
const MANIFEST_EVERY = 25;
let writeChain = Promise.resolve();

function lockedWrite(fn) {
  writeChain = writeChain.then(fn, fn);
  return writeChain;
}

async function processReading(reading, label) {
  if (completedSet.has(reading.slug)) return;

  const author = reading.front.match(/^author:\s*"?(.+?)"?\s*$/m)?.[1];
  const spice = reading.front.match(/^spice:\s*(\d)/m)?.[1];
  const tagMatches = reading.front.match(/tags:\n((?:\s+-\s+.+\n?)+)/);
  const tags = tagMatches
    ? [...tagMatches[1].matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1])
    : [];
  const dek = reading.front.match(/^dek:\s*"?(.+?)"?\s*$/m)?.[1];
  const category = reading.front.match(/^category:\s*(\S+)/m)?.[1];

  const meta = {
    title: reading.title,
    author,
    category,
    spice: spice ? Number(spice) : null,
    tags,
    dek,
    body: reading.body,
  };

  try {
    console.log(`${label} ${reading.slug} (${reading.title})…`);
    const newBody = await generateReview(meta);
    const md = writeReadingFile(reading.front, newBody);
    await writeFile(join(READINGS_DIR, reading.file), md, "utf8");

    await lockedWrite(async () => {
      const manifestEntry = findManifestEntry(reading.title, author);
      if (manifestEntry && !skipManifest) {
        manifestEntry.body = newBody;
        manifestDirty = true;
      }

      if (!progress.completed.includes(reading.slug)) {
        progress.completed.push(reading.slug);
      }
      completedSet.add(reading.slug);
      progress.updated_at = new Date().toISOString();
      await writeFile(progressPath, JSON.stringify(progress, null, 2), "utf8");

      if (manifestDirty && !skipManifest && progress.completed.length % MANIFEST_EVERY === 0) {
        await writeFile(MANIFEST_PATH, JSON.stringify({ entries: manifestEntries }, null, 2), "utf8");
        manifestDirty = false;
        console.log(`  manifest checkpoint (${progress.completed.length} total)`);
      }
    });
  } catch (err) {
    console.error(`FAILED ${reading.slug}:`, err.message);
    await lockedWrite(async () => {
      progress.failed = (progress.failed || []).filter((f) => f.slug !== reading.slug);
      progress.failed.push({
        slug: reading.slug,
        error: err.message,
        at: new Date().toISOString(),
      });
      await writeFile(progressPath, JSON.stringify(progress, null, 2), "utf8");
    });
  }
}

if (dryRun) {
  for (let i = 0; i < queue.length; i++) {
    console.log(`[dry-run] ${queue[i].slug} — ${queue[i].title}`);
  }
} else {
  const pending = queue.filter((r) => !completedSet.has(r.slug));
  let cursor = 0;

  async function runWorker() {
    while (true) {
      const idx = cursor++;
      if (idx >= pending.length) break;
      await processReading(pending[idx], `[${idx + 1}/${pending.length}]`);
      await new Promise((r) => setTimeout(r, 150));
    }
  }

  await Promise.all(Array.from({ length: parallel }, () => runWorker()));
}

if (!dryRun) {
  await writeChain;
  if (manifestDirty && !skipManifest) {
    await writeFile(MANIFEST_PATH, JSON.stringify({ entries: manifestEntries }, null, 2), "utf8");
  }
  console.log(`Done. ${progress.completed.length} ok, ${(progress.failed || []).length} failed.`);
}
