---
layout: essay
title: What to Load-Test Before You Need To
dek: "Ten users hide sins that ten thousand expose."
number: 007.87
sort_key: 000787
date: 2014-11-14
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
---
Scale breaks assumptions: O(n²) loops, missing indexes, unbounded queues, synchronous chains, hot keys in cache.

Load-test the paths that matter economically — checkout, auth, search — not only the homepage.

Watch p95 and error rate, not average latency. Averages lie when tails kill users.

Scaling problems are often validation: people want the product. Your job is to make wanting it survivable.

Design for the storm while seas are calm — caches, backpressure, idempotency, graceful degradation.


— JV · Dark Heart Labs.
