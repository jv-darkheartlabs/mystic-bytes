---
layout: essay
title: Resilience Is a Rehearsal
dek: "The plan you have not practiced is fiction."
number: 363.34
sort_key: 0363.34
date: 2025-07-20
cover: /assets/images/cover-systems.svg
type: pillar
brief:
  system: the changelog
  issue: "the contract no longer matches the caller's expectations"
  constraint: no downtime. no schema break. ship before EOW.
---

A disaster recovery plan that has never been executed is a creative writing exercise. Resilience is not the document. Resilience is the rehearsal — the runbook that has actually been run, the failover that has actually been tested, the team that has done it under load and survived.

## Context

The changelog system on a client project looked healthy right until a deploy proved otherwise. Callers expected semver-shaped entries; the generator had been emitting a breaking shape for two releases without anyone noticing — because nothing exercised the contract under realistic conditions. No downtime, no schema break, ship before end of week: the fix had to roll forward, not roll back. The only reason that was possible was a dry-run path we had added months earlier and actually used in CI. The rehearsal existed. The fiction did not.

I have seen the opposite outcome more often: backups that were silently failing, failover DNS that pointed at a decommissioned region, runbooks that assumed a engineer who left in March. Theory is cheap. The first time you discover the gap is during the restore you cannot afford to fail.

## Mechanism

**Documents describe; drills prove.** The Google SRE book treats reliability as engineered capacity — error budgets, blameless postmortems, and practiced failure injection — not as optimism captured in PDF form.[^1] A plan names intended behavior. A rehearsal observes actual behavior. The delta between them is the work.

John Allspaw's writing on adaptive capacity in web operations applies the same lens to humans and machines: utilization without headroom is a loan against an incident you have not scheduled yet.[^2] Rehearsal is how you pay that loan down before interest compounds in customer-visible downtime.

**What rehearsals surface.** Tabletop exercises find ownership gaps — who approves the failover, who talks to customers, who rolls back the changelog schema. Game days find tooling gaps — credentials expired, runbook steps reference retired consoles, the "automatic" failover requires a manual flag nobody remembered. Chaos experiments find assumption gaps — the system fails over but the cache warming strategy means p99 stays broken for an hour. Each gap is cheaper in a scheduled drill than in an unscheduled quarter.

**Rehearsal under constraint mirrors production.** The brief's constraints — no downtime, no schema break, ship before EOW — are not obstacles to resilience; they are the shape of real incidents. Practice forward fixes, not fantasy rollbacks. Practice communicating while tired. Practice with the on-call rotation you actually have, not the org chart you wish you had.

For the changelog contract: we added a consumer contract test, ran a simulated publish against staging callers, and only then changed the generator. The rehearsal took ninety minutes. An unplanned break would have taken days of caller firefighting.

## Tradeoffs

**Drill frequency vs alert fatigue.** Monthly game days help; daily chaos in production without governance burns trust. Match rehearsal cadence to system criticality and recent incident rate.

**Blast radius of practice.** Inject failure in production carefully — canary regions, synthetic traffic, feature flags — or pay the learning tax only during real outages. Small teams often start in staging; staging that diverges from production teaches the wrong lessons.

**When documentation is enough.** Low-criticality internal tools with fast rollback and few dependents may not justify quarterly failover theater. Be honest about tiering. Not every system earns a drill; every system that cannot tolerate outage does.

**The cost of looking unprepared.** Drills surface embarrassing gaps. Org cultures that punish surfaced gaps stop scheduling drills. Blameless review of drill results is part of the mechanism, not optional culture fluff.

## Close

Schedule the drill. Run it. Let it surface the ugly truth before the ugly truth arrives uninvited. Update the runbook with what you learned, not what you wished had happened.

Resilience is not a property you declare in architecture diagrams. It is a verb you repeat until the team's muscle memory matches the system's failure modes.

— JV · Dark Heart Labs.

## References

[^1]: Betsy Beyer, Chris Jones, Jennifer Petoff, and Niall Richard Murphy, eds., *Site Reliability Engineering* (O'Reilly, 2016) — Google's canonical SRE reference on error budgets, testing for reliability, and operational readiness reviews.

[^2]: John Allspaw, *The Art of Capacity Planning* (O'Reilly, 2008) and subsequent essays on adaptive capacity, utilization, and organizational learning during incidents. Allspaw is a primary authority on web operations as engineered systems rather than heroics.
