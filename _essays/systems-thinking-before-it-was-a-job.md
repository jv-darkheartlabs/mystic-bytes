---
layout: essay
title: Systems Thinking Before Systems Thinking Was a Job
dek: "People have been thinking in systems since before the vocabulary existed."
number: 003.0
sort_key: 0003.00
date: 2025-12-14
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: the staging cluster
  issue: the fast path stopped being fast
  constraint: one operator. one terminal. no rollback window.
---

People have been thinking in systems since before the vocabulary existed. The irrigation engineer, the midwife, the cathedral mason — each held complex feedback loops in their head and reasoned about second-order effects without ever using the phrase.

## Context

I watched a platform lead debug a staging cluster where the fast path had stopped being fast — one operator, one terminal, no rollback window — by asking a question no diagram named: what else changed in the environment when we flipped that flag? Not a stock-and-flow chart. A removal test. If we disable the new cache layer, does latency recover? The answer implicated a feedback loop between two services nobody had drawn on the whiteboard. She was doing systems thinking. She would have called it "using your head."

Formal systems thinking did not invent the cognitive move. It labeled it — stocks, flows, delays, leverage points — so teams could teach and audit what skilled operators already practiced.[^1]

## Mechanism

**Seeing a thing as part of a thing.** The underlying skill is relational: this knob affects that reservoir, with a lag, through a path that is not linear. Irrigation engineers modeled water tables centuries before Jay Forrester built the first system dynamics models at MIT.[^2] Midwives track maternal and fetal feedback without calling it a coupled system. Masons understood load paths through stone long before structural software existed.

Donella Meadows' *Thinking in Systems* catalogued the vocabulary — reinforcing loops, balancing loops, delays, traps like "fixes that fail" — not because humans lacked pattern recognition, but because shared language scales teaching beyond apprenticeship.[^3] Diagrams are scaffolding. The perception underneath is older than any book on the shelf.

**What formal discipline added.** Stocks and flows make inventory visible. Leverage points argue where intervention is cheap versus cosmetic. Second-order thinking names consequences of consequences — the staging flag that speeds builds while starving the integration lane downstream. None of this requires a certification. It requires refusing to stop at the first plausible cause.

**Teaching without the jargon trap.** When I teach systems thinking, I do not start with diagrams. I point at something in the room — the coffee machine, the deploy pipeline, the on-call phone — and ask what would change if it were removed. Most people answer with second-order effects immediately. They have been doing real work. They were told it was not real work because it did not fit a job title.

Software makes the loops faster and the failures weirder, but the move is the same: trace dependencies, respect delay, distrust single-knob explanations when symptoms recur.

**One operator, no rollback** concentrates the lesson. Under constraint, you cannot afford folklore. You need a model of what connects to what — even if the model lives in a notebook instead of Stella or Loopy. The staging incident resolved when the operator drew a crude loop on paper: cache hit rate up, integration test frequency down, defect escape up, pager load up, operator bandwidth down, shortcut to fast path up. Formal method optional. Accurate loop required.

## Tradeoffs

**Vocabulary vs gatekeeping.** Naming loops helps teams coordinate. Using vocabulary to dismiss intuition — "that's not systems thinking" — drives expertise underground. The goal is shared auditability, not pedigree.

**Models vs reality.** Every map omits. System dynamics models can seduce teams into false precision. Use them to test hypotheses, not to win meetings.

**When reductionism wins.** Some problems are genuinely local — a typo, a dead certificate, a single bad deploy. Not every fire is a feedback trap. Systems thinking includes knowing when to stop drawing loops and fix the line.

**Speed of loops in modern stacks.** Microservices, feature flags, and CI/CD compress delay times — loops that once took quarters now take days. The cognitive skill matters more, not less, because second-order effects arrive before the postmortem doc is drafted.

## Close

Start by pointing at something in the room and asking what would change if it were removed. Most people already know how to think this way. They have been told that what they were doing was intuition, not engineering.

Systems thinking before it was a job was still thinking. The job was to build cathedrals that stood, fields that watered, births that completed. The vocabulary came later. The obligation to trace the loop did not.

— JV · Dark Heart Labs.

## References

[^1]: Donella H. Meadows, *Thinking in Systems: A Primer* (Chelsea Green, 2008). Meadows is the most widely used popular authority on systems thinking vocabulary, leverage points, and common system traps.

[^2]: Jay W. Forrester, "Industrial Dynamics" (MIT Press, 1961) and founding work on system dynamics at MIT. Forrester created the formal discipline of stock-and-flow modeling that underlies modern system dynamics tools.

[^3]: Donella H. Meadows, "Leverage Points: Places to Intervene in a System" (Whole Earth, 1999). Meadows' essay is the canonical reference for where interventions actually change system behavior versus where teams waste effort on parameters.
