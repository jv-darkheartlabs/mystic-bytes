#!/usr/bin/env python3
"""Apply Phase 5 rewrites → archive + _essays (games, film, craft, sanitized ops)."""

from __future__ import annotations

import json
from pathlib import Path

BLOG = Path(
    "/Users/jenthedev/Documents/Documents - Jennifer\u2019s MacBook Pro/Active/dark-heart-labs/blog"
)
ESSAYS = Path("/Users/jenthedev/Projects/mystic-bytes/_essays")
MANIFEST = Path("/Users/jenthedev/Projects/mystic-bytes/_data/writing_manifest.json")

# (source, slug, title, dek, body, tags, cover)
POSTS: list[tuple] = []

CRAFT = "/assets/images/cover-craft.svg"
CODE = "/assets/images/cover-code.svg"


def add(source, slug, title, dek, body, tags, cover=CRAFT):
    POSTS.append((source, slug, title, dek, body.strip(), tags, cover))


# --- MUSIC / GAMES ---
add(
    "music-games/BPM as Pacing- The Tempo of Deep Work.md",
    "how-bpm-affects-deep-work-focus",
    "How BPM Affects Deep Work Focus",
    "Tempo entrains your nervous system — choose it before you choose the task.",
    """\
Beats per minute is a cognitive dial, not just a musical one. Below ~80 BPM, planning and architecture spread out. Between 80–120, many people entrain into steady execution — where most of my coding happens. Above 120, urgency rises; fine for short bursts, poor for careful review.

**Entrainment:** biological rhythms sync to external pulse. When work feels forced, ask if the tempo matches the task — slow for design, moderate for implementation, fast only when the scope is tiny.

**Practice:** maintain separate playlists or ambient sets tagged by BPM range. Change tempo mid-session when friction appears — the playlist serves the craftsperson.

This pairs with [games as systems thinking](/p/games-teach-systems-thinking/) — rhythm is a system input.""",
    ["games", "craft"],
)

add(
    "music-games/The Architecture of Playlists.md",
    "how-to-design-playlists-as-focus-infrastructure",
    "How to Design Playlists as Focus Infrastructure",
    "A playlist is a state machine for attention — curate transitions, not just songs.",
    """\
Random shuffle is chaos for deep work. Curated playlists encode intent: warmup, focus block, cooldown.

**Structure:** opening track sets tempo; middle maintains; closing signals stop. Cross-fade or silence between modes matters as much as genre.

**For builders:** instrumental or low-lyric tracks reduce semantic competition with code. Same playlist becomes a habit cue — brain learns *this sound means ship mode*.

Document what worked in a note file; playlists are living configs.""",
    ["games", "craft"],
)

add(
    "music-games/Movement Is Everything- Tekken.md",
    "what-tekken-teaches-about-frame-data-and-timing",
    "What Tekken Teaches About Frame Data and Timing",
    "Fighting games are latency labs with health bars.",
    """\
Tekken rewards frame advantage — acting one beat sooner than the opponent. Software has analogs: cache hits, prefetch, batching API calls before the user clicks.

**Lessons:** read the situation before committing; punishes are real for greedy inputs; practice links until muscle memory frees attention for adaptation.

**Transfer:** profile before optimizing; measure round-trip time; do not mash deploy buttons when rollback exists.""",
    ["games", "craft"],
)

add(
    "music-games/Mana Curves and Meta Games- MTG Arena.md",
    "what-mtg-teaches-about-resource-curves-and-meta-shifts",
    "What MTG Teaches About Resource Curves and Meta Shifts",
    "Mana is budget; meta is platform policy — both punish greedy decks.",
    """\
Magic's mana curve teaches sequencing: play cheap enablers before expensive finishers. Products mirror this — ship core loop before prestige features.

**Meta shifts** when a new card invalidates old strategies — like a dependency major version or API breaking change. Adapt or lose.

**Deck-building for engineers:** sideboard answers for known threats = feature flags and kill switches for known failure modes.""",
    ["games", "craft"],
)

add(
    "music-games/Island Frequency- Animal Crossing.md",
    "what-animal-crossing-teaches-about-gentle-system-design",
    "What Animal Crossing Teaches About Gentle System Design",
    "Low-friction dailies beat punishing grinds for sustained engagement.",
    """\
Animal Crossing succeeds with soft caps, real-time pacing, and no fail state for missing a day. Users return because absence is forgiven, not punished.

**Design transfer:** onboarding that welcomes return after lapse; notifications that inform without shaming; progress that compounds slowly but visibly.

**Anti-pattern:** streak mechanics that punish illness or relocation — real humans miss days.""",
    ["games", "craft"],
)

