---
layout: essay
title: Types Are Documentation That Runs
dek: "The compiler reads the docs you would not have written."
number: 005.131
sort_key: 0005.131
date: 2026-01-22
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes Essay type in content-data.ts; Nightbind checkout states
  issue: a required field stays optional in practice; comments say otherwise
  constraint: blast radius inside the module; no public API churn
---

## Thesis

**Types are documentation the toolchain enforces.** Comments rot. Violated invariants should fail the build, not the Friday deploy.

## Context

mystic-bytes essays are Markdown with YAML frontmatter. Jekyll will render whatever you hand it. The typed picture of an essay lives in `scripts/content-data.ts`: `number`, `slug`, `title`, `dek`, an optional `brief`. That type is a claim. The files on disk are a rumor until something checks them.

I have shipped a slug that was empty after a "validation" step because the comment above the function still said required and the last edit had not updated the comment. Unit tests mocked happy paths. Adding a discriminated union — valid entry versus rejected entry — made the hole a compile error the first time I ran the checker.[^1] Cursor is happy to keep the comment warm. It is less happy to keep the comment true.

Nightbind's checkout paid the same lesson in production clothes. A status that could be `idle` and `submitting` at once was a double-submit waiting for a tired operator. Typing the impossible state out of existence was cheaper than another incident writeup.

Dynamically typed code at scale grows runtime validation — Zod, Joi, manual guards — because the invariants were always there. They had nowhere to live until something failed. Types relocate those invariants upstream. Auckland 2026 does not change that. Fedora's `tsc` and a CI job agree more often than a comment and a future reader.

## Mechanism

A type annotation is a claim about shape and legality. The compiler checks claims on every build. Documentation checks claims when a human reads it — optional, slow, desynchronized from the code. Benjamin Pierce's framing is the one I keep: types are a lightweight formal method. Not a full proof. Mechanical agreement between author and compiler about what values may exist.[^1]

Robin Milner's work on polymorphism is why this scaled past academic toys. Inference made practical static typing cheap enough for daily use.[^2] TypeScript is a late dialect of that idea, gradually applied to a language that started without it. I do not need to pretend mystic-bytes is a typed application. I need the boundaries that hurt — essay metadata, merge results, money states — to stop lying.

Refactoring becomes a regression detector. Rename a field, change an enum, narrow a union, and typed code fails everywhere the contract broke. Untyped code fails where a test happened to look, or in production where a reader looks. The slug bug was rename drift wearing a validation mask.

Types encode state machines. `status: 'idle' | 'running' | 'failed'` forbids `running` with no job ID better than a comment. Pair with exhaustiveness checking (`never` in the default branch) and a new state is a compile error until you handle it. That is the same discipline as a UI state machine, applied at the data layer.

Gradual typing is a migration path. You need not rewrite the world. Type the boundaries first: API payloads, parse results, config loaded from JSON. Untyped interior can shrink. The boundary is where lies enter the system. Gary Bernhardt's "Boundaries" talk is still the practitioner version of that split.[^3]

Runtime validation still has a job. External input — HTTP, user uploads, third-party webhooks, YAML frontmatter — is malformed more often than it is evil. Parse, don't cast. Types describe the program after parsing. Validators describe the wire. Use both. Do not pretend a JSON schema badge replaces either.

On mystic-bytes I treat the TypeScript `Essay` type as the in-process contract and the YAML as the wire. Nightbind treats Stripe payloads as the wire and the checkout state machine as the program. Duplicate specification only where the wire enters. Inside the module, the compiler carries the contract.

Tests complement types. They do not replace them. Tests prove behavior for cases you thought to write. Types prove invariants for all cases the grammar covers. The slug hole lived in the gap: tests asserted happy output; types now assert that validated and rejected are disjoint shapes. Approximating that with cases is how you write a short story and call it coverage.

## Tradeoffs

**Annotation cost vs incident cost.** Typing a module takes hours. Debugging undefined-at-scale takes days. Nightbind's checkout types paid for themselves the first time a double-submit became an unrepresentable state.

**Strictness vs velocity.** `any` and `@ts-ignore` are debt with interest. Allow them in a spike. Ratchet strictness before anyone depends on the surface. `strict: true` is cheaper than a quarterly hunt.

**Generics vs readability.** Power types help library authors. Application code often needs boring structs. Clever type-level programming is the same comprehension tax as clever runtime code. Pay it where reuse justifies it.

**When types lie.** Assertions and casts bypass the checker. Overuse them and types become theater. If you cast, write why the invariant is true. You have reintroduced comment-based trust at a hot spot. Cursor loves a cast. I treat each one as a smell.

## Close

Add types at the boundaries where bugs hurt. Let the compiler read the documentation your team will not maintain. Start with the functions that touch money, identity, or irreversible writes — and, on this site, with the metadata that decides whether a page is even a page.

The cost is hours. The savings are strangers changing the module without fear, including you, later, on Fedora, after Cursor has been too helpful.

— JV · Dark Heart Labs.

## References

[^1]: Benjamin C. Pierce, *Types and Programming Languages* (MIT Press, 2002). Type systems as enforceable specifications.

[^2]: Robin Milner, "A Theory of Type Polymorphism in Programming," *Journal of Computer and System Sciences* (1978). Inference that made practical static typing scale.

[^3]: Gary Bernhardt, "Boundaries" (Destroy All Software, 2012). Type the core; keep the edges explicit — the brownfield migration pattern.
