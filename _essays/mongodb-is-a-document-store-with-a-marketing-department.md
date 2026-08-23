---
layout: essay
title: MongoDB Is a Document Store With a Marketing Department
dek: "BSON in collections. The brochure sold freedom from rows."
number: 005.452
sort_key: 0005.452
date: 2026-08-10
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: "MongoDB as a BSON document store, Atlas as the metered cloud"
  issue: '"schemaless" pitch hiding an application schema that still breaks on rename'
  constraint: "DHL does not run Mongo; mystic-bytes is git files, scheduler is Postgres; user not DBA"
---

MongoDB stores BSON documents in collections. That is the database. The brochure sold "flexible schema" and a long stretch of slides about leaving rows behind. I have queried it as a user on other people's stacks. I have never been a MongoDB operator for Dark Heart Labs. mystic-bytes is markdown in git. The Railway scheduler uses Postgres. There is no Atlas cluster on the studio invoice.

A document is a nested structure with a primary key, usually `_id`. Collections are bags of those structures. Indexes are still indexes. Uniqueness still has to be declared. The schemaless pitch was that the engine would not yell when you added a field.[^1] The application still had a schema. It lived in the driver, in the implicit contract between writers, and in the ticket when two shapes of `user` coexisted because someone shipped a rename without a migration. Rows make that fight visible. Documents hide it until the aggregation pipeline gets ugly.

Atlas is how the company meters the store: backups, replica sets, a dashboard that looks like ops. The marketing did its job. The product is still a document store. Use it when the record is a blob you want by id and occasionally slice with an aggregation. Skip it because a tutorial said SQL was the past. I read the manual so I can argue with the pitch. I do not owe MongoDB Inc a cluster for a Jekyll site.

— JV · Dark Heart Labs.

## References

[^1]: MongoDB Manual, "Documents," <https://www.mongodb.com/docs/manual/core/document/>. BSON documents, field-value pairs, and `_id` — the store under the schema story.
