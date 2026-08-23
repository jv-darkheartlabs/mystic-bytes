---
layout: essay
title: Why Accessible Design Is the Default, Not a Feature
dek: "An interface that excludes is unfinished, regardless of how polished the demo looks."
number: 006.3
sort_key: 0006.03
date: 2026-02-09
cover: /assets/images/cover-craft.svg
type: pillar
read_time: 7
tags: [design, craft]
hashnode: true
related_projects: [accessibility-rails-components]
brief:
  system: Rails ViewComponent library and mystic-bytes public pages
  issue: teams treat WCAG as a late checkbox; modals and forms fail real AT in production
  constraint: components as drop-in defaults; not the checklist essay, HTML-contract essay, or statute essay
---

Accessibility is not a bolt-on you schedule after the demo. If someone cannot complete the task with a keyboard, a screen reader, or high contrast enabled, the interface is broken in a way the happy-path walkthrough chose not to see. I have already written the adjacent pieces: checklists that miss keyboard traps, HTML as a contract with the accessibility tree, and statutes that have a calendar. This one is the product default. Inclusive behavior ships because the component did, not because a ticket survived grooming.

## Thesis

**Inclusive defaults beat heroic remediation.** Design for excluded users first. The mainstream path usually gets simpler, because you stopped depending on a pointer, a specific contrast, and a body that matches the room.

## Context

I maintain [accessibility-rails-components](https://github.com/jv-darkheartlabs/accessibility-rails-components): WCAG-oriented patterns in Rails ViewComponents and Stimulus, because I kept finding the same failures in audits. Modal focus traps that steal keyboard context. Form labels that exist visually and not programmatically. Contrast that looks fine on a designer monitor and fails on a bus at noon.

The library exists because "we will fix accessibility later" is a schedule that does not survive shipping pressure. Later is where focus order goes to die.

mystic-bytes is a public Jekyll site. It still ships HTML to whoever shows up. I write it from Auckland in 2026, often on Fedora, often checking VoiceOver on a Mac when I am near one and keyboard-only when I am not. Bright Pacific light on a phone is a contrast test I do not have to invent. A dark theme that romanticizes low-contrast body text is a barrier with a mood board.

The demo problem is social. If the people in the review share the same sensory profile, "done" tracks to their bodies. A default that is only a wiki page will lose to a launch date. A default that is a `button` in the component will not.

## Mechanism

For every person who uses the app the way the mock assumed, people arrive differently: screen readers, keyboard-only, zoom at 200%, slow connections, tremor, fatigue, a baby in one arm. That is not an edge case. It is the honesty test for the information architecture. WCAG 2.1 (and 2.2 after it) is the shared language for perceivable, operable, understandable, robust.[^1] I treat those as definition-of-done, not as a specialty track.

Contrast is not atmosphere. Check ratios against AA for body text. Then look at the screen in sunlight. Automated scanners catch a slice of issues. The rest live in focus order and naming. I still run axe. I do not confuse a green badge with a keyboard path.

Tab through the modal. Can you open, operate, and dismiss it without a pointer? If focus disappears, you built a trap. The fix belongs in the component default. Léonie Watson's writing on screen reader behavior is the reminder I needed years ago: name, role, and value are as real as pixels.[^2] A visually complete dialog that never moves focus is a drawing.

When accessibility lives in shared components, every consumer inherits the baseline. When it lives in lint rules and a conscientious intern, teams ship exceptions with good intentions and bad Fridays. accessibility-rails-components is that bet: native elements first, Stimulus for behavior, ARIA only to fill a named gap. mystic-bytes uses the static version of the same bet: real headings, real links, a skip link, contrast that survives the theme.

Progressive enhancement is how a default stays a default under failure. HTML that works without the controller still means something when JavaScript does not load. Enhance a `button`. Do not reconstruct one from a `div` after the visual QA passed.

Who is in the room shapes what ships. I cannot staff a full-time AT lab. I can refuse to merge a control I have not Tabbed through. I can refuse hover-only instructions. I can refuse a form whose label is a placeholder. Those refusals are cheaper than a retrofit sprint.

## Tradeoffs

You can have a distinctive brand and sufficient contrast. You cannot get there by sacrificing body text for a hero gradient. mystic-bytes keeps the dark mood and still pays the ratio. If a token fails, the token changes. The vibe does not get a waiver.

Audit-at-end produces expensive rewrites. Component-first front-loads cost once. Late audits still have a job: they catch the custom widget you should not have built. They should not be the first time anyone used a keyboard on the flow.

Compliance is the floor. Belonging is when a disabled user does not have to file a ticket to prove the product exists for them. I am not going to pretend a Rails library equals lived experience. I will pretend even less that a polish ticket equals a default.

Native elements are slower to brand and faster to get right. Custom widgets are the opposite. I pay branding tax in CSS, not in a second, parallel accessibility tree.

## Close

The durable design move is making someone feel the product was built with them in mind. That is contrast ratios, focus management, and labels that survive assistive tech. It is also a merge habit: the inaccessible version is not a version. It is unfinished.

Start with keyboard and screen reader passes on the next modal. Fix what fails before you animate it. Put the pass in the component so the next app does not have to be virtuous from scratch.

— JV · Dark Heart Labs.

## References

[^1]: W3C, *Web Content Accessibility Guidelines (WCAG) 2.1*. Success criteria for perceivable, operable, understandable, robust interfaces; the floor this essay treats as default shipping criteria.

[^2]: Léonie Watson, talks and writing on screen reader behavior and the accessibility tree. Programmatic name, role, and value as first-class interface, not as a later mapping from pixels.
