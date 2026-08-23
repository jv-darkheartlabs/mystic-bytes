---
layout: essay
title: How to Treat API Contracts as Long-Term Commitments
dek: "Breaking clients is breaking trust — version accordingly."
number: 007.104
sort_key: 007104
date: 2026-06-18
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
type: micro
brief:
  system: Nightbind public status JSON
  issue: renamed a field; a Grafana dashboard we forgot still polled the old key
  constraint: additive changes only until sunset telemetry hits zero; no surprise removal
---

A public field is a lease. You can renovate the interior. You cannot move the front door without telling every tenant.

Nightbind taught me that with a status JSON rename. We cleaned a field name. A Grafana dashboard we had forgotten still polled the old key. The API was "ours." The consumer was not in the repo. Additive changes ship freely. Breaking changes need a version bump, a migration window measured in something longer than a sprint, and telemetry on the old path so you know when you can close it. Error shapes, pagination, idempotency keys, and rate limits are the contract — not footnotes you fix after the first angry integrator.

They integrate without telling you. Assume consumers you will never meet. Surprise removal is how platforms earn rage. Quiet deprecation timelines, dual-writes, and sunset headers are how they age without a revolt. The team that wrote the endpoint will rotate. The clients will not. If you cannot name when the old field dies, you have not scheduled the break. You have postponed the apology.

Treat the endpoint like a promise you still have to keep after you have forgotten why you made it.

— JV · Dark Heart Labs.
