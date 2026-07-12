#!/usr/bin/env node
/** Sync rewritten _verse bodies back to source poetry archive. */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { resolvePoetryRoot } from "./resolve-poetry-root.mjs";

const REPO = new URL("../..", import.meta.url).pathname;
const VERSE = join(REPO, "_verse");

const MAP = [
  // batch 1
  ["underworld-light.md", "spirituality/Divine Light.md"],
  ["overcoming-anxiety.md", "spirituality/Overcoming Anxiety.md"],
  ["ghalta-green-decree.md", "spirituality/Ghalta's Green Decree.md"],
  ["love-languages.md", "spirituality/Counterpart Expression Healthy Toxic Emotional.md"],
  ["silent-serenity.md", "spirituality/Silent Serenity.md"],
  ["seeking-truth.md", "spirituality/Seeking Truth in a Deceptive World.md"],
  ["embers-of-creativity.md", "spirituality/Embers of Creativity.md"],
  ["healing-sound-of-silence.md", "spirituality/The Healing Sound of Silence.md"],
  // batch 2
  ["virtue-and-righteousness.md", "spirituality/Virtue and Righteousness.md"],
  ["the-quest-for-truth.md", "spirituality/The Quest for Truth.md"],
  ["power-of-forgiveness.md", "spirituality/The Power of Forgiveness.md"],
  ["journey-of-the-soul.md", "spirituality/Journey of the Soul.md"],
  ["guiding-light.md", "spirituality/Guiding Light in Dark Times.md"],
  ["guardians-at-the-gate.md", "spirituality/Guardians of Light.md"],
  ["celestial-watchers.md", "spirituality/Celestial Guardians.md"],
  ["meditation.md", "spirituality/The Tranquil Journey of Meditation.md"],
  ["embracing-the-unseen.md", "spirituality/Embracing the Unseen.md"],
  // batch 3
  ["virtue-of-devotion.md", "spirituality/The Virtue of Devotion.md"],
  ["unyielding-faith.md", "spirituality/The Unyielding Power of Faith.md"],
  ["spirit-of-parenthood.md", "spirituality/The Spirit of Parenthood.md"],
  ["divine-connection.md", "spirituality/The Quest for Divine Connection.md"],
  ["the-purpose.md", "spirituality/The Purpose.md"],
  ["power-of-gratitude.md", "spirituality/The Power of Gratitude.md"],
  ["power-of-a-wish.md", "spirituality/The Power of a Wish.md"],
  ["beacon-of-virtue.md", "spirituality/The Beacon of Virtue.md"],
  ["natures-divine-canvas.md", "spirituality/Nature's Divine Canvas.md"],
  // batch 4
  ["appreciation.md", "spirituality/The Profound Impact of Appreciation.md"],
  ["magic-of-a-wish.md", "spirituality/The Power and Magic of a Wish.md"],
  ["lighthouse-of-empathy.md", "spirituality/The Lighthouse of Empathy.md"],
  ["journey-towards-faith.md", "spirituality/The Journey Towards Faith.md"],
  ["moral-code.md", "spirituality/The Importance of a Moral Code.md"],
  ["bounty-of-blessings.md", "spirituality/The Bounty of Blessings.md"],
  ["beauty-of-forgiveness.md", "spirituality/The Beauty of Forgiveness.md"],
  ["beacon-of-justice.md", "spirituality/The Beacon of Justice.md"],
  ["scented-symphony.md", "spirituality/Scented Symphony.md"],
  // batch 5
  ["lucky-gifts.md", "spirituality/Gratefulness for Lucky Gifts and Graceful….md"],
  ["enchanting-blessings.md", "spirituality/Enchanting Blessings.md"],
  ["ambition-and-faith.md", "spirituality/Empowering Ambition, Faith, and Optimism.md"],
  ["embracing-faith.md", "spirituality/Embracing the Power of Faith.md"],
  ["hope-and-dreams.md", "spirituality/Embrace of Hope and Dreams.md"],
  ["celebrating-blessings.md", "spirituality/Celebrating Blessings and Expressing….md"],
  ["homage-to-gratitude.md", "spirituality/An Homage to Gratitude.md"],
  ["those-who-make-life-shine.md", "spirituality/A Tribute to Those Who Make Life Shine.md"],
  ["journey-to-the-divine.md", "spirituality/A Journey to the Divine.md"],
  ["grace-and-healing.md", "spirituality/A Gift of Grace and Healing.md"],
  ["kindness-between-friends.md", "spirituality/Troy and Chewy the Muppet- A Heartwarming Tale….md"],
];

async function main() {
  const root = resolvePoetryRoot();
  for (const [verseFile, rel] of MAP) {
    const raw = await readFile(join(VERSE, verseFile), "utf8");
    const body = raw.replace(/^---[\s\S]*?---\n*/, "").trim();
    const fm = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] || "";
    const title = fm.match(/^title:\s*"(.*)"/m)?.[1] || "";
    const tags = ["poetry", "spirituality", "verse-rewrite"];
    const out = `---
title: "${title}"
date: 2026-07-11
tags: [${tags.join(", ")}]
cw: []
topic: poetry/spirituality
synced_from: _verse/${verseFile}
---

${body}
`;
    const dest = join(root, rel);
    await writeFile(dest, out, "utf8");
    console.log("synced →", rel);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
