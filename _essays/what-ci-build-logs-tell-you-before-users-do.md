---
layout: essay
title: What CI Build Logs Tell You Before Users Do
dek: "The build pipeline is early warning infrastructure — if you read it."
number: 007.70
sort_key: 000770
date: 2026-04-02
cover: /assets/images/cover-craft.svg
read_time: 2
tags: ['craft']
type: micro
brief:
  system: mystic-bytes GitHub Actions
  issue: main went red on a liquid include; the first error was buried under a warning cascade
  constraint: keep the job; fix root failures before chasing months of accumulated noise
---

A failed job on main still has zero users. Read it while that is true. CI is telemetry about whether your change still fits the system you think you are building.

I wasted an afternoon on mystic-bytes because I scrolled to the last red line. The cascade was a pile of Jekyll warnings we had tolerated for months. The first error was a broken liquid include. Once I fixed that, the rest went quiet. The pipeline had been talking the whole time. I had been reading the aftermath. Fail fast on the checks that catch category mistakes: types, lint on changed files, unit tests for touched modules. Slow checks (integration, visual, end-to-end) should not block every push. They should still block a release. Users never see a red job you actually read.

Keep the logs. A run from Tuesday is evidence when production breaks on Friday. Tag artifacts with the commit SHA. Link CI to deploys so you can answer what exactly shipped, not what you meant to ship.

Treat a red build as a message, not an interruption. Start at the first error.

— JV · Dark Heart Labs.
