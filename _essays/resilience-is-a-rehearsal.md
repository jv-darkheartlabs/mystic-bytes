---
layout: essay
title: Resilience Is a Rehearsal
dek: "The plan you have not practiced is fiction."
number: 363.34
sort_key: 0363.34
date: 2026-07-10
cover: /assets/images/cover-systems.svg
type: pillar
brief:
  system: the changelog
  issue: "the contract no longer matches the caller's expectations"
  constraint: no downtime. no schema break. ship before EOW.
---

## Thesis

**A disaster recovery plan that has never been executed is a creative writing exercise.** Resilience is not the document. Resilience is the rehearsal: the runbook that has actually been run, the failover that has actually been tested, the team that has done it under load and come back. The plan you have not practiced is fiction with a filename.

## Context

The changelog system on a client project looked healthy until a deploy proved otherwise. Callers expected semver-shaped entries. The generator had been emitting a breaking shape for two releases. Nobody noticed, because nothing exercised the contract under realistic conditions.

The constraints were the real ones: no downtime, no schema break, ship before end of week. The fix had to roll forward, not roll back. The only reason that was possible was a dry-run path we had added months earlier and actually used in CI. The rehearsal existed. The fiction did not.

I have seen the other ending more often. Backups silently failing. Failover DNS pointing at a decommissioned region. A runbook that assumed an engineer who left in March. Theory is cheap. The first time you discover the gap is during the restore you cannot afford to fail. That is not a surprise. That is an unread rehearsal.

## Mechanism

**Documents describe. Drills prove.** The Google SRE book treats reliability as engineered capacity: error budgets, blameless review, practiced failure — not optimism captured as a PDF.[^1] A plan names intended behavior. A rehearsal observes actual behavior. The delta is the work. If you have never observed it, you have a story about what you would do. Stories do not restore a changelog.

John Allspaw's writing on adaptive capacity applies the same lens to humans and machines. Utilization without headroom is a loan against an incident you have not scheduled yet.[^2] Rehearsal is how you pay that loan down before the interest shows up as customer-visible downtime. Capacity you have never used is not capacity. It is a hope with a number attached.

**What rehearsals surface depends on how honest the drill is.** Tabletop exercises find ownership gaps: who approves the failover, who talks to callers, who rolls the schema forward. Game days find tooling gaps: credentials expired, runbook steps pointing at retired consoles, "automatic" failover that still needs a manual flag nobody remembered. Chaos experiments find assumption gaps: the system fails over, then cache warming leaves p99 broken for an hour. Each gap is cheaper in a scheduled drill than in an unscheduled quarter. I would rather be embarrassed on a Tuesday we chose.

**Rehearsal under constraint is the only rehearsal that counts.** No downtime, no schema break, ship before Friday: those are not obstacles to resilience. They are the shape of the incident. Practice forward fixes, not fantasy rollbacks. Practice communicating while tired. Practice with the on-call rotation you actually have, not the org chart from the planning deck. A drill that assumes two extra seniors and a clean staging clone will teach you how to succeed in a company you do not work at.

For the changelog contract we added a consumer test, ran a simulated publish against staging callers, and only then changed the generator. The rehearsal took ninety minutes. An unplanned break would have taken days of caller firefighting and a week of pretending the contract "had always been evolving." The test was the rehearsal in miniature: a caller who could not speak, refusing the new shape, while we still had time.

**Muscle memory is the point, not the PDF version.** After a drill, update the runbook with what happened, including the stupid parts: the expired token, the Slack channel that was private, the step you skipped because you "knew it." The next incident will not wait for you to remember the skip. If the team cannot run the restore without the person who wrote the restore, you have a single point of failure with a nice document.

**Looking unprepared is the drill working.** Cultures that punish surfaced gaps stop scheduling drills. Then the gaps arrive with users attached. Blameless review of drill results is part of the mechanism. If a failed game day is a career event, you will get excellent fiction and fragile systems. I have sat in rooms that treated a failed drill as incompetence. Those rooms did not get better at failing. They got better at not practicing.

## Tradeoffs

**Drill frequency vs fatigue.** Monthly game days help a tier-1 path. Daily chaos in production without governance burns trust and trains people to ignore alerts. Match cadence to criticality and to how recently you were already in an incident. Rehearsal is not a personality. It is a schedule.

**Blast radius of practice.** Inject failure in production carefully — canary, synthetic traffic, flags — or pay the learning tax only during real outages. Small teams often start in staging. Staging that has drifted from production teaches the wrong lesson with great confidence. If staging cannot fail the way prod fails, the rehearsal is about staging.

**When documentation is enough.** Low-criticality internal tools with fast rollback and few dependents may not earn quarterly failover theater. Be honest about tiering. Not every system earns a drill. Every system that cannot tolerate an outage does. The changelog callers depended on earned it. An internal dashboard might not.

**Rehearsal vs heroics.** Heroics feel like resilience because they are visible. They do not compound. A boring drill that finds an expired credential compounds. If your culture rewards the person who saved the night and ignores the person who scheduled the drill, you will get more nights.

## Close

Schedule the drill. Run it. Let it surface the ugly truth before the ugly truth arrives uninvited. Update the runbook with what you learned, not with what you wished had happened.

Resilience is not a property you declare in an architecture diagram. It is a verb you repeat until the team's hands match the system's failure modes. The changelog learned that in CI. I would like more of our plans to learn it the same way.

— JV · Dark Heart Labs.

## References

[^1]: Betsy Beyer, Chris Jones, Jennifer Petoff, and Niall Richard Murphy, eds., *Site Reliability Engineering* (O'Reilly, 2016). Google's reference on error budgets, reliability testing, and operational readiness: reliability as practiced capacity, not as a document.

[^2]: John Allspaw, *The Art of Capacity Planning* (O'Reilly, 2008) and later writing on adaptive capacity. Utilization without rehearsal is a loan against the incident you have not put on the calendar.
