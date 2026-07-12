---
layout: essay
title: Why Observability Is Not the Same as Monitoring
dek: "Monitoring tells you when known problems fire. Observability lets you ask new questions."
number: 007.94
sort_key: 000794
date: 2024-01-23
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
---
Dashboards of golden signals catch regressions you anticipated. They fail on novel failures — the bug you never instrumented.

Observability requires high-cardinality logs, exemplars, trace context, and ad-hoc query ability.

Build for questions: *show checkout latency for EU users on mobile when flag X is on.*

Monitoring is insurance on known risks. Observability is exploration budget for unknown ones.

Ship both; confuse neither.


— JV · Dark Heart Labs.
