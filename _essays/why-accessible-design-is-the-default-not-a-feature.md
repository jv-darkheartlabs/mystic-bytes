---
layout: essay
title: Why Accessible Design Is the Default, Not a Feature
dek: "An interface that excludes is unfinished — regardless of how polished it looks in the demo."
number: 006.3
sort_key: 0006.03
date: 2007-04-16
cover: /assets/images/cover-craft.svg
type: pillar
read_time: 10
tags: [design, craft]
hashnode: true
related_projects: [accessibility-rails-components]
brief:
  system: Rails ViewComponent library shipped after repeated audit findings on keyboard traps and contrast
  issue: teams treat WCAG as a late checkbox; modals and forms fail real assistive tech in production
  constraint: components must be drop-in defaults, not documentation homework for every consumer app
---

Accessibility is not a feature you bolt on before launch. It is the definition of finished. If someone cannot complete the task with a keyboard, a screen reader, or high contrast enabled, the interface is broken in a way you chose not to see during the happy-path demo.

## Thesis

**Inclusive defaults beat heroic remediation.** Design for excluded users first; the mainstream path gets simpler as a side effect.

## Context

I maintain [accessibility-rails-components](https://github.com/jv-darkheartlabs/accessibility-rails-components) — WCAG 2.1 AA patterns wired into Rails ViewComponents and Stimulus because I kept finding the same failures in audits: modal focus traps that steal keyboard context, form labels that exist visually but not programmatically, contrast ratios that look fine on a designer monitor and fail on a bus at noon.

The library exists because "we'll fix accessibility later" is a schedule that never survives contact with shipping pressure.

## Mechanism

**Design for invisible users first**

For every person who uses your app the way you intended in Figma, dozens arrive differently: screen readers, keyboard-only navigation, zoom at 200%, slow connections, tremor, fatigue. Their experience is not an edge case — it is the honesty test for your information architecture.

**Contrast is not atmosphere**

A dark theme with low-contrast body text is not mood. It is a barrier. Check ratios against WCAG AA minimums. Test with real screen readers — VoiceOver on macOS, NVDA on Windows — not only automated scanners. Automated tools catch ~30% of issues; the rest live in focus order and naming.

**Keyboard path equals primary path**

Tab through your modal. Can you open, operate, and dismiss it without a pointer? If focus disappears into the void, you have built a trap, not a dialog. The fix belongs in the component default, not in a wiki page nobody reads.

**Components as policy**

When accessibility lives in shared components, every team inherits the baseline. When it lives in lint rules alone, teams ship exceptions with good intentions and bad Fridays.

## Tradeoffs

**Custom aesthetics vs readable defaults.** You can have a distinctive brand and sufficient contrast — but not by sacrificing body text for hero gradients.

**Audit-at-end vs component-first.** Late audits produce expensive rewrites. Component libraries front-load cost once.

**Legal compliance vs belonging.** Compliance is the floor. The ceiling is when a disabled user feels seen because everything simply works.

## Close

The most durable design move is making someone feel the product was built with them in mind. That is not alchemy — it is contrast ratios, focus management, and labels that survive assistive tech.

Start with keyboard and screen reader passes on your next modal. Fix what fails before you animate it.

— JV · Dark Heart Labs.

## References

[^1]: W3C, *Web Content Accessibility Guidelines (WCAG) 2.1* — normative success criteria for perceivable, operable, understandable, robust interfaces.
[^2]: Léonie Watson, talks and writing on screen reader behavior — practical grounding for why programmatic name/role/value matter as much as pixels.
