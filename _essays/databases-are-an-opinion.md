---
layout: essay
title: Databases Are an Opinion
dek: "The schema is the team's worldview, written down."
number: 005.74
sort_key: 0005.74
date: 2025-11-02
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes reading catalog Postgres schema
  issue: '"series" modeled as tag string; queries for reading order fail at scale'
  constraint: one migration window; no API break for existing clients
---

## Thesis

A database schema is not neutral storage. It is the team's hypothesis about how the business works — written in DDL, enforced by constraints, and expensive to argue with once applications depend on it.

## Context

The mystic-bytes reading catalog started simple: books with titles, authors, covers, and a `tags` text field for everything else. "Series" lived in tags — `romantasy`, `acotar`, `series-2`. That worked for four hundred entries. At fourteen hundred, we needed reading order within a series, duplicate detection across editions, and cover reconciliation when the same title appeared in multiple batches. SQL could not answer "book three of series X" without string parsing in application code — because we had never decided series was an entity. We had decided tags were enough. The schema's opinion was showing.

The migration to explicit `series` and `series_position` columns was not hard technically. It was hard politically — it admitted the domain model we had been hand-waving for a year.

## Mechanism

**Tables are nouns; foreign keys are verbs.** Which entities exist as first-class rows — `users`, `orders`, `series` — determines which questions are easy. Everything else becomes application-layer glue, JSON blobs, or regrettable string conventions. Edgar Codd's relational model was itself an opinion: structure data as relations, query with declarative logic.[^1] Every ORM since has been a translation layer over someone's ontology.

**Required fields encode policy.** `NOT NULL` on `email` says accounts without email are invalid. Nullable `deleted_at` says soft delete is permitted. Default values embed assumptions — `status DEFAULT 'draft'` says most rows start unpublished. None of these are "just database details." They are product decisions frozen in migration files.

**When schema and business disagree, schema often wins temporarily.** The database has tests, migrations, and backward compatibility. The business has meetings and revised priorities. Mismatch surfaces as awkward workarounds — EAV tables nobody understands, god JSON columns, five nullable FKs where one polymorphic association was feared. Martin Kleppmann notes that data outlives code; the schema you ship today constrains every service you have not written yet.[^2]

**Migrations are confessions.** Each ALTER TABLE is the team saying we were wrong about cardinality, lifecycle, or identity. The mystic-bytes series migration was a confession that tags were a procrastination device — flexible until they were lying. Naming migrations honestly in ADRs prevents the next team from re-learning the same lesson.

**Query shape drives UX shape.** If the schema cannot efficiently list "next unread in series," the UI will not offer it — not because product rejected the feature, but because the data model made the feature expensive. Schema design is product design with longer feedback loops.

**Composite keys and surrogate IDs are also opinions.** We debated UUID primary keys vs slug-based URLs on mystic-bytes. Slugs are human-debuggable; UUIDs survive title renames without breaking foreign keys. Neither is neutral — each encodes how much rename pain you expect and how much you trust operators to read logs. The wrong choice does not fail in migration; it fails when marketing renames a series and half the deep links rot.

## Tradeoffs

**Normalization vs delivery speed.** Tags ship tonight; normalized series ships next quarter with fewer regrets. Early products rationally defer ontology — but deferral is still a bet, and interest accrues.

**Flexibility vs integrity.** JSON columns and schemaless stores postpone opinion. They also postpone invalid-state detection until runtime. Choose where you want errors: migration time or 2am production.

**Single database vs bounded contexts.** Nightbind may eventually split catalogs from commerce. Until then, one Postgres instance forces shared vocabulary — which is either coupling or consistency, depending on whether you planned it.

**When schemaless is rational.** Event logs, analytics pipelines, and prototype spikes benefit from append-only ambiguity. Operational systems that answer user-facing questions benefit from declared structure — especially catalogs like mystic-bytes where "find book three of series X" is not an edge case.

Treat schema review like API review: what entity are we creating, what lifecycle does it have, what query must be fast in six months? Ask those questions before the tags column feels like freedom. The shape of the table determines the shape of the conversation you can have with the data later — and with the product team that thinks tags are "good enough for now."

— JV · Dark Heart Labs.

## References

[^1]: Edgar F. Codd, "A Relational Model of Data for Large Shared Data Banks," *Communications of the ACM* 13, no. 6 (1970). Codd's relational model is the foundational opinion that shaped decades of schema design — data as relations, integrity as constraints.

[^2]: Martin Kleppmann, *Designing Data-Intensive Applications* (O'Reilly, 2017). Kleppmann treats data models as design choices with long-lived consequences — especially the asymmetry that data outlives application code.

[^3]: Martin Fowler, "Schemaless Data Structures" and material on object-relational impedance mismatch (martinfowler.com). Fowler documents the trade space between rigid schemas and flexible storage — useful framing when teams claim their JSON column is "temporary."
