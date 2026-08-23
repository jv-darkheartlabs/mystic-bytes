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
  "the-ballad-of-songbirds-and-snakes",
  "sunrise-on-the-reaping",
  "divergent-divergent-1",
  "insurgent-divergent-2",
  "allegiant-divergent-3",
  "inside-divergent-the-initiates-world",
  "the-maze-runner-the-maze-runner-1",
  "the-scorch-trials-the-maze-runner-2",
  "the-scorch-trials-scorch-trials-paperback",
  "the-death-cure-the-maze-runner-3",
  "the-maze-runner-my-friend-george",
  "uglies-uglies-1",
  "the-5th-wave-the-5th-wave-1",
  "the-sisterhood-of-the-traveling-pants-sisterhood-1",
  "a-good-girls-guide-to-murder-a-good-girls-guide-to-murder-1",
  "one-of-us-is-lying-one-of-us-is-lying-1",
]);

const CLASSIC_AUTHOR_RE =
  /\b(austen|dickens|bront[eë]|mary shelley|bram stoker|shakespeare|tolstoy|dostoevsky|dostoyevsky|kafka|woolf|homer|chaucer|milton|poe|wilde|hemingway|fitzgerald|faulkner|orwell|huxley|camus|dante|goethe|flaubert|melville|hawthorne|twain|wharton|conrad|chekhov|ibsen|plato|aristotle|nietzsche|dumas|hugo|cervantes|joyce, james|james joyce|george eliot|charlotte bront|emily bront|anne bront|jonathan swift|jack london|harriet beecher|hermann hesse|stephen crane|tennessee williams|walker percy|robert penn warren|h\.?\s*g\.?\s*wells|arthur conan doyle|erich maria remarque)\b/i;

/** Desire-plus-danger romance. Not the leftover thriller dump. */
const RS_AUTHORS = new Set([
  "catherine cowles",
  "devney perry",
  "alexis patton",
  "rina kent",
  "trilina pucci",
  "tylor paige",
  "sj tilly",
  "brea alepou",
  "karin winter",
]);

const RS_SLUGS = new Set(["my-killer-vacation", "hans-alliance-4", "verity"]);

const MEMOIR = new Set([
  "i know why the caged bird sings",
  "on writing a memoir of the craft",
  "on writing",
  "the diary of a young girl",
  "the proud highway saga of a desperate southern gentleman 1955 1967",
  "the proud highway",
  "eat pray love",
  "running with scissors",
  "me talk pretty one day",
  "girl interrupted",
  "under the tuscan sun at home in italy",
  "fear and loathing in las vegas",
  "hell s angels",
  "the rum diary",
  "fast food nation",
  "freakonomics",
  "who moved my cheese",
  "the elements of style",
  "heaven is for real",
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
  "the pelican brief",
  "the rainmaker",
  "the runaway jury",
  "along came a spider",
  "casino royale",
  "the bourne identity",
  "the woman in the window",
  "the housemaid",
  "big little lies",
  "the lincoln lawyer",
  "red dragon",
  "verity",
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
  "dark matter",
  "recursion",
  "the hitchhiker s guide to the galaxy",
  "the time machine",
  "the war of the worlds",
  "jurassic park",
  "sphere",
  "do androids dream of electric sheep",
  "starship troopers",
  "world war z",
  "station eleven",
  "the gunslinger",
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
  "jaws",
  "invasion of the body snatchers",
  "the stand",
  "misery",
  "the mist",
  "cell",
  "thinner",
  "the running man",
]);

const HISTORICAL = new Set([
  "the help",
  "the frozen river",
  "between shades of gray",
  "the nightingale",
  "the four winds",
  "the alice network",
  "code name helene",
  "all quiet on the western front",
  "water for elephants",
]);

