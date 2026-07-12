---
layout: essay
title: Where to Put Guardrails Before Production
dek: "The last line of defense should be depth, not hope."
number: 007.100
sort_key: 007100
date: 2025-04-29
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
---
Layer defenses: input validation, authz checks, rate limits, circuit breakers, feature flags, canaries, automated rollback.

No single gate catches everything. Defense in depth accepts that some bugs ship — and limits damage.

Test rollback before you test launch. If revert is scary, launch is scary.

The last line is not one hero on call. It is architecture that fails small.


— JV · Dark Heart Labs.
