---
layout: essay
title: Accessibility Law Is Not a Sprint Extra
dek: "The constraint has a calendar. Scheduling it after 'feature complete' is how you buy a rewrite."
number: 342.085
sort_key: 0342.085
date: 2026-08-22
cover: /assets/images/cover-craft.svg
type: pillar
read_time: 6
tags: [design]
related_projects: [accessibility-rails-components]
brief:
  system: accessibility-rails-components and mystic-bytes public pages
  issue: WCAG treated as polish after feature-complete; procurement and statute do not wait
  constraint: not legal advice; encode WCAG 2.2 in defaults so a sprint cannot defer the floor
---

I have written about accessible design as the default and about checklists that miss keyboard traps. This piece is narrower. Law and procurement treat accessibility as a shipping constraint, the way fire code treats exits. I am not a lawyer; this is not advice about your jurisdiction. It is how the constraint shows up when you maintain a component library and a public Jekyll site in 2026.

## Thesis

**Accessibility statutes and standards are load-bearing product constraints, not a quality bonus.** If the work can be dropped from a sprint without blocking release, you have modelled a preference.

## Context

I maintain [accessibility-rails-components](https://github.com/jv-darkheartlabs/accessibility-rails-components) because I kept watching teams pass a visual QA and fail the first keyboard pass. The library exists so WCAG success criteria live in ViewComponents and Stimulus defaults instead of in a wiki page next to "we will a11y this later." Later is where contrast, focus, and name/role/value go to die.

mystic-bytes is a public writing site. It still ships HTML to whoever shows up: screen readers, keyboard-only, zoom at 200%, a cheap laptop on a bright Auckland afternoon. In the US, public accommodations law has been argued onto websites for years. In Aotearoa, the Human Rights Act and government web standards leak into private work through procurement and anyone who copies the public-sector bar. The European Accessibility Act is a calendar for products that sell into the EU. The names differ. The engineering shape does not: a published standard, a date, and a backlog that thought the standard was optional.

WCAG 2.2 is the technical language those conversations point at.[^1] It is not a statute. It is the yardstick contracts and policies keep picking up. Pretending your sprint board is a higher authority is how you get a "quick" redesign when someone asks for evidence. Auckland 2026, for me, is dual audience, one HTML: NZ government WCAG standards in the country I am writing from, US readers on the same pages. The constraint is the union of what those readers can demand.

## Mechanism

**Put the standard in the definition of done.** "Feature complete" that excludes keyboard operability, visible focus, and form labels is a demo for a pointing device. WCAG 2.2 added criteria that bite modern UI: target size, dragging alternatives, focus not obscured by sticky chrome, accessible authentication that does not force people to memorize and transcribe a code the password manager cannot see. If your login still does copy-from-memory gymnastics, you are failing a criterion product already shipped around.

**Encode the law in components, not in heroics.** A statute you cannot point at in a pull request will lose to a launch date. Shared components reverse the odds: the modal already traps focus, the button is a button, the label is a `label`. accessibility-rails-components is that bet. mystic-bytes uses the same posture in static form: real headings, real links, skip link, contrast that survives the dark theme. Neither is a courtroom strategy. Both are how a small studio avoids a sprint-shaped lie.

**Evidence is part of the build.** Procurement asks for VPAT-shaped answers, axe CI, or a named standard version. Keep the version in the README. Automate the criteria scanners can see. Keep a short manual protocol for the rest: keyboard, zoom, one screen reader pass on the new flow. If you have users in the US, NZ, or the EU, ask *which success criteria we already implement* before legal is copied on a scary email. Waiting for a letter to start the DOM work is the expensive order of operations.

## Tradeoffs

**Floor vs product taste.** WCAG AA is a floor I can test. AAA is often impractical site-wide. Brand still has room above the floor. It does not have room below it because the palette "felt cinematic."

**Automation vs human evidence.** CI should fail missing labels and contrast regressions. It will not fail a custom widget that looks like a tablist and behaves like a pile of divs. Budget the human pass on the widgets you invented. That is not extra. That is the part of the standard machines cannot see.

**2.1 vs 2.2.** The library started against 2.1 AA. 2.2 is the current W3C recommendation, and the new auth and focus criteria live there. Staying on 2.1 because "we already certified" is a documentation freeze. Port the new criteria into the components once. Honest exceptions (a third-party embed you cannot replace this quarter) get a named gap and a date, not a silent skip under "a11y nice-to-have."

## Close

Accessible design as ethics still matters. This essay is the colder twin: the constraint arrives as a standard version and a deadline whether the board believed in belonging or not. accessibility-rails-components and mystic-bytes pay it in advance, in code, so a sprint cannot vote it off the island.

Pick one flow you called done. Run it against WCAG 2.2 keyboard and authentication criteria. If it only works with a mouse and a short-term memory trick, it was never done. The law, in whatever form it takes where you sell, is not going to care that the animation shipped first.

— JV · Dark Heart Labs.

## References

[^1]: W3C, *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 5 October 2023). Technical standard commonly pulled into policy and procurement. Not legal advice on the ADA, the New Zealand Human Rights Act 1993, NZ government web standards, or the European Accessibility Act.