add(
    "music-games/Flawless Victory- Mortal Kombat 1.md",
    "what-fighting-games-teach-about-explicit-feedback",
    "What Fighting Games Teach About Explicit Feedback",
    "Combo counters and hit sparks are UX — make consequences visible.",
    """\
Fighting games telegraph success and failure immediately. Enterprise software often hides latency and partial failure until the invoice arrives.

**Lesson:** surface state transitions clearly — saving, syncing, failed validation. Users tolerate difficulty when feedback is honest.

**Humility:** getting perfected is data. Log it. Adjust.""",
    ["games", "craft"],
)

# --- FILM ---
add(
    "mythology-film/Electric Sheep, Neon Grief- Blade Runner.md",
    "what-blade-runner-teaches-about-dark-ui-atmosphere",
    "What Blade Runner Teaches About Dark UI Atmosphere",
    "Warmth in private spaces, cold spectacle in public — a palette lesson for interfaces.",
    """\
Blade Runner builds mood without exposition dumps — density felt, not narrated. Strong interfaces behave similarly: affordances learned through use, not tooltip walls.

**Palette:** amber intimacy vs teal noise mirrors where you place warmth in a dark theme. Body text contrast matters more than hero gradients.

**Rain-ready design:** account for bad conditions — slow networks, tired users, 3 AM deploys. Design for the edge case user, not the demo laptop.""",
    ["film", "craft"],
)

add(
    "mythology-film/Chrome and Dust- Mad Max Fury Road.md",
    "what-fury-road-teaches-about-constraint-driven-design",
    "What Fury Road Teaches About Constraint-Driven Design",
    "The chase is the plot — remove filler, ship the core loop.",
    """\
Fury Road is maximal visually but minimal narratively — every shot serves forward motion. Features should earn screen time the same way.

**Constraint as craft:** limited dialogue forced visual storytelling. Limited sprint capacity should force clear scope, not bloated meetings.

**Relentless feedback:** if the user cannot tell what changed after your release, you added chrome not propulsion.""",
    ["film", "craft"],
)

add(
    "mythology-film/The Deep Ones Document Everything.md",
    "what-lovecraftian-horror-teaches-about-observability",
    "What Cosmic Horror Teaches About Observability",
    "The monster you cannot measure is the outage you cannot explain.",
    """\
Horror often comes from incomplete models — sensing something in logs you cannot name. Observability exists to shrink that unknown.

**Lesson:** document the deep systems — queues, cron, third-party webhooks. What you do not instrument becomes mythology in postmortems.

**Tone aside:** your on-call fear is unstructured data. Structure it.""",
    ["film", "craft"],
)

add(
    "mythology-film/The Green Rain- Matrix World from Color.md",
    "what-the-matrix-teaches-about-default-worldviews",
    "What The Matrix Teaches About Default Worldviews",
    "Green tint was a choice — so is your framework's default config.",
    """\
The Matrix's green grade signals artificial reality before dialogue explains it. Defaults train perception.

**Engineering parallel:** framework scaffolds, linter presets, and org templates are worldviews you inherit. Question them before they become invisible.

**Red pill moment:** reading your own production config after a year — what assumptions baked in?""",
    ["film", "craft"],
)

add(
    "mythology-film/The Labyrinth Breathes- Pan's Labyrinth.md",
    "what-pans-labyrinth-teaches-about-layered-narrative",
    "What Pan's Labyrinth Teaches About Layered Narrative",
    "Two worlds — fairy tale and war — interleave without merging sloppily.",
    """\
Del Toro intercuts fantasy and fascist Spain with disciplined pacing. Documentation can layer similarly: user story above, ADR below, runbook beneath — each readable alone, coherent together.

**Craft:** do not confuse metaphor in prose with ambiguity in specs. Stories may be symbolic; APIs may not.""",
    ["film", "craft"],
)

add(
    "mythology-film/The Shimmer Eats the Grid- Annihilation.md",
    "what-annihilation-teaches-about-uncontrolled-refactors",
    "What Annihilation Teaches About Uncontrolled Refactors",
    "The shimmer rewrites everything it touches — so do migrations without tests.",
    """\
Annihilation's horror is transformation without consent or rollback. Codebases behave this way when refactors lack characterization tests.

**Containment:** feature flags, branch deploys, canaries — borders around the shimmer.

**Acceptance:** some legacy cannot be saved; know when to isolate and replace.""",
    ["film", "craft"],
)

# --- TRANSMISSIONS → WRITING (de-branded) ---
add(
    "transmissions/Welcome to Arcaneglam.md",
    "welcome-to-dark-heart-labs-writing",
    "Welcome to Dark Heart Labs Writing",
    "Essays, journal, and wellness notes for builders — code, movement, and craft.",
    """\
This archive is where Dark Heart Labs thinks in public: technical essays, a nomad travel journal with Oceania field notes, wellness for people who live in terminals, and occasional film and game essays about systems.

**What you will find**

- **Essays** — craft, ops, design, AI, culture
- **Journal** — remote work on the road
- **Wellness** — aromatherapy and recovery with realistic claims
- **Projects** — tier-one repos when the writing earns a link

**Voice**

Precise, grounded, no engagement bait. Descriptive titles. Sign-off: JV · Dark Heart Labs.

Start anywhere. The [writing hub](/writing/) lists all shelves.""",
    ["craft"],
)

