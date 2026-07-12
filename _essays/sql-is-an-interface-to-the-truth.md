---
layout: essay
title: SQL Is an Interface to the Truth
dek: "Every other query language is a layer on top of it."
number: 005.7565
sort_key: 0005.7565
date: 2024-11-17
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: analytics dashboard backed by an ORM with three eager-loading layers
  issue: page latency spikes; EXPLAIN shows the ORM emitting six queries where one would suffice
  constraint: no schema migration this sprint; fix must live in application code
---

SQL is the honest interface to relational data — everything else is translation overhead.

I debugged a dashboard last year that had crawled through three ORM abstractions, each "simplifying" access until EXPLAIN showed six round trips where one join would have done. Nothing was wrong with Postgres. The team had refused to learn the layer that actually talked to the rows, so they kept writing the same operations in indirection that compiled back to SQL anyway. Frameworks come and go. The relational model of the world persists.

They avoid SQL because the syntax looks dated. That is a styling complaint, not an architecture argument. The dividend of reading execution plans and writing a clear query pays across every backend you will touch for the next twenty years.

Learn the interface beneath your ORM. When the abstraction lies, you will need the truth it was hiding.

— JV · Dark Heart Labs.

[^1]: Edgar F. Codd, "A Relational Model of Data for Large Shared Data Banks" (*Communications of the ACM*, 1970) — the foundation SQL still implements.
