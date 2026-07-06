---
layout: essay
title: Class Is an Input
dek: "Every tool was built for someone, and that someone was usually not everyone."
number: 305.5
sort_key: 0305.05
date: 2025-06-15
cover: /assets/images/cover-systems.svg
type: micro
brief:
  system: dark-heart-themes storefront checkout
  issue: payment flow assumes stable broadband; mobile buyers on prepaid data abandon at 3DS step
  constraint: no new payment provider; optimize payload and retry UX in existing stack
---

Every product embeds a default user — and class is an input to that default whether you admit it or not.

dark-heart-themes checkout assumed stable broadband: heavy script bundles, a 3DS redirect, no offline retry. Analytics showed abandonment spiking on prepaid mobile sessions — not because those buyers lacked intent, but because the flow was designed for the builder's home office. We trimmed payload, added a visible retry on redirect failure, and recovery moved without a new payment provider.[^1] The expensive laptop, the second monitor, the quiet room are invisible requirements until someone without them hits your form.

Users on bad networks, shared devices, and irregular power are not edge cases. They are most of the people on earth. Designing for them last is designing for them never — a class input you baked in without naming it.

Audit your critical path on the worst hardware you can borrow. Notice whose constraints you treated as exceptional.

— JV · Dark Heart Labs.

[^1]: World Wide Web Consortium, *WCAG 2.2* — operable, robust criteria as a baseline for users on constrained devices and connections, not a polish pass.
