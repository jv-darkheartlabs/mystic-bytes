---
layout: essay
title: What Production Teaches You That Staging Cannot
dek: "Real traffic is messy in ways rehearsal never fully copies."
number: 007.96
sort_key: 000796
date: 2026-05-06
cover: /assets/images/cover-code.svg
read_time: 2
tags: ['ops']
type: micro
brief:
  system: GitHub Pages deploy of mystic-bytes
  issue: local Jekyll was fast; first-byte on a cold CDN edge was not
  constraint: no second prod; canary the asset path and watch the tail
---

Staging copies the shape of production and almost none of its weather. Rehearsal can prove the mechanics. It cannot prove the distribution.

I saw this on the mystic-bytes GitHub Pages deploy. Local Jekyll was fast. The first byte on a cold CDN edge was not. Staging had never seen bot traffic, a cache miss after a cache-bust, or a phone on a bad hotel network. It also had never seen the real cover image set at full weight. Production taught p95, not the mean. It taught vendor blips, clock skew, and the user who double-submits. Those are not edge cases you add later. They are the job.[^1]

Treat staging as a dress rehearsal: paths, auth, the happy form. Practice load in an isolated environment that actually looks like prod data. Canary in production with a blast radius you can reverse. Plan recovery, not a perfect copy of traffic you will never fully fake. The postmortem question is always why staging missed it. Staging never had the mix.

If the checklist passed in staging, you have a working scene. You do not yet have an audience. Watch the tail after you ship.

— JV · Dark Heart Labs.

[^1]: Betsy Beyer et al., *Site Reliability Engineering* (O'Reilly, 2016) — production is the only place the real traffic mix exists; rehearsals still matter, and they are not a substitute.
