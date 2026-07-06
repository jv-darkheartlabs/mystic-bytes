---
layout: essay
title: Build the Debugger You Needed Yesterday
dek: "Tooling is just the previous bug, automated."
number: 005.13
sort_key: 0005.13
date: 2025-11-16
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: mystic-bytes reading cover reconciliation pipeline
  issue: same slug mismatch debugged manually three sprints in a row
  constraint: no schema break; ship lint script before next batch import
---

The best internal tools are yesterday's bug, automated so it cannot eat anyone's afternoon again.

I spent two evenings tracing the same slug mismatch in the mystic-bytes cover pipeline — manifest said one filename, preprocess cache held another, vision rename report disagreed with both. The third time, I wrote a reconcile script and a pre-merge check. No blog post. No demo. It now fails CI when a cover path drifts from its reading entry, printing the three sources side by side.[^1] That is the compounding work: outages that never appear in a retrospective because they never happen. Individual heroics do not scale; executable memory does.

Senior engineers carry a museum of slow bugs. The useful ones turn exhibits into lint rules, dashboards, or one-command traces — quiet infrastructure that pays rent forever.

After you close a painful incident, ask what would have caught it in under five minutes — then build that.

— JV · Dark Heart Labs.

[^1]: Charity Majors, "Observability Is a Many-Splendored Thing" (2018) — on investing in tooling that shrinks mean time to innocence, not just mean time to recovery.
