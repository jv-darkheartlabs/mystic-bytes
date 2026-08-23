---
layout: essay
title: SQL Is a Language
dek: "Declaring the result is the point; the engine picks the plan."
number: 005.223
sort_key: 0005.223
date: 2026-08-22
cover: /assets/images/cover-code.svg
read_time: 6
tags: ['craft']
type: pillar
brief:
  system: Nightbind and Rails-shaped queries against Postgres
  issue: treating SQL as dated syntax or as ORM exhaust instead of a declarative language with closure and three-valued logic
  constraint: no epistemology essay; stay on grammar, NULLs, and what the standard actually evaluates
---

I already wrote the other SQL essay: the one where the ORM is a translator and the database is the honest interface. This is not that. This is the language. `SELECT` is a sentence that defines a relation. The planner is allowed to rearrange the furniture. If you wanted to dictate the scan, you wanted a procedural language and a loop.

Cursor will emit Active Record until the query is a novella. The novella still compiles to SQL. Learn the compilation target as syntax, not as a vibe that "looks dated."

## Thesis

**SQL is a declarative language over relations: you name the result, the engine chooses a plan.** Closure, three-valued logic, and the standard's grammar are the language. EXPLAIN is how you read the compiler. Treating the query as a script of steps is a category error the optimizer will not honor.

## Context

Nightbind keeps operational truth in Postgres. Rails apps I touch, including the dummy surfaces around accessibility-rails-components, speak SQL whether the file in the editor is Ruby. mystic-bytes does not: that repo is Jekyll and files. I am not going to pretend a writing collection needs a query language. I am going to admit that every serious store I actually query still does.

The bug that taught me the language was not N+1. It was `WHERE status = 'active'` missing rows whose `status` was NULL. I "fixed" it in Cursor with `status != 'archived'`. Same hole. SQL's `=` and `<>` do not do what Ruby's `==` does with `nil`. Unknown is a third truth value. The query was correct. My model of the language was a two-valued fantasy.

Auckland 2026 does not change three-valued logic. Fedora's `psql` and the hosted instance agree on NULL. The dialect differences start after that.

They treat SQL as a report writer you outgrow, or as a leak from the ORM you patch with another include. Both stances skip the grammar: projection, restriction, join, grouping, the fact that a query returns a table you can query again.

## Mechanism

Codd's relational model is the mathematical claim underneath: data as relations, operators that take relations and yield relations.[^1] Closure is the important word. The output of a join is a relation. You can nest it, name it, constrain it. SQL is an imperfect, committee-shaped encoding of that claim. It is still a language with a type system (sort of), a boolean system (three-valued), and a standard.

ISO/IEC 9075 is the SQL language standard: syntax, identifiers, the meaning of `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `JOIN`, and the treatment of nulls.[^2] Vendors extend it. Postgres is a dialect I like. The core sentence stays: declare a set. `SELECT` lists attributes. `FROM` names the product (including joins). `WHERE` restricts. You did not write a for-loop. You wrote a definition.

NULLs are the part people skip because the keyword looks empty. A comparison with NULL yields UNKNOWN, not FALSE. `UNKNOWN` is discarded by `WHERE`. `IN` lists and `NOT IN` subqueries with NULL become traps. `OUTER JOIN` manufactures NULLs for missing matches; those NULLs then poison later predicates unless you write `IS NULL` on purpose. This is not "Postgres being weird." It is the language. If a column is nullable, every query is a three-valued program.

The optimizer is the backend of that language. You said *what*. Indexes, seq scans, and join order are *how*. EXPLAIN is a compiler listing. If you pin a plan with hints as a first reflex, you are writing a different language in comments. Usually you needed a predicate the planner could use.

CTEs and subqueries are nested sentences. Older Postgres treated a CTE as an optimization fence; newer versions can inline. Read the version. Do not cargo-cult `WITH` as a temp table unless you mean `MATERIALIZED`.

## Tradeoffs

**Standard SQL vs dialect.** Portable SQL is a subset. `RETURNING`, `JSONB` operators, `DISTINCT ON` are Postgres. I write for the engine I run. I do not pretend it is 9075-pure. I do name the extension when Cursor invents a function from another vendor.

**Declarative query vs application loop.** Pulling rows and filtering in Ruby is how you hide a tablescan in a profiler that only sees HTTP. If the result is a set, write the set.

**NULL vs sentinels.** Empty string and `0` feel kinder until you need "unknown" and "zero" in the same column. NULL is honest and expensive. Pick it on purpose.

**When not to write SQL.** mystic-bytes inventory is Python over files. A key-value cache is not a relation. Do not baptize every hash in SELECT.

## Close

Read the query as a definition of a set. Say what one row means. Say what NULL means in each selected column. If you cannot, the sentence is unfinished, and the planner will finish it without you.

Declaring the result is the point. The engine picks the plan. That split is the language.

— JV · Dark Heart Labs.

## References

[^1]: Edgar F. Codd, "A Relational Model of Data for Large Shared Data Banks," *Communications of the ACM* 13, no. 6 (1970). Relations and closed operators — the model SQL still approximates, including why a query's result is itself queryable.

[^2]: ISO/IEC 9075, *Information technology — Database languages — SQL*. The language standard for syntax and evaluation, including three-valued logic and the meaning of the query specification. Vendor manuals document dialects on top of it.
