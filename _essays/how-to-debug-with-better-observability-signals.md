---
layout: essay
title: How to Debug With Better Observability Signals
dek: "Logs, metrics, and traces are instruments — tune them before the storm."
number: 007.91
sort_key: 000791
date: 2023-03-21
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
---
Debugging production without observability is navigation without instruments.

Logs: structured, correlated with request id, level-appropriate. Metrics: RED/USE on critical paths. Traces: sample enough to catch tail latency.

During incidents, pick one signal class to trust first — usually logs for correctness, metrics for scope, traces for latency.

Invest in dashboards before launch, not after the first page.

Glow in the charts means you can see the current under the calm surface.


— JV · Dark Heart Labs.
