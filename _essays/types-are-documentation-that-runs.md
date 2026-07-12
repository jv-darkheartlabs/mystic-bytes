---
layout: essay
title: Types Are Documentation That Runs
dek: "The compiler reads the docs you would not have written."
number: 005.131
sort_key: 0005.131
date: 2024-11-24
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes reading merge pipeline (TypeScript)
  issue: quiet regression — slug field sometimes undefined past validation
  constraint: blast radius inside merge module; no public API churn
---

## Thesis

Types are documentation the toolchain **enforces** — comments rot; violated invariants should fail the build, not the Friday deploy.

## Context

The mystic-bytes reading merge pipeline had a regression nobody noticed for two weeks: a slug field could be `undefined` after the validation step, leaking into cover association logic. Unit tests mocked happy paths. Production manifests had a hole. Comments above the function said *slug is required* — comments the last refactor did not update. Adding a discriminated union for `ValidatedEntry | RejectedEntry` caught the hole in CI on the first compile.[^1]

Dynamically typed codebases at scale grow heavy runtime validation — Zod, Joi, manual guards — because the invariants were always there. They had nowhere to live until something failed in production. Types relocate those invariants upstream. The mystic-bytes pipeline was TypeScript on paper and *any* in practice until we enforced strict mode on the merge package.

## Mechanism

**Documentation with teeth.** A type annotation is a claim about shape and legality. The compiler checks claims on every build. Documentation checks claims when a human reads it — optional, slow, desynchronized from code. Benjamin Pierce's framing: types are a lightweight formal method — not full proof, but mechanical agreement between author and compiler about what values may exist.[^2]

**Refactoring as regression detector.** Rename a field, change an enum, narrow a union — typed code fails everywhere the contract broke. Untyped code fails where a test happened to look, or in production where users look. The mystic-bytes slug bug was a rename drift problem wearing an validation mask.

**Types encode state machines.** `status: 'idle' | 'running' | 'failed'` forbids `running` with no job ID better than a comment. Pair with exhaustiveness checking — `default: const _exhaustive: never = status` — and new states become compile errors until handled. This is the same discipline as UI state machines, applied at the data layer.

**Gradual typing as migration path.** You need not rewrite the world. Type the boundaries first: API payloads, merge results, config loaded from JSON. Untyped interior can shrink over time. The boundary is where lies enter the system.

**Runtime validation still has a job.** External input — HTTP, user uploads, third-party webhooks — is adversarial or malformed. Parse, don't cast. Types describe the program after parsing; validators describe the wire format. Use both; do not pretend JSON schema trust replaces either.

On mystic-bytes we typed the merge result first, then added a Zod parse at the JSON boundary — duplicate specification only where the wire enters. Inside the module, the compiler carries the contract. That split cut duplicate guard clauses and made the slug regression a compile error instead of a cover mismatch discovered during a batch import at midnight.

**Tests complement, do not replace, types.** Tests prove behavior for cases you thought to write. Types prove invariants for all cases the type grammar covers. The slug bug lived in a gap: tests asserted happy output; types now assert that *validated* and *rejected* are disjoint shapes — a claim tests would need dozens of cases to approximate.

## Tradeoffs

**Annotation cost vs incident cost.** Typing a module takes hours; debugging undefined-at-scale takes days. Nightbind's checkout types paid for themselves the first double-submit guard typed as impossible state.

**Strictness vs velocity.** `any` and `@ts-ignore` are technical debt with interest. Allow them in prototypes; ratchet strictness before external consumers depend on the surface. `strict: true` in tsconfig is cheaper than quarterly production hunts.

**Generics vs readability.** Power types aid library authors; application code often needs boring structs. Clever type-level programming is the same comprehension debt as clever runtime code — pay it only where reuse justifies.

**When types lie.** Assertions and casts bypass the checker. Overuse and types become theater. If you cast, comment why the invariant is true — you have reintroduced comment-based trust at a hot spot.

Add types at the boundaries where bugs hurt. Let the compiler read the documentation your team would not maintain. Start with the functions that touch money, identity, or irreversible writes — the places where undefined is not an abstract concern. The cost is hours; the savings are years of strangers changing the merge pipeline without fear.

— JV · Dark Heart Labs.

## References

[^1]: Benjamin C. Pierce, *Types and Programming Languages* (MIT Press, 2002). Pierce is the standard academic reference for type systems as enforceable specifications — the theoretical foundation for "documentation that runs."

[^2]: Robin Milner, *A Theory of Type Polymorphism in Programming* (1978) and ML family type systems. Milner created the mechanized inference model that made practical static typing scale — the engineering lineage behind modern TypeScript-adjacent tooling.

[^3]: Gary Bernhardt, "Boundaries" (Destroy All Software, 2012). Bernhardt's talk is the widely cited practitioner argument for typing core/domain boundaries while keeping edges explicit — the migration pattern this essay recommends for brownfield codebases.
