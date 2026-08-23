/**
 * Recategorize _readings into four lanes. Frontmatter only.
 *
 * Usage:
 *   node scripts/readings/recategorize-lanes.mjs [--dry-run]
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CLASSIC_LIT,
  GOTHIC_CLASSICS,
  JUVENILE,
  LITERARY_CONTEMPORARY,
  PHILOSOPHY,
  coreTitle,
  matchesSet,
} from "./school-canon-categories.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const READINGS_DIR = join(ROOT, "_readings");
const YAML_PATH = join(ROOT, "_data/reading_categories.yml");
const OVERRIDES_PATH = join(ROOT, "_data/reading_recategorize_overrides.yml");
const REPORT_PATH = join(DIR, "recategorize-lanes-report.json");

const ROMANCE_TROPES = new Set([
  "age-gap",
  "arranged-marriage",
  "bully-romance",
  "captor-and-captive",
  "dark-billionaire",
  "dark-cowboy-romance",
  "dark-military-romance",
  "enemies-to-lovers",
  "forbidden-love",
  "gothic-horror-romance",
  "mafia-boss-and-innocent",
  "motorcycle-club",
  "omegaverse",
  "reverse-harem",
  "rockstar-romance",
  "stalker-obsession",
  "vampire-paranormal",
  "fantasy-romance",
  "romantic-suspense",
]);

const YA_SLUGS = new Set([
  "the-hunger-games",
  "catching-fire",
  "mockingjay",
  "divergent-divergent-1",
  "insurgent-divergent-2",
  "allegiant-divergent-3",
  "the-maze-runner-the-maze-runner-1",
  "the-scorch-trials-the-maze-runner-2",
  "the-scorch-trials-scorch-trials-paperback",
  "the-death-cure-the-maze-runner-3",
]);

const CLASSIC_AUTHOR_RE =
  /\b(austen|dickens|bront[eë]|mary shelley|bram stoker|shakespeare|tolstoy|dostoevsky|dostoyevsky|kafka|woolf|homer|chaucer|milton|poe|wilde|hemingway|fitzgerald|faulkner|orwell|huxley|camus|dante|goethe|flaubert|melville|hawthorne|twain|wharton|conrad|chekhov|ibsen|plato|aristotle|nietzsche|dumas|hugo|cervantes|joyce, james|james joyce|george eliot|charlotte bront|emily bront|anne bront)\b/i;

const MEMOIR = new Set([
  "i know why the caged bird sings",
  "on writing a memoir of the craft",
  "on writing",
  "the diary of a young girl",
  "the proud highway saga of a desperate southern gentleman 1955 1967",
  "the proud highway",
]);

const MYSTERY = new Set([
  "and then there were none",
  "gone girl",
  "a time to kill jake brigance 1",
  "a time to kill",
  "the girl with the dragon tattoo millennium 1",
  "the girl with the dragon tattoo",
  "the client",
  "the thursday murder club thursday murder club 1",
  "murder on the orient express",
  "the silence of the lambs",
  "the silence of the lambs hannibal lecter 2",
  "the godfather",
]);

const SFF = new Set([
  "dune",
  "dune dune 1",
  "project hail mary",
  "seveneves",
  "a wizard of earthsea",
  "the left hand of darkness",
  "neuromancer",
  "hyperion",
  "the andromeda strain",
  "foundation",
  "enders game",
  "ender s game",
  "2001 a space odyssey",
  "2001 a space odyssey space odyssey 1",
]);

const HORROR = new Set([
  "carrie",
  "cujo",
  "the shining",
  "the exorcist the exorcist 1",
  "the exorcist",
  "pet sematary",
  "salem s lot",
  "nos4a2",
  "it",
]);

const HISTORICAL = new Set([
  "the help",
  "the frozen river",
  "between shades of gray",
]);

const JUVENILE_ROMANCE_CW = /^(sexual content|explicit sex|dubcon|noncon|non-con|spice|on-page sex)$/i;

function coresOf(title) {
  const c = coreTitle(title);
  const out = [c];
  if (c.startsWith("the ")) out.push(c.slice(4));
  return out;
}

function matchTitle(title, set) {
  return coresOf(title).some((c) => matchesSet(c, set) || set.has(c));
}

function parseOverrides(raw) {
  const out = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([a-z0-9-]+):\s*([a-z0-9-]+)\s*$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

function parseLanes(yaml) {
  const lanes = {};
  let current = null;
  for (const line of yaml.split("\n")) {
    const cat = line.match(/^  ([a-z0-9-]+):\s*$/);
    if (cat && !line.includes("families") && cat[1] !== "categories") {
      current = cat[1];
      continue;
    }
    const lane = line.match(/^\s+lane:\s*(\S+)/);
    if (lane && current) lanes[current] = lane[1];
  }
  return lanes;
}

function parseFront(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  return { front: m[1], body: m[2] };
}

function field(front, key) {
  const m = front.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
  if (!m) return "";
  return m[1].trim().replace(/^["']|["']$/g, "");
}

function setField(front, key, value) {
  const re = new RegExp(`^${key}:.*$`, "m");
  const line = `${key}: ${value}`;
  if (re.test(front)) return front.replace(re, line);
  return `${front}\n${line}`;
}

function removeField(front, key) {
  return front.replace(new RegExp(`^${key}:.*\\n?`, "m"), "");
}

function filterContentWarnings(front, lane) {
  if (lane !== "juvenile") return front;
  const block = front.match(/^content_warnings:\n((?:  - .+\n)*)/m);
  if (!block) return front;
  const kept = [...block[1].matchAll(/  - ["']?([^"'\n]+)["']?/g)]
    .map((x) => x[1].trim())
    .filter((cw) => !JUVENILE_ROMANCE_CW.test(cw));
  const next =
    kept.length === 0
      ? "content_warnings:\n"
      : `content_warnings:\n${kept.map((cw) => `  - "${cw}"`).join("\n")}\n`;
  return front.replace(/^content_warnings:\n((?:  - .+\n)*)/m, next);
}

function isYaSlug(slug) {
  if (slug.startsWith("harry-potter")) return true;
  return YA_SLUGS.has(slug);
}

function isJuvenileSeriesSlug(slug) {
  return (
    /^nancy-drew-/.test(slug) ||
    /^hardy-boys-/.test(slug) ||
    slug === "nancy-drew-1-64" ||
    /^ramona/.test(slug) ||
    /^beezus-/.test(slug) ||
    /dr-seuss/.test(slug) ||
    /^if-you-give-/.test(slug)
  );
}

export function resolveLaneCategory(meta, overrides = {}) {
  const slug = meta.slug || "";
  const title = meta.title || "";
  const author = meta.author || "";
  const current = meta.category || "";
  const core = coreTitle(title);

  if (overrides[slug]) {
    return { category: overrides[slug], rule: "override" };
  }

  if (isJuvenileSeriesSlug(slug)) {
    return { category: "juvenile-fiction", rule: "series-juvenile" };
  }
  if (isYaSlug(slug)) {
    return { category: "ya-fiction", rule: "series-ya" };
  }

  if (matchTitle(title, GOTHIC_CLASSICS)) {
    return { category: "classic-literature", rule: "gothic-classic" };
  }
  if (matchTitle(title, JUVENILE)) {
    if (/harry potter/.test(core)) {
      return { category: "ya-fiction", rule: "juvenile-potter" };
    }
    return { category: "juvenile-fiction", rule: "juvenile-set" };
  }
  if (matchTitle(title, PHILOSOPHY)) {
    return { category: "philosophy-criticism", rule: "philosophy" };
  }
  if (matchTitle(title, CLASSIC_LIT)) {
    return { category: "classic-literature", rule: "classic-set" };
  }
  if (matchTitle(title, LITERARY_CONTEMPORARY)) {
    const keepTrope =
      ROMANCE_TROPES.has(current) &&
      current !== "gothic-horror-romance" &&
      current !== "romantic-suspense";
    if (keepTrope) {
      return { category: current, rule: "literary-contemporary-kept-trope" };
    }
    return { category: "literary-fiction", rule: "literary-contemporary" };
  }

  if (CLASSIC_AUTHOR_RE.test(author) || CLASSIC_AUTHOR_RE.test(title)) {
    return { category: "classic-literature", rule: "classic-author" };
  }

  if (matchesSet(core, MEMOIR) || matchTitle(title, MEMOIR) || /maya angelou/i.test(author)) {
    return { category: "memoir-nonfiction", rule: "memoir" };
  }

  if (matchTitle(title, MYSTERY)) {
    return { category: "mystery-crime", rule: "mystery" };
  }
  if (matchTitle(title, SFF)) {
    return { category: "sff", rule: "sff" };
  }
  if (matchTitle(title, HORROR)) {
    return { category: "horror", rule: "horror" };
  }
  if (matchTitle(title, HISTORICAL)) {
    return { category: "historical", rule: "historical" };
  }

  if (ROMANCE_TROPES.has(current) && current !== "gothic-horror-romance") {
    return { category: current, rule: "romance-trope-kept" };
  }
  if (current === "gothic-horror-romance") {
    return { category: "gothic-horror-romance", rule: "remainder-ghr" };
  }
  if (current === "dark-thriller") {
    return { category: "romantic-suspense", rule: "remainder-thriller" };
  }
  if (current === "classic-literature" || current === "juvenile-fiction" || current === "ya-fiction") {
    return { category: current, rule: "already-parked" };
  }
  if (current === "romantic-suspense") {
    return { category: current, rule: "already-rs" };
  }

  return { category: current || "literary-fiction", rule: "unchanged" };
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const yaml = await readFile(YAML_PATH, "utf8");
  const lanes = parseLanes(yaml);
  const overrides = parseOverrides(await readFile(OVERRIDES_PATH, "utf8"));
  const files = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));

  const changes = [];
  const unknown = [];
  let spiceStripped = 0;
  let cwStripped = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const path = join(READINGS_DIR, file);
    const raw = await readFile(path, "utf8");
    const parsed = parseFront(raw);
    if (!parsed) continue;
    let { front, body } = parsed;
    const from = field(front, "category");
    const title = field(front, "title");
    const author = field(front, "author");
    const { category, rule } = resolveLaneCategory(
      { slug, title, author, category: from },
      overrides
    );

    if (!lanes[category]) {
      unknown.push({ slug, category, rule, from });
      continue;
    }

    let nextFront = setField(front, "category", category);
    const lane = lanes[category];
    if (lane !== "romance") {
      if (/^spice:/m.test(nextFront)) {
        nextFront = removeField(nextFront, "spice");
        spiceStripped += 1;
      }
    }
    const beforeCw = nextFront;
    nextFront = filterContentWarnings(nextFront, lane);
    if (nextFront !== beforeCw) cwStripped += 1;

    if (from !== category || nextFront !== front) {
      changes.push({ slug, from, to: category, rule, lane });
      if (!dryRun) {
        await writeFile(path, `---\n${nextFront}\n---\n${body}`);
      }
    }
  }

  if (unknown.length) {
    console.error(`unknown categories: ${unknown.length}`);
    console.error(unknown.slice(0, 20));
    process.exitCode = 1;
  }

  const report = {
    dryRun,
    changed: changes.length,
    spiceStripped,
    cwStripped,
    unknown,
    byRule: Object.groupBy
      ? undefined
      : null,
    changes,
  };
  const byRule = {};
  for (const c of changes) {
    byRule[c.rule] = (byRule[c.rule] || 0) + 1;
  }
  report.byRule = byRule;
  await writeFile(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(
    `${dryRun ? "dry-run " : ""}changed=${changes.length} spice_stripped=${spiceStripped} unknown=${unknown.length} report=${REPORT_PATH}`
  );
}

const invokedDirectly = (process.argv[1] || "").replace(/\\/g, "/").endsWith("/recategorize-lanes.mjs");
if (invokedDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
