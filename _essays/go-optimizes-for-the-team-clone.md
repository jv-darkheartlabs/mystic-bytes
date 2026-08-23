---
layout: essay
title: Go Optimizes for the Team Clone
dek: "gofmt is policy. The language wins when the next hire can read the last hire's code."
number: 005.215
sort_key: 0005.215
date: 2026-08-04
cover: /assets/images/cover-code.svg
read_time: 2
tags: [craft]
type: micro
brief:
  system: cloned Go services and CLIs encountered as an operator, not a daily Go author
  issue: teams relitigate style while the language already shipped a formatter as policy
  constraint: no invented Go employer; treat simplicity and gofmt as the clone contract
---

Go is what a team looks like when they are tired of dialect wars. The language is small on purpose. `gofmt` is not a linter you configure. It is policy wearing a formatter's clothes: one layout, no bikeshed, the clone compiles in the head as well as in CI.

I do not write Go daily. I clone it. Fedora packages, other people's CLIs, a service README that says `go build` and means it. The files look like the same person wrote them even when the git log says otherwise. That is the point. Rob Pike treats simplicity as engineering policy for large codebases, not as an aesthetic.[^1] You get boring types, explicit errors, and a standard layout. Cursor can still invent cleverness. The formatter will not save a bad design. It will save the afternoon you were about to spend on tabs versus alignment.

They miss generics-that-look-like-Rust and call Go unsophisticated. The sophistication is social. A language that formats itself is choosing the next reader in another time zone — including me, grepping a clone on a laptop in the Auckland window, checking whether a flag does what the README claims. If your stack cannot survive `gofmt`-level policy, you wanted individuality more than a team clone.

— JV · Dark Heart Labs.

[^1]: Rob Pike, "Go at Google: Language Design in the Service of Software Engineering" (SPLASH 2012). The primary design talk for simplicity as policy; `gofmt` is the everyday enforcement.
