---
layout: essay
title: Documentation as Empathy
dek: "Docs are a letter to the next person — often yourself, six months from now."
number: 428.0
sort_key: 0428.00
date: 2026-06-07
cover: /assets/images/cover-language.svg
type: pillar
brief:
  system: mystic-bytes reading import pipeline
  issue: new contributor cannot run local import without Slack archaeology
  constraint: document in-repo only; no separate wiki; ship before next batch import
---

## Thesis

Documentation is not administrative overhead. It is empathy encoded for the next maintainer — usually yourself, six months later, with none of the context you carry today.

## Context

The mystic-bytes reading import pipeline processed fourteen hundred covers across nine batch scripts, a Swift OCR pass, a vision rename step, and a merge queue I held entirely in working memory. A contributor opened a PR to fix a slug collision and asked how to run imports locally. I answered in Slack — env vars, order of scripts, the footgun about stale preprocess cache. They shipped. Two weeks later I needed the same instructions and could not find them. The knowledge lived in a thread that search could not rank. I was the next person. I had failed to write the letter.

That afternoon I added a `docs/import-pipeline.md` with the three questions I wish every doc answered: what this is, why it exists, how to run it without breaking production data.

## Mechanism

**Empathy is predicting confusion.** Good docs start from the reader's position — skill level, goal, fear — not the author's completeness impulse. Daniele Procida's Diátaxis framework separates tutorials, how-to guides, explanation, and reference because each serves a different need; mixing them produces docs that help nobody.[^1] A tutorial that embeds every flag is exhausting. Reference without "why" is superstition.

**The missing middle is always "why."** Most internal docs jump from overview bullet list to command snippets. Without why — why this order, why this cache must be cleared, why batch seven differs from batch three — the reader cannot generalize when the script changes. They cargo-cult. On Nightbind I require PRs that touch infra to include a "why not X" paragraph: what we considered and rejected. Dead-end paths are part of the map; they prevent the next person from reopening settled debates.

**Tone is a trust signal.** Docs written in blame voice — "obviously," "just run," "as everyone knows" — teach the reader to avoid asking questions. Docs written as a patient colleague shorten onboarding and reduce repeat interrupts. Empathy is not softness; it is predicting where a smart person will stumble and placing a sentence there.

**Docs decay without owners.** README rot is a systems failure, not a moral one. Every doc needs a named steward and a trigger to update — same PR as code change, or it did not happen. The mystic-bytes import doc lives beside the scripts it describes; the PR that changed slug normalization updated the doc in the same commit. Coupling doc diffs to code diffs is the only enforcement that stuck.

**Documentation reduces context-switch tax for the whole team.** A thirty-minute doc saves six Slack interruptions at twenty-three minutes of reconstruction each — the math from any interrupt-aware team. Writing is a batch operation; answering is an interrupt stream. Async-first cultures depend on generous docs the way sync cultures depend on hallway explanations.

**Runbooks are empathy under incident pressure.** The mystic-bytes vision-rename failure at 2am was not the time to discover the doc assumed a Mac-only Swift toolchain. I added a "tired operator" section: minimum env check, safe dry-run flag, how to abort without corrupting the manifest. Empathy at 2am looks like not making me guess which of four scripts is destructive.

## Tradeoffs

**Comprehensive vs maintainable.** The import pipeline does not need a novel. It needs a correct quickstart, a failure-mode table, and pointers to scripts. Stop when the next reader can succeed, not when you have documented every branch.

**Generated vs authored.** OpenAPI and typed CLI `--help` are reference layers; they cannot replace explanation. Generate the tables; write the why.

**Wiki vs repo.** In-repo docs version with code; wikis drift. For operational pipelines, colocation wins.

**When skipping docs is rational.** Throwaway spikes and personal experiments owe nobody a manual. The threshold is **second operator** — the moment someone else might run it, the letter must exist.

Write the doc you wished the previous maintainer had left you — what, why, how, and what not to do. Then name one rejected path so the next reader does not reopen a settled fight. Link it from the README line that new contributors actually read. Future-you is a collaborator worth respecting.

— JV · Dark Heart Labs.

## References

[^1]: Daniele Procida, "Diátaxis: A Systematic Approach to Technical Documentation" (diataxis.fr, 2017–present). Procida's four-quadrant framework — tutorials, how-to, explanation, reference — is the leading structural model for documentation that serves different reader intents without conflating them.

[^2]: Google, *Developer Documentation Style Guide* (Google engineering practices). Google's public style guide codifies clarity, audience-first structure, and actionable procedures — the industry standard reference for technical writing tone in software teams.

[^3]: Donald E. Knuth, *Literate Programming* (Center for the Study of Language and Information, 1992). Knuth's literate programming thesis — code and explanation woven together — is the intellectual ancestor of treating documentation as integral to craft, not an afterthought.
