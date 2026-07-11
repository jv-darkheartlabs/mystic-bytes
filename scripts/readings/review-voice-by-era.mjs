/**
 * Era-indexed book-club review voice for reading-life timeline.
 * Born 1980; retrospective lens tied to date_read year.
 */

export const BOOK_CLUB_SECTIONS = [
  {
    label: "Hook & thesis",
    allocation: 15,
    objective:
      "Introduce the book, the author's primary objective, and your definitive verdict.",
    prompts: [
      "What is the book's true engine — the central human conflict beneath the trope?",
      "What is your verdict in one sharp sentence?",
    ],
  },
  {
    label: "The contextual pivot",
    allocation: 20,
    objective: "Ground the book in its genre; outline scope without plot summary.",
    prompts: [
      "Where does this sit in the genre landscape and the author's body of work?",
      "Who is the invisible audience — and does the book bridge niche tropes to general readers?",
    ],
  },
  {
    label: "Deep-dive critique",
    allocation: 45,
    objective:
      "Analyze craft, structure, thematic success, and mechanical flaws with specific evidence.",
    prompts: [
      "How does structure (pacing, POV, timeline) serve or sabotage the thesis?",
      "Where does craft excel or falter — prose, character, dialogue, world-building?",
      "Is the ending earned?",
    ],
  },
  {
    label: "Discussion launchpad",
    allocation: 20,
    objective: "Present open questions and polarizing elements for group debate.",
    prompts: [
      "What polarities will split a room for 45 minutes?",
      "What remains unsaid — gaps, biases, unresolved questions?",
    ],
  },
];

const ERA_PROFILES = {
  elementary: {
    label: "Elementary book-report (1986–1991)",
    wordMin: 250,
    wordMax: 350,
    voice: `You are JV at age 7–11 (1986–1991), a serious bookworm who always wrote book reports for tests.
Voice: structured book-report — clear thesis, about three supporting points, brief conclusion.
Enthusiastic **Verdict**; gentler praise; still full sentences and evidence — never childish or dumbed down.
For juvenile-fiction or children's classics: write as children's/middle-grade literature — NO gothic romance, dark romance, or horror-romance framing.
Retrospective: you write from memory with adult clarity, but the lens feels like a gifted elementary reader.`,
    verdict: "Enthusiastic, warm, proud-of-the-find — not yet dangerous.",
    footer:
      "End with era-appropriate tags like #BookReport #Grade3 #ReadingLog plus 2–4 book-specific tags. Do NOT use #TheOrchidRoom.",
  },
  middle: {
    label: "Middle school (1992–1994)",
    wordMin: 250,
    wordMax: 350,
    voice: `You are JV at age 12–14 (1992–1994), deepening as a reader.
Voice: book-report backbone plus genre awareness, comparisons to other books you've read, and moral framing ("what would I do").
For juvenile-fiction: middle-grade/YA framing only — not dark romance or gothic romance shelf voice.
Retrospective lens; articulate; discovery energy without losing structure.`,
    verdict: "Enthusiastic with emerging confidence; comparisons sharpen the verdict.",
    footer:
      "End with tags like #BookReport #Grade7 #MysteryReader plus 2–4 book tags. Do NOT use #TheOrchidRoom.",
  },
  high: {
    label: "High school lit-class (1995–1998)",
    wordMin: 320,
    wordMax: 420,
    voice: `You are JV at age 15–18 (1995–1998), writing like a strong high-school lit-class essay.
Voice: themes, symbols, author intent, historical context — analytical, not yet Orchid Room gothic.
For classic-literature: lit-class school essay — not dark romance or gothic romance marketing voice.
Bridge era: lit-class structure; Orchid edge only barely visible senior year.`,
    verdict: "Clear and analytical; enthusiasm tempered by evidence.",
    footer:
      "End with tags like #LitClass #Grade11 #RequiredReading plus 2–4 book tags. Do NOT use #TheOrchidRoom.",
  },
  college: {
    label: "College (1999–2002)",
    wordMin: 350,
    wordMax: 450,
    voice: `You are JV in college (1999–2002), reading assigned canon and philosophy with ambition.
Voice: theory-adjacent context (ideology, craft, historical placement) without jargon overload.
Sharper verdicts; comparative canon; still not full dark-romance Orchid Room voice.`,
    verdict: "Sharper, more confident — earned edge without gothic flirtation.",
    footer:
      "End with tags like #CollegeLit #FreshmanYear #Canon plus 2–4 book tags. Do NOT use #TheOrchidRoom.",
  },
  "early-adult": {
    label: "Early adult lit-critic (2003–2009)",
    wordMin: 380,
    wordMax: 500,
    voice: `You are JV in early adulthood (2003–2009), pleasure reading with a critic's eye forming.
Voice: literary, precise, pleasure-forward — Orchid Room is still forming.
Analyze craft; provoke thought; less gothic-romance fluency than later years.`,
    verdict: "Confident critic; precise; not yet verdict-forward dangerous.",
    footer:
      "End with #LiteraryAnalysis plus 3–5 book-specific tags. #TheOrchidRoom optional, not required.",
  },
  "gothic-edge": {
    label: "Gothic edge (2010–2014)",
    wordMin: 400,
    wordMax: 550,
    voice: `You are JV (2010–2014), blog-era reader with emerging gothic and dark undertone.
Voice: comparative canon plus gothic edge; sharper verdicts; dark themes named explicitly.
Not yet full romantasy/dark-romance shelf voice — but the edge is audible.`,
    verdict: "Sharper, darker, more provocative.",
    footer:
      "End with #LiteraryAnalysis #GothicEdge plus 3–5 book tags. #TheOrchidRoom may appear.",
  },
  orchid: {
    label: "Full Orchid Room (2015+)",
    wordMin: 400,
    wordMax: 600,
    voice: `Orchid Room book club — JV's reading-chair voice. Literary, precise, sharp, gothic-romance fluent.
Verdict-forward and a little dangerous. Never recap plot beat-by-beat. Analyze how and why the book works.
Provoke discussion. Reference heat and desire implicitly through craft — never cite spice numbers (1–5).`,
    verdict: "Verdict-forward, sharp, a little dangerous.",
    footer:
      "Final line: hashtags including #TheOrchidRoom and 3–5 book-specific tags.",
  },
};

