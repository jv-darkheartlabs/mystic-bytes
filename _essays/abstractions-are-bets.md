---
layout: essay
title: Abstractions Are Bets
dek: "An abstraction wagers that this difference will not matter later."
number: 005.117
sort_key: 0005.117
date: 2025-08-24
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: Nightbind combat router hot path
  issue: generic ActionHandler hid weapon-specific timing that now dominates latency
  constraint: preserve the public contract; refactor underneath before launch window closes
---

Every abstraction is a bet that the variation it hides will stay irrelevant.

I placed that bet wrong in Nightbind's combat router: a generic `ActionHandler` made the first release fast, then weapon-specific frame windows started dominating latency checks. Callers still saw a clean interface. Underneath, we were branching on weapon class in places the abstraction was supposed to absorb. The abstraction was not wrong at birth — it was wrong about what would matter six months later. Teams treat abstractions as architecture; they are liabilities with a trigger date.[^1]

The skill is not abstaining. It is writing down the losing condition before you ship: what signal, if it appears twice, means this layer must split? Abstract against a second real use case, not a forecast. Stay liquid until the variance shows you where the seam belongs. They will tell you when the bet is due.

Name the bet. Date the review.

— JV · Dark Heart Labs.

[^1]: Joel Spolsky, "The Law of Leaky Abstractions" (2002) — the observation that all non-trivial abstractions leak, and the engineering question is when the leak becomes load-bearing.
