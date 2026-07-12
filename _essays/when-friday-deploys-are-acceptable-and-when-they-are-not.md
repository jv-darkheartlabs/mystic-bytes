---
layout: essay
title: When Friday Deploys Are Acceptable and When They Are Not
dek: "Calendar risk is human availability risk."
number: 007.92
sort_key: 000792
date: 2023-06-06
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
---
Friday deploys are fine when: change is small, rollback is tested, on-call is staffed, monitoring is solid, and stakeholders accept weekend response if needed.

Friday deploys are bad when: database migration is irreversible, feature flag cleanup is manual, or the team routinely disappears offline.

Replace folklore with checklist. If two items fail, wait until Monday.

Risk is not day of week alone — it is blast radius times recovery time times coverage.


— JV · Dark Heart Labs.
