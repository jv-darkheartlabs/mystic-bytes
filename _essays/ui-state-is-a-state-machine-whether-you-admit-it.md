---
layout: essay
title: UI State Is a State Machine Whether You Admit It
dek: "The bug is what happens in the transition you forgot to model."
number: 006.7
sort_key: 0006.07
date: 2026-02-18
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: Nightbind checkout modal
  issue: user can double-submit payment while "processing" spinner is visible
  constraint: no new dependencies; model with existing React state only
---

## Thesis

**Every interactive surface is a state machine. The question is whether your team drew the diagram or let `useState` accrete one by accident.** UI bugs cluster in transitions — the edges between named states — not in the happy-path screens you designed in Figma. The bug is what happens on the arrow you forgot to draw.

## Context

On Nightbind I shipped a checkout modal with three booleans: `isOpen`, `isSubmitting`, and `error`. On paper that is eight combinations. In production it was nine, because users could click **Pay** twice before `isSubmitting` flipped true. We never listed that state: open, not yet submitting in React, payment already in flight on the wire.

The spinner was visible. The button was still hot. The second click was not a user error. It was a machine we refused to name. The constraint was no new dependencies, existing React state only. The fix was not a debounce. Debounce hides a race. The fix was admitting the modal had states our types did not cover.

I have watched the same pattern on forms that look "simple": save, publish, delete. Figma had five frames. Production had a sixth that existed for one frame of paint, and that is where the money moved twice.

## Mechanism

Boolean flags multiply combinatorially. State machines compress the legal set. David Harel formalized this in statecharts: explicit states, explicit transitions, guards on edges.[^1] When you skip the chart, you still have a machine. It is maintained in `if (loading && !error && submitted)` branches that the next contributor will misread, then "simplify," then ship a double charge.

**The failure pattern repeats.** Unnamed intermediate states: loading-but-clickable, success-before-redirect, authenticated-awaiting-MFA. Impossible states treated as unreachable until network latency proves otherwise. Transition races: two events reorder because effects run async, and the UI assumed serial input. None of these are exotic. They are what happens when time is real and `setState` is not.

The Nightbind double-submit is a timing diagram, not a styling bug. The first click sets `isSubmitting` in React's next render. The payment request is already on the wire. Without a guard on the transition from `idle` to `submitting`, the second click still sees `isSubmitting === false` for one more frame. A statechart would label that edge: *on Pay / if not submitting*. A boolean thinks "we will disable the button in the effect." Effects run after paint. Users are faster than paint. Payment processors are not amused by philosophy.

**You do not need a library to fix this.** You need a list: *Idle → Validating → Submitting → Success | Error*, with guards on each arrow (*ignore Pay when Submitting*). Encode the list as a union type and a single `switch (status)`. Illegal combinations fail at compile time if you are willing to stop storing three booleans that can lie in combination. `isSubmitting && error && isOpen` is a sentence nobody meant to utter. A union cannot say it.

After the Nightbind incident I started a PR checklist for any flow with side effects. List the states in the description. A bullet list is enough. List forbidden transitions: *Submit while Submitting*. Add one test per edge you are afraid of, not per screen. Reviewers argued about arrows instead of guessing what `isProcessing` meant. Bugs dropped for a boring reason: we had named the places they lived.

On mystic-bytes I applied the same rule to the reading merge pipeline UI. Bulk actions get an explicit *idle → running → success | partial-failure* chart before we wire buttons. The diagram lives in the PR. The code catches up. Partial failure was the state we kept pretending was "still running" until someone closed the tab and thought the job had finished clean.

Libraries like XState encode what Harel drew by hand: guards, nested states, invoked services.[^2] You can take the discipline without the dependency. Reach for a library when the chart has more than a dozen edges, or when product wants to see the flow as a picture they can argue with. For a checkout modal, a union and a switch are the whole machine. Adding a package to avoid thinking is how you get a second machine on top of the accidental one.

**Design handoff is part of the machine.** When design ships five screens, ask for the error screen and the double-click screen. If those frames do not exist, engineering will invent them under pressure, in the unnamed state, with a spinner and a hot button. That invention is where the ninth combination is born.

## Tradeoffs

**State machines vs boolean soup.** Machines cost design time and a diagram someone must update when product adds "Save for later." Booleans ship faster for demos and fail faster when money or auth is on the wire. For irreversible side effects, the diagram is cheaper than the incident.

**Global store vs local state.** Lifting checkout into a global store without a machine just moves the combinatorial explosion. Co-locate the chart with the component that owns the side effects. A Redux boolean is still a boolean.

**Compile-time unions vs runtime charts.** TypeScript unions catch illegal combinations in CI. They do not by themselves stop a double click. You still need the guard on the transition. Types name the states. The event handler must refuse the illegal arrow.

**When not to formalize.** Static marketing pages and read-only lists rarely justify a chart. The threshold is irreversible or concurrent user action: submit, pay, delete, publish. If two events can fire before the next paint, you already have a machine. Draw it.

## Close

Draw the machine before the next boolean. Name states so illegal combinations fail where you can see them. Review transitions in a PR the way you review an API migration: what event moves us, and what happens if it fires twice?

The Figma file will still look like screens. Production is the arrows.

— JV · Dark Heart Labs.

## References

[^1]: David Harel, "Statecharts: A Visual Formalism for Complex Systems," *Science of Computer Programming* 8 (1987). Harel's statecharts are the reference model for explicit states and guarded transitions — the academic root of most UI state-machine practice.

[^2]: David Khourshid, XState documentation and related writing on JavaScript statecharts (2019–present). The [XState docs](https://stately.ai/docs) are the practical standard for frontend teams who want Harel's notation in the browser without inventing their own.
