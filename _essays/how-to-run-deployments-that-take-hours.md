---
layout: essay
title: How to Run Deployments That Take Hours
dek: "Long deploys need checkpoints, not anxiety spirals."
number: 007.101
sort_key: 007101
date: 2025-07-15
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
---
Break into phases with verifiable checkpoints: migrate expand, backfill percent, flip read path, drain old queue.

Communicate ETA ranges. Automate progress metrics — rows migrated, lag, error budget.

Assign a commander for the window; others watch dashboards, not Slack threads.

Patience is procedure. Hurry without checkpoints causes the incidents patience was meant to avoid.


— JV · Dark Heart Labs.
