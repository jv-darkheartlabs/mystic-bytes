---
layout: essay
title: Databases Are an Opinion
dek: "The schema is the team's worldview, written down."
number: 005.74
sort_key: 0005.74
date: 2026-01-29
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes reading catalog; Nightbind Postgres entities
  issue: '"series" stored as a tag string; reading-order queries fail'
  constraint: one change window; no API break for existing clients
---

## Thesis

**A schema is not neutral storage.** It is the team's hypothesis about how the domain works — written in tables or in YAML, enforced by constraints or by convention, and expensive to argue with once applications depend on it.

## Context

This is the ontology essay. Not how to read a migration chain, and not how to write the next admission. This is what the current shape claims is real.

The mystic-bytes reading catalog started simple: titles, authors, covers, and a place for everything else. "Series" lived in tags and categories — a string you could filter in `reading-log.js` if you already knew the slug. That worked at a few hundred entries. At a larger shelf we needed reading order, duplicate detection across editions, and cover reconciliation when the same title arrived in more than one batch. The grid could not answer "book three of series X" without parsing strings in the browser, because we had never decided series was an entity. We had decided tags were enough. The catalog's opinion was showing.

Nightbind's Postgres is the louder version of the same claim. Tables are nouns. Foreign keys are verbs. Until a `series` (or a `checkout`, or an `account`) is a row, the product can only shrug and ask the application to invent a convention. Cursor will invent one. It will look flexible. It will lie at scale.

I write both from Fedora in the Auckland 2026 window. Neither store is a job title. Both are worldviews I have to defend when a query gets expensive.

## Mechanism

Edgar Codd's relational model was itself an opinion: structure data as relations, query with declarative logic, put integrity in the database.[^1] Every ORM since has been a translation layer over someone's ontology. You do not escape opinion by picking Mongo or a JSON column. You postpone the argument until runtime.

Required fields encode policy. `NOT NULL` on `email` says accounts without email are invalid. Nullable `deleted_at` says soft delete is permitted. `status DEFAULT 'draft'` says most rows start unpublished. None of these are "just database details." They are product decisions frozen where the query planner can see them. mystic-bytes frontmatter does the same with less enforcement: `type: pillar` is an opinion about length and structure. Jekyll will not stop you from lying. The style guide will only sigh.

When schema and business disagree, schema often wins for a while. The database has tests, migrations, and callers. The business has meetings. Mismatch shows up as EAV tables nobody understands, a god JSON column, five nullable foreign keys where a polymorphic association was feared. Kleppmann's point is the long one: data outlives code. The shape you ship today constrains services you have not written yet.[^2]

Query shape drives UX shape. If the catalog cannot efficiently list "next unread in series," the UI will not offer it — not because product rejected the feature, but because the model made the feature a string-parsing hobby. Schema design is product design with a longer feedback loop. Nightbind cannot offer a clean "authorized but not captured" admin view if authorized is not a first-class state. mystic-bytes cannot offer series order if series is a hashtag.

Identity is an opinion too. Slugs are human-debuggable. UUIDs survive title renames without breaking references. Neither is neutral. Each encodes how much rename pain you expect and how much you trust an operator reading logs. The wrong choice does not fail in the migration. It fails when marketing renames a series and half the deep links rot.

Fowler's notes on schemaless structures are useful when a team claims the JSON column is temporary.[^3] Temporary is an opinion about time. Time is what catalogs have. I can keep tags for mood (`romantasy`) and still admit that series is a different kind of thing. Collapsing those kinds was the original opinion. It was convenient. Convenience is not neutrality.

Nightbind may one day split catalog from commerce. Until then, one Postgres instance forces shared vocabulary. That is either coupling or consistency, depending on whether you planned the nouns. mystic-bytes keeps readings as files and essays as files. That is also an opinion: the site is a corpus, not a store. I am not going to pretend a writing collection needs SQL. I am going to admit that every operational question I actually need to ask still does.

## Tradeoffs

**Normalization vs delivery speed.** Tags ship tonight. A `series` entity ships later with fewer regrets. Early products rationally defer ontology. Deferral is still a bet. Interest accrues in the browser.

**Flexibility vs integrity.** JSON columns and schemaless stores postpone opinion. They also postpone invalid-state detection until 2am. Choose where you want the error: migrate time or production. I want catalog errors at edit time.

**Single database vs bounded contexts.** One store forces a shared language. Several stores force a translation layer. Pick the pain you can operate. Do not pick both by accident.

**When schemaless is rational.** Event logs, analytics pipelines, prototype spikes. Operational systems that answer user-facing questions want declared structure — especially a reading catalog where "book three of series X" is not an edge case, and a checkout where money is not a tag.

## Close

Treat schema review like API review. What entity are we creating. What lifecycle does it have. What query must be fast in six months. Ask those before the tags field feels like freedom.

The shape of the table — or the YAML — determines the conversation you can have with the data later, and with the person who thinks tags are good enough for now. They might be, tonight. They are still an opinion. Write it down as one.

— JV · Dark Heart Labs.

## References

[^1]: Edgar F. Codd, "A Relational Model of Data for Large Shared Data Banks," *Communications of the ACM* 13, no. 6 (1970). Data as relations; integrity as constraints.

[^2]: Martin Kleppmann, *Designing Data-Intensive Applications* (O'Reilly, 2017). Data models as long-lived design choices; data outlives application code.

[^3]: Martin Fowler, "Schemaless Data Structures" and related notes on object-relational impedance mismatch, martinfowler.com. The trade between rigid schemas and flexible storage.
