---
layout: essay
title: Systems Thinking Before Systems Thinking Was a Job
dek: "The vocabulary is new. The cognitive move is not."
number: 003.0
sort_key: 0003.00
date: 2026-01-01
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes Jekyll build and cover-preprocess on Fedora
  issue: a cache "fix" made CI slower because a second loop nobody had named
  constraint: one operator. one terminal. no rollback window.
---

## Thesis

**Systems thinking is a removal test, not a job title.** People have been holding stocks, delays, and second-order effects in their heads since irrigation and midwifery. Formal language labeled the move so it could be taught. It did not invent the move.

## Context

I run mystic-bytes from a Fedora box in the Auckland 2026 window: Markdown, Jekyll, a Python cover-preprocess script, GitHub Actions on `ubuntu-latest`. One operator. One terminal. When a build path stops being fast, there is no platform lead to page and no rollback window that is not `git revert`.

Cursor offered a cache. Local builds went warm. CI stayed cold, then got slower, because the cache key omitted a dimension the preprocess still read. I did not open a stock-and-flow diagram. I asked what else changed when the flag flipped. Disable the cache: does latency recover? The answer implicated a loop between the script, the Actions cache, and Pagefind indexing that no README had drawn. That is systems thinking. I would have called it using my head.

I keep a notebook for these loops because the laptop will not hold the whole graph. Cover-preprocess reads dimensions the Jekyll cache never hashed. Pagefind indexes a `_site` that only exists after the build. Actions restores a key from a previous image. Each piece is locally reasonable. Together they make a delay you feel as "CI is weird today." Weird is usually a loop you have not named yet.

Formal systems thinking did not create that question. It gave teams a shared list of nouns — stocks, flows, delays, leverage points — so the question could be audited instead of performed as vibes.[^1]

## Mechanism

The skill is relational. This knob affects that reservoir, with a lag, through a path that is not a straight line. Irrigation engineers modeled water tables long before Jay Forrester built industrial dynamics models at MIT.[^2] Midwives track maternal and fetal feedback without calling it a coupled system. Masons understood load paths through stone before anyone compiled a structural model. Software made the loops faster and the failures weirder. The perception is older than the bookshelf.

Donella Meadows catalogued reinforcing loops, balancing loops, delays, and traps like "fixes that fail" because apprenticeship does not scale past the people in the room.[^3] Diagrams are scaffolding. The perception underneath is older than Stella, Loopy, or a certification badge.

What the formal discipline added is inspectability. Stocks and flows make inventory visible. Leverage points argue where intervention is cheap and where it is cosmetic. Second-order thinking names consequences of consequences: the cache that speeds a laptop build while starving the integration lane in CI. None of that requires a job posting. It requires refusing to stop at the first plausible cause.

When I teach this, I do not start with a diagram. I point at something in the room — the coffee machine, the deploy workflow, the cover script — and ask what would change if we removed it. Most people answer with second-order effects immediately. They have been doing the work. They were told it was intuition because it did not match a title.

The mystic-bytes incident resolved when I drew a crude loop on paper: cache hit rate up, preprocess cache misses in CI, cover jobs rerun, Actions minutes up, patience down, another "optimization" from Cursor up. Formal method optional. Accurate loop required. Auckland weather does not change the topology. Fedora's `htop` just makes the memory side of the loop visible while Jekyll and the browser fight for RAM.

Software compresses delay. Feature flags and CI turn quarterly loops into overnight ones. The cognitive move matters more, not less, because the second-order effect arrives before you have drafted the postmortem.

## Tradeoffs

**Vocabulary vs gatekeeping.** Naming loops helps a team coordinate. Using the vocabulary to dismiss someone who cannot say "balancing loop" drives expertise underground. Shared auditability is the goal. Pedigree is not.

**Models vs the machine.** Every map omits. A pretty causal-loop diagram can win a meeting and still be wrong about the cache key. Use the model to test a hypothesis. Do not use it as a costume for certainty.

**When reductionism wins.** Some problems are local: a typo in `_config.yml`, a dead certificate, a single bad Action. Not every fire is a feedback trap. Systems thinking includes knowing when to stop drawing arrows and fix the line.

**Speed of loops.** Microservices and flags compress delay. That is not an argument for more diagrams. It is an argument for cheaper removal tests, because the loop will complete whether you named it or not.

## Close

Point at something in the room and ask what would change if you removed it. Most people already know how to think this way. They have been told the work was intuition.

Systems thinking before it was a job was still thinking. The job was cathedrals that stood, fields that watered, births that completed. The vocabulary came later. The obligation to trace the loop did not.

— JV · Dark Heart Labs.

## References

[^1]: Donella H. Meadows, *Thinking in Systems: A Primer* (Chelsea Green, 2008). The popular vocabulary for stocks, flows, delays, leverage points, and common traps.

[^2]: Jay W. Forrester, *Industrial Dynamics* (MIT Press, 1961). Founding work on system dynamics at MIT: stock-and-flow models as a teachable discipline.

[^3]: Donella H. Meadows, "Leverage Points: Places to Intervene in a System" (Whole Earth, 1999). Where interventions change behavior versus where teams spend effort on parameters.
