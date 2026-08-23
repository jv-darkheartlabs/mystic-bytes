---
layout: essay
title: What to Load-Test Before You Need To
dek: "Ten users hide sins that ten thousand expose."
number: 007.87
sort_key: 000787
date: 2026-04-24
cover: /assets/images/cover-craft.svg
read_time: 2
tags: ['craft']
type: micro
brief:
  system: darkheartlabs.technology writing search
  issue: local runs were instant; a shared index lock showed up only under concurrent queries
  constraint: test checkout-class paths (search, RSS, cover assets) before a traffic spike
---

Ten concurrent users will not find the query that dies at two hundred. Load tests are cheap while the crowd is still imaginary. After the spike, they are an incident report.

I skipped them on darkheartlabs.technology search. Local runs were instant. A shared index lock only showed up under concurrent queries. Ten users hide missing indexes, O(n²) loops, unbounded queues, synchronous chains, and hot cache keys. Ten thousand do not. Test the paths that matter economically: search, RSS, auth, checkout if you have it. The homepage is a vanity target. Watch p95 and error rate. Averages lie when the tail is the user who leaves. A mean that no real session ever saw is a vanity metric.[^1]

Scale problems are often a compliment: people want the thing. Your job is to make wanting it survivable. Add backpressure, idempotency, and a degraded mode while the seas are calm. Do not wait for the launch thread to discover the lock.

Load-test the expensive path before you need the number. If you only ever test the homepage, you have not tested the product.

— JV · Dark Heart Labs.

[^1]: Martin Fowler, "Performance Testing" (martinfowler.com) — test the economically important journeys and the tail, not the mean of a page nobody is waiting on.
