---
layout: essay
title: When Refactoring Pays Off and When It Does Not
dek: "Invisible improvements still compound — if timed correctly."
number: 007.85
sort_key: 000785
date: 2026-04-22
cover: /assets/images/cover-craft.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: dark-heart-themes token and template layer
  issue: repeated breakages in one color-map file during theme ports
  constraint: no rewrite during a release week; extract only the hot module
---

Refactoring does not close the ticket in front of you. It changes the price of the next ten.

I paid that bill in dark-heart-themes when the same color-map file broke on every editor port. Adding a new theme meant touching a nest of conditionals that nobody wanted to own. Extracting the map behind a small API took an afternoon. The next four ports were boring. That is the payoff: feature work stops being archaeology.

Do not refactor to avoid the harder product question, the week before a freeze, or in a module nobody has touched in a year. They reach for a rewrite when they are bored or scared. Stable code that is not in the way is allowed to look old.

Good refactoring is mostly invisible to users. Teammates feel it as fewer questions and fewer identical bugs. Users feel it as a load that does not regress. If you cannot point at a repeated cost — the same file in every incident, the same onboarding question, the same extra day on a small ticket — wait.

Refactor the module that keeps breaking the next ticket. Leave the rest alone until it earns the hour.

— JV · Dark Heart Labs.
