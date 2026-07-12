---
layout: essay
title: How to Run Database Migrations Without Waking Users
dek: "Schema change is surgery on a building people still live in. Anonymity is the compliment."
number: 006.2
sort_key: 0006.02
date: 2023-11-07
cover: /assets/images/cover-code.svg
type: pillar
read_time: 9
tags: [ops]
hashnode: true
cross_link: migrations-are-confessions
brief:
  system: Postgres-backed Jekyll site with a readings catalog and strict slug integrity
  issue: zero-downtime column expansion; silent truncation already damaged historical rows
  constraint: solo operator; expand/contract only; future engineer must read why in the migration file
---

Database migrations carry a weight other deploys do not. You are reshaping the foundation while people walk the halls above. The work requires surgeon confidence and pager humility — often at the same time.

## Thesis

**The best migration is the one nobody notices.** That anonymity is not deception; it is evidence that you respected traffic, rollback, and the next engineer's need to understand what changed.

This essay pairs with [Migrations Are Confessions](/p/migrations-are-confessions/) — that piece is about what schema change admits about earlier beliefs. This one is about how to execute without waking users.

## Context

On the [mystic-bytes](https://github.com/jv-darkheartlabs/mystic-bytes) site pipeline, a slug column held `VARCHAR(255)` for years. Imports with longer romanized titles did not fail loudly — Postgres truncated. Covers pointed at wrong slugs. The bug surfaced three hops away from the column, which is how schema debt usually announces itself.

The fix was trivial SQL. The hard part was operational: expand without downtime, backfill honestly, and write a migration comment that future-you at midnight could trust.

## Mechanism

**Before you touch production**

- Backup verified, not assumed.
- Rollback story written — even if "rollback" means forward-only repair with a feature flag.
- Monitoring dashboards open: error rate, p95 latency, replication lag.
- Communication channel chosen: who gets paged if row counts diverge.

**Expand / contract pattern**

1. Add the new column or type alongside the old one.
2. Dual-write or backfill in batches with checkpoints.
3. Switch readers to the new shape.
4. Drop the old path only when metrics stay flat and counts match.

Skipping steps is how you ship a Friday migration that becomes a Monday curriculum.

**Why low-traffic windows still matter**

You run at night because traffic is lowest and your anxiety is highest — and those forces balance in a way midday deploys rarely achieve. Low traffic is not permission to skip testing. It is margin for rollback when the test suite lied.

**Comments are part of the migration**

SQL files accept comments. Use them. "Expand slug to TEXT per silent truncation incident 2024-09" links the DDL to the story. The PR discussion is ephemeral; the migration file is archaeology.

## Tradeoffs

**Big-bang vs batched backfill.** Big-bang is faster until it locks tables. Batching is slower until it saves the catalog.

**Feature flags vs maintenance mode.** Maintenance mode is honest for small products. Flags are honest when revenue cannot pause.

**Automation vs manual verification.** Automate the repeat steps; never automate away row-count sanity checks on data you have already hurt once.

## Close

When users wake up and everything works, they will not send thank-you notes for your migration. That is the compliment. The ocean floor shifted; the surface stayed calm — because engineering did the unglamorous checklist work.

Write the rollback plan before you need it. Name the commit. Sleep anyway.

— JV · Dark Heart Labs.

## References

[^1]: Pramod Sadalage and Martin Fowler, *Refactoring Databases* (Addison-Wesley, 2006) — expand/contract and evolutionary schema design.
[^2]: Martin Fowler, "Evolutionary Database Design," martinfowler.com — schema as living artifact changed with application code.
