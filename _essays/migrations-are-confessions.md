---
layout: essay
title: Migrations Are Confessions
dek: "Every schema change is a sentence about something the original author got wrong."
number: 005.74
sort_key: 0005.74
date: 2026-06-21
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes readings Postgres schema
  issue: slug column VARCHAR(255) truncates international titles; migration must explain years of silent data loss
  constraint: tired 2am operator; zero-downtime deploy; document reasoning for future archaeologist
---

Every schema change is a sentence about something the original author got wrong. Not maliciously — just earlier, with less information, under different constraints. The migration file is a footnote to a decision someone could not see past, and your job is to write the footnote without contempt.

## Thesis

**Migrations are historiography, not housekeeping.** They record what the team believed about the domain on the day the column was added — and what you believe now that reality argued back.

## Context

The mystic-bytes readings table stored slugs in `VARCHAR(255)`. For years that was fine for English romance titles. Then imports brought longer romanized names and publisher series strings. Postgres did not error on insert — it truncated. Covers linked to the wrong slug. The bug surfaced in the vision rename pass, three hops away from the column, which is how schema sins usually surface.

The migration to `TEXT` with a check constraint was trivial SQL. The hard part was the confession: we assumed slug length was bounded by marketing convention; we never measured; we silent-truncated for eighteen months. The commit message became the primary source for the next person wondering why `slug` is text and not citext.

## Mechanism

Martin Fowler's evolutionary database design treats the schema as a living artifact changed in step with application code — each step reviewable, each step reversible in spirit.[^1] Pramod Sadalage and Fowler's *Refactoring Databases* makes the practice explicit: migrations are the version control of truth.[^2]

**What a migration confesses:**

1. **Domain drift** — we called it a user; it became an account with multiple identities.
2. **Scale surprise** — INT was enough until it was not.
3. **Convenience debt** — nullable everything because we feared migration downtime.
4. **Ignorance** — we did not know time zones existed; we stored local wall clock.

**Good confessions share traits:**

- **Comment the why** — SQL files support comments; use them. "Expand slug per incident #merge-queue-2024-09" links curriculum to schema.
- **Separate expand from contract** — add column, backfill, switch readers, drop old — the expand/contract pattern keeps zero-downtime honest.
- **Leave the paper trail in git** — the migration is not only DDL; it is the PR discussion where someone asked "what about existing rows?"

**Reversible in spirit.** True down migrations are often lies in production. Reversible in spirit means: if a future engineer reads the up file, they understand how to reconstruct the previous belief or why reconstruction is unsafe.

On Nightbind a `status` enum grew a fourth value when payments could be `authorized` but not yet `captured`. The migration did not moralize about the original three-value enum. It noted: *provider added auth/capture split; old rows map here; do not reuse `pending`.* That sentence saved a midnight page.

**Archaeology metaphor is literal.** Schema migration as archaeology appears in industry writing because layers tell time. Drop a column without documentation and you erase a stratum. The next dig assumes bedrock where there was once a parking lot.

## Tradeoffs

**Big bang vs incremental.** Renaming a column in one deploy is fast and scary. Expand/contract is slow and teachable. Pick based on blast radius and sleep budget.

**Strict migrations vs ORM auto-sync.** Auto-sync confesses nothing and reviews nothing. It is fine for prototypes; it is how production loses its archive.

**Normalization vs delivery speed.** Every shortcut column is a future confession. Sometimes you take the shortcut knowingly and write the confession in advance: *denormalized for report latency; rebuild from events nightly.*

**When silence is acceptable.** Adding an index rarely needs philosophy. Adding a nullable column with no behavior change may need only a line. Reserve the essay-in-SQL for belief changes.

Treat the next migration like a letter to a future maintainer who is tired and slightly angry. State what you believed, what broke that belief, and what you are not fixing yet. They will inherit your schema and your reasoning. Give them both.

— JV · Dark Heart Labs.

## References

[^1]: Martin Fowler, "Evolutionary Database Design," martinfowler.com, ongoing. Fowler named and popularized treating database schema as an evolvable codebase artifact — the intellectual frame for migrations as continuous confession rather than rare big-bang events.

[^2]: Pramod J. Sadalage and Martin Fowler, *Refactoring Databases: Evolutionary Database Design* (Addison-Wesley, 2006). The definitive practitioner reference for incremental schema change, expand/contract, and preserving data semantics across refactors.
