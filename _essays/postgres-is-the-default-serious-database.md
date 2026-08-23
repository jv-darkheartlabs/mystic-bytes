---
layout: essay
title: Postgres Is the Default Serious Database
dek: "Relations first. JSONB when you mean a document. Extensions instead of a second database."
number: 005.450
sort_key: 0005.450
date: 2026-08-20
cover: /assets/images/cover-code.svg
read_time: 6
tags: ['craft']
type: pillar
brief:
  system: Nightbind operational data and Rails apps that expect a real SQL engine
  issue: Mongo-for-everything and JSON-as-schema postponing constraints until production
  constraint: mystic-bytes stays files; no invented employer DBA role; Postgres as the default when a database is required
---

For a decade the fashionable answer to "what database" was a document store, because schema felt like a commitment and JSON felt like speed. The serious default that survived that fashion is Postgres: a relational engine with a type system, constraints, and an escape hatch (JSONB) that does not require you to throw SQL away.

I do not run a database for mystic-bytes. That site is Jekyll. Files in git are the store. When the work is records, joins, and a future you cannot keep in your head, I want Postgres. Nightbind's operational truth already lives there. Rails apps around accessibility-rails-components expect an engine that understands migrations, not a pile of documents you grep in application code.

## Thesis

**Postgres is the default serious database because it kept the relational model and absorbed the document panic without becoming a second product.** JSONB and extensions are how you avoid Mongo-for-everything. They are not a dare to store the whole domain as a blob.

## Context

Nightbind needed joins, not map-reduce folklore. Postgres was already there. The temptation, every time a nested vendor payload arrived, was a JSON column "for now." That is how you get a production filter on a key inside a blob you never indexed.

Rails treats PostgreSQL as a first-class adapter: types, `jsonb`, advisory locks. SQLite is a gift for a dummy app. It is not the production shape of a multi-user Rails app with concurrent writes. Cursor will generate a migration valid in one and sad in the other. Read the adapter.

The Mongo-for-everything pitch was schemaless speed. Some teams needed that. Most needed transactions, foreign keys, and a query a teammate could read. They got aggregation pipelines and a schema in application validation anyway. Postgres lets you write the schema in the database, then cheat locally with JSONB when a subtree is genuinely schemaless.

Auckland 2026 does not change this default. Fedora runs `psql`. mystic-bytes remains files. I will not invent a catalog database for essays so the thesis has a cute repo. The writing site is when you do *not* need a server.

## Mechanism

Postgres is an object-relational engine: tables, types, MVCC, WAL, a planner. The manual's JSON chapter is explicit that `json` and `jsonb` are types *inside* that engine, with operators, indexing (GIN), and the advice to use `jsonb` unless you have a rare need to preserve exact input text.[^1] That is the anti-Mongo move done correctly. The document is a value. It has a column. It can be constrained, versioned in migrations, and queried. When a key is queried in every request, you promote it to a column. The blob was a staging area, not a personality.

Extensions are the other half of "do not buy a second database." `CREATE EXTENSION` adds types and functions: `pgcrypto`, `pg_trgm`, PostGIS if you actually have geography.[^2] Fuzzy search is not automatic permission to stand up Elasticsearch beside a SQL core you never learned. Add an extension when the type system needs a plugin. Add another product when you have measured a limit.

Rails migrations are how this default becomes muscle memory. `t.jsonb`, `t.references`, `add_index` using GIN, `null: false`. The schema file is the team's contract. JSONB without a check constraint is how you recreate Mongo's "any shape" inside a serious database and then blame Postgres for your dumps.

Transactions and constraints are why the default is *serious*. A document store can persist. Postgres can refuse. `FOREIGN KEY`, `UNIQUE`, `CHECK`, and `NOT NULL` are product rules that survive a rewrite of the Rails app. I want those rules next to the data, not only in a model file Cursor will "simplify."

## Tradeoffs

**JSONB vs columns.** Nested vendor payloads belong in JSONB until you know the keys. User-facing filters, sorts, and joins belong in columns. Promotion is a migration, not a failure.

**Extensions vs another service.** `pg_trgm` will not replace a dedicated search cluster at huge scale. It will replace a premature cluster for a Rails app that needed `ILIKE` to stop being an insult.

**SQLite vs Postgres.** Tests and mystic-bytes-shaped tools can stay SQLite. Concurrent production writes, JSONB, and the extension story are Postgres. Do not dual-target forever as a personality.

**When Postgres is the wrong default.** A true key-value cache, a queue with different failure semantics, an analytics lake. Also: no database at all, if the site is files. I will not host essays in JSONB to feel professional.

## Close

If you need a database, start in Postgres. Put structure in columns. Put leftovers in JSONB with a date you will promote them. Use an extension before you adopt a second storage product because a conference talk was lonely.

Relations first. Documents as values. That is the default I will still defend after the next document database rebrands.

— JV · Dark Heart Labs.

## References

[^1]: PostgreSQL Documentation, "JSON Types," <https://www.postgresql.org/docs/current/datatype-json.html>. `json` versus `jsonb`, operators, and indexing — the document model as a type inside a relational engine, not a replacement for one.

[^2]: PostgreSQL Documentation, "Extending SQL" and contrib extensions, <https://www.postgresql.org/docs/current/extend.html>. How Postgres absorbs extra types and functions without requiring a second database product as the first move.
