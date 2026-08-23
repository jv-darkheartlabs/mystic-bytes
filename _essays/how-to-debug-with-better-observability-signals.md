---
layout: essay
title: How to Debug With Better Observability Signals
dek: "Logs, metrics, and traces are instruments — tune them before the storm."
number: 007.91
sort_key: 000791
date: 2026-04-29
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['ops']
---

Debugging production without logs, metrics, and traces is navigation without instruments.

Nightbind taught me the expensive version: a checkout slowdown that dashboards called "fine" because we had CPU and 5xx, not request id, region, or provider latency on the success path. The user saw a spinner. We saw a green board. Without a correlation id, I could not tell whether Stripe, our handler, or the browser was stalling. Logs want structure, a correlation id, and a level that matches the event. Metrics want RED or USE on the paths that actually hurt. Traces want enough sample to catch tail latency, not a wallpaper of spans you will never open.

During an incident, pick one signal class to trust first. Logs for correctness — did the handler run, did the idempotency key stick. Metrics for scope — how many, how fast, which shard. Traces for latency — where the time went. They add all three mid-page and then trust none of them. Invest in the dashboard before launch, not after the first user-facing miss.

If you cannot ask a new question of the running system, you do not have observability yet. You have a slideshow. Tune the instruments while the weather is still calm.

— JV · Dark Heart Labs.
