/**
 * Shared literary-analysis date helpers.
 * Publication dates span the shelf; date_read falls within 14 days before publication.
 */
export const READING_DATE_START = new Date("2021-07-01T12:00:00");

/** Latest valid publication day — yesterday (never today or future). */
export function readingDateEnd(reference = new Date()) {
  const d = new Date(reference);
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - 1);
  return d;
}

export function hashJitter(n) {
  return (Math.sin(n * 12.9898) * 43758.5453) % 1;
}

export function assignPublicationDates(count, endDate = readingDateEnd()) {
  const startDate = READING_DATE_START;
  if (count <= 0) return [];
  if (count === 1) return [endDate.toISOString().slice(0, 10)];

  const span = endDate.getTime() - startDate.getTime();
  const step = span / (count - 1);

  return Array.from({ length: count }, (_, i) => {
    const d = new Date(startDate.getTime() + step * i);
    const jitter = hashJitter(i);
    d.setDate(d.getDate() + Math.round((jitter - 0.5) * 4));
    if (d > endDate) d.setTime(endDate.getTime());
    if (d < startDate) d.setTime(startDate.getTime());
    return d.toISOString().slice(0, 10);
  });
}

/** 0–14 days before publication, stable per sort_key. */
export function dateReadFromPublished(publishedIso, sortKey) {
  const pub = new Date(`${publishedIso}T12:00:00`);
  const daysBack = Math.floor(Math.abs(hashJitter(Number(sortKey) * 7.13)) * 15);
  const read = new Date(pub);
  read.setDate(read.getDate() - daysBack);
  return read.toISOString().slice(0, 10);
}

export function daysBetween(isoA, isoB) {
  const a = new Date(`${isoA}T12:00:00`);
  const b = new Date(`${isoB}T12:00:00`);
  return Math.round((b - a) / 86400000);
}
