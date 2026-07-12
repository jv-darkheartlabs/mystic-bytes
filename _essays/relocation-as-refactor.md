---
layout: essay
title: Relocation as Refactor
dek: "Moving countries is a migration with no rollback plan."
number: 910.4
sort_key: 0910.04
date: 2026-05-24
cover: /assets/images/cover-archive.svg
type: pillar
brief:
  system: personal infrastructure (healthcare, work, relationships)
  issue: cold-start redeploy to a new region with no rollback window
  constraint: production traffic continues; staged cutover only
---

Moving countries is a migration with no rollback plan. You lift an entire system — paperwork, relationships, daily routines, the small infrastructure of being a person — and redeploy it onto unfamiliar substrate. Some services come back up immediately. Others stay broken for months. The ones that stay broken the longest are the ones you forgot were running.

## Context

I made the call to leave on a Tuesday, in the bath, with a spreadsheet open on my phone. Two columns — what I would keep, what I would let lapse — and a row count that kept growing every time I thought of something else. That spreadsheet is the migration plan. The bath is the staging environment. The Tuesday is the ticket number I will quote when I forget why I started.

The brief is not metaphor for sport. Production traffic continues: clients pay, code ships, the newsletter goes out. Staged cutover is the only honest constraint — Auckland interview window first, full relocation once an offer funds the move rather than speculates on it. One operator, no maintenance window for being a person.

## Mechanism

**The system you migrate is mostly invisible.** Visible relocation is immigration paperwork, lease termination, the dog import permit, the box of cables you finally throw out. Invisible work is substrate: the GP who knows your history, the pharmacist who fills the script without asking, the friend who picks up on the second ring at 11pm. None of that migrates with the tarball.

Software engineers underestimate this because we are trained to think in data transfer. Relocation is a cold start of an entire service mesh. Every dependency re-resolves against a new environment. Every retry policy re-tunes for new latencies. The first six months teach which habits were portable and which were runtime-specific.

Martin Fowler's strangler-fig pattern for incremental rewrites applies uncomfortably well: you do not big-bang the life stack; you route traffic to new providers while old ones still run, until cutover is earned.[^1] The personal version is phased deploy — December 2026 through February 2027 on the ground in Auckland, full move later in 2027 when funding exists.

**Defaults become explicit configuration.** At home, coffee order, bin day, dinner-table rudeness rules — all defaults, none conscious until a border swaps them. Cognitive load is not learning new things alone. It is unlearning old assumptions that no longer hold. Auckland will not be the city I left. Weather, daylight, work hours, social distance, politeness shift simultaneously. Small deltas, enormous aggregate.

For months you run on a debugger — every action stepped manually because cached assumptions are untrustworthy. The exhaustion of the first six months is not weakness. It is the bill for every constant becoming a variable at once.

**Hot migration: no downtime for income or identity.** The mortgage application wants a payslip dated this month, in the new currency, from the new employer who has not hired you because you have not arrived. The whole migration runs with live writes and partial schema. Treating relocation as two deploys instead of one is what makes it tractable from inside.

**Regressions before improvements.** Refactors that rewrite money flow, sleep location, emergency contacts, and doctor language look worse before better. First dashboards are red. You have not ruined your life; you have deployed without warm cache, and latency reads as failure until you remember it is absence of history.

Measure progress in commits, not feelings. Opened a bank account — commit. Registered with a GP — commit. Learned which bus runs Sundays — commit. Feelings catch up later. Commits go first.

**Intentional deprecation.** Not every service is worth restoring. Friendships on inertia, commitments that drain more than they return — the legacy system gave cover to keep them running. The new system requires opt-in. Most quietly you do not. That is not coldness. It is honest accounting. You cannot rehydrate every connection; pretending you will eats the first year maintaining a system you no longer inhabit.

Michael Nygard's production stability work emphasizes that every system carries baggage you only notice during migration — hidden couplings, silent dependencies, operational folklore.[^2] Personal infrastructure has the same archaeology.

## Tradeoffs

**Speed vs staged cutover.** Faster move reduces dual-maintenance tax (two countries, two mental models). Slower move reduces financial and emotional risk. I chose staged because speculative migration is a rollback fantasy that keeps half your bandwidth in the old runtime.

**Rollback that is not rollback.** You can move back, eventually, into a country that evolved without you, into a schema that no longer matches the life you left. "Rollback" is another migration. Closing that door frees cycles to rebuild.

**Optimization targets.** Some people optimize for career checkpoint; some for family network; some for climate and sensory environment. Tradeoffs are real. Naming them beats pretending one path is universally correct.

**When to stop calling it temporary.** Settling behaviors — half the boxes unpacked, half the relationships on old timezone — extend dual-stack cost. Pick a cutover date for "home" even when perfection is unavailable.

## Close

Auckland is not the destination. It is the next checkpoint. Ship the migration cleanly, document the breaking changes for the version of me who lives inside the result, and resist calling it done. Relocations, like codebases, finish only when someone stops working on them.

Accept no rollback. Commit in small steps. Delete what should not survive the port.

— JV · Dark Heart Labs.

## References

[^1]: Martin Fowler, "StranglerFigApplication" (bliki, 2004) — incremental migration by routing functionality to a new system while the old one remains, the standard pattern for large rewrites without big-bang cutover.

[^2]: Michael T. Nygard, *Release It! Design and Deploy Production-Ready Software* (Pragmatic Bookshelf, 2007, revised 2018). Nygard documents hidden dependencies and migration risk in production systems — applicable to personal infrastructure that was "always just there" until it wasn't.
