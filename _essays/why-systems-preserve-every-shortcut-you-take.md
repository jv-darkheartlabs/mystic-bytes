---
layout: essay
title: Why Systems Preserve Every Shortcut You Take
dek: "Defaults and caches outlive the sprint that set them."
number: 007.74
sort_key: 000774
date: 2026-04-07
cover: /assets/images/cover-craft.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: Nightbind feature flags and retry policy leftover from a demo
  issue: demo-tuned retries and a leftover flag still shaping production traffic
  constraint: quarterly audit of defaults and jobs; deletion treated as a ship
---

Feature flags left on become policy. Nobody votes on that.

Systems remember. Cron jobs nobody owns, retry policies tuned for a demo, indexes added for one report, a cache TTL picked because the sprint ended on Thursday: the routing and the scheduling still encode those constraints after the constraints die. I have found a Nightbind retry budget that made sense for a recorded playtest and then quietly punished live matchmaking for a season. The algorithm was loyal. The people had moved on.

When the original problem changes, the behavior stays until someone audits inputs and weights. Schedule that review: defaults in config, automated jobs, heuristic weights, permission templates. Ask what problem this solved when it landed. If the answer is a shrug, the shortcut is now load-bearing, and it will keep collecting interest until you kill it.

They add rules and never delete them. Deletion is architecture. Removing a stale flag is as much a ship as adding a new one, and it is usually the braver merge.

What you ship becomes policy whether you meant it to or not. Audit the leftovers.

— JV · Dark Heart Labs.
