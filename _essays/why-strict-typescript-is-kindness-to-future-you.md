---
layout: essay
title: Why Strict TypeScript Is Kindness to Future You
dek: "The type checker whispers before production shouts. `strict: true` is the friend who catches the unproofread send."
number: 006.33
sort_key: 0006.33
date: 2026-03-27
cover: /assets/images/cover-code.svg
type: pillar
read_time: 7
tags: [ai, craft]
cross_link: types-are-documentation-that-runs
brief:
  system: TypeScript helpers around mystic-bytes pipelines and LLM-generated scaffolds
  issue: loose configs let any and null slips through; generated code looked correct until runtime
  constraint: incremental strictness; no rewrite fantasy; paired micro is types-as-docs
---

TypeScript does not raise its voice. It underlines in red and waits. That patience is mentorship, and it is the first review pass when generated code arrives fluent and wrong. [Types Are Documentation That Runs](/p/types-are-documentation-that-runs/) is the micro argument: comments rot, the compiler does not. This is how I adopt strictness without a fantasy rewrite, especially when Cursor is eager to paste `any`.

## Thesis

**Strict types are documentation that runs before merge.** Kindness to future you is refusing to ship uncertainty you could have caught at compile time. `strict: true` is a bundle of those refusals.

## Context

Mixed JavaScript and TypeScript repos often keep `strict: false` as a temporary measure. Temporary becomes policy. The cost shows up later: null dereferences, props that drift between components, clients that accept anything because `any` was faster in March.

LLM-generated scaffolds raise the stakes. Models name fields convincingly and miss discriminated unions. A strict compiler is the reviewer that never tires, if you leave it on.

mystic-bytes is mostly Markdown and Ruby. The TypeScript that exists around merge helpers and small tools still taught me the lesson. A slug that was "required" in a comment and `string | undefined` in practice leaked into cover association. Tests mocked the happy path. `strictNullChecks` would have made the leak a build failure. Auckland 2026, writing on Fedora in Cursor: I am future-me often enough that I do not need a poetic justification. I need CI to refuse the hole before I fly.

Gary Bernhardt's "Boundaries" talk is the migration picture I actually use: type the edges where lies enter, do not pretend every interior function needs a masterpiece.[^2]

## Mechanism

Treat the squiggle as design feedback. The underline means your mental model and the code disagree. Fixing it is cheaper than explaining the outage. Teams that batch-suppress errors train everyone to ignore whispers until production shouts. I have used `@ts-ignore` to make a demo green. I regretted it the next time I touched the file in a different timezone.

Enable `strict` as a bundle, then fix module by module. The handbook's strict mode is not one flag. It is null checks, implicit any rejection, function types, and friends, meant to work together.[^1] You do not need a big-bang rewrite. You need a bounded surface per PR and CI that refuses new escapes. `// @ts-expect-error` with a reason is honest debt. Silent `any` on an export is a gift to every importer.

Replace `any` with intentional boundaries. Prefer `unknown` and narrow at IO. Use generics where a utility is truly reused. When JavaScript interop forces an escape, comment why and ticket the removal. Cursor will offer `any` because it compiles. That is not the same as it being true.

Use types as the first AI review pass. Before a human reads the diff, run `tsc`. Wrong keys, impossible states, and missing null handling become compile errors instead of demo magic. Types prove shape. Tests prove behavior. Generated code fails both in different places. I have merged a helper that type-checked and still did the wrong I/O because I skipped the test the model also skipped.

Discriminated unions beat optional fields that mean "sometimes this is a different species." `ValidatedEntry | RejectedEntry` is a state machine you can exhaust. `status?: string` is a shrug. Application code should be boring structs. Save clever type-level programming for the one library function that earns it.

Interfaces outlive the feature that introduced them. Name them after the domain, not after the ticket. I will not paste a `Transmission` metaphor into a merge pipeline. `CoverManifest` is enough.

## Tradeoffs

Loose configs win the sprint until the first null crash. Strictness costs hours in a brownfield folder and saves days in incident review. I ratchet. I do not wait for a quarter called "quality."

Codegen from OpenAPI or a JSON schema reduces drift if the schema is the source of truth. Hand-maintained DTOs that duplicate the wire rot. Duplicate at the boundary (Zod parse, then typed interior) and stop duplicating inside.

Gradual strictness with `checkJs` and expected errors beats a folder rename that pretends migration finished. Pride is not a compiler flag.

Assertions and casts bypass the checker. Overuse them and types become theatre. If I cast, I comment the invariant. I have reintroduced comment-based trust at a hot spot, on purpose, in a small box.

## Close

Strict types hold shape while features churn. Disable them and you are asking production to mentor you instead.

Enable one strict flag you have been deferring. Fix one module. Ship the PR before the exception becomes culture. Future-you, unpacking a machine in Auckland or grepping a slug bug at a wrong hour, will not thank you for the `any`. They will thank you for the red underline you did not skip.

— JV · Dark Heart Labs.

## References

[^1]: TypeScript Handbook, [strict mode / compiler options](https://www.typescriptlang.org/tsconfig/#strict). What the bundled flags enforce and why they are adopted together.

[^2]: Gary Bernhardt, "Boundaries," Destroy All Software (2012). Typing IO and domain boundaries rather than chasing perfection in every function; the practical adoption path for mixed repos.
