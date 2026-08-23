---
layout: essay
title: How to Refactor Without Stopping the World
dek: "Big refactors need strangler patterns, not big-bang rewrites."
number: 007.75
sort_key: 000775
date: 2026-04-09
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
type: micro
brief:
  system: dark-heart-themes token and CSS migration
  issue: rewrite urge would freeze theme releases for a quarter
  constraint: keep shipping weekly; migrate callers behind a strangler, not a branch that never merges
---

A refactor that asks the rest of the team to stop shipping is not a refactor. It is a freeze with extra meetings.

I have watched the "just rewrite the tokens" quarter expand because every opened layer revealed another assumption. dark-heart-themes did not get a greenfield stylesheet. New components read the new token path; old ones kept compiling until traffic — in our case, theme downloads — left the legacy names. Main stayed releasable every week. That is the strangler fig in miniature: route new work through the new path, migrate callers incrementally, delete the old path when usage hits zero.[^1] A long-lived rewrite branch is a second product with a hidden integration tax. The freeze looks faster on a whiteboard. In the repo it means every hotfix has nowhere to land except the dying tree.

Define done as a measurable cutover, not a vibe. Eighty percent of checkout flows use PaymentServiceV2 is a stop condition. Rewrite payments is not. Time-box spikes. If exploration blows the box, write findings and choose: continue with funding, or accept the current pain in writing.

Keep main shippable. Refactoring is a project with scope and a stop condition, not a personality trait.

— JV · Dark Heart Labs.

[^1]: Martin Fowler, "Strangler Fig Application" (2004) — incremental replacement of a legacy system by intercepting and migrating calls rather than a big-bang cutover.
