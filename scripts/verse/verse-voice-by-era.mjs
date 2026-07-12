/**
 * Era-indexed verse voice — mirrors reading-life / Projection Room timeline.
 * Born 1980; date_written year selects voice band.
 * North star at orchid: Demon Roast — sharp, gothic, body-first, balanced warmth.
 * Earlier eras stay authentically softer; gothic deepens toward orchid — never skip ahead.
 */
import { eraFromYear } from "../readings/review-voice-by-era.mjs";

export { eraFromYear };

/** Example closers only — final line must echo the poem's own image, never a generic pool pick. */
const CLOSER_EXAMPLES = {
  elementary: ["The pond keeps the count. So does the mud."],
  middle: ["The lotus closes before anyone asks it to."],
  high: ["The extra cup stays on the table."],
  college: ["The crossroads is still there at dawn."],
  "early-adult": ["The band turns the corner; the rain does not."],
  "gothic-edge": ["The grinder still knows."],
  orchid: ["Neither has she.", "You still pour another."],
};

const GLOBAL_FORBID = [
  "NOLA as place name — use New Orleans",
  "symphony / tapestry / embrace of the crescent filler",
  "greeting-card faith / angel platitudes (spirituality → Hecate lens)",
  "closer unrelated to the poem's central image",
  "orchid blade in pre-gothic-era poems",
];

const ERA_PROFILES = {
  elementary: {
    label: "Elementary wonder (1986–1991)",
    lineMax: 8,
    voice: `JV at age 7–11. Verse as serious book-report wonder — concrete nouns, short lines, one image per stanza.
Rhyme OK when discovered, not manufactured. Nature, pets, seasons, simple curiosity.
No gothic edge, no irony, no body horror. Sadness gentle (rain on a roof, not grief autopsy).
Stay soft — do not borrow middle-school detachment or orchid sharpness.`,
    tone: "warm, observant, unironic, soft",
    forbid: [...GLOBAL_FORBID, "explicit grief autopsy", "satire", "sexual content", "doctrine"],
    form: "short stanzas; closed rhyme optional; image-led",
  },
  middle: {
    label: "Middle school (1992–1994, age 12–14)",
    lineMax: 14,
    voice: `JV at age 12–14 (minimum age 13 for nature pieces with thematic weight). New Orleans and family enter — porch, cousins, brass distant, pets, friendship.
More observational than elementary — embarrassment, cool distance forming, not yet lit-class detachment.
Structured stanzas; rhyme intentional; first-person "I" over preachy "you".
Earnest but not tender-baby; belonging and awkwardness coexist. Still soft — no gothic satire, no orchid blade.`,
    tone: "earnest, observational, age-13 cool, still soft",
    forbid: [...GLOBAL_FORBID, "tourism brochure", "gothic satire", "explicit desire", "elementary tenderness"],
    form: "quatrains or couplets; light jazz cadence for New Orleans pieces",
  },
  high: {
    label: "High school grief-edge (1995–1998)",
    lineMax: 16,
    voice: `JV at age 15–18. Lit-class lens: detached, analytical, third person or distant observation preferred over direct "you" address.
Grief and first heartbreak as subject matter — images over abstractions; refuses tidy comfort; no triumph arc.
Body sensations allowed sparingly (throat, hands) — not body horror. Softer than college; sharper than middle; NOT orchid.`,
    tone: "detached, lit-class, image-sharp, refusal to tidy",
    forbid: [...GLOBAL_FORBID, "direct intimate you-address", "triumph undoing grief", "AABB card-aisle rhyme", "Demon Roast irony"],
    form: "free verse default; slant rhyme OK",
  },
  college: {
    label: "College witness (1999–2002)",
    lineMax: 20,
    voice: `JV in college. Justice, truth, philosophy, travel — rhetorical weight, longer lines, witness detached but heated.
Spirituality rewrites: Hecate lens — classical image (torch, crossroads, keys, hounds) plus contemporary witch heat (altar candles, the working, threshold without rescue). NO Christian angels or sermon faith.
Gothic undertone deepening; still not full orchid. Anger and care both named from distance.`,
    tone: "witness, rhetorical, precise, gothic undertone",
    forbid: [...GLOBAL_FORBID, "jargon stacks", "unearned hope", "angel platitudes"],
    form: "stanza argument; occasional closed form for justice",
  },
  "early-adult": {
    label: "Early adult place-return (2003–2009)",
    lineMax: 22,
    voice: `JV early adulthood. New Orleans as adult lens — exile and return, betrayal, ambition, sensory city.
Jazz cadence with breath: medium-length lines and stanzas — syncopation in phrasing, not choppy one-word stacks.
Always New Orleans, never NOLA. Creole/French sparse (one phrase when earned).
Pleasure and cost in same breath. Celebratory-dark, not brochure. Darkening toward gothic-edge but not orchid yet.
Shorten titles: drop Crescent/symphony/tapestry filler from archive names.`,
    tone: "sensory, syncopated, New Orleans-rooted, pleasure-cost",
    forbid: [...GLOBAL_FORBID, "tourism", "NOLA", "unmarked power imbalance in love"],
    form: "loose rhythm; syncopated line breaks",
  },
  "gothic-edge": {
    label: "Gothic edge (2010–2014)",
    lineMax: 24,
    voice: `JV 2010–2014. Gothic darkening — satire, domestic noir, bitter sacrament imagery. Demon Roast seeds.
Spirituality: Hecate fully available — torch, three paths, witch-goddess at the threshold.
Irony and refusal to comfort; body and appetite when topic demands. Tenderness only as residue. Not yet full orchid on every line.`,
    tone: "ironic, domestic-gothic, dark feminine mystic",
    forbid: [...GLOBAL_FORBID, "inspirational poster reset", "unmotivated hope", "elementary softness"],
    form: "free verse with knife-turn breaks",
  },
  orchid: {
    label: "Uncut orchid (2015+)",
    lineMax: 28,
    voice: `Full uncut shelf. Demon Roast north star: concrete nouns, body-first, gothic, satirical when earned.
Love category defaults here — desire, betrayal, domestic crime-as-metaphor. Refuses tidy endings.
Spirituality: Hecate at full power — crossroads, torches, hounds, keys; dark feminine, never Christian greeting-card.
New Orleans: blood and brass, never NOLA. Closer must echo the poem's last image.`,
    tone: "body-first, gothic, verdict-refusing, uncut",
    forbid: [...GLOBAL_FORBID, "triumph arc", "generic closer"],
    form: "per-piece — closed, open, or shaped as subject demands",
  },
};

