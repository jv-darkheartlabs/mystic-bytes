---
layout: essay
title: How to Run Database Migrations Without Waking Users
dek: "Schema change is surgery on a building people still live in. Anonymity is the compliment."
number: 006.2
sort_key: 0006.02
date: 2026-02-07
cover: /assets/images/cover-code.svg
type: pillar
read_time: 7
tags: [ops]
hashnode: true
cross_link: migrations-are-confessions
brief:
  system: Postgres-backed readings catalog with strict slug integrity
  issue: zero-downtime column expansion; silent truncation already damaged historical rows
  constraint: solo operator; expand/contract only; future engineer must read why in the migration file
---

Database migrations carry a weight other deploys do not. You are reshaping the floor while people walk the halls. The work wants surgeon confidence and pager humility at the same time. This is the operations essay. [Migrations Are Confessions](/p/migrations-are-confessions/) is the historiography: what the DDL admits about earlier beliefs. This one is how you change the floor without waking the house.

## Thesis

**The best migration is the one nobody notices.** That anonymity is evidence that you respected traffic, locks, rollback, and the next engineer who will read the file at a bad hour.

## Context

On the mystic-bytes readings catalog, a slug column lived as `VARCHAR(255)` for years. Imports with longer romanized titles did not fail loudly. Postgres truncated. Covers pointed at the wrong slug. The bug surfaced three hops away from the column, which is how schema debt usually announces itself.

The SQL was trivial. The operational problem was not: expand without downtime, backfill honestly, and write a comment that future-me could trust after a flight. Auckland 2026 did not invent that constraint. It made the timezone honest. A "quiet night" in Tāmaki Makaurau is business hours for readers and bots in the US. Low traffic is a window, not a personality. If the only time I can take a lock is when I am exhausted, the checklist has to be written for exhausted me.

I run this from Fedora, with the migration file in Cursor and a second terminal on the replica lag graph. There is no DBA shift. There is a backup I verified last month, or there is a story I am telling myself.

## Mechanism

Before you touch production: a backup you restored once, not a backup you assumed; a rollback story, even if rollback means forward-only repair behind a flag; dashboards open for error rate, p95, and replication lag; a channel for who gets paged if row counts diverge. If you cannot name those four, you are not ready to alter the table. You are ready to hope.

Expand and contract is the pattern that keeps users asleep.[^1] Add the new column or type beside the old one. Dual-write or backfill in batches with checkpoints. Switch readers to the new shape. Drop the old path only when metrics stay flat and counts match. Skipping a step is how you ship a Friday migration that becomes Monday's curriculum. Fowler's evolutionary database design is the same idea in slower language: the schema changes with the application, in reviewable steps, not as a cutover ritual.[^2]

Batching is not aesthetic. A single `UPDATE` over a large table takes locks you will feel in the request log. I backfill slugs in chunks with a pause, then compare counts. The pause is where you notice that a trigger you forgot is rewriting rows you already fixed.

Comments are part of the migration. SQL files accept them. `Expand slug to TEXT per silent truncation` links the DDL to the incident. The PR discussion is ephemeral. The migration file is what you grep at 01:00. Cursor can generate the `ALTER`. It will not remember why `VARCHAR(255)` was a lie unless you type the sentence.

Low-traffic windows still matter. You run when traffic is lowest because rollback has margin. That is not permission to skip staging. It is insurance for the test suite's blind spots. Staging that does not have production-shaped row counts will bless a lock you cannot afford.

After cutover, watch the path you think you left. Dual-write bugs show up as silent drift, not as a red deploy. Leave the old column readable until you have a boring week of matching counts. Boring is the success state.

## Tradeoffs

A big-bang rewrite is faster until it locks the table. Batched backfill is slower until it saves the catalog. For mystic-bytes the table is small enough that I still batch, because I want the habit when the table is not small.

Maintenance mode is honest for a tiny product you can pause. Feature flags are honest when you cannot. Flags add code paths. Maintenance adds a banner. Pick the one you can reverse at 2am without inventing a third state.

Automate the repeat steps: take the backup, run the migration in staging, compare row counts. Do not automate away the sanity check on data you have already hurt once. A script that "just runs" is how truncated slugs ship a second time.

Expand/contract costs more PRs. A single scary migration costs one PR and a week of archaeology. I pay in PRs.

## Close

When users wake up and everything works, they will not send thank-you notes. That is the compliment. The floor moved. The surface stayed calm because someone did the unglamorous checklist.

Write the rollback plan before you need it. Name the commit. Sleep anyway, even if Auckland morning is someone else's peak. The migration file should still make sense when you are not proud of how late you stayed.

— JV · Dark Heart Labs.

## References

[^1]: Pramod Sadalage and Martin Fowler, *Refactoring Databases* (Addison-Wesley, 2006). Expand/contract and evolutionary schema change while the application stays up.

[^2]: Martin Fowler, "Evolutionary Database Design," martinfowler.com. Schema as a living artifact changed in step with application code.
