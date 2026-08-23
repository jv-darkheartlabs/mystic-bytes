---
layout: essay
title: Relocation as Refactor
dek: "Moving countries is a migration with no rollback plan."
number: 910.4
sort_key: 0910.04
date: 2026-08-23
cover: /assets/images/cover-archive.svg
type: pillar
brief:
  system: personal infrastructure (healthcare, work, relationships)
  issue: cold-start redeploy to a new region with no rollback window
  constraint: production traffic continues; staged cutover only
---

## Thesis

Moving a life between countries is a refactor of personal infrastructure: healthcare, work, relationships, the unnoticed defaults that make a day runnable. You do not get a maintenance window. Production continues. The honest constraint is staged cutover. Big-bang relocation is a story people tell after the fact.

## Context

I am moving a life from Louisiana toward Tāmaki Makaurau, Aotearoa. New Orleans is still the live region. Auckland is the region being stood up. The brand line is Auckland-bound. The operational fact is dual-stack: one operator, two geographies, no freeze on being a person.

I made the call to leave on a Tuesday, in the bath, with a spreadsheet open on my phone. Two columns: what I would keep, what I would let lapse. The row count kept growing. That spreadsheet is the migration plan. The bath is the staging environment. The Tuesday is the ticket number I will quote when I forget why I started.

This is not a travel journal. The journal is for routes and rooms. This essay is how you port a running life without pretending the old runtime is a snapshot you can restore.

Visitor reconnaissance is the first cutover stage I will actually run: a block on the ground in Auckland in the New Zealand summer of 2026–27, then back to the Louisiana stack. That is a recce, not arrival. I am not going to narrate visa outcomes I do not have. Official rules live on official sites. This piece is about the life-system, not the stamp.

## Mechanism

The system you migrate is mostly invisible. Visible relocation is paperwork, a lease, a box of cables you finally throw out. Invisible work is substrate: the GP who knows your history, the pharmacist who fills the script without asking, the friend who picks up on the second ring at 11pm. None of that migrates with the tarball. Relocation is a cold start of a service mesh. Every dependency re-resolves against a new environment. The first months teach which habits were portable and which were runtime-specific to the Gulf Coast.

Martin Fowler's strangler-fig pattern applies uncomfortably well. You do not big-bang the life stack. You route selected traffic to new providers while old ones still run, until a later cutover is earned.[^1] Louisiana keeps answering. Auckland gets a slice: a bank conversation, a GP search, a week of noticing which assumptions were actually New Orleans defaults. Dual maintenance is expensive. Speculative all-at-once is a rollback fantasy.

Defaults become explicit configuration. Coffee order, bin day, dinner-table rudeness rules: none of them conscious until a border swaps them. Cognitive load is not only learning new things. It is unlearning old assumptions that no longer hold. Weather, daylight, work hours, social distance, politeness shift together. For a while you run on a debugger. Every action is stepped manually because cached assumptions are untrustworthy. The exhaustion of those months is the bill for every constant becoming a variable at once.

Hot migration: no downtime for income or identity. Remote work continues. The life refactor has to happen beside that, not instead of it. Circular dependencies show up immediately. Housing wants local history you do not have yet. Healthcare wants a local record that does not exist until you are a patient. Recce, then return, then another increment. Not a cinematic one-way door.

Regressions come before improvements. Rewriting money flow, sleep location, emergency contacts, and the language you use with a doctor looks worse before it looks better. First dashboards are red. You have deployed without warm cache, and latency reads as failure until you remember it is absence of history. Measure progress in commits, not feelings. A bank conversation, a local health contact, the Sunday bus: each is a commit. Feelings catch up later.

Intentional deprecation. Not every service is worth restoring. Friendships on inertia, commitments that drain more than they return: the legacy system gave cover to keep them running. The new system requires opt-in. Most you quietly do not. That is honest accounting, not coldness. You cannot rehydrate every connection. Pretending you will eats the first year.

Michael Nygard's production-stability work is blunt about baggage you only notice during migration: hidden couplings, silent dependencies, operational folklore.[^2] Personal infrastructure has the same archaeology. You discover it when the GP is an ocean away and the 11pm friend is asleep.

## Tradeoffs

Speed versus staged cutover. A faster move reduces dual-maintenance tax. A slower move reduces blast radius. I chose staged because I still have a production life in Louisiana and a reconnaissance life in Aotearoa. Collapsing those into one leap would be a rewrite with no tests. Visitor blocks are the canary. They are not the whole cutover.

Rollback that is not rollback. You can return. You return into a country that evolved without you, into a schema that no longer matches the life you paused. "Rollback" is another migration. Keep the option. Stop calling it a snapshot restore.

Optimization targets. Some people optimize for a career checkpoint, some for family network, some for climate and sensory environment. Naming the target beats pretending one path is universally correct. Mine is Louisiana to Aotearoa, remote work as the bridge, Auckland as the region under test.

When to stop calling it temporary. Half the boxes unpacked, half the relationships on the old timezone: dual-stack cost with extra steps. Pick a date when "home" means one pole, even if the other pole still gets visits. Indefinite temporary is a leak.

## Close

Auckland is not a destination in the travel-journal sense. It is the next region in a staged refactor of a running life. Ship the increment. Document the breaking changes. Resist calling it done.

Accept that undo is another migration. Commit in small steps. Delete what should not survive the port.

— JV · Dark Heart Labs.

## References

[^1]: Martin Fowler, "StranglerFigApplication" (bliki, 2004). Incremental migration by routing functionality to a new system while the old one remains.

[^2]: Michael T. Nygard, *Release It!* (Pragmatic Bookshelf, 2007; revised 2018). Hidden dependencies and migration risk in production systems, including the ones that were "always just there" until they were not.

[^3]: New Zealand Immigration, [immigration.govt.nz](https://www.immigration.govt.nz). Official visitor and visa information. Status is verified there, not in an essay.
