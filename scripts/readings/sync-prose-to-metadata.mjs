#!/usr/bin/env node
/**
 * Align review prose with reading frontmatter after cover/metadata fixes.
 * Usage: node sync-prose-to-metadata.mjs [--dry-run]
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "../..");
const READINGS = join(ROOT, "_readings");
const DRY = process.argv.includes("--dry-run");

/** Per-slug: replace in body only (after frontmatter --- block). */
const REPLACEMENTS = {
  "a-dark-fate": [
    ["*A Dark Fate*", "*Dark Fae*"],
    ["#ADarkFate", "#DarkFae"],
  ],
  "a-savage-fae": [
    ['"A Savage Fae"', "*Savage Fae*"],
    ["A Savage Fae", "Savage Fae"],
    ["#ASavageFae", "#SavageFae"],
  ],
  "a-war-of-fae-and-fate": [
    ["**A War of Fae and Fate**", "**Warrior Fae**"],
    ["*A War of Fae and Fate*", "*Warrior Fae*"],
    ["#AWarofFaeandFate", "#WarriorFae"],
  ],
  "never": [
    ["*Never* by Brea", "*Never Say Never* by Brea"],
    ["*Never* stands apart", "*Never Say Never* stands apart"],
    ["*Never* is not merely", "*Never Say Never* is not merely"],
    ["#Never ", "#NeverSayNever "],
  ],
  "deadly-throne": [
    ["*Deadly Throne*", "*Symphony for a Deadly Throne*"],
    ["#DeadlyThrone", "#SymphonyForADeadlyThrone"],
  ],
  "forever-rains": [
    ["*Forever Rains*", "*Song of the Forever Rains*"],
    ["#ForeverRains", "#SongOfTheForeverRains"],
  ],
  "fragile-allegiance": [
    ["*Fragile Allegiance*", "*Fragile Longing*"],
    ["#FragileAllegiance", "#FragileLonging"],
  ],
  "part-of-you": [
    ["*Part of You*", "*Pictures of You*"],
    ["#PartOfYou", "#PicturesOfYou"],
  ],
  "pray-for-us": [
    ["*Pray For Us*", "*Scream For Us*"],
    ["Doyle's *Pray For Us*", "Doyle's *Scream For Us*"],
    ["#PrayForUs", "#ScreamForUs"],
  ],
  "the-ritual-of-bone": [
    ["*The Ritual of Bone*", "*The Primal of Blood and Bone*"],
    ["#TheRitualofBone", "#ThePrimalOfBloodAndBone"],
  ],
  "the-shades-of-magic": [
    ["*The Shades of Magic*", "*A Darker Shade of Magic*"],
    ["#TheShadesofMagic", "#ADarkerShadeOfMagic"],
  ],
  "the-vegas-rule": [
    ["*The Vegas Rule*", "*The Heartbreak Rule*"],
    ["#TheVegasRule", "#TheHeartbreakRule"],
  ],
  "villain": [
    ["*Villain*", "*Villain Era*"],
    ["#Villain ", "#VillainEra "],
  ],
  "white-lines": [
    ["*White Lines*", "*Across State Lines*"],
    ["#WhiteLines", "#AcrossStateLines"],
  ],
  "peace-honey": [
    ["Scarlett St. Clair's *Peace & Honey*", "R. Raeta's *Peaches & Honey*"],
    ["*Peace & Honey*", "*Peaches & Honey*"],
    ["St. Clair's", "Raeta's"],
    ["St. Clair", "Raeta"],
    ["#PeaceAndHoney", "#PeachesAndHoney"],
    ["#PeaceHoney", "#PeachesAndHoney"],
  ],
  "pine-poison": [
    ["R. Rae's *Pine & Poison*", "R. Raeta's *Pits & Poison*"],
    ["*Pine & Poison*", "*Pits & Poison*"],
    ["R. Rae", "R. Raeta"],
    ["Rae,", "Raeta,"],
    ["Rae's", "Raeta's"],
    ["#PineAndPoison", "#PitsAndPoison"],
    ["#PinePoison", "#PitsAndPoison"],
  ],
  "sins-of-the-past": [
    ["*Sins of the Past*", "*Bound By The Past*"],
    ["#SinsofthePast", "#BoundByThePast"],
  ],
  "sinners-absolve": [
    ["*Sinners Absolve*", "*Sinners Absolute*"],
    ["#SinnersAbsolve", "#SinnersAbsolute"],
  ],
  "dare-series-collection": [
    ["*Dare Series Collection*", "*Dare*"],
    ["#DareSeriesCollection", "#Dare"],
  ],
  "house-of-earth-and-blood": [
    ["**House of Earth and Blood**", "**Crescent City: House of Earth and Blood**"],
    ["*House of Earth and Blood*", "*Crescent City: House of Earth and Blood*"],
    ["#HouseOfEarthAndBlood", "#CrescentCity"],
  ],
  "the-murder-of-roger-ackroyd": [
    ["*The Murder of Roger Ackroyd*", "*The Murder of Ackroyd*"],
    ["#TheMurderOfRogerAckroyd", "#TheMurderOfAckroyd"],
  ],
  "the-lawless-god": [
    ["*The Lawless God*", "*Lawless God*"],
    ["#TheLawlessGod", "#LawlessGod"],
  ],
  "the-blood-we-crave-part-two": [
    ["*The Blood We Crave: Part Two*", "*The Blood We Crave*"],
    ["#TheBloodWeCravePartTwo", "#TheBloodWeCrave"],
  ],
  "altair-university": [
    ["*Altair University*", "*Altair University: The Ruthless Rivalry*"],
    ["#AltairUniversity ", "#AltairUniversityRuthlessRivalry "],
  ],
  "altair-university-2": [
    ["*Altair University*", "*Altair University: The Bleak Beginning*"],
    ["#AltairUniversity ", "#AltairUniversityBleakBeginning "],
  ],
  "bewitched": [
    ["*Bewitched*", "*Bewitched Book One*"],
  ],
  "the-duke-and-i": [
    ["*The Duke and I*", "*The Duke & I*"],
  ],
  "john-dies-at-the-end": [
    ["*John Dies at the End*", "*John Dies @ the End*"],
  ],
  "the-once-and-future-king": [
    ["*The Once and Future King*", "*The Once & Future King*"],
  ],
};

function splitFrontmatter(text) {
  const m = text.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  if (!m) return { fm: text, body: "" };
  return { fm: text.slice(0, m.index + m[0].length - m[1].length), body: m[1] };
}

let changed = 0;
for (const [slug, pairs] of Object.entries(REPLACEMENTS)) {
  const path = join(READINGS, `${slug}.md`);
  let text = await readFile(path, "utf8");
  const { fm, body } = splitFrontmatter(text);
  let newBody = body;
  for (const [from, to] of pairs) {
    newBody = newBody.split(from).join(to);
  }
  if (newBody !== body) {
    changed++;
    const out = fm + newBody;
    if (!DRY) await writeFile(path, out);
    console.log(`updated ${slug}`);
  }
}
console.log(`Done. ${changed} files ${DRY ? "(dry run)" : "written"}.`);
