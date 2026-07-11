/**
 * Assign date_read across JV's reading life (born 1980).
 * School 1986–1998 · college 1999–2002 · adult 2003–2026.
 */
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  BIRTH_YEAR,
  dateReadFromGrade,
  suggestedGrade,
} from "./goodreads-date-read.mjs";
import { eraFromYear } from "./review-voice-by-era.mjs";
import { classifySchoolCanon } from "./school-canon-categories.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));

const COLLEGE_TITLES = new Set([
  "frankenstein",
  "moby dick",
  "moby dick or the whale",
  "beyond good and evil",
  "the scarlet letter",
  "pride and prejudice",
  "mere christianity",
  "the awakening",
  "heart of darkness",
  "the republic",
  "thus spoke zarathustra",
  "crime and punishment",
  "war and peace",
  "anna karenina",
  "the brothers karamazov",
  "paradise lost",
  "the odyssey",
  "the iliad",
  "don quixote",
  "wuthering heights",
  "jane eyre",
  "great expectations",
  "bleak house",
  "middlemarch",
  "the picture of dorian gray",
  "a portrait of the artist as a young man",
  "ulysses",
  "the waste land",
]);

const ORCHID_CATEGORIES = new Set([
  "gothic-horror-romance",
  "fantasy-romance",
  "forbidden-love",
  "enemies-to-lovers",
  "bully-romance",
  "captor-and-captive",
  "dark-billionaire",
  "mafia-boss-and-innocent",
  "reverse-harem",
  "stalker-obsession",
  "vampire-paranormal",
  "omegaverse",
  "rockstar-romance",
  "motorcycle-club",
  "dark-cowboy-romance",
  "dark-military-romance",
  "age-gap",
  "arranged-marriage",
]);

const ADULT_THRILLER_CATEGORIES = new Set(["dark-thriller", "thriller", "mystery"]);

function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function coreTitle(title) {
  let n = norm(title);
  for (const stop of [" book ", " a ", " the ", " and other "]) {
    if (n.includes(stop)) n = n.split(stop)[0].trim();
  }
  return n;
}

function parseSeries(slug) {
  const nd = slug.match(/^nancy-drew-(\d{2})-/);
  if (nd) return { series: "nancy-drew", num: Number(nd[1]) };
  const hb = slug.match(/^hardy-boys-(\d{2})-/);
  if (hb) return { series: "hardy-boys", num: Number(hb[1]) };
  return null;
}

function seriesGrade(num, total, gradeStart, gradeEnd) {
  const span = gradeEnd - gradeStart;
  const idx = Math.max(0, Math.min(total - 1, num - 1));
  const grade = gradeStart + Math.floor((idx / (total - 1)) * span);
  return Math.max(gradeStart, Math.min(gradeEnd, grade));
}

function matchesTitleSet(core, set) {
  if (set.has(core)) return true;
  for (const key of set) {
    if (core.startsWith(key) && key.length >= 10) return true;
    if (key.startsWith(core) && core.length >= 10) return true;
  }
  return false;
}

function collegeYearFromTitle(title, sortKey = 0) {
  const core = coreTitle(title);
  let idx = [...COLLEGE_TITLES].findIndex((t) => matchesTitleSet(core, new Set([t])));
  if (idx < 0) idx = Math.abs(sortKey) % COLLEGE_TITLES.size;
  return 1999 + (idx % 4);
}

function adultYearFromMeta({ category, title, sortKey = 0, pubYear }) {
  const cat = category || "";
  const sk = Number(sortKey) || 0;
  if (ORCHID_CATEGORIES.has(cat)) {
    const base = 2015 + (sk % 12);
    return Math.min(2026, base);
  }
  if (ADULT_THRILLER_CATEGORIES.has(cat)) {
    return 2005 + (sk % 10);
  }
  if (pubYear && pubYear >= 2003) {
    return Math.min(2026, Math.max(2003, pubYear + (sk % 3)));
  }
  return 2003 + (sk % 12);
}

function midYearDate(year, sortKey = 0) {
  const month = 3 + (Math.abs(sortKey) % 9);
  const day = 1 + (Math.abs(sortKey * 3) % 27);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

let seriesCanons = null;

async function loadSeriesCanons() {
  if (seriesCanons) return seriesCanons;
  seriesCanons = JSON.parse(await readFile(join(DIR, "series-canons.json"), "utf8"));
  return seriesCanons;
}

/**
 * @param {{
 *   slug: string,
 *   title: string,
 *   author?: string,
 *   category?: string,
 *   sort_key?: number|string,
 *   original_pub_year?: number,
 *   series?: string,
 *   series_number?: number,
 * }} meta
 */
export async function assignDateRead(meta) {
  const slug = meta.slug || "";
  const title = meta.title || "";
  const author = meta.author || "";
  const sortKey = Number(meta.sort_key) || 0;
  const pubYear = meta.original_pub_year ?? null;

  const canons = await loadSeriesCanons();
  const parsed = parseSeries(slug);
  if (parsed) {
    const canon = canons[parsed.series];
    if (canon) {
      const grade = seriesGrade(
        parsed.num,
        canon.books.length,
        canon.grade_start,
        canon.grade_end
      );
      const year = BIRTH_YEAR + 6 + grade;
      return {
        date_read: dateReadFromGrade(grade),
        era: eraFromYear(year),
        grade,
        source: "series-order",
        rationale: `${parsed.series} #${parsed.num} → grade ${grade}`,
      };
    }
  }

  if (slug === "nancy-drew-1-64") {
    const grade = 6;
    return {
      date_read: dateReadFromGrade(grade),
      era: eraFromYear(BIRTH_YEAR + 6 + grade),
      grade,
      source: "box-set-school",
      rationale: "ND 1–64 box set → middle school collection read",
    };
  }

  const core = coreTitle(title);
  if (matchesTitleSet(core, COLLEGE_TITLES)) {
    const year = collegeYearFromTitle(title, sortKey);
    return {
      date_read: midYearDate(year, sortKey),
      era: eraFromYear(year),
      grade: null,
      source: "college-canon",
      rationale: `College-assigned canon → ${year}`,
    };
  }

  const school = classifySchoolCanon({
    slug,
    title,
    author,
    category: meta.category,
    tags: meta.tags,
  });
  if (school && school.kind !== "mystery-series") {
    const grade = suggestedGrade(title, author);
    const year = BIRTH_YEAR + 6 + grade;
    return {
      date_read: dateReadFromGrade(grade),
      era: eraFromYear(year),
      grade,
      source: "school-canon",
      rationale: `${school.reason} → grade ${grade}`,
    };
  }

  if (pubYear != null && pubYear < BIRTH_YEAR) {
    const grade = suggestedGrade(title, author);
    const year = BIRTH_YEAR + 6 + grade;
    return {
      date_read: dateReadFromGrade(grade),
      era: eraFromYear(year),
      grade,
      source: "school-grade",
      rationale: `Pre-${BIRTH_YEAR} publication → grade ${grade}`,
    };
  }

  const year = adultYearFromMeta({ category: meta.category, title, sortKey, pubYear });
  return {
    date_read: midYearDate(year, sortKey),
    era: eraFromYear(year),
    grade: null,
    source: "adult-stagger",
    rationale: `Adult genre-weighted stagger → ${year}`,
  };
}
