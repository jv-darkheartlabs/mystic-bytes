---
layout: essay
title: Why Systems Preserve Every Shortcut You Take
dek: "Defaults and caches outlive the sprint that set them."
number: 007.74
sort_key: 000774
date: 2007-09-05
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
---
Systems have memory: feature flags left on, cron jobs nobody owns, retry policies tuned for a demo, indexes added for one report.

The algorithm — routing, ranking, caching, scheduling — encodes past constraints. When those constraints change, the behavior persists until someone audits inputs and weights.

Schedule periodic reviews of: defaults in config, automated jobs, ML or heuristic weights, permission templates. Ask *what problem was this solving when it was added?*

Deletion is architecture. Removing a stale rule is as important as adding a new one.

What you ship becomes policy whether you intended it or not.


— JV · Dark Heart Labs.