/** Author → category for the leftover dark-thriller dump. First match wins. */
const AUTHOR_CATEGORY = {
  "stephen king": "horror",
  "richard bachman": "horror",
  "peter benchley": "horror",
  "blake crouch": "sff",
  "douglas adams": "sff",
  "michael crichton": "sff",
  "max brooks": "sff",
  "philip k dick": "sff",
  "robert a heinlein": "sff",
  "justin cronin": "sff",
  "kyla stone": "sff",
  "tom clancy": "mystery-crime",
  "john grisham": "mystery-crime",
  "james patterson": "mystery-crime",
  "dan brown": "mystery-crime",
  "stieg larsson": "mystery-crime",
  "thomas harris": "mystery-crime",
  "elizabeth george": "mystery-crime",
  "agatha christie": "mystery-crime",
  "arthur conan doyle": "mystery-crime",
  "ian fleming": "mystery-crime",
  "robert ludlum": "mystery-crime",
  "michael connelly": "mystery-crime",
  "jeffery deaver": "mystery-crime",
  "james ellroy": "mystery-crime",
  "freida mcfadden": "mystery-crime",
  "lisa jewell": "mystery-crime",
  "ruth ware": "mystery-crime",
  "riley sager": "mystery-crime",
  "paula hawkins": "mystery-crime",
  "a.j. finn": "mystery-crime",
  "aj finn": "mystery-crime",
  "mary kubica": "mystery-crime",
  "sally hepworth": "mystery-crime",
  "liane moriarty": "mystery-crime",
  "alyssa cole": "mystery-crime",
  "ashley elston": "mystery-crime",
  "ashley audrain": "mystery-crime",
  "cara hunter": "mystery-crime",
  "catherine steadman": "mystery-crime",
  "chris whitaker": "mystery-crime",
  "laura dave": "mystery-crime",
  "julie clark": "mystery-crime",
  "rachel hawkins": "mystery-crime",
  "taylor stevens": "mystery-crime",
  "stuart turton": "mystery-crime",
  "alicia bessette": "mystery-crime",
  "kiersten modglin": "mystery-crime",
  "sarah pinborough": "mystery-crime",
  "elin hilderbrand": "mystery-crime",
  "james caine": "mystery-crime",
  "noelle w ihli": "mystery-crime",
  "mark edwards": "mystery-crime",
  "sue minix": "mystery-crime",
  "chelsea ichaso": "mystery-crime",
  "sara ennis": "mystery-crime",
  "iliana xander": "mystery-crime",
  "david michaels": "mystery-crime",
  "nicholas pileggi": "mystery-crime",
  "dick lehr": "mystery-crime",
  "beverly cleary": "juvenile-fiction",
  "h.a. rey": "juvenile-fiction",
  "ha rey": "juvenile-fiction",
  "kate dicamillo": "juvenile-fiction",
  "jeff kinney": "juvenile-fiction",
  "lemony snicket": "juvenile-fiction",
  "sid fleischman": "juvenile-fiction",
  "phyllis reynolds naylor": "juvenile-fiction",
  "wilson rawls": "juvenile-fiction",
  "fred gipson": "juvenile-fiction",
  "kristin hannah": "historical",
  "kate quinn": "historical",
  "ruta sepetys": "historical",
  "kristin harmel": "historical",
  "ariel lawhon": "historical",
  "georgia hunter": "historical",
  "martha hall kelly": "historical",
  "kelly rimmer": "historical",
  "heather webb": "historical",
  "c. k. mcadam": "historical",
  "ck mcadam": "historical",
  "hunter s thompson": "memoir-nonfiction",
  "augusten burroughs": "memoir-nonfiction",
  "david sedaris": "memoir-nonfiction",
  "elizabeth gilbert": "memoir-nonfiction",
  "frances mayes": "memoir-nonfiction",
  "susanna kaysen": "memoir-nonfiction",
  "eric schlosser": "memoir-nonfiction",
  "steven d levitt": "memoir-nonfiction",
  "mark manson": "memoir-nonfiction",
  "rhonda byrne": "memoir-nonfiction",
  "richard carlson": "memoir-nonfiction",
  "spencer johnson": "memoir-nonfiction",
  "william strunk jr": "memoir-nonfiction",
  "adam robinson": "memoir-nonfiction",
  "david burke": "memoir-nonfiction",
  "alexis munier": "memoir-nonfiction",
  "todd burpo": "memoir-nonfiction",
  "antoine de saint-exupery": "memoir-nonfiction",
  "antoine de saint-exupéry": "memoir-nonfiction",
  "amy tan": "literary-fiction",
  "anthony doerr": "literary-fiction",
  "bret easton ellis": "literary-fiction",
  "chuck palahniuk": "literary-fiction",
  "cormac mccarthy": "literary-fiction",
  "donna tartt": "literary-fiction",
  "delia owens": "literary-fiction",
  "emily st john mandel": "literary-fiction",
  "hernan diaz": "literary-fiction",
  "hubert selby jr": "literary-fiction",
  "ian mcewan": "literary-fiction",
  "ken kesey": "literary-fiction",
  "khaled hosseini": "literary-fiction",
  "sue monk kidd": "literary-fiction",
  "sylvia plath": "literary-fiction",
  "yann martel": "literary-fiction",
  "allegra goodman": "literary-fiction",
  "jodi picoult": "literary-fiction",
  "rebecca wells": "literary-fiction",
  "sara gruen": "literary-fiction",
  "n.h. kleinbaum": "literary-fiction",
  "nh kleinbaum": "literary-fiction",
  "rupi kaur": "literary-fiction",
  "walker percy": "classic-literature",
  "robert penn warren": "classic-literature",
  "peter shaffer": "classic-literature",
  "david mamet": "classic-literature",
  "james dickey": "literary-fiction",
  "john berendt": "literary-fiction",
  "erik larson": "historical",
  "alan moore": "sff",
};

