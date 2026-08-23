---
layout: essay
title: What Pan's Labyrinth Teaches About Layered Narrative
dek: "Two worlds — fairy tale and war — interleave without merging sloppily."
number: 008.11
sort_key: 0008.11
date: 2026-05-24
cover: /assets/images/cover-craft.svg
read_time: 2
tags: ['film', 'craft']
type: micro
brief:
  system: mystic-bytes docs set
  issue: the essay, TECH_SPEC, and deploy runbook were merged into one page that served none of them
  constraint: keep three layers; each must be readable alone
---

Two stories can share a frame and still need different contracts. Del Toro intercuts the fairy tale and the war so each scene is legible on its own. Documentation that dumps every audience into one page does the opposite.

I merged the mystic-bytes essay, the TECH_SPEC, and the deploy runbook into a single "guide" because I was tired of switching files. The result served no one. A reader looking for the claim got YAML. An operator looking for the rollback got metaphor. An architect looking for the decision got a how-to. Layered narrative in that film works because the cuts are disciplined: you always know which world you are in. Specs need the same cut. User-facing prose on top. ADRs under that. Runbooks beneath. Each layer readable alone, coherent if you read down.

Do not confuse metaphor in an essay with ambiguity in an API. Stories may be symbolic. Endpoints may not. If a sentence could belong to any of the three layers, it belongs to none of them yet. Split it.

Keep the cut. Do not flatten the house into one hallway.

— JV · Dark Heart Labs.
