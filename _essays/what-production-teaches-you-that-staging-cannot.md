---
layout: essay
title: What Production Teaches You That Staging Cannot
dek: "Real traffic is messy in ways rehearsal never fully copies."
number: 007.96
sort_key: 000796
date: 2024-06-25
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
---
Staging lacks: true user behavior, full data scale, adversarial inputs, network weirdness, vendor outages, clock skew across regions.

Treat staging as rehearsal for mechanics, not behavior. Production teaches distributions — tail latency, bot traffic, cache cold starts.

Practice game days on production-like load in isolated environments. Canary deploys in prod with tight blast radius.

The abyssal zone is not drama. It is where assumptions drown — plan recovery, not perfection.


— JV · Dark Heart Labs.
