#!/usr/bin/env node
/**
 * Execute audit-queue resolutions from resolve-duplicate-audit.mjs
 */
import { readFile, writeFile, unlink, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontmatter } from "./cover-utils.mjs";
import { AUDIT_RESOLUTIONS, AUDIT_KEPT } from "./resolve-duplicate-audit.mjs";
import { norm } from "./duplicate-cleanup-rules.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const READINGS_DIR = join(DIR, "../../_readings");
const ASSETS_DIR = join(DIR, "../../assets/readings");
const MANIFEST_PATH = join(DIR, "manifest.json");
const REPORT_PATH = join(DIR, "duplicate-audit-report.json");

const DRY_RUN = process.argv.includes("--dry-run");

function addRedirect(raw, redirectPath) {
  const m = raw.match(/^(---\n[\s\S]*?\n---)/);
  if (!m) throw new Error("Invalid frontmatter");
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

function removeManifestEntry(entries, title, author) {
  const nTitle = norm(title);
  const nAuthor = norm(author);
  return entries.filter((e) => !(norm(e.title) === nTitle && norm(e.author || "") === nAuthor));
}

const report = {
  generated_at: new Date().toISOString(),
  dry_run: DRY_RUN,
  merged: [],
  removed: [],
  kept: AUDIT_KEPT,
  errors: [],
  orphan_covers_removed: [],
};

let manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
let entries = manifest.entries;

for (const item of AUDIT_RESOLUTIONS) {
  const delPath = join(READINGS_DIR, `${item.delete}.md`);
  if (!existsSync(delPath)) {
    report.errors.push({ ...item, error: "already gone" });
    continue;
  }

  const delText = await readFile(delPath, "utf8");
  const delMeta = parseFrontmatter(delText);

  try {
    if (item.action === "merge") {
      const keepPath = join(READINGS_DIR, `${item.keep}.md`);
      if (!existsSync(keepPath)) {
        report.errors.push({ ...item, error: "keep file missing" });
        continue;
      }
      let keepText = await readFile(keepPath, "utf8");
      keepText = addRedirect(keepText, `/r/${item.delete}/`);
      if (!DRY_RUN) {
        await writeFile(keepPath, keepText, "utf8");
        await unlink(delPath);
        entries = removeManifestEntry(entries, delMeta.title, delMeta.author);
      }
      report.merged.push(item);
      console.log(`MERGE ${item.delete} → ${item.keep}`);
    } else if (item.action === "remove") {
      if (!DRY_RUN) {
        await unlink(delPath);
        entries = removeManifestEntry(entries, delMeta.title, delMeta.author);
      }
      report.removed.push(item);
      console.log(`REMOVE ${item.delete}`);
    }

    if (!DRY_RUN && delMeta.cover) {
      const delCover = basename(delMeta.cover);
      const assetPath = join(ASSETS_DIR, delCover);
      if (!(await coverStillUsed(delMeta.cover, item.delete)) && existsSync(assetPath)) {
        await unlink(assetPath);
        report.orphan_covers_removed.push({ slug: item.delete, cover: delCover });
      }
    }
  } catch (err) {
    report.errors.push({ ...item, error: String(err.message || err) });
    console.error(`FAIL ${item.delete}:`, err.message);
  }
}

if (!DRY_RUN) {
  await writeFile(MANIFEST_PATH, JSON.stringify({ entries }, null, 2), "utf8");
}
await writeFile(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");

console.log(`\nAudit: ${report.merged.length} merged, ${report.removed.length} removed, ${report.errors.length} errors`);
console.log(`Kept: ${AUDIT_KEPT.map((k) => k.slug).join(", ")}`);
console.log(`Report: ${REPORT_PATH}`);
