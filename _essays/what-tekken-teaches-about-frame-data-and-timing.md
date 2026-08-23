---
layout: essay
title: What Tekken Teaches About Frame Data and Timing
dek: "Fighting games are latency labs with health bars."
number: 008.3
sort_key: 0008.03
date: 2026-05-13
cover: /assets/images/cover-craft.svg
read_time: 2
tags: ['games', 'craft']
type: micro
brief:
  system: Nightbind overlay hotkey path
  issue: a 40ms handler looked instant locally and dropped cues on stream
  constraint: measure round-trip before rewriting the animation
---

Ten frames is the difference between a punish and a guess. Frame data is the spec the animation lied about. Software has the same gap between how it feels and when it actually completes.

I burned a week on Nightbind's overlay hotkey path. A 40ms handler felt instant on my machine. On stream it dropped cues. I had been mashing: more animation, more optimistic UI, another retry. Tekken players learn to read advantage before they press. Greedy inputs get punished. I needed the round-trip time, not a prettier confirm. Cache hits, prefetch, batching the API call before the click: those are frame advantage. Profiling is reading the situation. Deploying again without a rollback is mashing when you already have a backdash. They ship "snappy" because it felt fine in the office. The office is not the match.

Practice the links until the timing is boring. Then spend attention on adaptation. Do not optimize a path you have not measured. Do not ship a "snappier" transition that hides a 200ms call behind a 16ms fade.

If you cannot name the window, you are guessing. Read the frames, then press.

— JV · Dark Heart Labs.
