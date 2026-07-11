/**
 * Category assignment for school-era canon (1986–2002 reading life).
 * Fixes mis-tagged gothic-horror-romance / fantasy-romance on classics & children's books.
 */
import { BIRTH_YEAR, suggestedGrade } from "./goodreads-date-read.mjs";

const GOTHIC_CLASSICS = new Set([
  "frankenstein",
  "dracula",
  "the picture of dorian gray",
  "wuthering heights",
  "jane eyre",
  "the turn of the screw",
  "the fall of the house of usher",
  "the tell tale heart",
  "the cask of amontillado",
  "the masque of the red death",
  "the pit and the pendulum",
  "the raven",
  "the haunting of hill house",
  "rebecca",
  "the woman in white",
  "carmilla",
  "the strange case of dr jekyll and mr hyde",
  "the scarlet letter",
  "the awakening",
  "the bloody chamber",
]);

const CLASSIC_LIT = new Set([
  "to kill a mockingbird",
  "the great gatsby",
  "fahrenheit 451",
  "animal farm",
  "1984",
  "lord of the flies",
  "the catcher in the rye",
  "of mice and men",
  "a separate peace",
  "in cold blood",
  "romeo and juliet",
  "hamlet",
  "macbeth",
  "othello",
  "king lear",
  "a midsummer night s dream",
  "the odyssey",
  "the iliad",
  "moby dick",
  "moby dick or the whale",
  "pride and prejudice",
  "great expectations",
  "a tale of two cities",
  "bleak house",
  "middlemarch",
  "don quixote",
  "war and peace",
  "anna karenina",
  "crime and punishment",
  "the brothers karamazov",
  "beyond good and evil",
  "thus spoke zarathustra",
  "the republic",
  "mere christianity",
  "the divine comedy",
  "paradise lost",
  "the canterbury tales",
  "beowulf",
  "the aeneid",
  "heart of darkness",
  "the sun also rises",
  "for whom the bell tolls",
  "the old man and the sea",
  "a farewell to arms",
  "grapes of wrath",
  "east of eden",
  "the pearl",
  "silas marner",
  "the crucible",
  "our town",
  "death of a salesman",
  "long day s journey into night",
  "a raisin in the sun",
  "the color purple",
  "beloved",
  "their eyes were watching god",
  "invisible man",
  "native son",
  "the stranger",
  "the plague",
  "the trial",
  "madame bovary",
  "les miserables",
  "the count of monte cristo",
  "treasure island",
  "the adventures of huckleberry finn",
  "the adventures of tom sawyer",
  "around the world in eighty days",
  "journey to the center of the earth",
  "twenty thousand leagues under the sea",
  "good omens",
  "memoirs of a geisha",
  "wicked",
  "the kite runner",
  "the time traveler s wife",
]);

const JUVENILE = new Set([
  "charlotte s web",
  "charlottes web",
  "stuart little",
  "the trumpet of the swan",
  "the giving tree",
  "where the wild things are",
  "the outsiders",
  "the lion the witch and the wardrobe",
  "the magician s nephew",
  "the horse and his boy",
  "the silver chair",
  "the voyage of the dawn treader",
  "the last battle",
  "matilda",
  "charlie and the chocolate factory",
  "james and the giant peach",
  "the bfg",
  "the witches",
  "holes",
  "bridge to terabithia",
  "a wrinkle in time",
  "the giver",
  "number the stars",
  "island of the blue dolphins",
  "johnny tremain",
  "little house on the prairie",
  "little women",
  "anne of green gables",
  "the secret garden",
  "black beauty",
  "the wind in the willows",
  "peter pan",
  "alice s adventures in wonderland",
  "through the looking glass",
  "the hobbit",
  "harry potter and the sorcerer s stone",
  "harry potter and the chamber of secrets",
  "harry potter and the prisoner of azkaban",
  "harry potter and the goblet of fire",
  "harry potter and the order of the phoenix",
  "harry potter and the half blood prince",
  "harry potter and the deathly hallows",
  "harry potter and the philosopher s stone",
]);

const MYSTERY_SERIES = /^nancy-drew-|^hardy-boys-|^nancy-drew-1-64$/;

