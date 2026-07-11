#!/usr/bin/env node
/**
 * Duplicate cleanup: merge slug twins, remove reference material, merge adaptations.
 * Box sets and US/UK pairs → audit queue only.
 *
 * Usage:
 *   node run-duplicate-cleanup.mjs --dry-run
 *   node run-duplicate-cleanup.mjs
 */
import { readFile, writeFile, unlink, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontmatter } from "./cover-utils.mjs";
import {
  EXPLICIT_MERGES,
  US_UK_AUDIT,
  BOX_SET_AUDIT,
  REFERENCE_REMOVE,
  ADAPTATION_MERGE,
  norm,
  coreTitle,
} from "./duplicate-cleanup-rules.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const READINGS_DIR = join(DIR, "../../_readings");
const ASSETS_DIR = join(DIR, "../../assets/readings");
const MANIFEST_PATH = join(DIR, "manifest.json");
const MANIFEST_CSV = join(DIR, "duplicate-cleanup-manifest.csv");
const REPORT_PATH = join(DIR, "duplicate-cleanup-report.json");

const DRY_RUN = process.argv.includes("--dry-run");

function addRedirect(raw, redirectPath) {
  if (!/^---\n/.test(raw)) throw new Error("Invalid frontmatter");
  const m = raw.match(/^(---\n[\s\S]*?\n---)/);
  if (!m) throw new Error("Invalid frontmatter block");
  let front = m[1];
  if (front.includes(redirectPath)) return raw;
  if (/^redirect_from:/m.test(front)) {
    front = front.replace(/^(redirect_from:\n(?:  - .+\n)+)/m, (block) => `${block}  - ${redirectPath}\n`);
  } else {
    front = front.replace(/\n---$/, `\nredirect_from:\n  - ${redirectPath}\n---`);
  }
  return raw.replace(/^(---\n[\s\S]*?\n---)/, front);
}

async function coverStillUsed(coverPath, excludeSlug) {
  if (!coverPath) return false;
  const asset = basename(coverPath);
  for (const f of await readdir(READINGS_DIR)) {
    if (!f.endsWith(".md")) continue;
    const slug = f.replace(/\.md$/, "");
    if (slug === excludeSlug) continue;
    const text = await readFile(join(READINGS_DIR, f), "utf8");
    const meta = parseFrontmatter(text);
    if (meta.cover && basename(meta.cover) === asset) return true;
  }
  return false;
}

function parseReading(slug, text) {
  const fm = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const front = fm?.[1] || "";
  const meta = parseFrontmatter(text);
  const sort = Number(front.match(/^sort_key:\s*(\d+)/m)?.[1] || 99999);
  return {
    slug,
    text,
    front,
    title: meta.title || "",
    author: meta.author || "",
    cover: meta.cover,
    sort,
    core: coreTitle(meta.title || ""),
    normTitle: norm(meta.title),
  };
}

async function loadReadings() {
  const files = (await readdir(READINGS_DIR)).filter((f) => f.endsWith(".md"));
  const map = new Map();
  for (const f of files) {
    const slug = f.replace(/\.md$/, "");
    const text = await readFile(join(READINGS_DIR, f), "utf8");
    map.set(slug, parseReading(slug, text));
  }
  return map;
}

function manifestIndex(entries) {
  const bySlug = new Map();
  const byTitleAuthor = new Map();
  for (const e of entries) {
    const slug = e.slug || e.id?.replace(/^goodreads-import-|^series-/, "") || "";
    byTitleAuthor.set(`${norm(e.title)}::${norm(e.author || "")}`, e);
    if (e.slug) bySlug.set(e.slug, e);
  }
  return { bySlug, byTitleAuthor };
}

function removeManifestEntry(entries, reading) {
  const nTitle = norm(reading.title);
  const nAuthor = norm(reading.author);
  return entries.filter(
    (e) => !(norm(e.title) === nTitle && norm(e.author || "") === nAuthor)
  );
}

function findManifestByReading(entries, reading) {
  return entries.find(
    (e) => norm(e.title) === norm(reading.title) && norm(e.author || "") === norm(reading.author)
  );
}

/** @type {Array<{action:string,keep:string,delete:string,title:string,reason:string}>} */
const plan = [];
const scheduledDelete = new Set();
const scheduledKeep = new Set();