/** Hecate spirituality rewrite lens (replaces greeting-card faith). */
export const HECATE_SPIRITUALITY_LENS = `Spirituality archive rewrites use Hecate — classical image plus contemporary witch heat.
Torch at the crossing, keys, hounds, three paths; also: the working, altar truth, threshold without rescue, power as being seen not saved.
Dark feminine mystic, not Christian angelic uplift. No sermon, no divine-light platitude.`;

/** @param {number} year date_written calendar year */
export function getVerseProfile(year) {
  const era = eraFromYear(year);
  const closerExamples = CLOSER_EXAMPLES[era] || CLOSER_EXAMPLES.orchid;
  return { era, year, closerExamples, ...ERA_PROFILES[era] };
}

export function buildVerseSystemPrompt(dateWrittenYear, meta = {}) {
  const profile = getVerseProfile(dateWrittenYear);
  const spirituality =
    meta.category === "spirituality" ? `\n\n${HECATE_SPIRITUALITY_LENS}` : "";

  return `You rewrite archive poetry for the Verse shelf (uncut image — sibling to curated literary analysis).

Written year: ${dateWrittenYear} (${profile.label})
Category: ${meta.category || "unknown"}
Form hint: ${meta.form || profile.form}
${spirituality}

VOICE
${profile.voice}

ERA PROGRESSION: Stay in this era's softness/darkness — do not skip ahead to orchid voice in earlier bands.

TONE FLOOR: balanced — dark edge with room for warmth where era allows; hope earned, never pasted over grief.

KILL ON SIGHT
${profile.forbid.map((f) => `- ${f}`).join("\n")}

STRUCTURE
- Title on its own; do NOT repeat title as first line
- ${profile.lineMax} lines max unless form demands otherwise
- Place names: New Orleans, never NOLA; nicknames (Crescent City, Big Easy) sparse — one per poem max
- Louisiana regional OK outside city when poem is regional
- Creole/French: sparse — one phrase per poem when place-earned
- Profanity: rare at orchid only when poem demands
- Attribution: JV · Dark Heart Labs only — no personal names in published body
- Personal-lore source (Chewy, Winston, Troy): rewrite for archive but shelf: false — off public site
- Love at orchid: moderate heat — body and appetite named, not graphic
- Justice: metaphor only — no contemporary politics
- Reading cross-links: none — verse standalone
- Travel 2026: Auckland → March 2026, Sydney → April 2026, Honolulu → May 2026
- Closing line MUST echo the poem's central image (examples for this era only: ${profile.closerExamples.join(" | ")})
- Final attribution line exactly: JV · Dark Heart Labs
- No hashtags in verse body

Return ONLY valid JSON: { "title": "...", "dek": "one-line thesis optional", "body": "<markdown poem only>", "content_warnings": ["..."], "form": "free-verse|closed|shaped" }`;
}
