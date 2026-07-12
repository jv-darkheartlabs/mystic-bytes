---
layout: essay
title: How to Treat API Contracts as Long-Term Commitments
dek: "Breaking clients is breaking trust — version accordingly."
number: 007.104
sort_key: 007104
date: 2026-03-03
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
---
APIs are promises with semver: additive changes freely, breaking changes only with version bumps and migration windows.

Document error shapes, pagination, idempotency keys, and rate limits as part of the contract — not as footnotes.

Consumers you do not know exist will integrate. Assume external dependency.

Deprecation timelines beat surprise removal. Telemetry on old endpoints tells you when to close.

Promises kept quietly are how platforms age without rage.


— JV · Dark Heart Labs.