function scheduleMerge(keep, del, reason, title = "") {
  if (!keep || !del || keep === del) return;
  if (scheduledDelete.has(keep)) return;
  if (scheduledDelete.has(del)) {
    /* already deleting del */
  }
  plan.push({ action: "merge", keep, delete: del, title, reason });
  scheduledDelete.add(del);
  scheduledKeep.add(keep);
}

function scheduleRemove(slug, reason, title = "") {
  if (scheduledDelete.has(slug) || scheduledKeep.has(slug)) return;
  plan.push({ action: "remove", keep: "", delete: slug, title, reason });
  scheduledDelete.add(slug);
}

function scheduleAudit(action, slug, reason, title = "", keep = "") {
  plan.push({ action, keep, delete: slug, title, reason });
}

const readings = await loadReadings();
const slugs = new Set(readings.keys());

// 1. Explicit merges
for (const { keep, delete: del, reason } of EXPLICIT_MERGES) {
  if (reason === "skip-self") continue;
  if (!slugs.has(keep) || !slugs.has(del)) continue;
  const r = readings.get(del);
  scheduleMerge(keep, del, reason, r?.title);
}

const byTitle = new Map();
for (const r of readings.values()) {
  if (!r.normTitle) continue;
  if (!byTitle.has(r.normTitle)) byTitle.set(r.normTitle, []);
  byTitle.get(r.normTitle).push(r);
}

// 2. Same exact title — auto merge (lower sort_key wins; prefer non-collection slug)
const boxAuditSet = new Set(BOX_SET_AUDIT);
function isCollectionSlug(slug) {
  return /collection|omnibus|trilogy|slipcase|box-set|1-64|1-3/i.test(slug);
}

for (const group of byTitle.values()) {
  if (group.length < 2) continue;
  const active = group.filter((r) => !scheduledDelete.has(r.slug));
  if (active.length < 2) continue;

  // Box sets: skip auto-merge entirely (manual audit)
  if (active.some((r) => boxAuditSet.has(r.slug))) continue;

  active.sort((a, b) => {
    const aCol = isCollectionSlug(a.slug) ? 1 : 0;
    const bCol = isCollectionSlug(b.slug) ? 1 : 0;
    if (aCol !== bCol) return aCol - bCol;
    return a.sort - b.sort;
  });
  const keep = active[0];
  for (let i = 1; i < active.length; i++) {
    if (scheduledDelete.has(active[i].slug) || scheduledKeep.has(active[i].slug)) continue;
    const already = plan.some(
      (p) => p.action === "merge" && p.delete === active[i].slug && p.keep === keep.slug
    );
    if (!already) scheduleMerge(keep.slug, active[i].slug, "same title auto", active[i].title);
  }
}

// 3. -N suffix same title as base (not yet scheduled)
for (const r of readings.values()) {
  const m = r.slug.match(/^(.+)-(\d+)$/);
  if (!m) continue;
  const base = m[1];
  if (!slugs.has(base)) continue;
  const baseR = readings.get(base);
  if (norm(baseR.title) !== norm(r.title)) continue;
  if (scheduledDelete.has(r.slug)) continue;
  scheduleMerge(base, r.slug, "accidental -N suffix", r.title);
}

// 4. Reference material — remove
for (const r of readings.values()) {
  if (scheduledDelete.has(r.slug)) continue;
  if (REFERENCE_REMOVE.test(r.title)) {
    scheduleRemove(r.slug, "reference / study material", r.title);
  }
}

// 5. Adaptations — merge into canonical prose
for (const r of readings.values()) {
  if (scheduledDelete.has(r.slug)) continue;
  if (!ADAPTATION_MERGE.test(r.title)) continue;
  const candidates = [...readings.values()].filter(
    (c) =>
      c.slug !== r.slug &&
      !scheduledDelete.has(c.slug) &&
      !ADAPTATION_MERGE.test(c.title) &&
      !REFERENCE_REMOVE.test(c.title) &&
      !isCollectionSlug(c.slug) &&
      !boxAuditSet.has(c.slug) &&
      c.core.length >= 5 &&
      r.core.length >= 5 &&
      (c.core === r.core || c.core.startsWith(r.core) || r.core.startsWith(c.core))
  );
  if (!candidates.length) {
    scheduleAudit("audit-adaptation", r.slug, "no canonical match found", r.title);
    continue;
  }
  candidates.sort((a, b) => a.sort - b.sort);
  scheduleMerge(candidates[0].slug, r.slug, "adaptation → canonical", r.title);
}

