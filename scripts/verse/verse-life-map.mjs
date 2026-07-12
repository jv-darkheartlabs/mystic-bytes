/**
 * Assign date_written across JV's life (born 1980) by verse theme/category.
 * Mirrors reading-life-map era bands; publication date staggered separately.
 */
import { eraFromYear } from "../readings/review-voice-by-era.mjs";

const BIRTH_YEAR = 1980;

/** category folder → primary era band + year span within life */
const CATEGORY_ERA = {
  nature: { era: "middle", yearMin: 1992, yearMax: 1994 },
  curiosity: { era: "elementary", yearMin: 1987, yearMax: 1992 },
  "mind-and-self": { era: "orchid", yearMin: 2018, yearMax: 2024 },
  nola: { era: "middle", yearMin: 1992, yearMax: 2008 },
  love: { era: "orchid", yearMin: 2015, yearMax: 2024 },
  spirituality: { era: "college", yearMin: 1999, yearMax: 2014 },
  life: { era: "early-adult", yearMin: 2003, yearMax: 2018 },
  "grief-loss-resilience": { era: "high", yearMin: 1996, yearMax: 2022 },
  justice: { era: "college", yearMin: 1999, yearMax: 2016 },
  misc: { era: "gothic-edge", yearMin: 2010, yearMax: 2024 },
};

/** title/slug keyword nudges within category span */
const DARK_KEYWORDS = [
  "grief",
  "loss",
  "sadness",
  "betrayal",
  "violence",
  "death",
  "demon",
  "fire",
  "blood",
  "hate",
  "tragedy",
  "cowardice",
  "fear",
  "ensnared",
  "tempest",
];

const WARM_KEYWORDS = [
  "joy",
  "bliss",
  "innocence",
  "childhood",
  "friendship",
  "gratitude",
  "blessing",
  "laughter",
  "spring",
  "pet",
];

/** 2026 vacation travel — date_written anchors for place-themed curiosity/travel verse */
const TRAVEL_2026 = [
  { match: /auckland|aotearoa|tamaki|new zealand/, date_written: "2026-03-15" },
  { match: /sydney|australia/, date_written: "2026-04-15" },
  { match: /honolulu|hawaii|oahu/, date_written: "2026-05-15" },
];

/** Personal-lore source titles: rewrite in archive but exclude from public shelf */
const PERSONAL_LORE_PATTERN =
  /chewy|winston|troy|the muppet|tale of winston|tale of chewy/i;

export function isPersonalLoreOffSite({ slug = "", title = "" }) {
  return PERSONAL_LORE_PATTERN.test(`${slug} ${title}`);
}

function hashSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function monthDayFromHash(h) {
  const month = 1 + (h % 12);
  const day = 1 + ((h >>> 8) % 28);
  return { month, day };
}

/**
 * @param {{ slug: string, category: string, title?: string }} input
 * @returns {{ date_written: string, era: string, year: number }}
 */
export function assignDateWritten({ slug, category, title = "" }) {
  const text = `${slug} ${title}`.toLowerCase();

  for (const trip of TRAVEL_2026) {
    if (trip.match.test(text)) {
      const year = Number.parseInt(trip.date_written.slice(0, 4), 10);
      return {
        date_written: trip.date_written,
        era: eraFromYear(year),
        year,
      };
    }
  }

  const band = CATEGORY_ERA[category] || CATEGORY_ERA.life;
  const h = hashSlug(slug);

  let yearMin = band.yearMin;
  let yearMax = band.yearMax;

  if (DARK_KEYWORDS.some((k) => text.includes(k))) {
    yearMin = Math.max(yearMin, 1995);
    if (category === "love" || category === "nola") yearMin = Math.max(yearMin, 2003);
    if (category === "misc") yearMin = Math.max(yearMin, 2012);
  }

  if (WARM_KEYWORDS.some((k) => text.includes(k)) && category !== "misc") {
    yearMax = Math.min(yearMax, 1998);
    yearMin = Math.min(yearMin, yearMax);
  }

  const span = Math.max(1, yearMax - yearMin);
  const year = yearMin + (h % (span + 1));
  const { month, day } = monthDayFromHash(h);
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");

  return {
    date_written: `${year}-${mm}-${dd}`,
    era: eraFromYear(year),
    year,
  };
}

/**
 * Publication date: stagger after date_written, site launch window.
 * @param {number} sortKey
 * @param {string} dateWritten ISO date
 */
export function assignPublishDate(sortKey, dateWritten) {
  const writtenYear = Number.parseInt(dateWritten.slice(0, 4), 10);
  const pubYear = Math.max(2026, writtenYear >= 2015 ? 2026 : 2026);
  const month = 1 + (sortKey % 12);
  const day = 1 + ((sortKey >>> 4) % 28);
  return `${pubYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** @param {string} category */
export function defaultContentWarnings(category, title = "", tags = []) {
  const text = `${category} ${title} ${tags.join(" ")}`.toLowerCase();
  const cw = new Set();

  if (category === "grief-loss-resilience" || /grief|loss|bereav|sadness|death/.test(text)) {
    cw.add("grief");
  }
  if (/violence|blood|war|tyranny|shackle|hate|abuse/.test(text)) {
    cw.add("violence");
  }
  if (/betrayal|toxic|forbidden|temptation|passion|desire|kiss|smut/.test(text)) {
    cw.add("sexual themes");
  }
  if (/anxiety|fear|cowardice|self/.test(text)) {
    cw.add("emotional intensity");
  }
  if (category === "spirituality") {
    cw.add("mysticism");
  }
  if (/fire|storm|wrath|tempest/.test(text)) {
    cw.add("disturbing imagery");
  }
  if (category === "justice") {
    cw.add("violence");
  }

  return [...cw];
}

export function categoryEraTable() {
  return { ...CATEGORY_ERA, birthYear: BIRTH_YEAR };
}
