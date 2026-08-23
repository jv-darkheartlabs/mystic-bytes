---
layout: essay
title: Schema Migration as Archaeology
dek: "Read the migration chain before you trust the models."
number: 005.7
sort_key: 0005.07
date: 2026-01-14
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: Nightbind Postgres migration chain; mystic-bytes frontmatter as a file analog
  issue: callers break on a "small" change; the oral history is gone
  constraint: must hold on a tired 2am mind; the chain is the trace
---

## Thesis

**The migration chain is the strata. Application code is the soft tissue.** Read the files in order and you can reconstruct what the team believed on specific days, often more reliably than from the commit subject lines.

## Context

This is the reading essay. The sibling about writing the next file is a different job. Here the work is forensic: you arrived late, the people who knew why column seventeen exists are gone, and the ORM models are a flattering portrait.

I have onboarded to Nightbind's Postgres history that way. The application looked fine. The migrations told on it: years of additive columns, a renamed enum buried in a single `ALTER`, a nullable field that became load-bearing without a backfill anyone wrote down. At 2am the operator does not have the oral history. They have the chain — if it was written for strangers.

mystic-bytes is not a database. It is YAML and Markdown. The analog still holds. Frontmatter fields accumulate. `type`, `brief`, `sort_key`, `cover` — each one is a layer. When a script in `content-data.ts` assumes a field that older essays never grew, the failure looks like a flaky build until you read the history of the shape. Cursor will complete against the current type. It will not warn you that half the corpus is an earlier civilization.

Auckland 2026 does not restore the archaeologist who left. Fedora's `git log` on `db/migrate` is the trench.

## Mechanism

Application code is rewritten in a season. Migrations accumulate. Each file is a layer: here the user table split; here a feature-flag column arrived; here a compensating change only makes sense if you know the previous quarter happened. Fowler and Sadalage treat that sequence as the primary narrative of data change — small, reversible steps, continuously integrated, never pretending the database started in its current shape yesterday.[^1] Production data outlives every deploy branch. That is why the strata matter.

Naming and commentary are forensic tools. `20240301_fix.sql` is a crime scene without a report. `20240301_backfill_order_status_after_checkout_redesign` is evidence. Comment the reasoning you will not be present to recite: why nullable, why now, what backfill ran, what rollback was rejected and why. The tired 2am mind is not smarter than the 3pm mind. It has less bandwidth. The migration must carry the context grep cannot reconstruct from caffeine.

Nygard's stability work pairs here. Schema and integration drift are production failure modes, not aesthetic ones.[^2] A merge queue serializes against a contract. When the contract drifted from caller expectations, the failure looked like a flaky test until it looked like an outage. We traced one break to a migration that changed a column default without updating the serializer. The comment said "align with new spec." The spec link was dead. Archaeology failed because the dig site was unlabeled.

Squashing is a trade, not a virtue. Teams squash migrations for a clean origin story. They also erase the sequence that explains why two indexes overlap, why a constraint name references a vendor that left in 2019, why column seventeen exists. Squash for a greenfield clone if you must. Preserve the chain that production actually ran. Git history of a squash is not the same artifact as the files a recovery might need to replay.

Read migrations before models. On Nightbind they answer questions the Ruby hides: what is nullable because nobody trusted the backfill; what is denormalized because read latency mattered; what foreign keys were deferred because a lock could not last through the deploy. The schema is the accumulated decision log. The models are the press release.

On mystic-bytes I do a thinner version of the same read: open the oldest essays and the newest, diff the frontmatter keys, then open the script that assumes today's keys. The gap is the site. Treating that gap as "Jekyll being Jekyll" is how you skip the trench.

## Tradeoffs

**Migration size vs deploy risk.** Large migrations are easier to read as a single story. Small migrations are easier to roll forward safely. Prefer small steps with comments over an epic that locks tables through lunch.

**Zero-downtime patterns vs complexity.** Expand-contract-backfill buys availability at the cost of multi-phase overhead. Document the phase in each file or the next person deploys phase three before phase two.

**When squashing helps.** Early products with no long-lived production data can reset cheaply. Squash only when you are sure no environment still needs the intermediate strata for recovery or audit. Essay frontmatter is cheap to reset. Payment rows are not.

**Tooling vs discipline.** Flyway, Liquibase, Rails migrations, Prisma: the tool enforces order, not intent. The comment field is still yours. Cursor will write a down migration that is a lie in production. Read it as a source, not as a spell.

## Close

When you join a project, read the migrations before the models. When you inherit a writing corpus, read the oldest frontmatter before you trust the type. The messiness is the evidence. Preserve it.

The next file you add is a confession. That is a different essay. This one is the trench. Bring a label.

— JV · Dark Heart Labs.

## References

[^1]: Pramod J. Sadalage and Martin Fowler, *Refactoring Databases: Evolutionary Database Design* (Addison-Wesley, 2006). Incremental schema change and database history as a first-class artifact.

[^2]: Michael T. Nygard, *Release It!* (Pragmatic Bookshelf, 2007; revised 2018). Schema and integration drift as production failure modes.
