---
layout: essay
title: Data Models Leak
dek: "The schema you ship leaks into every report that ever queries it."
number: 005.741
sort_key: 0005.741
date: 2024-11-03
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: mystic-bytes reading catalog schema
  issue: import-script field name became join key across four pipelines
  constraint: no breaking rename; partner spreadsheet still depends on column
---

A schema does not stay inside the service that authored it — it leaks into every downstream consumer that ever learned its vocabulary.

I hit this running the mystic-bytes reading catalog: a field named for a one-off import script became the join key in cover reconciliation, vision tagging, and a manually maintained spreadsheet nobody admits they still use. Renaming it honestly would touch four pipelines and a partner workflow. The bad name persists not because anyone likes it, but because the blast radius was never priced upfront.[^1]

This is how schemas calcify. Dashboards, ETL jobs, and analyst exports do not ask permission before they depend on your column names. An innocent rename in v3 is a breaking change in fifteen places you forgot existed.

Plan schemas like public contracts with more signatories than you have headcount. Version outward-facing fields. Document what may change and what is load-bearing forever.

Before you ship the model, list who else will inherit its nouns.

— JV · Dark Heart Labs.

[^1]: Martin Fowler, *Refactoring Databases* (Addison-Wesley, 2006) — on the cost of schema change once dependent systems exist outside the application boundary.
