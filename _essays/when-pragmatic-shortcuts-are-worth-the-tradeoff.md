---
layout: essay
title: When Pragmatic Shortcuts Are Worth the Tradeoff
dek: "Not every compromise is debt — some are informed bets."
number: 007.73
sort_key: 000773
date: 2005-02-24
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
---
Engineering ethics is not purity. It is naming tradeoffs before they name you.

A shortcut is worth taking when: the failure mode is bounded, the rollback path exists, the team documents the assumption, and the shortcut expires when a trigger condition is met — traffic threshold, date, or feature completion.

A shortcut is not worth taking when: it touches auth, money, or user data without review; it hides errors; it couples teams without an interface contract.

Grey architecture is honest architecture. Write the ADR. State what you sacrificed and what would make you revisit the decision.

Morally grey is not morally absent. It is accountable.


— JV · Dark Heart Labs.