const NONFICTION_SLUG_RE =
  /^(word-smart|math-smart|street-french|talk-dirty-french|heathkit|schaums-outline|merriam-webster|how-to-write|how-not-to-write|think-like|freakonomics|who-moved|dont-sweat|the-secret-the-secret|the-elements-of-style|perceiving-the-arts|experience-psychology|philosophy-of-religion|the-adweek|the-four-year-career|essential-essays|minimalist-living|write-good-or-die|why-literature|what-poets|writing-to-wake|heaven-is-for-real|three-cups|nikola-tesla|the-davinci-code-a-quest|dan-brown-inferno|hitchhikers-guide-to-the-galaxy-the-filming|the-story-of-charlottes-web|the-road-to-the-dark-tower|diary-of-a-freedom-writer)/;

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

function normAuthor(author) {
  return (author || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function categoryForAuthor(author) {
  const n = normAuthor(author);
  if (!n) return null;
  for (const [key, cat] of Object.entries(AUTHOR_CATEGORY)) {
    const k = normAuthor(key);
    if (!k) continue;
    if (n === k || n.startsWith(`${k} `) || n.startsWith(`${k} and `)) return cat;
  }
  return null;
}

function isRsAuthor(author) {
  const n = normAuthor(author);
  for (const key of RS_AUTHORS) {
    const k = normAuthor(key);
    if (n === k || n.startsWith(`${k} `) || n.includes(` ${k}`)) return true;
  }
  return false;
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

  const byAuthor =
    current === "dark-thriller" || current === "romantic-suspense"
      ? categoryForAuthor(author)
      : null;
  if (byAuthor) {
    return { category: byAuthor, rule: "author-map" };
  }

  if ((current === "dark-thriller" || current === "romantic-suspense") && NONFICTION_SLUG_RE.test(slug)) {
    return { category: "memoir-nonfiction", rule: "nonfiction-slug" };
  }

  if (slug === "mister-and-missus-ebook-bundle") {
    return { category: "dark-billionaire", rule: "el-james-bundle" };
  }
  if (RS_SLUGS.has(slug) || isRsAuthor(author)) {
    if (current === "dark-thriller" || current === "romantic-suspense" || RS_SLUGS.has(slug)) {
      return { category: "romantic-suspense", rule: "rs-keep" };
    }
  }

  if (ROMANCE_TROPES.has(current) && current !== "gothic-horror-romance" && current !== "romantic-suspense") {
    return { category: current, rule: "romance-trope-kept" };
  }
  if (current === "gothic-horror-romance") {
    return { category: "gothic-horror-romance", rule: "remainder-ghr" };
  }
  if (current === "dark-thriller" || current === "romantic-suspense") {
    return { category: "literary-fiction", rule: "remainder-thriller-not-rs" };
  }
  if (current === "classic-literature" || current === "juvenile-fiction" || current === "ya-fiction") {
    return { category: current, rule: "already-parked" };
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
