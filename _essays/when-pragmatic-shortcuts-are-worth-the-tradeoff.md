---
layout: essay
title: When Pragmatic Shortcuts Are Worth the Tradeoff
dek: "Not every compromise is debt — some are informed bets."
number: 007.73
sort_key: 000773
date: 2026-04-06
cover: /assets/images/cover-craft.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: mystic-bytes essay rewrite batch
  issue: one-off Liquid filter used instead of a proper collection API
  constraint: ship the index this week; document expiry before the next collection grows
---

A shortcut is worth taking when you can name the failure, the rollback, and the day it expires.

Engineering ethics is not purity. It is writing the tradeoff before the tradeoff writes you. I used a one-off Liquid filter on mystic-bytes to get a journal index shipping in a week instead of waiting on a cleaner collection API. Blast radius was one layout. Revert was delete-the-filter. The expiry was "when the next collection needs the same shape." That is a bet. A silent copy of the same filter into three layouts is how the bet becomes load-bearing without a vote.

Skip the shortcut when it touches auth, money, or user data without review; when it swallows errors so the dashboard stays green; when it couples two teams without an interface. They call that pragmatism. It is unlogged debt with a nicer name.

Grey architecture is honest if the ADR exists. State what you sacrificed and what signal would make you revisit. Accountable grey is still a decision. Unnamed grey is how you get a surprise at 2am.

Write the expiry. Put a date or a traffic number on it. Then you can take the shortcut without lying to next quarter.

— JV · Dark Heart Labs.
