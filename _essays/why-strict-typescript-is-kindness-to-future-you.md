---
layout: essay
title: Why Strict TypeScript Is Kindness to Future You
dek: "The type system whispers before production shouts. `strict: true` is a friend who won't let you send the email unproofread."
number: 006.33
sort_key: 0006.33
date: 2015-06-15
cover: /assets/images/cover-code.svg
type: pillar
read_time: 7
tags: [ai, craft]
cross_link: types-are-documentation-that-runs
brief:
  system: TypeScript API layer integrating LLM-generated scaffolds with a strict CI gate
  issue: loose configs let `any` and null slips reach production; AI output looked correct until runtime
  constraint: incremental strictness on a mixed JS/TS repo; must not block shipping for a monolithic rewrite
---

TypeScript does not raise its voice. It underlines in red and waits. That patience is the most underrated mentorship in modern tooling — and the first line of defense when generated code arrives fluent and wrong.

## Thesis

**Strict types are documentation that runs before merge.** Kindness to future you is refusing to ship uncertainty you could have caught at compile time.

This essay pairs with [Types Are Documentation That Runs](/p/types-are-documentation-that-runs/) — that piece is the micro argument in one breath. This one is how to adopt strictness without a rewrite fantasy.

## Context

Mixed JavaScript and TypeScript repos often keep `strict: false` as a temporary measure that becomes permanent policy. The cost shows up later: null dereferences in payment paths, props that drift between React components, API clients that accept anything because `any` was faster in March.

Adding LLM-generated scaffolds raises the stakes. Models name fields convincingly and miss discriminated unions entirely. A strict compiler is the reviewer that never tires — if you leave it enabled.

## Mechanism

**Treat the squiggle as design feedback**

The underline means "your mental model and the code disagree." Fixing it is cheaper than explaining the outage. Teams that batch-suppress errors train everyone to ignore whispers until production shouts.

**Enable strict as a bundle, then fix module by module**

`strict: true` turns on the flags that matter together: null checks, implicit any rejection, function type strictness. You do not need a big-bang rewrite — you need a bounded surface per PR with CI enforcing no new escapes.

```typescript
interface Transmission {
  signal: string;
  frequency: number;
  encrypted: boolean;
}
```

Interfaces outlive the feature that introduced them. Let the type system hold that memory.

**Replace `any` with intentional boundaries**

Prefer `unknown` and narrow at IO edges. Use generics for reusable utilities. When JavaScript interop forces an escape hatch, comment the debt and ticket the removal — silent `any` exports confusion to every importer.

**Use types as the first AI review pass**

Before human review, run `tsc`. Wrong keys, impossible states, and missing null handling become compile errors instead of demo magic. Pair strict TypeScript with tests — types prove shape; tests prove behavior.

## Tradeoffs

**Short-term velocity vs long-term calm.** Loose configs win the sprint until the first null crash in prod.

**Codegen vs hand-written types.** OpenAPI and GraphQL schemas as source of truth reduce drift; hand-maintained DTOs rot quietly.

**Gradual strictness.** `checkJs` on legacy files plus `// @ts-expect-error` with owner tags beats pretending migration finished because the folder renamed.

## Close

Deep currents move oceans without announcement. Strict types hold shape while features churn above — if you stop disabling the current.

Enable one strict flag you have been deferring. Fix one module. Ship the PR before the exception becomes culture.

— JV · Dark Heart Labs.

## References

[^1]: TypeScript handbook, *strict mode* — what each compiler flag enforces and recommended adoption order.
[^2]: Gary Bernhardt, "Boundaries" (Destroy All Software) — typing at IO boundaries vs chasing perfection in every function.
