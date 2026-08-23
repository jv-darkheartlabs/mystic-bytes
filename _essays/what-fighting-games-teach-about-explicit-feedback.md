---
layout: essay
title: What Fighting Games Teach About Explicit Feedback
dek: "Combo counters and hit sparks are UX — make consequences visible."
number: 008.6
sort_key: 0008.06
date: 2026-05-17
cover: /assets/images/cover-craft.svg
read_time: 2
tags: ['games', 'craft']
type: micro
brief:
  system: NeuroShell command palette
  issue: failed commands returned to a quiet prompt with no reason in view
  constraint: keep the terminal calm; surface save, sync, and validation state without a modal wall
---

You know you got hit because the screen says so. Hit spark, combo counter, blockstun: the game does not hide the result until the round ends. Most work software does.

I shipped a quiet failure in NeuroShell's command palette. A bad command returned to the prompt with nothing in view. Users assumed it had worked, then found the file unchanged. Fighting games would never do this. Difficulty is tolerated when the consequence is honest and immediate. Enterprise tools often hide latency and partial failure until an invoice, a duplicate charge, or a missing export shows up days later. Saving, syncing, validating, retrying: each of those is a state transition. If the UI does not name it, people invent a story, and the story is usually that the tool is fine.

Surface the transition. Keep the chrome small. A spinner without a reason is still a lie. A red inline error is feedback. A silent 200 with an empty body is not.

If the user cannot tell whether the last action landed, you are making them play without a health bar. Put the spark on screen.

— JV · Dark Heart Labs.
