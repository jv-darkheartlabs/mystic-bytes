---
layout: essay
title: How to Postmortem a Bad Deploy Without Blame
dek: "Incidents are curriculum — if you write the lesson down."
number: 007.99
sort_key: 000799
date: 2026-05-10
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
type: micro
brief:
  system: Nightbind production deploy window
  issue: first question in the room was who merged; near-misses stayed in private chats
  constraint: publish internally within 72 hours; actions tracked like product work
---

A postmortem without blame is not softness. It is how you extract a systems lesson before the next deploy repeats the same gap.

I have sat in rooms where the first question was who merged. The room went quiet. Near-misses stayed in private chats. The next incident was the same class of failure with a different name on the pull request. Nightbind's worse deploys taught a different sequence: timeline first, then contributing factors, then the detection gap and the mitigation gap, then follow-up actions with owners. Separate what happened from why the system allowed it. People respond to incentives, incomplete staging, and time pressure. Shame does not patch a missing canary. It teaches the next person to hide the miss.

They publish internally within seventy-two hours while memory is still cheap. Action items get tracked like product work, not like parking-lot notes that die in a doc. If the follow-up is optional, the curriculum never enrolls. The story has to name the missing guardrail and then ship it.

Write the timeline. Name the gap. Assign the fix. Then stop rehearsing the embarrassment.

— JV · Dark Heart Labs.
