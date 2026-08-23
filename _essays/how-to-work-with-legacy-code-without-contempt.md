---
layout: essay
title: How to Work With Legacy Code Without Contempt
dek: "Legacy is evidence of survival — read it before you rewrite it."
number: 007.82
sort_key: 000782
date: 2026-04-18
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
type: micro
brief:
  system: mystic-bytes Jekyll plugins and sort_key scheme
  issue: urge to sneer at ugly keys and leftover plugins before characterizing behavior
  constraint: preserve public URLs; tests and notes before deletion
---

Legacy code is evidence a system survived users. Contempt is a shortcut around reading it.

I wanted to sneer at mystic-bytes first. Ugly `sort_key` values. Leftover Jekyll plugins. Date formats that look like a dare. A rewrite would have been emotionally cheaper than an afternoon of characterization. It would also have broken the index. The strange branches were often production fires I never saw — cover paths, a numbering scheme that looks accidental until you watch listing order collapse without it. Before you change a module, pin its behavior: tests, logs, the user flow it still serves.[^1] Archaeology is slower than mockery. It is also how you avoid reproducing the fire with cleaner names.

Not every odd path needs deletion. Stable, low-churn modules can rest. When you do change legacy, leave breadcrumbs — an ADR, a comment that names the incident the branch survived, a test that fails if someone "cleans" the invariant. Contempt writes the rewrite. Curiosity writes the test.

Someday your code will be someone else's inheritance. Write the kind you wish you had found, starting with the respect of reading it.

— JV · Dark Heart Labs.

[^1]: Michael Feathers, *Working Effectively with Legacy Code* (Prentice Hall, 2004) — characterization tests before change; legacy as code without tests, not code without virtue.
