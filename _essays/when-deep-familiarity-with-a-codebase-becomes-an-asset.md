---
layout: essay
title: When Deep Familiarity With a Codebase Becomes an Asset
dek: "Institutional knowledge is leverage — if you document it outward."
number: 007.84
sort_key: 000784
date: 2026-04-20
cover: /assets/images/cover-craft.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: mystic-bytes Jekyll collections and publish pipeline
  issue: one operator can walk deploy and incident paths from memory
  constraint: convert the private map to runbooks before the next cover-batch outage
---

I can still walk the mystic-bytes Jekyll pipeline without opening a map.

Deep familiarity is an asset when it speeds estimates, spots regressions, and shortens incidents. It becomes a liability the moment the same knowledge is the only way to ship.

I know which Liquid include will break a travel index if you rename a tag, which collection write order the cover job assumes, and why one cron exists that looks unused. That cuts time when a build fails. It also means a Friday outage waits on me if I never wrote it down. The failure mode is expertise trapped in one skull: a deploy path that only works when I am awake.

They treat tribal knowledge as seniority. Treat it as a single point of failure that happens to have a title. Convert the private map while you still remember the seams: a runbook for the publish path, a recorded walkthrough of the weird job, pairing on the module everyone asks about, comments where the file name lies.

I have started writing the "why this cron exists" notes in the same week I touch the job. Context is cheap then. Three months later it is archaeology with git blame.

Write the map while you are still here to argue with it. Familiarity that stays in one head does not scale the team. Familiarity that leaves as artifacts does.

— JV · Dark Heart Labs.
