---
layout: essay
title: Determinism Is a Design Choice
dek: "A reproducible system is a system you can talk about."
number: 530.12
sort_key: 0530.12
date: 2025-07-27
cover: /assets/images/cover-mind.svg
type: micro
brief:
  system: mystic-bytes cover preprocess pipeline
  issue: same JPEG yields different hashes on CI vs local
  constraint: parallel workers; no new dependencies; fix before next batch import
---

Determinism is not a gift from the runtime — it is a constraint teams impose and pay for.

Non-deterministic systems are easy to build and hard to reason about after the fact. I spent a week chasing a cover-preprocess bug in the mystic-bytes pipeline where the same JPEG produced different hashes on CI and locally — not because the image changed, but because parallel workers raced on filesystem ordering and nobody had pinned the sort.[^1] The tests passed most Mondays.

Flaky tests, lying logs, and heisenbugs are taxes on non-determinism, always collected at 2am when nobody wants a new lesson. Randomness is fine when it is named, bounded, and seeded. Elsewhere it is debt.

Design for reproducibility even when it costs throughput. Pin ordering. Fix clocks in tests. Treat "works on my machine" as a failing signal, not a punchline.

If you cannot replay it, you cannot debug it — and you cannot trust it in prod.

— JV · Dark Heart Labs.

[^1]: John Regehr, "A Guide to Undefined Behavior in C and C++" — on how unspecified ordering and optimization assumptions surface as failures far from the original mistake.
