---
layout: essay
title: Why Observability Is Not the Same as Monitoring
dek: "Monitoring tells you when known problems fire. Observability lets you ask new questions."
number: 007.94
sort_key: 000794
date: 2026-05-03
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['ops']
brief:
  system: Nightbind match latency and flag-gated request paths
  issue: golden-signal dashboards green during a novel regional-client failure
  constraint: add high-cardinality events; keep existing alerts; no new vendor this quarter
---

A dashboard of golden signals will not save you from a bug you never instrumented.

Monitoring tells you when a known problem fires. Observability lets you ask a question you did not write in advance. I have stared at green Nightbind latency charts while a slice of users — one region, one client, one flag — sat in a failure the dashboard was never asked to show. The alerts did their job. They were built for last quarter's incidents.

Observability needs high-cardinality events, traces you can follow, and a query path that is not "add a new panel and redeploy." The question looks like: show match accept latency for EU users on mobile when flag X is on. If you cannot ask that without a ship, you have monitoring with extra steps.[^1]

They buy a second dashboard and call it observability. A second dashboard is still a list of known questions. Monitoring is insurance on risks you already named. Observability is the budget to investigate the ones you have not.

Ship both. Alert on the known risks. Keep enough query power to chase a novel failure without waiting on a new panel. Confuse neither.

— JV · Dark Heart Labs.

[^1]: Charity Majors, "Observability — A 3-Year Retrospective" (Honeycomb blog, 2022) — structured, high-cardinality events as the unit of debugging, not pre-aggregated charts alone.
