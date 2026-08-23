---
layout: essay
title: Accessibility Is Not a Checklist
dek: "Build for bodies that are not yours. The keyboard is the audit."
number: 004.0285
sort_key: 0004.0285
date: 2026-01-02
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes reading gallery and accessibility-rails-components
  issue: axe is green in CI; keyboard users cannot reach filter chips
  constraint: no layout rewrite; fix semantics and focus order before next deploy
---

## Thesis

**Accessibility is a design constraint, not a compliance artifact you append before release.** You model users whose eyes, ears, hands, and attention are not yours. The keyboard-only path is the honest audit of whether you did.

## Context

On mystic-bytes I shipped a reading gallery that cleared automated checks. Contrast met WCAG AA. Images had `alt`. Landmarks were present. A friend who navigates by keyboard opened the same page and could not reach the genre filter. The chips existed. They were `<div>` elements with click handlers, styled as buttons, with no `tabindex`, no roving focus, no `aria-pressed`. The linter saw decoration that looked like UI. The DOM saw decoration.

I maintain [accessibility-rails-components](https://github.com/jv-darkheartlabs/accessibility-rails-components) for the same class of failure in Rails: ViewComponents and Stimulus wired so the accessible path is the default path. I did not start that repo because a scanner yelled. I started it because I kept watching visual QA pass and the first Tab fail.

axe and Lighthouse did their job. They evaluate properties they can see. The failure was upstream. We had treated accessibility as a verification step instead of a build posture. We had a checklist and not a model of use. Cursor will complete an `onClick` on a `div` before it asks whether the control has a name, a role, and a value. Fedora's Firefox and a cheap laptop on a bright Auckland afternoon are more honest reviewers than a green badge.

## Mechanism

Checklists catch symptoms. Posture catches architecture. Automated scanners excel at contrast and missing labels on native elements. They are weaker on keyboard traps, focus order, custom widget semantics, and cognitive load — the places where an "accessible-looking" UI still fails people. Kat Holmes calls this mismatch: when the environment assumes a default body, everyone outside that default pays a tax.[^1] A checklist verifies pixels. Inclusive design asks whether the workflow excludes someone before the first `<button>` is written.

The keyboard path is a structural X-ray. If every interactive control is reachable, operable, and announces state without a pointer, you have usually thought through loading, errors, and focus, because those problems surface as soon as Tab is the only input. Screen reader users and switch-device users inherit the same structure. Voice control users benefit when the accessible name matches the visible label. The keyboard is not an alternate route. It is the test of whether the component model is real.

Progressive enhancement is cheaper than retrofit. Teams that bolt ARIA onto a finished React tree are painting over a semantic hole. Define the interaction in HTML that works without JavaScript, then enhance. On Nightbind I watched a modal pass visual review and fail accessibility review because focus never moved into the dialog and Escape did not return focus to the trigger. The WAI-ARIA Authoring Practices exist so you do not invent that behavior from muscle memory.[^2] Both bugs were an afternoon once someone Tabbed the flow. Neither was a contrast ticket.

Who is in the room shapes what ships. When the people building the feature share a sensory profile — sighted, hearing, dexterous, fluent in the product language — "good enough" tracks to that room. Specialist reviews help. The durable fix is writing as if you might depend on the feature differently next year: migraine day, broken mouse, one hand on a phone. That is not charity. It is engineering against a wider failure surface.

accessibility-rails-components encodes that bet in Ruby I can still read when I am tired. A focus trap that only the author understands is not a default. It is a private dialect. mystic-bytes is static HTML; the same posture shows up as real headings, real links, a skip link, and filter controls that are buttons.

WebAIM's million-page surveys keep documenting the same gap: pages that pass automation still fail keyboard and screen reader use in the wild.[^3] The data is not subtle. The checklist was never the product.

## Tradeoffs

**Manual testing vs automation.** CI should block contrast regressions and missing names on native controls. It cannot replace a keyboard walkthrough, a screen reader spot check, or — when you can pay for it — time with disabled testers. Run both. Automation on every PR. A human pass on every custom widget.

**Component libraries vs bespoke UI.** Tested primitives (native `<button>`, Rails helpers that emit them, libraries that already did the APG work) reduce repeated mistakes. Bespoke chips and carousels reintroduce them. I default to a primitive for anything focusable and document exceptions in the PR. The exception list should get shorter.

**Compliance floor vs inclusive ceiling.** WCAG AA is a legal and ethical floor in many jurisdictions, not a finish line. Captions help Deaf viewers and tired viewers. Plain language helps cognitive disabilities and an engineer reading the error at 2am. The accommodation often improves the median path. Curb cuts taught that already.

**When checklist-first is rational.** A greenfield marketing page of native HTML and no custom widgets can ship on automated gates. The threshold for a deeper review is custom interaction: modals, drag-and-drop, infinite scroll, live regions, multi-step forms, anything that steals or traps focus.

## Close

Treat accessibility like performance. Define budgets early. Measure what machines can see. Stress the paths they cannot. Ship as if you might depend on the feature next year, because someone already does, and they should not have to file a ticket to prove it.

Pick one flow you called done. Tab it on Fedora, in the browser you actually ship to. If a chip is a `div`, the checklist lied.

— JV · Dark Heart Labs.

## References

[^1]: Kat Holmes, *Mismatch: How Inclusion Shapes Design* (MIT Press, 2018). Exclusion as a design outcome, not a user deficit.

[^2]: W3C Web Accessibility Initiative, *WAI-ARIA Authoring Practices Guide* (APG), ongoing. Keyboard interaction, focus management, and patterns for composite widgets.

[^3]: WebAIM, "The WebAIM Million," annual analysis of top home pages, <https://webaim.org/projects/million/>. Longitudinal evidence that automation-passing pages still fail keyboard and screen reader use.
