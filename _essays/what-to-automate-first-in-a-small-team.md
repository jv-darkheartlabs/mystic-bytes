---
layout: essay
title: What to Automate First in a Small Team
dek: "Automate repetition before you automate judgment."
number: 007.90
sort_key: 000790
date: 2026-04-28
cover: /assets/images/cover-code.svg
read_time: 2
tags: ['ops']
type: micro
brief:
  system: mystic-bytes cover pipeline
  issue: manual image normalize before each build caused missed nights and bad hashes
  constraint: no extra headcount; automate toil, keep humans on one-off migrations
---

Automate the mistake you already make on Tuesdays. Start with work that is frequent, boring, and easy to get wrong. Leave judgment in human hands until the rule is actually a rule.

I was the small team on the mystic-bytes cover pipeline. Manual normalize-before-build meant missed nights and bad hashes. The ROI was obvious: hours saved per month versus hours to write and keep a script. Deploy, lint, test, dependency bumps behind a CI gate, backup verification, certificate expiry: that list is toil. Ambiguous product calls and one-off migrations are not. Automating those just hides the decision in a job that fails at 2am with nobody who remembers why it exists. They reach for a platform before they have a script that already works twice.[^1]

Start with the work that wakes people: restore scripts, post-deploy smokes, a rollback you can press. Automation should fail loudly. Silent success that skipped a check is worse than a noisy script you still run by hand.

If you cannot describe the correct output without a meeting, do not put it in cron. Automate the Tuesday mistake first.

— JV · Dark Heart Labs.

[^1]: Betsy Beyer et al., *Site Reliability Engineering* (O'Reilly, 2016), ch. 5 — toil is repetitive, automatable, and interrupts real work; that is the queue to drain first.