add(
    "transmissions/The Silence Between Deployments.md",
    "the-anxiety-between-deploy-and-green-metrics",
    "The Anxiety Between Deploy and Green Metrics",
    "The gap before confirmation is a design problem — instrument it.",
    """\
Every deploy has a breath where nothing confirms yet. Anxiety fills unstructured silence.

**Shrink the void:** canaries, synthetic checks, clear health criteria, automated rollback. Pair with [managing anxiety between ship and confirmation](/p/how-to-manage-anxiety-between-ship-and-confirmation/).

**Human note:** the feeling is normal; the system should not rely on you staring at graphs.""",
    ["craft", "ops"],
    CODE,
)

add(
    "transmissions/The Ritual of the Morning Pull.md",
    "why-a-morning-git-pull-is-a-team-ritual",
    "Why a Morning Git Pull Is a Team Ritual",
    "Sync before you speak — know the trunk before you branch.",
    """\
Pull main before standup. Not superstition — shared reality. Conflicts discovered early are cheaper than conflicts discovered at merge time.

**Ritual properties:** short, repeatable, same time daily. Works remote because it is behavioral, not physical.

**Extend:** skim changelog or release notes if your team writes them — context beats surprise.""",
    ["craft", "culture"],
)

add(
    "transmissions/The Ritual of Listening.md",
    "how-to-listen-in-code-review-and-design-critique",
    "How to Listen in Code Review and Design Critique",
    "Understanding precedes rebuttal — especially async.",
    """\
Listening in review means restating the concern before defending the diff. *You are worried about cache invalidation on delete — yes, here is the TTL policy.*

**Async:** write questions as curiosity, not indictment. Remote teams live in text tone.

**Close loop:** when you change based on feedback, say so — teaches reviewers their time mattered.""",
    ["craft", "culture"],
)

add(
    "transmissions/The Cathedral of Silence.md",
    "why-quiet-focus-needs-protected-calendar-blocks",
    "Why Quiet Focus Needs Protected Calendar Blocks",
    "Silence is infrastructure — schedule it or lose it.",
    """\
Open calendars fill with meetings because empty space reads as availability. Protect focus blocks like deploy freezes — titled honestly (*deep work*, not *free*).

**Team norm:** no expectation of instant reply inside focus blocks. Async responses within agreed SLA.

Related: [sensory load as a system resource](/p/sensory-load-is-a-system-resource/).""",
    ["craft"],
)

add(
    "transmissions/Spells Cast in TypeScript.md",
    "typescript-as-a-contract-language",
    "TypeScript as a Contract Language",
    "Types are promises the compiler enforces — write them for readers too.",
    """\
TypeScript does not replace design; it documents intent under change pressure. Strict mode is kindness to future teammates.

**Practice:** prefer explicit return types on public APIs; discriminated unions for state machines; avoid `any` as debt you hide from CI.

See [why strict TypeScript is kindness to future you](/p/why-strict-typescript-is-kindness-to-future-you/).""",
    ["craft", "ai"],
)

add(
    "transmissions/Ambient Worlds and the Spaces Between.md",
    "ambient-sound-and-the-space-between-tasks",
    "Ambient Sound and the Space Between Tasks",
    "Interstitial audio marks transitions when context switching is expensive.",
    """\
Between tasks, silence works — or low ambient sound without lyrics. The goal is marking state change: meeting ended, coding begins.

**Avoid:** autoplay that surprises housemates or coworkers. Headphones are a boundary device.

Pair with [BPM and deep work](/p/how-bpm-affects-deep-work-focus/) when you need tempo, not texture.""",
    ["craft", "games"],
)

# --- SANITIZED OPS (no URLs, credentials, old brands) ---
add(
    "deployment-operations/infrastructure-docs/000 — ArcaneGlam Master Documentation….md",
    "dark-heart-labs-publishing-stack-overview",
    "Dark Heart Labs Publishing Stack Overview",
    "How writing, site, media, and deploy pipelines fit together — at a high level.",
    """\
This is an internal-style overview without vendor secrets. Dark Heart Labs publishes from a Jekyll site (essays, journal, wellness), with media embeds and GitHub-backed projects.

**Layers**

1. **Source** — markdown in repo; manifest tracks migration from legacy blog archive
2. **Build** — static site generator, CI on push
3. **Distribution** — site first; optional cross-post platforms flagged per article
4. **Media** — playlists, podcast, gallery as separate collections

**Principles:** no credentials in git; env vars in host dashboard; one canonical URL per article; de-brand legacy properties completely.

**Ops hygiene:** pin service versions; document rollback; treat social schedulers as optional deps, not source of truth.""",
    ["ops"],
    CODE,
)

