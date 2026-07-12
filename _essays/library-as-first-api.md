---
layout: essay
title: The Library as the First API
dek: "The library is an information retrieval system built around a specific access pattern."
number: 020.0
sort_key: 0020.00
date: 2026-02-01
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: mystic-bytes reading catalog
  issue: search returns duplicates because slug, title, and author live in three indexes
  constraint: no schema migration; unify discovery without breaking existing URLs
---

The library is the first API for finding things — an information retrieval system built around a human access pattern: walk in, ask a question, leave with an object.

I hit the same shape building the mystic-bytes reading catalog. Call numbers became slugs. The reference desk became full-text search. The hold shelf became a queue. Each surface looked like a new feature; each was the same retrieval problem with a different latency budget. The pain started when three indexes — title, author, tag — each answered "find this book" differently, and nobody had named which one owned disambiguation.[^1]

Software keeps reinventing the library and calling it innovation. Catalogues, holds, and reference are UX decisions made centuries before we had the vocabulary. The building is the contract: where you enter, what you can ask, what you get back, and what happens when the thing is checked out.

Before you design another search surface, walk the nearest branch. Several hundred years of iteration are documented in the architecture.

— JV · Dark Heart Labs.

[^1]: S. R. Ranganathan, *The Five Laws of Library Science* (Madras Library Association, 1931) — especially the principle that every book has its reader and every reader their book, which is an indexing problem dressed as philosophy.