// 6. US/UK audit
for (const { slugs: pair, note } of US_UK_AUDIT) {
  for (const slug of pair) {
    if (!readings.has(slug)) continue;
    if (scheduledDelete.has(slug)) continue;
    scheduleAudit("audit-us-uk", slug, note, readings.get(slug).title, pair.join(" | "));
  }
}

// 7. Box set audit
for (const slug of BOX_SET_AUDIT) {
  if (!readings.has(slug)) continue;
  if (scheduledDelete.has(slug)) continue;
  scheduleAudit("audit-box-set", slug, "manual collection audit", readings.get(slug).title);
}

// Dedupe plan rows
const seen = new Set();
const finalPlan = plan.filter((p) => {
  const key = `${p.action}:${p.keep}:${p.delete}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return p.action.startsWith("audit") || (p.delete && !seen.has(`del:${p.delete}`));
});

// CSV
const csvLines = [
  "action,keep_slug,delete_slug,title,reason",
  ...finalPlan.map((p) =>
    [p.action, p.keep, p.delete, `"${(p.title || "").replace(/"/g, '""')}"`, `"${p.reason.replace(/"/g, '""')}"`].join(
      ","
    )
  ),
];
await writeFile(MANIFEST_CSV, csvLines.join("\n") + "\n", "utf8");

const report = {
  generated_at: new Date().toISOString(),
  dry_run: DRY_RUN,
  planned: {
    merge: finalPlan.filter((p) => p.action === "merge").length,
    remove: finalPlan.filter((p) => p.action === "remove").length,
    audit: finalPlan.filter((p) => p.action.startsWith("audit")).length,
  },
  merged: [],
  removed: [],
  errors: [],
  orphan_covers_removed: [],
  audit_queue: finalPlan.filter((p) => p.action.startsWith("audit")),
};

let manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
let entries = manifest.entries;

for (const item of finalPlan) {
  if (item.action.startsWith("audit")) continue;

  const delPath = join(READINGS_DIR, `${item.delete}.md`);
  if (!existsSync(delPath)) {
    report.errors.push({ ...item, error: "delete file missing" });
    continue;
  }

  try {
    const delReading = readings.get(item.delete);
    const delText = delReading.text;
    const delMeta = parseFrontmatter(delText);

    if (item.action === "merge") {
      const keepPath = join(READINGS_DIR, `${item.keep}.md`);
      if (!existsSync(keepPath)) {
        report.errors.push({ ...item, error: "keep file missing" });
        continue;
      }
      let keepText = readings.get(item.keep).text;
      keepText = addRedirect(keepText, `/r/${item.delete}/`);

      if (!DRY_RUN) {
        await writeFile(keepPath, keepText, "utf8");
        await unlink(delPath);
        entries = removeManifestEntry(entries, delReading);
      }

      report.merged.push({ keep: item.keep, delete: item.delete, reason: item.reason });
      console.log(`MERGE ${item.delete} → ${item.keep} (${item.reason})`);
    } else if (item.action === "remove") {
      if (!DRY_RUN) {
        await unlink(delPath);
        entries = removeManifestEntry(entries, delReading);
      }
      report.removed.push({ slug: item.delete, reason: item.reason, title: item.title });
      console.log(`REMOVE ${item.delete} (${item.reason})`);
    }

    if (!DRY_RUN) {
      const delCover = delMeta.cover ? basename(delMeta.cover) : null;
      if (delCover) {
        const assetPath = join(ASSETS_DIR, delCover);
        const stillUsed = await coverStillUsed(delMeta.cover, item.delete);
        if (!stillUsed && existsSync(assetPath)) {
          await unlink(assetPath);
          report.orphan_covers_removed.push({ slug: item.delete, cover: delCover });
        }
      }
    }
  } catch (err) {
    report.errors.push({ ...item, error: String(err.message || err) });
    console.error(`FAIL ${item.action} ${item.delete}:`, err.message || err);
  }
}

if (!DRY_RUN) {
  await writeFile(MANIFEST_PATH, JSON.stringify({ entries }, null, 2), "utf8");
}
await writeFile(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");

console.log(`\nPlan: ${report.planned.merge} merges, ${report.planned.remove} removes, ${report.planned.audit} audit`);
console.log(`Done: ${report.merged.length} merged, ${report.removed.length} removed, ${report.errors.length} errors`);
console.log(`Manifest CSV: ${MANIFEST_CSV}`);
console.log(`Report: ${REPORT_PATH}`);

if (report.errors.length) process.exitCode = 1;