add(
    "deployment-operations/infrastructure-docs/1 — YouTube Visualiser Pipeline.md",
    "building-a-youtube-visualizer-pipeline",
    "Building a YouTube Visualizer Pipeline",
    "Audio-reactive video is a batch job — treat it like any other media pipeline.",
    """\
A visualizer pipeline ingests audio, renders frames or shader output, encodes video, uploads to platform. Steps:

1. **Asset in** — lossless audio master, cover art at correct aspect ratio
2. **Render** — headless or GPU batch; log frame timing
3. **Encode** — consistent codec settings for platform limits
4. **Publish** — metadata template (title, description, tags) from file, not hand-typed each time
5. **Verify** — thumbnail and first-frame check automated where possible

**Failure modes:** drift between audio length and video length; copyright flags on stock loops; quota limits on upload API — backoff and retry with idempotency keys.""",
    ["ops"],
    CODE,
)

add(
    "deployment-operations/infrastructure-docs/2 — Postiz Railway Deployment.md",
    "deploying-a-self-hosted-social-scheduler-on-railway",
    "Deploying a Self-Hosted Social Scheduler on Railway",
    "Multi-service deploy on Railway — app, Postgres, Redis — with sane defaults.",
    """\
Self-hosted schedulers replace SaaS buffers when you want RSS-driven cross-posting under your control.

**Topology (typical):** web app + PostgreSQL + Redis on a PaaS. Pin application version explicitly — auto-upgrades break OAuth and migrations.

**Critical steps**

1. Deploy template or compose equivalent services
2. Set public URL env vars *after* networking exposes the correct port
3. Generate strong JWT secret; disable open registration after admin account exists
4. Connect OAuth per platform in provider settings — store secrets in host env, not repo

**RSS flow:** canonical blog feed → scheduler → platforms. Canonical URL always points to your site.

**Cost awareness:** hobby tier suffices for personal volume; watch database storage growth from media uploads.""",
    ["ops"],
    CODE,
)

add(
    "deployment-operations/infrastructure-docs/3 — AliveShoes ArcaneGlam Brand….md",
    "checklist-for-multi-service-railway-deployments",
    "Checklist for Multi-Service Railway Deployments",
    "Repeatable deploy beats heroic memory — especially past three services.",
    """\
When a project spans app + database + cache (+ optional worker):

- [ ] Pin image/tag version in config
- [ ] Document which service owns public HTTP and which port
- [ ] Verify env var names match app docs (URL triplets confuse every team once)
- [ ] Run smoke test after first deploy before connecting OAuth
- [ ] Back up database before schema migrations
- [ ] Set registration closed after bootstrap admin exists
- [ ] Log retention and cost alerts enabled on host

**Rollback story:** previous image tag + database restore point — write it before you need it.""",
    ["ops"],
    CODE,
)


def write_essay(source, slug, title, dek, date, body, tags, cover):
    topic = "/".join(source.split("/")[:-1])
    doc = f'''---
title: "{title}"
dek: "{dek}"
date: {date}
tags: {tags}
read_time: 6
topic: {topic}
status: published
site_slug: {slug}
---

{body}

— JV · Dark Heart Labs.
'''
    (BLOG / source).write_text(doc, encoding="utf-8")
    num = 800 + len(list(ESSAYS.glob("*.md")))  # not used — assign sequential 008.x below


def main():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    by_source = {e["source"]: e for e in manifest["entries"]}
    num = 1
    for source, slug, title, dek, body, tags, cover in POSTS:
        meta = by_source[source]
        topic = "/".join(source.split("/")[:-1])
        number = f"008.{num}"
        sort_key = f"0008.{num:02d}"
        num += 1
        doc = f'''---
title: "{title}"
dek: "{dek}"
date: {meta["date"]}
tags: {tags}
read_time: 6
topic: {topic}
status: published
site_slug: {slug}
---

{body}

— JV · Dark Heart Labs.
'''
        (BLOG / source).write_text(doc, encoding="utf-8")
        site = f'''---
layout: essay
title: {title}
dek: "{dek}"
number: {number}
sort_key: {sort_key}
date: {meta["date"]}
cover: {cover}
read_time: 6
tags: {tags}
---

{body}

— JV · Dark Heart Labs.
'''
        (ESSAYS / f"{slug}.md").write_text(site, encoding="utf-8")
        meta["status"] = "published"
        print("wrote", slug)
    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"phase5 done: {len(POSTS)}")


if __name__ == "__main__":
    main()
