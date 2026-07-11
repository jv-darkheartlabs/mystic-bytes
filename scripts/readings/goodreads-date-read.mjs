/**
 * date_read helpers for Goodreads imports.
 *
 * - Books published before the reader's birth → typical US school-grade year
 * - Otherwise → Goodreads Date Read when present, else pipeline jitter
 *
 * Defaults: born 1980, began reading 1986 (1st grade). Override via READING_BIRTH_YEAR.
 */
export const BIRTH_YEAR = Number(process.env.READING_BIRTH_YEAR || 1980);
export const READING_START_YEAR = 1986;

/** Grade 0 = K … 12 = senior. College-ish = 13. */
const TITLE_GRADE = new Map([
  ["the trumpet of the swan", 3],
  ["charlottes web", 3],
  ["stuart little", 2],
  ["the giving tree", 2],
  ["where the wild things are", 1],
  ["animal farm", 9],
  ["fahrenheit 451", 10],
  ["lord of the flies", 10],
  ["to kill a mockingbird", 9],
  ["the great gatsby", 11],
  ["the catcher in the rye", 11],
  ["in cold blood", 11],
  ["the scarlet letter", 11],
  ["romeo and juliet", 9],
  ["hamlet", 11],
  ["macbeth", 10],
  ["the awakening", 11],
  ["a separate peace", 9],
  ["of mice and men", 9],
  ["the outsiders", 8],
  ["memoirs of a geisha", 11],
  ["wicked", 11],
  ["the kite runner", 11],
  ["the time travelers wife", 11],
  ["good omens", 10],
  ["dont sweat the small stuff", 12],
  ["a guide for grown ups", 12],
]);

const AUTHOR_GRADE = new Map([
  ["hunter s thompson", 12],
  ["george orwell", 9],
  ["truman capote", 11],
  ["e b white", 3],
  ["william shakespeare", 10],
  ["leo tolstoy", 12],
  ["jane austen", 11],
  ["agatha christie", 9],
  ["stephen king", 10],
  ["neil gaiman", 10],
  ["khaled hosseini", 11],
  ["gregory maguire", 11],
  ["audrey niffenegger", 11],
  ["jules verne", 8],
  ["mark twain", 7],
  ["charles dickens", 10],
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
    " book ",
    " the nice ",
    " a savage ",
    " tales of ",
    " confessions of ",
    " saga of ",
    " essential wisdom ",
    " and its all small stuff ",
  ]) {
    if (n.includes(stop)) n = n.split(stop)[0].trim();
  }
  return n;
}

function parsePubYear(raw) {
  const n = parseInt(String(raw || "").trim(), 10);
  return Number.isFinite(n) && n > 1000 ? n : null;
}

function parseGoodreadsDate(raw) {
  if (!raw || !raw.trim()) return null;
  const m = raw.trim().match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

/** End-of-school-year date for grade G (0=K). Reader born BIRTH_YEAR. */
export function dateReadFromGrade(grade) {
  const g = Math.max(0, Math.min(13, grade));
  const year = BIRTH_YEAR + 6 + g;
  const month = g <= 2 ? 6 : 5;
  const day = 15;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function suggestedGrade(title, author) {
  const core = coreTitle(title);
  if (TITLE_GRADE.has(core)) return TITLE_GRADE.get(core);

  for (const [key, grade] of TITLE_GRADE) {
    if (core.startsWith(key) || key.startsWith(core)) return grade;
  }

  const au = norm(author);
  for (const [key, grade] of AUTHOR_GRADE) {
    if (au.includes(key) || key.includes(au)) return grade;
  }

  return 10;
}

/**
 * @param {{ title: string, author?: string, original_pub_year?: number|string, year_published?: number|string, goodreads_date_read?: string }} book
 */
export function resolveDateRead(book) {
  const pubYear =
    parsePubYear(book.original_pub_year) ?? parsePubYear(book.year_published);
  const grDate = parseGoodreadsDate(book.goodreads_date_read);

  if (pubYear != null && pubYear < BIRTH_YEAR) {
    const grade = suggestedGrade(book.title, book.author);
    return {
      date_read: dateReadFromGrade(grade),
      source: "school-grade",
      grade,
      pub_year: pubYear,
    };
  }

  if (grDate) {
    return { date_read: grDate, source: "goodreads", pub_year: pubYear };
  }

  return { date_read: null, source: "pipeline", pub_year: pubYear };
}
