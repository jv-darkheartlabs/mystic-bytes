#!/usr/bin/env node
/**
 * Reassign categories for school-era canon mis-tagged as dark romance.
 *
 * Usage:
 *   node fix-school-canon-categories.mjs [--dry-run]
 *   node fix-school-canon-categories.mjs --slug charlottes-web-and-other-illustrated-classics
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveSchoolCategory } from "./school-canon-categories.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, "../..");
const READINGS_DIR = join(ROOT, "_readings");
const MANIFEST_PATH = join(DIR, "manifest.json");
const REPORT_PATH = join(DIR, "school-canon-category-report.json");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const slugArg = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;

function parseFrontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: "", body: md.trim() };
  return { front: m[1], body: m[2].trim() };
}

function setFrontField(front, key, value) {
  const re = new RegExp(`^${key}:.*$`, "m");
  const line = `${key}: ${value}`;
  if (re.test(front)) return front.replace(re, line);
  return `${front}\n${line}`;
}

function findManifestEntry(title, author, entries) {
  const norm = (s) =>
    (s || "").toLowerCase().replace(/['']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  return entries.find(
    (e) => norm(e.title) === norm(title) && norm(e.author || "") === norm(author || "")
  );
}

const { entries: manifestEntries } = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
const manifestByTitle = new Map(
  manifestEntries.map((e) => [`${e.title}\0${e.author || ""}`, e])
);

let files = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));
if (slugArg) {
  files = files.filter((f) => f.replace(/\.md$/, "") === slugArg);
}

const changes = [];

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const path = join(READINGS_DIR, file);
  const raw = await readFile(path, "utf8");
  const { front, body } = parseFrontMatter(raw);
  const title = front.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1] || slug;
  const author = front.match(/^author:\s*"?(.+?)"?\s*$/m)?.[1] || "";
  const category = front.match(/^category:\s*(\S+)/m)?.[1];
  const tagMatches = front.match(/tags:\n((?:\s+-\s+.+\n?)+)/);
  const tags = tagMatches
    ? [...tagMatches[1].matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1])
    : [];

  const manifestEntry =
    findManifestEntry(title, author, manifestEntries) ||
    manifestByTitle.get(`${title}\0${author}`);

  const pubYear =
    manifestEntry?.original_pub_year ??
    manifestEntry?.year_published ??
    (front.match(/^year_published:\s*(\d+)/m)?.[1]
      ? Number(front.match(/^year_published:\s*(\d+)/m)[1])
      : null);

  const resolved = resolveSchoolCategory({
    slug,
    title,
    author,
    category,
    tags,
    original_pub_year: pubYear,
  });

  if (!resolved) continue;

  changes.push({
    slug,
    title,
    from: category,
    to: resolved.category,
    reason: resolved.reason,
  });

  if (dryRun) continue;

  let newFront = setFrontField(front, "category", resolved.category);

  // Drop misleading romance/gothic tags on school canon
  if (resolved.category === "juvenile-fiction" || resolved.category === "classic-literature") {
    const cleaned = tags.filter(
      (t) =>
        !/^(gothic|horrorromance|darkromance|fantasyromance|romantasy|theorchidroom)$/i.test(
          t.replace(/\s+/g, "")
        )
    );
    if (!cleaned.includes("schoolcanon")) cleaned.push("schoolcanon");
    if (resolved.category === "juvenile-fiction" && !cleaned.some((t) => /juvenile|children/i.test(t))) {
      cleaned.push("juvenile");
    }
    if (resolved.category === "classic-literature" && !cleaned.includes("classic")) {
      cleaned.push("classic");
    }
    const tagBlock =
      cleaned.length > 0
        ? `tags:\n${cleaned.map((t) => `  - ${t}`).join("\n")}\n`
        : "tags:\n";
    newFront = newFront.replace(/tags:\n(?:\s+-\s+.+\n?)*/m, tagBlock);
  }

  await writeFile(path, `---\n${newFront}\n---\n\n${body}\n`, "utf8");

  if (manifestEntry) {
    manifestEntry.category = resolved.category;
    if (manifestEntry.tags) {
      manifestEntry.tags = manifestEntry.tags.filter(
        (t) => !/^(gothic|horrorromance|darkromance|fantasyromance|romantasy)$/i.test(String(t))
      );
      if (!manifestEntry.tags.includes("schoolcanon")) manifestEntry.tags.push("schoolcanon");
    }
  }
}

if (!dryRun && changes.length) {
  await writeFile(MANIFEST_PATH, JSON.stringify({ entries: manifestEntries }, null, 2), "utf8");
}

const report = {
  generated_at: new Date().toISOString(),
  dry_run: dryRun,
  changed: changes.length,
  by_target: changes.reduce((acc, c) => {
    acc[c.to] = (acc[c.to] || 0) + 1;
    return acc;
  }, {}),
  changes,
};

await writeFile(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");

console.log(`${dryRun ? "[dry-run] " : ""}School canon category fix: ${changes.length} titles`);
for (const c of changes.slice(0, 20)) {
  console.log(`  ${c.slug}: ${c.from} → ${c.to} (${c.reason})`);
}
if (changes.length > 20) console.log(`  … and ${changes.length - 20} more`);
console.log(`Report: ${REPORT_PATH}`);