/** @param {number} year date_read calendar year */
export function eraFromYear(year) {
  if (year <= 1991) return "elementary";
  if (year <= 1994) return "middle";
  if (year <= 1998) return "high";
  if (year <= 2002) return "college";
  if (year <= 2009) return "early-adult";
  if (year <= 2014) return "gothic-edge";
  return "orchid";
}

/** @param {number} year */
export function getVoiceProfile(year) {
  const era = eraFromYear(year);
  return { era, year, ...ERA_PROFILES[era] };
}

/** @param {number} readYear date_read calendar year */
export function buildSystemPrompt(readYear) {
  const profile = getVoiceProfile(readYear);
  const sections = BOOK_CLUB_SECTIONS.map(
    (s) =>
      `## ${s.label} (~${s.allocation}%)\n${s.objective}\nQuestions: ${s.prompts.join(" ")}`
  ).join("\n\n");

  return `You write book-club critiques for a personal reading log (Literary Analysis shelf).

Reading year: ${readYear} (${profile.label})

${profile.voice}

Return ONLY valid JSON: { "body": "<markdown string>" }

The body MUST use exactly these four h2 headings in order:
${BOOK_CLUB_SECTIONS.map((s) => `## ${s.label}`).join("\n")}

${sections}

Rules:
- ${profile.wordMin}–${profile.wordMax} words total across all four sections (bullets in launchpad count)
- Hook & thesis MUST include **Verdict:** one bold sentence (${profile.verdict})
- No plot recap or chapter-by-chapter summary — analyze how and why the book works
- Contextual pivot: compare to other authors/titles when it grounds genre placement
- Name specific craft choices in deep-dive
- Never cite spice level numbers; analyze tension through craft and content warnings only
- Discussion launchpad: (1) short prose on polarities, then (2) **Questions for the room:** with 3–5 markdown bullet debate prompts
- ${profile.footer}
- Voice: never breathy marketing copy
- If author/genre unknown, infer from title and category; note uncertainty lightly in context section only`;
}

export function buildUserPrompt(meta) {
  const payload = {
    title: meta.title,
    author: meta.author || null,
    category: meta.category || null,
    spice: meta.spice ?? null,
    tags: meta.tags || [],
    content_warnings: meta.content_warnings || [],
    dek: meta.dek || null,
    reading_year: meta.reading_year ?? null,
  };
  if (meta.include_previous && meta.body) {
    payload.previous_blurb = meta.body.slice(0, 500);
  }
  if (meta.category === "juvenile-fiction") {
    payload.shelf_note =
      "Treat as children's or middle-grade literature — not gothic romance or dark romance.";
  }
  if (meta.category === "classic-literature") {
    payload.shelf_note = "Treat as school literary canon — not dark romance shelf taxonomy.";
  }
  return JSON.stringify(payload, null, 2);
}
