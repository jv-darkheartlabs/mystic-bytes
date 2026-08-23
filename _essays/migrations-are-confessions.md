---
layout: essay
title: Migrations Are Confessions
dek: "The next file admits what yesterday's schema got wrong."
number: 005.74
sort_key: 0005.74
date: 2026-01-31
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: Nightbind checkout statuses; mystic-bytes slug and title fields
  issue: a type or enum silently lost data; the change must explain the old belief
  constraint: tired 2am operator; zero-downtime; write the why for the next author
---

## Thesis

**A migration is a confession, not housekeeping.** It records what the team believed about the domain on the day the column was added, and what you believe now that reality argued back. Write the footnote without contempt.

## Context

This is the writing essay. Archaeology is how you read the chain you inherit. Confession is how you author the next layer so the next archaeologist is not guessing.

Nightbind stored payment-ish rows with a three-value `status` enum. It was honest for a while. Then the provider split authorization from capture. Old rows still said `pending` in a way that no longer meant pending. The SQL to add a fourth value was small. The hard part was the sentence in the file: the original enum assumed a single motion; the provider added a split; old rows map here; do not reuse `pending`. That sentence saved a midnight page.

mystic-bytes taught a quieter version. Titles and slugs live in YAML and in scripts that assume a length. English romance titles fit a habit I did not measure. Longer romanized names and series strings did not. Nothing threw. Things truncated or collided. Covers pointed at the wrong slug. The bug surfaced in the cover-preprocess pass, three hops from the field, which is how these sins usually surface. The commit message had to confess the belief: I assumed marketing-length slugs; I never measured; I silently lost data. Fedora did not care. The catalog did.

I am not a DBA on someone else's payroll. I am the person who has to write the next file so future-me, in Auckland, tired, does not invent a kinder history.

## Mechanism

Fowler's evolutionary database design treats the schema as a living artifact changed in step with application code — each step reviewable, each step reversible in spirit.[^1] *Refactoring Databases* makes the practice operational: migrations are version control for truth.[^2] Confession is the tone that practice requires. You are not cleaning. You are admitting a prior model.

A migration confesses kinds of error. Domain drift: we called it a user; it became an account with several identities. Scale surprise: `INT` was enough until it was not. Convenience debt: nullable everything because we feared downtime. Ignorance: we stored local wall clock and discovered time zones the hard way.

Good confessions share habits. Comment the why. SQL files allow comments. "Expand slug after silent truncation in the import" is curriculum. Separate expand from contract: add column, backfill, switch readers, drop old. That pattern keeps zero-downtime honest and keeps the confession phased instead of epic. Leave the paper trail in git. The DDL is the change. The PR thread is where someone asked what happens to existing rows. Keep both.

Reversible in spirit is the standard I can defend. True down migrations are often lies once production has new meaning in the new column. Reversible in spirit means: if a future engineer reads the up file, they understand how to reconstruct the previous belief, or why reconstruction is unsafe. Nightbind's fourth status did not moralize about the original three. It mapped them.

Contempt is the failure mode. "Whoever did this was an idiot" teaches nothing and usually describes you, earlier, with less information. The original author worked under different constraints. Your job is to name the constraint that died, not to perform superiority in a comment that will outlive your mood.

Cursor will draft a migration that changes the type and leaves the belief unsaid. That is housekeeping. Reject it. The file is the letter.

I keep the archaeology metaphor in its lane. Layers tell time. Dropping a column without a sentence erases a stratum. The confession is what you chisel into the new layer so the next dig does not assume bedrock where there was a parking lot. How to *read* those layers is the other essay. Do not skip it. Do not collapse it into this one.

## Tradeoffs

**Big bang vs incremental.** Renaming a column in one deploy is fast and scary. Expand/contract is slow and teachable. Pick based on blast radius and sleep budget. Payments get the slow path. A mystic-bytes frontmatter key can move faster. Still write the why.

**Strict migrations vs ORM auto-sync.** Auto-sync confesses nothing and reviews nothing. Fine for a prototype. How production loses its archive.

**Normalization vs delivery speed.** Every shortcut column is a future confession. Sometimes you take the shortcut on purpose and write the confession in advance: denormalized for report latency; rebuild from events nightly. A planned confession is still a confession.

**When silence is acceptable.** Adding an index rarely needs philosophy. Adding a nullable column with no behavior change may need a line. Reserve the essay-in-SQL for belief changes — cardinality, identity, lifecycle, lost data.

## Close

Treat the next migration like a letter to a future maintainer who is tired and slightly angry. State what you believed, what broke that belief, and what you are not fixing yet. They will inherit your schema and your reasoning. Give them both.

Do not sneer at the person who shipped the three-value enum. Write the fourth value as if you will be the person who has to explain it at 2am. You will be.

— JV · Dark Heart Labs.

## References

[^1]: Martin Fowler, "Evolutionary Database Design," martinfowler.com. Schema as an evolvable codebase artifact — continuous change rather than rare big-bang events.

[^2]: Pramod J. Sadalage and Martin Fowler, *Refactoring Databases: Evolutionary Database Design* (Addison-Wesley, 2006). Incremental change, expand/contract, and preserving semantics across refactors.
