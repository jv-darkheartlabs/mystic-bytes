---
layout: essay
title: How to Run Deployments That Take Hours
dek: "Long deploys need checkpoints, not anxiety spirals."
number: 007.101
sort_key: 007101
date: 2026-06-15
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
type: micro
brief:
  system: Nightbind expand-and-backfill deploy
  issue: multi-hour window with progress only in a Slack thread; lag spike with no named phase
  constraint: reversible checkpoints; commander for the window; no skipped rollback
---

An hours-long deploy fails when nobody can name the last checkpoint that still looked healthy.

Nightbind taught me this the expensive way: a multi-hour expand-and-backfill that had progress in a Slack thread and nowhere else. When replication lag spiked, we argued about whether we were still in phase two. A thread is not a runbook. Checkpoints are not ceremony. They are the only way a long window stays reversible. Break the work into verifiable phases — migrate expand, backfill a percent, flip the read path, drain the old queue. Automate the progress metrics: rows migrated, lag, error budget remaining. Communicate ETA as a range, not a performance of certainty. If a phase cannot fail closed, it is not a phase. It is a hope with a clock.

Assign a commander for the window. Everyone else watches dashboards, not competing threads. Hurry without a checkpoint is how you skip the rollback you still had. The incident you were trying to avoid by "just finishing" is usually the one that starts when a phase completes unverified.

Patience is procedure. If you cannot point to the last green gate, you are not deploying. You are hoping.

— JV · Dark Heart Labs.
