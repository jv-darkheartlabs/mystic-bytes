---
layout: essay
title: Caching Is a Tax on Correctness
dek: "The fastest answer is also the easiest one to get wrong."
number: 005.276
sort_key: 0005.276
date: 2024-11-10
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: mystic-bytes reading cover pipeline
  issue: stale thumbnail served after manifest correction
  constraint: no full re-fetch of 1,400 covers; ship fix before next deploy
---

A cache trades latency for consistency. You are not buying speed — you are accepting a bounded lie and betting you know exactly when that lie expires.

I learned this again running the mystic-bytes cover pipeline: a corrected manifest entry still rendered the old image because the CDN edge and the local preprocess cache each had a different notion of "current." Nothing was wrong with Redis or the object store. The team — me, at 11pm — had never written down which layer owned invalidation when a slug changed but the filename did not.[^1]

Most cache incidents look like implementation bugs and are actually contract bugs. The cache did what caches do: returned the last answer it was allowed to keep. The system failed because nobody had named the staleness budget out loud — how wrong the UI may be, for how long, under which events.

Document the contract before you tune TTLs. If you cannot explain when the cache is permitted to lie, you are not ready to add one.

— JV · Dark Heart Labs.

[^1]: Martin Kleppmann, *Designing Data-Intensive Applications* (O'Reilly, 2017) — especially the material on replication lag and the difficulty of cache invalidation as a consistency problem, not a performance knob.
