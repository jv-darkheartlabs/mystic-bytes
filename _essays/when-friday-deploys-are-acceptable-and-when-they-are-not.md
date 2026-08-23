---
layout: essay
title: When Friday Deploys Are Acceptable and When They Are Not
dek: "Calendar risk is human availability risk."
number: 007.92
sort_key: 000792
date: 2026-05-01
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['ops']
brief:
  system: Nightbind production release window
  issue: Friday ship pressure on a schema change with untested rollback
  constraint: on-call coverage ends Saturday morning; irreversible migrate cannot wait on a hero
---

The Friday deploy argument is usually about folklore, not physics.

Friday is acceptable when the change is small, rollback is tested, on-call is actually staffed, and the people who can revert will still answer a page. Friday is a bad idea when the migration cannot undo, the flag cleanup is a manual script, or the team has a habit of going dark until Monday.

I have held a Nightbind schema change on a Thursday night because the rollback path lived in a gist, not in the repo, and Saturday coverage was one person with a flight. The weekday was not the hazard. Blast radius times recovery time times who is awake was the hazard. They invent "no Friday deploys" as a culture slogan so they do not have to write that product.

Replace the slogan with a checklist: reversible change, rehearsed revert, named on-call, dashboards that would show the failure, a stakeholder who accepts weekend work if the flag misfires. If two items fail, wait. If all pass, the calendar is not magic. Ship.

Do the arithmetic before the deploy button. Coverage is the variable. The name of the day is just a label on the calendar.

— JV · Dark Heart Labs.
