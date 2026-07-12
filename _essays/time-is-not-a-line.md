---
layout: essay
title: Time Is Not a Line
dek: "Causality is the only ordering distributed systems agree on."
number: 530.11
sort_key: 0530.11
date: 2025-08-03
cover: /assets/images/cover-mind.svg
type: micro
brief:
  system: Nightbind webhook fan-out
  issue: '"payment confirmed" event appears before "cart updated" in logs'
  constraint: no global clock; fix ordering without serialising the whole pipeline
---

Distributed systems do not share a single timeline. Two events in your wall-clock past may be incomparable from the system's perspective — there is no global now to appeal to.[^1]

Nightbind's Stripe webhook fan-out taught me this in production: `payment_intent.succeeded` landed in our logs before `checkout.session.completed` on a slow region, and a idempotency check written for wristwatch ordering rejected a valid payment. Nothing was "wrong" with the clocks. The bug was assuming log sequence implied causality when the events were concurrent branches merging at our handler.

What survives across nodes is cause and effect — whether one event could have influenced another. Logical clocks, vector clocks, and CRDTs are all attempts to track that thinner ordering honestly. They trade the comfort of "what time was it" for "what could have known about what."

Stop debugging distributed systems with timestamps alone. Ask which events must precede which, encode that, and let concurrent chaos stay concurrent.

— JV · Dark Heart Labs.

[^1]: Leslie Lamport, "Time, Clocks, and the Ordering of Events in a Distributed System" (Communications of the ACM, 1978) — the foundational argument that happened-before is the ordering that matters, not wall-clock time.
