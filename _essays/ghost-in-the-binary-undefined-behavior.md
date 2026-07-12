---
layout: essay
title: "The Ghost in the Binary: Undefined Behavior"
dek: "Undefined behavior is the boogeyman of systems programming."
number: 005.3
sort_key: 0005.03
date: 2025-12-21
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: native cover-preprocess module in mystic-bytes pipeline
  issue: out-of-bounds read "worked" for two years until optimizer rewrite
  constraint: no new dependencies; enable sanitizers in existing CI
---

Undefined behavior is a contract hole — the language promises nothing, and the compiler will exploit that absence when it suits the optimizer.

The bug that taught me this was innocent on paper: an out-of-bounds read in native cover-preprocess code that "worked" for two years until a new optimization pass decided the impossible path could not happen and deleted what it thought was dead logic. Cause and effect separated by eighteen months is the horror genre UB belongs to.[^1] Sanitizers and strict flags do not slow you down for sport — they shrink the distance between mistake and symptom.

Teams treat UB as folklore because the program often runs. That is not evidence of safety; it is evidence the compiler has not yet chosen to punish an assumption you never wrote down.

Lint for it. Test under sanitizers in CI. Assume the ghost is present until you have proof otherwise.

— JV · Dark Heart Labs.

[^1]: John Regehr, "A Guide to Undefined Behavior in C and C++" — on temporal distance between UB introduction and observable failure under optimization.
