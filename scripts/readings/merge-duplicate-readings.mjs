#!/usr/bin/env node
/**
 * Merge duplicate reading entries per Jul 2026 audit decisions.
 * Keeps canonical slug, adds redirect_from, deletes duplicate .md + orphan covers.
 */
import { readFile, writeFile, unlink, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontmatter } from "./cover-utils.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const READINGS_DIR = join(DIR, "../../_readings");
const ASSETS_DIR = join(DIR, "../../assets/readings");
const DRY_RUN = process.argv.includes("--dry-run");

/** @type {Array<{ keep: string, delete: string, note?: string }>} */
const MERGES = [
  { keep: "the-vegas-rule", delete: "the-heartbreak-rule", note: "Heartbreak Rule slug-rename" },
  { keep: "white-lines", delete: "across-state-lines", note: "Across State Lines slug-rename" },
  { keep: "pictures-of-you", delete: "part-of-you", note: "Pictures of You slug-rename" },
  { keep: "pray-for-us", delete: "scream-for-us", note: "Scream For Us slug-rename" },
  { keep: "fragile-allegiance", delete: "fragile-longing", note: "Fragile Longing slug-rename" },
  { keep: "watch-your-back", delete: "watch-your-back-2", note: "Tate James — keep lower R" },
  { keep: "youre-next", delete: "youre-next-2", note: "Tate James — keep lower R" },
  { keep: "dear-reader", delete: "dear-reader-2", note: "Tate James — keep lower R" },
  { keep: "villain-era", delete: "villain", note: "Villain Era duplicate" },
  { keep: "deacon", delete: "deacon-2", note: "accidental -2 series" },
  { keep: "westin", delete: "westin-2", note: "accidental -2 series" },
  { keep: "sovereign", delete: "sovereign-2", note: "accidental -2 series" },
  { keep: "losers", delete: "losers-2", note: "accidental -2 series" },
  { keep: "fairydale", delete: "fairydale-2", note: "accidental -2 series" },
];

function addRedirect(frontmatter, redirectPath) {
  if (/^redirect_from:/m.test(frontmatter)) {
    if (frontmatter.includes(redirectPath)) return frontmatter;
    return frontmatter.replace(
      /^(redirect_from:\n(?:  - .+\n)+)/m,
      (block) => `${block}  - ${redirectPath}\n`,
    );
  }
  const lines = frontmatter.split("\n");
  const closeIdx = lines.lastIndexOf("---");
  if (closeIdx <= 0) throw new Error("Invalid frontmatter");
  lines.splice(closeIdx, 0, "redirect_from:", `  - ${redirectPath}`);
  return lines.join("\n");
}

async function coverStillUsed(coverPath, excludeSlug) {
  if (!coverPath) return false;
  const asset = basename(coverPath);
  const files = await readdir(READINGS_DIR);
  for (const f of files) {
    if (!f.endsWith(".md")) continue;
    const slug = f.replace(/\.md$/, "");
    if (slug === excludeSlug) continue;
    const text = await readFile(join(READINGS_DIR, f), "utf8");
    const meta = parseFrontmatter(text);
    if (meta.cover && basename(meta.cover) === asset) return true;
  }
  return false;
}

const report = { merged: [], errors: [], orphan_covers_removed: [] };

for (const { keep, delete: del, note } of MERGES) {
  const keepPath = join(READINGS_DIR, `${keep}.md`);
  const delPath = join(READINGS_DIR, `${del}.md`);
  const redirectPath = `/r/${del}/`;

  try {
    if (!existsSync(keepPath)) {
      report.errors.push({ keep, delete: del, error: "keep file missing" });
      continue;
    }
    if (!existsSync(delPath)) {
      report.errors.push({ keep, delete: del, error: "delete file already gone" });
      continue;
    }

    const delText = await readFile(delPath, "utf8");
    const delMeta = parseFrontmatter(delText);
    let keepText = await readFile(keepPath, "utf8");
    keepText = addRedirect(keepText, redirectPath);

    const delCover = delMeta.cover ? basename(delMeta.cover) : null;

    if (!DRY_RUN) {
      await writeFile(keepPath, keepText, "utf8");
      await unlink(delPath);

      if (delCover) {
        const assetPath = join(ASSETS_DIR, delCover);
        const stillUsed = await coverStillUsed(delMeta.cover, del);
        if (!stillUsed && existsSync(assetPath)) {
          await unlink(assetPath);
          report.orphan_covers_removed.push({ slug: del, cover: delCover });
        }
      }
    }

    report.merged.push({
      keep,
      delete: del,
      note,
      redirect: redirectPath,
      removed_cover: delCover,
      kept_number: parseFrontmatter(keepText).number,
      deleted_number: delMeta.number,
    });
    console.log(`MERGE ${del} → ${keep} (${note})`);
  } catch (err) {
    report.errors.push({ keep, delete: del, error: String(err.message || err) });
    console.error(`FAIL ${keep}/${del}:`, err.message || err);
  }
}

const reportPath = join(DIR, "merge-duplicates-report.json");
if (!DRY_RUN) {
  await writeFile(reportPath, JSON.stringify({ generated_at: new Date().toISOString(), ...report }, null, 2));
}
console.log(`\nMerged: ${report.merged.length}, errors: ${report.errors.length}, covers removed: ${report.orphan_covers_removed.length}`);
if (!DRY_RUN) console.log(`Report: ${reportPath}`);
if (report.errors.length) process.exitCode = 1;
