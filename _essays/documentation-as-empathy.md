---
layout: essay
title: Documentation as Empathy
dek: "Docs are a letter to the next person — often yourself, six months from now."
number: 428.0
sort_key: 0428.00
date: 2026-07-17
cover: /assets/images/cover-language.svg
type: pillar
brief:
  system: mystic-bytes reading import pipeline
  issue: new contributor cannot run local import without Slack archaeology
  constraint: document in-repo only; no separate wiki; ship before next batch import
---

## Thesis

Documentation is empathy encoded for the next maintainer. That person is often you, six months later, with none of the context you carry today. A doc that only proves the author was thorough has failed. A doc that lets a tired stranger succeed has done the job.

## Context

The mystic-bytes reading import pipeline processed fourteen hundred covers across nine batch scripts, a Swift OCR pass, a vision rename step, and a merge queue I held entirely in working memory. A contributor opened a PR to fix a slug collision and asked how to run imports locally. I answered in Slack: env vars, order of scripts, the footgun about stale preprocess cache. They shipped.

Two weeks later I needed the same instructions and could not find them. The knowledge lived in a thread that search could not rank. I was the next person. I had failed to write the letter.

That afternoon I added `docs/import-pipeline.md` with the three questions I wish every internal doc answered: what this is, why it exists, how to run it without breaking production data. In-repo only. No wiki. The next batch import was the deadline, which was useful. Deadlines keep docs from becoming novels.

The constraint matters. A separate wiki would have drifted from the scripts within a month. Colocating the letter with the code is how the letter stays true.

## Mechanism

Empathy, here, is predicting confusion. Good docs start from the reader's position (skill level, goal, fear), not from the author's completeness impulse. Daniele Procida's Diátaxis framework separates tutorials, how-to guides, explanation, and reference because each serves a different need. Mixing them produces pages that help nobody. A tutorial that embeds every flag is exhausting. Reference without "why" is superstition. Name the genre before you write the page.[^1]

The missing middle is almost always why. Most internal docs jump from an overview bullet list to command snippets. Without why (this order, this cache that must be cleared, batch seven differing from batch three) the reader cannot generalize when the script changes. They cargo-cult. On Nightbind I ask PRs that touch infra to include a "why not X" paragraph: what we considered and rejected. Dead-end paths are part of the map. They stop the next person from reopening a fight you already lost on purpose.

Tone is a trust signal. Docs written in blame voice ("obviously," "just run," "as everyone knows") teach the reader to stop asking. Docs written as a patient colleague shorten onboarding and cut repeat interrupts. Empathy is not softness. It is putting a sentence where a smart person will stumble.

Docs decay without owners. README rot is a systems failure, not a moral one. Every doc needs a named steward and a trigger to update: same PR as the code change, or it did not happen. The mystic-bytes import doc lives beside the scripts it describes. The PR that changed slug normalization updated the doc in the same commit. Coupling doc diffs to code diffs is the only enforcement that stuck. Style guides help after that, not before.[^2]

Writing is a batch operation. Answering Slack is an interrupt stream. A thirty-minute doc saves a string of reconstructions, each one pulling someone out of deep work to rebuild context they already paid for once. Async-first teams depend on generous docs the way hallway cultures depend on proximity. If the knowledge only lives in a thread, you do not have documentation. You have a coincidental archive.

Runbooks are empathy under incident pressure. The mystic-bytes vision-rename failure at 2am was not the time to discover the doc assumed a Mac-only Swift toolchain. I added a "tired operator" section: minimum env check, safe dry-run flag, how to abort without corrupting the manifest. Empathy at 2am looks like not making the operator guess which of four scripts is destructive.

Donald Knuth's literate programming thesis, code and explanation woven together, is the ancestor of this stance. You do not have to adopt his tooling. You do have to treat the explanation as part of the artifact, not a courtesy after ship.[^3]

## Tradeoffs

Comprehensive versus maintainable. The import pipeline does not need a novel. It needs a correct quickstart, a failure-mode table, and pointers to scripts. Stop when the next reader can succeed. Documenting every branch is how the letter goes stale while you are still writing it.

Generated versus authored. OpenAPI and typed CLI `--help` are reference layers. They cannot replace explanation. Generate the tables. Write the why. If the generated output is the only doc, operators will still Slack you at 2am.

Wiki versus repo. In-repo docs version with code. Wikis drift, especially when the wiki lives in a different product with a different owner. For operational pipelines, colocation wins. Use a wiki for narrative that is allowed to be wrong for a week.

When skipping docs is rational. Throwaway spikes and personal experiments owe nobody a manual. The threshold is second operator: the moment someone else might run it, including future-you on a bad night, the letter must exist.

## Close

Write the doc you wished the previous maintainer had left you: what, why, how, and what not to do. Name one rejected path so the next reader does not reopen a settled fight. Link it from the README line that new contributors actually read.

Future-you is a collaborator. Treat them that way on the day the context is still cheap to write down.

— JV · Dark Heart Labs.

## References

[^1]: Daniele Procida, "Diátaxis: A Systematic Approach to Technical Documentation" (diataxis.fr, 2017–present). Four reader intents — tutorial, how-to, explanation, reference — kept in separate rooms so a page can actually serve one of them.

[^2]: Google, *Developer Documentation Style Guide*. Public guidance on audience-first structure, actionable procedures, and tone that does not punish the reader for not already knowing.

[^3]: Donald E. Knuth, *Literate Programming* (CSLI, 1992). The argument that explanation belongs inside the work, not as a later apology for it.
