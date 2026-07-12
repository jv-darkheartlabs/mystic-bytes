---
layout: essay
title: Copy-Paste Is an Honest First Draft
dek: "Three call sites is when the shape becomes visible."
number: 005.118
sort_key: 0005.118
date: 2025-08-17
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: mystic-bytes batch import scripts
  issue: three near-identical merge helpers diverged on edge-case handling
  constraint: preserve public contract; extract shared helper without breaking callers
---

Copy-paste is an honest first draft — and three call sites reveal the real abstraction faster than one ever could.

The mystic-bytes batch import scripts proved it: I pasted the same merge helper twice, then a third time with a slug-normalization tweak the others lacked. The duplication was not laziness; it was reconnaissance. When I changed one path's error handling and forgot the other two, the shape became undeniable — same inputs, same merge order, one missing guard on hyphenated slugs.[^1] Premature DRY would have frozen the wrong interface after the first use. Late DRY extracted a function with three real examples to test against, and the public contract never broke because callers kept their signatures.

Refactor when changing one site implies you should have changed three. Until then, let the copies talk to each other. Beginners are taught to fear duplication; experienced engineers use it to see the shape.

Copy first. Abstract when the pain is synchronized.

— JV · Dark Heart Labs.

[^1]: Sandi Metz, *Practical Object-Oriented Design in Ruby* (Addison-Wesley, 2012) — on preferring duplication over the wrong abstraction until the right shape emerges.
