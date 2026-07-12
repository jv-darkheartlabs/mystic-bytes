---
layout: essay
title: Why Good Features Sometimes Wait for the Right Moment
dek: "Not every good idea arrives on schedule. Some prototypes are foresight with bad timing."
number: 006.26
sort_key: 0006.26
date: 2011-07-26
cover: /assets/images/cover-craft.svg
read_time: 6
tags: [culture]
---

It starts with a spark: "What if we added…" Three words that have launched a thousand pull requests and parked a hundred in branches named after weekends. The lifecycle of a feature is rarely a straight line from idea to production. Often it is a loop — prototype, defer, resurrect — and teams misread deferral as failure when it is sometimes the correct product decision.

## The pitch and the polite no

You build a prototype on a Sunday. It works. You show it Monday with the energy of someone who definitely did not sleep enough. Then someone says, "That's interesting, but…" — the most diplomatically devastating phrase in product development. It usually means the feature is about to be scoped down, shelved, or "added to the backlog," which is where good ideas wait for market, infrastructure, or organizational attention to catch up.

That rejection is not always about quality. Timing matters: schema not ready, compliance review queued, customer signal still noisy, team bandwidth committed to an incident-shaped quarter. A prototype that proves feasibility still has value even when shipping waits.

Capture that value explicitly. A short design note — problem, options rejected, what would need to change to ship — turns a shelved branch into an asset instead of archaeology.

## The resurrection

Six months later, a customer requests exactly what you built. Your branch is stale, incompatible with the current schema, and still the best starting point anyone has — because you understood the problem before the ticket existed. The work is not wasted. It is prepaid design research.

When you exhume a shelved feature:

1. **Re-validate assumptions.** What changed in the domain, the data model, and the user base?
2. **Salvage concepts, not lines.** Copy the interface and the tests of understanding; rewrite against current patterns.
3. **Name why it waited.** Document the original blockers so the next deferral is a choice, not amnesia.

## Timing is not the same as merit

Not every good idea arrives at the right moment. Some features need to marinate. Building the prototype means you saw something early. Shipping later means the org caught up. That is foresight with bad timing — not failure.

Keep prototypes small, branches labeled honestly, and a one-paragraph note in the ticket about what problem you were solving. Future-you — and future product — will know whether to merge, rewrite, or let it rest another season.

The backlog is not a graveyard unless you treat it that way. Label shelved work with the constraint that blocked it, and revisit when that constraint moves.

— JV · Dark Heart Labs.
