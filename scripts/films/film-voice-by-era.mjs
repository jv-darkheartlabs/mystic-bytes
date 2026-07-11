/**
 * Era-indexed Projection Room review voice — mirrors reading-life timeline.
 * Uses date_watched year (same era bands as Orchid Room / reading-life).
 */
import { eraFromYear, getVoiceProfile } from "../readings/review-voice-by-era.mjs";

export { eraFromYear, getVoiceProfile };

export const FILM_SECTIONS = [
  {
    label: "Hook & thesis",
    allocation: 12,
    objective:
      "Introduce the film, the adaptation's primary objective, and your definitive verdict on it as cinematic literary art.",
    prompts: [
      "What is the film's true engine — the central human conflict beneath the trope or source material?",
      "What is your verdict in one sharp sentence?",
    ],
  },
  {
    label: "The contextual pivot",
    allocation: 18,
    objective:
      "Ground the film in genre, director's vision, source text, and release context without plot summary.",
    prompts: [
      "Where does this sit in the adaptation landscape and the director's body of work?",
      "What cultural moment does the release speak to — and who is the invisible audience?",
    ],
  },
  {
    label: "Deep-dive critique",
    allocation: 40,
    objective:
      "Analyze craft with specific evidence: cinematography, editing, performance, score, mise-en-scène, fidelity.",
    prompts: [
      "How does structure (pacing, POV, timeline) serve or sabotage the adaptation thesis?",
      "Where does craft excel or falter — visual storytelling, casting, dialogue, sound design?",
      "Is the ending earned relative to the source and the film's own logic?",
    ],
  },
  {
    label: "Adaptation ledger",
    allocation: 15,
    objective: "Document key page-to-screen changes as evidence for the critique.",
    prompts: [
      "What was kept, lost, altered, or invented — and to what effect?",
      "Which changes reveal the adapter's thesis about the source?",
    ],
  },
  {
    label: "Discussion launchpad",
    allocation: 15,
    objective: "Present book-vs-film polarities and open questions for group debate.",
    prompts: [
      "What polarities will split a room for 45 minutes?",
      "What remains unsaid — gaps, biases, unresolved fidelity questions?",
    ],
  },
];

const PROJECTION_ROOM_VOICE = `The Projection Room — JV's cinema-chair voice, adapted from the Orchid Room shelf.
Literary, precise, sharp, gothic-romance fluent. Verdict-forward and a little dangerous.
Never recap plot beat-by-beat. Analyze how and why the adaptation works as film-as-literary-art.
Reference mise-en-scène, editing, performance, sound, and fidelity choices with evidence.
Provoke discussion. Reference heat and desire implicitly through craft — never cite spice numbers.`;

function eraVoiceSuffix(profile) {
  if (profile.era === "orchid") {
    return `${PROJECTION_ROOM_VOICE}\n${profile.footer.replace(/#TheOrchidRoom/g, "#TheProjectionRoom")}`;
  }
  return `${profile.voice}\nAdapt for cinema: analyze the film as literary art — directing, cinematography, adaptation fidelity, casting, score.\n${profile.footer.replace(/#TheOrchidRoom/g, "#TheProjectionRoom")}`;
}

/** @param {number} watchYear date_watched calendar year */
export function buildFilmSystemPrompt(watchYear) {
  const profile = getVoiceProfile(watchYear);
  const sections = FILM_SECTIONS.map(
    (s) =>
      `## ${s.label} (~${s.allocation}%)\n${s.objective}\nQuestions: ${s.prompts.join(" ")}`
  ).join("\n\n");

  const wordMin = Math.round(profile.wordMin * 1.1);
  const wordMax = Math.round(profile.wordMax * 1.15);

  return `You write Projection Room adaptation critiques for a personal film log (cinematic literary art).

Watch year: ${watchYear} (${profile.label})

${eraVoiceSuffix(profile)}

Return ONLY valid JSON: { "body": "<markdown string>" }

The body MUST use exactly these five h2 headings in order:
${FILM_SECTIONS.map((s) => `## ${s.label}`).join("\n")}

${sections}

Rules:
- ${wordMin}–${wordMax} words total across all five sections (bullets count)
- Hook & thesis MUST include **Verdict:** one bold sharp sentence (${profile.verdict})
- No plot recap beat-by-beat — analyze how and why the adaptation works
- Deep-dive: mise-en-scène, cinematography, editing, performance, score, sound design
- Adaptation ledger: 4–8 markdown bullets, each one concrete page-to-screen change
- Discussion launchpad: prose on book-vs-film polarities, then **Questions for the room:** with 3–5 bullets
- Compare to directors and landmark adaptations when it grounds placement
- Never cite spice level numbers
- Final line: hashtags including #TheProjectionRoom #filmadaptation and 3–5 film-specific tags`;
}

export function buildFilmUserPrompt(meta) {
  return JSON.stringify(
    {
      title: meta.title,
      year: meta.year,
      director: meta.director || null,
      category: meta.category || null,
      format: meta.format || null,
      fidelity: meta.fidelity || null,
      source_readings: meta.source_readings || [],
      source_titles: meta.source_titles || [],
      spice: meta.spice ?? null,
      mpaa_rating: meta.mpaa_rating || null,
      tags: meta.tags || [],
      content_warnings: meta.content_warnings || [],
      dek: meta.dek || null,
      watch_year: meta.watch_year ?? null,
      cast: meta.cast || [],
    },
    null,
    2
  );
}