const ROMANCE_CATEGORIES = new Set([
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

function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function coreTitle(title) {
  let n = norm(title);
  for (const stop of [
    " and other ",
    " book ",
    " a graphic novel",
    " selected themes",
    " sheet music",
    " piano solos",
  ]) {
    if (n.includes(stop)) n = n.split(stop)[0].trim();
  }
  return n;
}

function matchesSet(core, set) {
  if (set.has(core)) return true;
  for (const key of set) {
    if (core.startsWith(key) && key.length >= 10) return true;
    if (key.startsWith(core) && core.length >= 10) return true;
  }
  return false;
}

export function classifySchoolCanon(meta) {
  const slug = meta.slug || "";
  const title = meta.title || "";
  const author = meta.author || "";
  const category = meta.category || "";
  const tags = meta.tags || [];
  const core = coreTitle(title);

  if (MYSTERY_SERIES.test(slug) || slug === "nancy-drew-1-64") {
    return { kind: "mystery-series", reason: "juvenile mystery series" };
  }
  if (matchesSet(core, GOTHIC_CLASSICS)) {
    return { kind: "gothic-classic", reason: "gothic school canon" };
  }
  if (matchesSet(core, JUVENILE)) {
    return { kind: "juvenile", reason: "children's / YA canon" };
  }
  if (matchesSet(core, CLASSIC_LIT)) {
    return { kind: "classic", reason: "literary canon" };
  }
  if (category === "juvenile-fiction") {
    return { kind: "juvenile", reason: "juvenile-fiction category" };
  }
  if (category === "classic-literature") {
    return { kind: "classic", reason: "classic-literature category" };
  }
  if (
    tags.some((t) =>
      /^(schoolcanon|juvenile|children|classicmystery|juvenilemystery|nancydrew)$/i.test(
        String(t).replace(/\s+/g, "")
      )
    )
  ) {
    if (slug.includes("drew") || slug.includes("hardy-boys")) {
      return { kind: "mystery-series", reason: "series tags" };
    }
    return { kind: "juvenile", reason: "school-canonical tags" };
  }
  return null;
}

/**
 * @param {{
 *   slug: string,
 *   title: string,
 *   author?: string,
 *   category?: string,
 *   tags?: string[],
 *   original_pub_year?: number|null,
 * }} meta
 * @returns {{ category: string, reason: string } | null} null if no change needed
 */
export function resolveSchoolCategory(meta) {
  const slug = meta.slug || "";
  const title = meta.title || "";
  const author = meta.author || "";
  const current = meta.category || "";
  const tags = meta.tags || [];
  const core = coreTitle(title);
  const pubYear = meta.original_pub_year ?? null;

  let target = null;
  let reason = "";

  if (MYSTERY_SERIES.test(slug) || slug === "nancy-drew-1-64") {
    target = "dark-thriller";
    reason = "juvenile mystery series";
  } else if (matchesSet(core, GOTHIC_CLASSICS)) {
    target = "gothic-horror-romance";
    reason = "gothic school canon";
  } else if (matchesSet(core, JUVENILE)) {
    target = "juvenile-fiction";
    reason = "children's / YA school read";
  } else if (matchesSet(core, CLASSIC_LIT)) {
    target = "classic-literature";
    reason = "school / college literary canon";
  } else if (pubYear != null && pubYear < BIRTH_YEAR) {
    const grade = suggestedGrade(title, author);
    if (grade <= 5) {
      target = "juvenile-fiction";
      reason = `pre-${BIRTH_YEAR} pub, elementary grade ${grade}`;
    } else if (grade <= 8) {
      target = "juvenile-fiction";
      reason = `pre-${BIRTH_YEAR} pub, middle grade ${grade}`;
    } else {
      target = "classic-literature";
      reason = `pre-${BIRTH_YEAR} pub, high-school grade ${grade}`;
    }
  } else if (
    tags.some((t) =>
      /^(juvenile|children|nancydrew|classicmystery|juvenilemystery|schoolcanon)$/i.test(
        t.replace(/\s+/g, "")
      )
    )
  ) {
    target = slug.includes("drew") || slug.includes("hardy-boys") ? "dark-thriller" : "juvenile-fiction";
    reason = "school-canonical tags";
  }

  if (!target || target === current) return null;
  if (!ROMANCE_CATEGORIES.has(current) && current === target) return null;

  // Only override when current category is a romance-family misfit for school canon
  if (target && ROMANCE_CATEGORIES.has(current)) {
    return { category: target, reason };
  }

  // Also fix dark-thriller on pure children's lit (Charlotte's Web etc.)
  if (
    target === "juvenile-fiction" &&
    (current === "gothic-horror-romance" || current === "dark-thriller")
  ) {
    return { category: target, reason };
  }

  return null;
}

export { ROMANCE_CATEGORIES, GOTHIC_CLASSICS, CLASSIC_LIT, JUVENILE };
