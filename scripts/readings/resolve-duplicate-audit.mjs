/** Final audit-queue resolutions (Jul 2026). */
export const AUDIT_RESOLUTIONS = [
  {
    action: "merge",
    keep: "harry-potter-and-the-sorcerers-stone",
    delete: "harry-potter-and-the-philosophers-stone-harry-potter-1",
    reason: "US canonical edition",
  },
  {
    action: "merge",
    keep: "dare",
    delete: "dare-series-collection",
    reason: "single-title read; drop mislabeled collection entry",
  },
  {
    action: "remove",
    delete: "fifty-shades-trilogy-fifty-shades-1-3",
    reason: "omnibus — individual volumes kept",
  },
  {
    action: "remove",
    delete: "fifty-shades-freed-book-three-of-the-fifty-shades-trilogy-fifty-shades-of-grey-s",
    reason: "UK edition duplicate of Fifty Shades Freed",
  },
  {
    action: "remove",
    delete: "dan-brown-omnibus-angels-and-demons-the-da-vinci-code-robert-langdon-1-2",
    reason: "omnibus — individual volumes kept",
  },
  {
    action: "merge",
    keep: "four",
    delete: "four-a-divergent-story-collection-divergent-0-1-0-4",
    reason: "same work — keep short slug",
  },
  {
    action: "merge",
    keep: "charlottes-web-and-other-illustrated-classics",
    delete: "charlotte-s-web",
    reason: "same work — keep pilot canonical",
  },
  {
    action: "remove",
    delete: "charlottes-web-stuart-little-slipcase-gift-set",
    reason: "packaging-only gift set",
  },
  {
    action: "remove",
    delete: "twilight-series-6-book-collection",
    reason: "box set — twilight.md kept",
  },
  {
    action: "remove",
    delete: "the-lord-of-the-rings-the-trilogy",
    reason: "omnibus — three volumes kept",
  },
  {
    action: "merge",
    keep: "the-fellowship-of-the-ring",
    delete: "the-lord-of-the-rings-the-fellowship-of-the-ring-visual-companion",
    reason: "visual companion → canonical volume",
  },
  {
    action: "merge",
    keep: "the-fellowship-of-the-ring",
    delete: "the-fellowship-of-the-ring-bbc-dramatization-of-the-lord-of-the-rings-1",
    reason: "adaptation → canonical volume",
  },
  {
    action: "remove",
    delete: "maze-runner-the-scorch-trials-the-official-graphic-novel-prelude",
    reason: "orphan tie-in — no prose canonical on shelf",
  },
  {
    action: "remove",
    delete: "maze-runner-the-death-cure-the-official-graphic-novel-prelude",
    reason: "orphan tie-in — no prose canonical on shelf",
  },
  {
    action: "remove",
    delete: "kristys-great-idea-a-graphic-novel-the-baby-sitters-club-graphic-novels-1",
    reason: "orphan graphic novel — no prose canonical on shelf",
  },
];

/** Kept intentionally — no action. */
export const AUDIT_KEPT = [
  {
    slug: "nancy-drew-1-64",
    reason: "Box-set read — school timeline; individual volumes remain",
  },
  {
    slug: "charlottes-web-and-other-illustrated-classics",
    reason: "Pilot canonical for Charlotte's Web",
  },
];
