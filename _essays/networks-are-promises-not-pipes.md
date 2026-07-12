---
layout: essay
title: "Networks Are Promises, Not Pipes"
dek: "The wire makes no guarantees the protocol did not request."
number: 004.65
sort_key: 0004.65
date: 2025-11-23
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: mystic-bytes staging deploy
  issue: manifest upload succeeds locally, half the entries missing in production
  constraint: no new dependencies; fix with retries and idempotency already in stack
---

The network is not a pipe. Every property you want — delivery, order, exactly-once — is a promise some protocol made on top of wire that drops, reorders, duplicates, delays, and corrupts without apology.

I learned this again on a mystic-bytes staging deploy. The manifest upload returned 200. Half the entries never landed. TCP said the bytes left. HTTP said the server accepted them. The application had assumed *send once* meant *arrive once*, with no idempotency key and no reconciliation loop. Nothing was wrong with the cluster. The team had mistaken transport success for semantic success.[^1]

Designing distributed systems is choosing which promises you can afford and which you must live without. Saying yes to availability is saying no to something else. The trade is not negotiable — it is physics plus math, dressed in an RFC.

Treat the wire as hostile geography. Build the smallest protocol that survives it, and verify at the layer that owns meaning — not the layer that owns sockets.

— JV · Dark Heart Labs.

[^1]: Peter Deutsch et al., "Eight Fallacies of Distributed Computing" (Sun Microsystems, 1994) — especially that the network is reliable, latency is zero, and bandwidth is infinite, which are assumptions protocols must explicitly undo.
