---
layout: essay
title: Accessibility Is Not a Checklist
dek: "It is the practice of building for bodies that are not yours."
number: 004.0285
sort_key: 0004.0285
date: 2025-06-08
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes reading gallery
  issue: axe passes in CI but keyboard users cannot reach filter controls
  constraint: no layout rewrite; fix semantics and focus order before next deploy
---

## Thesis

Accessibility is not a compliance artifact you append before release. It is a design constraint that forces you to model users whose eyes, ears, hands, and attention are not yours — and the keyboard-only path is the honest audit of whether you did.

## Context

On mystic-bytes I shipped a reading gallery that cleared automated checks: contrast ratios met WCAG AA, images had alt text, landmark roles were present. A friend who navigates exclusively by keyboard opened the same page and could not reach the genre filter. The controls existed. They were `<div>` elements with click handlers, visually styled as chips, with no `tabindex`, no roving focus, no `aria-pressed`. The linter saw buttons. The DOM saw decoration.

The incident was not a tooling failure. axe and Lighthouse did what they do: evaluate the properties they can see. The failure was upstream — we had treated accessibility as a verification step instead of a build posture. We had a checklist and not a model of use.

## Mechanism

**Checklists catch symptoms; posture catches architecture.** Automated scanners excel at color contrast and missing labels on native elements. They are weaker on keyboard traps, focus order, custom component semantics, and cognitive load — the places where "accessible-looking" UIs still fail real people. Kat Holmes frames this as *mismatch*: when the environment assumes a default body, everyone outside that default pays a tax.[^1] A checklist verifies individual pixels; inclusive design asks whether the workflow itself excludes someone before the first `<button>` is written.

**The keyboard path is the structural X-ray.** If every interactive control is reachable, operable, and announces its state without a pointer, you have likely thought through loading states, error recovery, and focus management — because those problems surface immediately when Tab is the only input. Screen reader users and switch-device users inherit the same structure. Voice control users benefit when controls have names that match visible labels. The keyboard is not an alternate route; it is the test of whether your component model is real.

**Progressive enhancement vs retrofit.** Teams that bolt on ARIA after the React component ships are painting over a semantic hole. The cheaper sequence: define the interaction in HTML that works without JavaScript, then enhance. On Nightbind I watched a modal pass visual review and fail accessibility review because focus never moved into the dialog and Escape did not return focus to the trigger — classic focus-management gaps the WAI-ARIA Authoring Practices document exists to prevent.[^2] Both were fixable in an afternoon once someone actually Tabbed through the flow. Neither was fixable by raising contrast on the overlay.

**Who is in the room shapes what ships.** When the team building the feature shares the same sensory profile — sighted, hearing, dexterous, neurotypical, fluent in the product language — "good enough" tracks to their experience. Accessibility reviews by specialists help, but the durable fix is building with the assumption that you, the author, might rely on the feature differently next year: migraine day, broken mouse, nursing parent holding a phone one-handed. That is not charity. It is engineering against a wider failure surface.

## Tradeoffs

**Manual testing vs automation.** Automated CI gates should block regressions on contrast and native semantics. They cannot replace keyboard walkthroughs, screen reader spot checks, or — when budget allows — paid audits with disabled users. The tradeoff is speed vs coverage. Run both: automation on every PR, human pass on flows with custom widgets.

**Component libraries vs bespoke UI.** Design systems with tested accessible primitives (Radix, React Aria, native `<button>`) reduce repeated mistakes. Bespoke chips and carousels reintroduce them. On dark-heart-themes I default to library primitives for anything focusable and document exceptions in the PR — the exception list is shorter every quarter.

**Compliance floor vs inclusive ceiling.** WCAG AA is a legal and ethical floor in many jurisdictions, not the finish line. Captions help Deaf viewers and tired viewers. Plain language helps cognitive disabilities and rushed engineers at 2am. The accommodation often improves the median experience — the same pattern as curb cuts.

**When checklist-first is rational.** Greenfield marketing pages with native HTML and no custom widgets can ship with automated gates alone. The threshold for deeper review is **custom interaction**: modals, drag-and-drop, infinite scroll, live regions, multi-step forms, anything that steals or traps focus.

Treat accessibility like performance: define budgets early, measure in CI, and manually stress the paths automation cannot see. Ship as if you might depend on the feature next year — because someone on your team already does, and they should not have to file a ticket to prove it.

— JV · Dark Heart Labs.

## References

[^1]: Kat Holmes, *Mismatch: How Inclusion Shapes Design* (MIT Press, 2018). Holmes, former inclusive-design lead at Microsoft, defines exclusion as a design outcome — not a user deficit — and argues that constraints for edge cases improve products for everyone.

[^2]: W3C Web Accessibility Initiative, *WAI-ARIA Authoring Practices Guide* (APG), ongoing. The APG is the canonical reference for keyboard interaction, focus management, and ARIA patterns for composite widgets — the standard teams should implement before inventing modal behavior from scratch.

[^3]: WebAIM, "The WebAIM Million" annual accessibility analysis of the top home pages (webaim.org/projects/million/). WebAIM's longitudinal data documents how automated-passing pages still fail keyboard and screen reader use in the wild — empirical backing for checklist insufficiency.
