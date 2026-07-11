/** Slug-rename and audited merge pairs: delete → keep */
export const EXPLICIT_MERGES = [
  { keep: "the-vegas-rule", delete: "the-heartbreak-rule", reason: "slug-rename" },
  { keep: "the-vegas-rule", delete: "the-heartbreak-rule-2", reason: "slug-rename -2" },
  { keep: "white-lines", delete: "across-state-lines", reason: "slug-rename" },
  { keep: "white-lines", delete: "across-state-lines-2", reason: "slug-rename -2" },
  { keep: "pictures-of-you", delete: "part-of-you", reason: "slug-rename" },
  { keep: "pray-for-us", delete: "scream-for-us", reason: "slug-rename" },
  { keep: "pray-for-us", delete: "scream-for-us-2", reason: "slug-rename -2" },
  { keep: "fragile-allegiance", delete: "fragile-longing", reason: "slug-rename" },
  { keep: "fragile-allegiance", delete: "fragile-longing-2", reason: "slug-rename -2" },
  { keep: "watch-your-back", delete: "watch-your-back-2", reason: "accidental -2" },
  { keep: "youre-next", delete: "youre-next-2", reason: "accidental -2" },
  { keep: "dear-reader", delete: "dear-reader-2", reason: "accidental -2" },
  { keep: "villain-era", delete: "villain", reason: "duplicate title" },
  { keep: "deacon", delete: "deacon-2", reason: "accidental -2" },
  { keep: "westin", delete: "westin-2", reason: "accidental -2" },
  { keep: "sovereign", delete: "sovereign-2", reason: "accidental -2" },
  { keep: "losers", delete: "losers-2", reason: "accidental -2" },
  { keep: "fairydale", delete: "fairydale-2", reason: "accidental -2" },
  { keep: "the-blood-we-crave", delete: "the-blood-we-crave-2", reason: "accidental -2" },
  { keep: "the-blood-we-crave", delete: "the-blood-we-crave-3", reason: "accidental -2" },
  { keep: "a-darker-shade-of-magic", delete: "the-shades-of-magic", reason: "OCR misread" },
  { keep: "dark-fae", delete: "a-dark-fate", reason: "OCR misread" },
  { keep: "savage-fae", delete: "a-savage-fae", reason: "OCR misread" },
  { keep: "warrior-fae", delete: "a-war-of-fae-and-fate", reason: "OCR misread" },
  { keep: "a-house-of-powder-and-plot", delete: "a-heart-of-powder-and-plot", reason: "OCR misread" },
  { keep: "breaking-hailey", delete: "breaking-hailee", reason: "OCR typo" },
  { keep: "peaches-honey", delete: "peace-honey", reason: "OCR misread" },
  { keep: "pits-poison", delete: "pine-poison", reason: "OCR misread" },
  { keep: "slash-or-pass", delete: "passion", reason: "OCR misread" },
  { keep: "sinners-absolve", delete: "sinners-absolute", reason: "OCR misread" },
  { keep: "the-duke-and-i", delete: "the-duke-i", reason: "OCR truncation" },
  { keep: "the-once-and-future-king", delete: "the-once-future-king", reason: "OCR truncation" },
  { keep: "john-dies-at-the-end", delete: "john-dies-the-end", reason: "OCR truncation" },
  { keep: "lawless-god", delete: "the-lawless-god", reason: "OCR prefix" },
  { keep: "never-say-never", delete: "never", reason: "OCR truncation" },
  { keep: "crescent-city-house-of-earth-and-blood", delete: "house-of-earth-and-blood", reason: "OCR truncation" },
  { keep: "song-of-the-forever-rains", delete: "forever-rains", reason: "OCR truncation" },
  { keep: "symphony-for-a-deadly-throne", delete: "deadly-throne", reason: "OCR truncation" },
  { keep: "bewitched", delete: "bewitched-book-one", reason: "OCR suffix" },
  { keep: "altair-university-the-bleak-beginning", delete: "altair-university-2", reason: "series re-import" },
  { keep: "altair-university-the-ruthless-rivalry", delete: "altair-university", reason: "series re-import" },
  { keep: "the-murder-of-roger-ackroyd", delete: "the-murder-of-ackroyd", reason: "mis-titled duplicate" },
  { keep: "credence", delete: "credence-2", reason: "accidental -2" },
  { keep: "i-promise-you", delete: "i-promise-you-2", reason: "accidental -2" },
  { keep: "the-secret-garden", delete: "the-secret-garden-2", reason: "accidental -2" },
  { keep: "bound-by-the-past", delete: "sins-of-the-past", reason: "mis-titled duplicate" },
  { keep: "the-primal-of-blood-and-bone", delete: "the-ritual-of-bone", reason: "mis-titled duplicate" },
];

/** US/UK edition pairs — audit only, no auto-merge */
export const US_UK_AUDIT = [
  {
    slugs: ["harry-potter-and-the-sorcerers-stone", "harry-potter-and-the-philosophers-stone-harry-potter-1"],
    note: "US vs UK Harry Potter #1",
  },
];

/** Box set / omnibus — audit only */
export const BOX_SET_AUDIT = [
  "dare-series-collection",
  "fifty-shades-trilogy-fifty-shades-1-3",
  "fifty-shades-freed-book-three-of-the-fifty-shades-trilogy-fifty-shades-of-grey-s",
  "dan-brown-omnibus-angels-and-demons-the-da-vinci-code-robert-langdon-1-2",
  "four-a-divergent-story-collection-divergent-0-1-0-4",
  "the-lord-of-the-rings-the-trilogy",
  "charlottes-web-and-other-illustrated-classics",
  "charlottes-web-stuart-little-slipcase-gift-set",
  "nancy-drew-1-64",
  "twilight-series-6-book-collection",
];

export const REFERENCE_REMOVE =
  /sheet music|piano solos|selected themes from the motion picture|study notes|study guide|summary.*analysis|interactive quiz|comptia|authorized courseware|essential wisdom from the collected works|weapons and warfare|penguin study notes/i;

export const ADAPTATION_MERGE =
  /graphic novel|movie companion|illustrated movie companion|official illustrated movie companion|visual companion|a graphic novel/i;

export function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function coreTitle(title) {
  let n = norm(title);
  for (const stop of [
    " book ",
    " essential wisdom ",
    " summary analysis",
    " sheet music",
    " piano solos",
    " study notes",
    " study guide",
    " a graphic novel",
    " the graphic novel",
    " movie companion",
    " illustrated movie",
    " visual companion",
    " omnibus ",
    " trilogy ",
    " series collection ",
    " selected themes from the motion picture",
  ]) {
    if (n.includes(stop)) n = n.split(stop)[0].trim();
  }
  return n;
}
