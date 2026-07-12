---
layout: essay
title: APIs Are Promises With a Version Number
dek: "The endpoint is a contract someone has to keep for years."
number: 004.692
sort_key: 0004.692
date: 2024-12-01
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: dark-heart-themes storefront GraphQL API
  issue: mobile clients still call deprecated productByHandle after slug migration
  constraint: no breaking URL; dual-write responses until integrator sunset date
---

An API endpoint is a promise someone else builds on — and the version number is when you admit the promise changed.

We shipped a slug migration in dark-heart-themes and learned that two mobile builds we do not control still call `productByHandle` with the old shape. GraphQL deprecation logs do not retire clients. They only document guilt. We dual-wrote responses for a quarter while sunset headers ticked down — not because the new schema was hard, but because distributed callers move on their own calendar.[^1] Backward compatibility is distributed state you no longer own. The cost of a breaking field lands in every integrator's backlog, amortized across codebases you will never see.

You design endpoints to outlive the team that wrote them. The team rotates. The clients do not. Breaking changes need louder ceremony than features: versioned paths, migration windows measured in quarters — not sprints.

Treat every public field like a tenant with a lease.

— JV · Dark Heart Labs.

[^1]: Leonard Richardson and Mike Amundsen, *RESTful Web APIs* (O'Reilly, 2013) — on versioning, compatibility, and the long tail of clients that outlive the service team.
