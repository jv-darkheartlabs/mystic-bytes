---
layout: essay
title: What to Automate First in a Small Team
dek: "Automate repetition before you automate judgment."
number: 007.90
sort_key: 000790
date: 2023-01-03
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
---
Automate what is boring, frequent, and error-prone: deploy scripts, test runs, lint, dependency updates with CI gates, backup verification, certificate expiry checks.

Do not automate ambiguous product decisions or one-off migrations without human review.

The ROI test: *hours saved per month vs hours to build and maintain automation.*

Start with toil that wakes people at night — restore scripts, smoke tests post-deploy, rollback buttons.

Automation should fail loudly and visibly, not silently replace thinking.


— JV · Dark Heart Labs.
