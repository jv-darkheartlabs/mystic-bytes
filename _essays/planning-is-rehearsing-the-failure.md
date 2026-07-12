---
layout: essay
title: Planning Is Rehearsing the Failure
dek: "The plan exists to be wrong on a schedule."
number: 658.512
sort_key: 0658.512
date: 2025-01-12
cover: /assets/images/cover-craft.svg
type: pillar
brief:
  system: the legacy module
  issue: the fast path stopped being fast
  constraint: "no new dependencies. work with what's already in the stack."
---

The point of a plan is not to predict the future. The point is to give the team a coherent story to compare reality against, so that the moment reality diverges, the divergence is visible early — while there is still room to respond.

## Context

I learned this on a Nightbind release where the legacy module had quietly become the slow path. The spreadsheet said we would refactor the hot loop in week two. Week two arrived and the hot loop was not the bottleneck; a cache invalidation pattern we had not inventoried was. Because the plan named the hot loop explicitly, the surprise was a diff, not a fog. We re-planned in an afternoon instead of discovering the truth in production on a Friday.

That is what planning-as-rehearsal means. You are not writing prophecy. You are scheduling the first failure in a safe room.

## Mechanism

**Specificity is what makes disagreement possible.** Plans that survive contact with reality unchanged are usually plans that were never specific enough to disagree with. "Improve performance" is not a plan. "Reduce p95 on `/api/search` from 800ms to 200ms by replacing the N+1 in `SearchService#hydrate`" is a plan — and the moment instrumentation shows the N+1 is 40ms while connection pool exhaustion is 600ms, everyone can see the plan was wrong. The wrongness is the deliverable.

Henri Mintzberg's decades of research on formal planning found that in complex, fast-moving environments, detailed long-range plans often diverge from outcomes not because planners are incompetent, but because the act of planning cannot compress uncertainty out of systems that generate it continuously.[^1] The useful artifact is not the forecast. It is the shared model of dependencies, risks, and intended sequence that lets the team notice drift.

**Rehearsal surfaces the backup that was not backing up.** Disaster recovery teaches the same lesson under harsher lighting: the runbook you have never executed is fiction until proven otherwise. Planning is rehearsal at lower stakes. You walk the path on paper — or in a tabletop — and discover the handoff nobody owns, the metric nobody watches, the "temporary" flag that became load-bearing three quarters ago. Gene Kim and the DevOps research community frame high-performing teams as those that practice failure modes before customers pay for them.[^2] A planning session that ends with "we were wrong about X" is not a failed session. It is a drill that worked.

**The schedule is part of the mechanism.** Write the plan to be wrong on purpose, on a calendar. Review it when reality diverges, not when the project is already red. Weekly for active work. At phase boundaries for larger efforts. The early disagreement — "we assumed the fast path; the data says the pool" — is cheaper than the late disagreement, when the constraint has become a launch date and the only tool left is heroics.

For the legacy module brief: no new dependencies meant we could not import our way out of ignorance. The plan had to name what was already in the stack — the ORM hooks, the cache layer, the cron that touched the table — so we could argue with it using only existing observability. That constraint forced specificity. Specificity forced early wrongness. Early wrongness saved the fast path, eventually, by proving it was not the path.

## Tradeoffs

**Planning depth vs planning latency.** A plan that takes three weeks to write misses three weeks of learning. A plan written in an hour may omit the dependency that kills you. The balance for most software work: enough detail to falsify assumptions within the first sprint, not enough to simulate the whole year.

**When the plan should be thin.** Exploration work, zero-to-one prototypes, and research spikes benefit from intent documents and time boxes, not Gantt fiction. The rehearsal value drops when there is nothing stable to compare against yet. Plan the learning goal, not the implementation you do not understand.

**When "no plan" is rationalized avoidance.** Teams that skip planning often claim agility. What they get is repeated surprise — the same class of failure, unscheduled, at production severity. Agility is replanning well, not refusing to plan.

**The political cost of being wrong early.** Admitting the plan was incorrect before the deadline still feels like losing face in some orgs. That incentive produces vague plans that cannot be wrong because they cannot be measured. Fix the incentive, or the planning theater persists.

## Close

Before you commit to a timeline, write down what you believe is true — the bottleneck, the owner, the dependency, the metric — and pick a date to compare reality against it. Treat the first mismatch as success: you rehearsed the failure while rollback was still cheap.

Plans are not promises to the future. They are instruments for noticing when the future refuses to cooperate.

— JV · Dark Heart Labs.

## References

[^1]: Henry Mintzberg, *The Rise and Fall of Strategic Planning* (Free Press, 1994) and related essays on planning fallacies in complex organizations. Mintzberg is the canonical critic of treating formal plans as forecasts; his work distinguishes planning as learning from planning as ritual.

[^2]: Gene Kim, Jez Humble, Patrick Debois, and John Willis, *The DevOps Handbook* (IT Revolution, 2016). Kim's research program (DORA metrics, State of DevOps reports) ties deliberate practice, small batch change, and early feedback to measurable delivery outcomes — the organizational case for scheduled rehearsal over heroic recovery.
