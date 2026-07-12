---
layout: essay
title: How to Refactor Without Stopping the World
dek: "Big refactors need strangler patterns, not big-bang rewrites."
number: 007.75
sort_key: 000775
date: 2007-11-15
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
---
The refactor that eats a quarter rarely finishes in a quarter. It expands because every opened layer reveals another assumption.

Prefer strangler fig patterns: route new work through the new path, migrate callers incrementally, delete old code when traffic hits zero. Keep main deployable weekly — daily if you can.

Define done as measurable: *80% of checkout flows use PaymentServiceV2*, not *rewrite payments*.

Time-box spikes. If exploration exceeds the box, write findings and choose: continue with funding, or accept current state with documented pain.

Refactoring is not a personality trait. It is a project with scope and a stop condition.


— JV · Dark Heart Labs.
