---
layout: essay
title: UI State Is a State Machine Whether You Admit It
dek: "The bug is what happens in the transition you forgot to model."
number: 006.7
sort_key: 0006.07
date: 2025-11-09
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: Nightbind checkout modal
  issue: user can double-submit payment while "processing" spinner is visible
  constraint: no new dependencies; model with existing React state only
---

Every interactive surface is a state machine. The question is whether your team drew the diagram or let `useState` accrete one by accident.

## Thesis

UI bugs cluster in **transitions** — the edges between named states — not in the happy-path screens you designed in Figma.

## Context

On Nightbind I shipped a checkout modal with three booleans: `isOpen`, `isSubmitting`, and `error`. On paper that is eight combinations. In production it was nine, because users could click **Pay** twice before `isSubmitting` flipped true — a state we never listed: *open, not yet submitting, payment in flight on the wire*.

The fix was not a debounce. It was admitting the modal had states our types did not cover.

## Mechanism

Boolean flags multiply combinatorially; state machines compress the legal set. David Harel formalized this in statecharts: explicit states, explicit transitions, guards on edges.[^1] When you skip the chart, you still have a machine — it is just maintained implicitly in `if (loading && !error && submitted)` branches that the next contributor will misread.

The failure pattern is predictable:

1. **Unnamed intermediate states** — loading-but-clickable, success-before-redirect, authenticated-awaiting-MFA.
2. **Impossible states treated as unreachable** — until network latency proves otherwise.
3. **Transition races** — two events reorder because effects run async; the UI assumes serial input.

Consider the double-submit on Nightbind: the first click sets `isSubmitting` in React's next render, but the payment request is already in flight. Without a guard on the *transition* from `idle` to `submitting`, the second click sees `isSubmitting === false` for one more frame. A statechart would label that edge guarded: *on Pay / if not submitting*. A boolean thinks "we'll disable the button in the effect." Effects run after paint. Users are faster than paint.

You do not need a library to fix this. You need a list on a whiteboard: *Idle → Validating → Submitting → Success | Error*, with guards on each arrow (*ignore Pay when Submitting*).

## Tradeoffs

**State machines vs boolean soup:** Machines cost upfront design time and a diagram someone must update when product adds "Save for later." Booleans ship faster for demos and fail faster at scale. For flows with money, auth, or irreversible side effects, the diagram is cheaper than the incident.

**Global store vs local state:** Lifting checkout state into a global store without a machine just moves the combinatorial explosion. Co-locate the chart with the component that owns the side effects.

**Design handoff:** When design ships five Figma screens, ask for the sixth — the error screen — and the seventh — the double-click screen. If design does not have them, engineering must invent them under pressure. That is where unnamed states breed.

**When not to formalize:** Static marketing pages and read-only lists rarely justify a chart. The threshold is **irreversible or concurrent user action** — submit, pay, delete, publish.

## A minimal workflow that stuck

After the Nightbind incident I started a PR checklist for any flow with side effects:

1. List states in the description (bullet list is enough).
2. List forbidden transitions (*Submit while Submitting*).
3. Add one test per edge you are afraid of — not per screen.

On mystic-bytes I applied the same rule to the reading merge pipeline UI: bulk actions get an explicit *idle → running → success | partial-failure* chart before we wire buttons. The diagram lives in the PR; the code catches up. Bugs dropped because reviewers argued about arrows instead of guessing what `isProcessing` meant.

Libraries like XState encode what Harel drew by hand — guards, nested states, invoked services.[^2] You can adopt the discipline without adopting the dependency: union types plus a single `switch (status)` often suffice for modals and wizards. Reach for a library when the chart has more than a dozen edges or when product insists on visualizing the flow for stakeholders.

Draw the machine before the next boolean. Name states in enums or union types so illegal combinations fail at compile time where you can. Review transitions in PR the way you review API migrations: what event moves us, what happens if it fires twice?

— JV · Dark Heart Labs.

## References

[^1]: David Harel, "Statecharts: A Visual Formalism for Complex Systems," *Science of Computer Programming* 8 (1987). Harel's statecharts are the reference model for explicit states and guarded transitions — the academic root of most UI state-machine practice.

[^2]: David Khourshid, XState documentation and *JavaScript State Machines and Statecharts* (2019–present). Khourshid popularized modeling React UI as explicit finite state machines; the [XState docs](https://stately.ai/docs) are the practical standard for frontend teams adopting the pattern without reinventing notation.
