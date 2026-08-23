---
layout: essay
title: TypeScript as a Contract Language
dek: "Types are promises the compiler enforces — write them for readers too."
number: 008.18
sort_key: 0008.18
date: 2026-06-02
cover: /assets/images/cover-craft.svg
read_time: 6
tags: ['craft', 'ai']
type: micro
brief:
  system: Dark Heart Labs site toolchain TypeScript surfaces
  issue: public functions without return types; state as a pile of optionals; `any` hiding from CI
  constraint: strict mode; explicit public returns; discriminated unions; no `any` on merge
---

TypeScript is a contract language. The compiler is the notary.

I use it that way on the site toolchain and on anything with a public function. Strict mode is not pedantry. It is kindness to the next person who has to change a state machine under pressure — including you, including the model that will complete the next edit. Explicit return types on public APIs. Discriminated unions for states that used to be a pile of optional fields. `any` is debt you hide from CI. Types do not replace design. They document intent so the design cannot drift in silence when a field grows a third meaning. A contract that the compiler will not enforce is a comment with better fonts.

They treat types as a compile tax. The tax is cheaper than the runtime surprise, and cheaper than a comment that lies after the third refactor. Write types for readers, not only for the compiler. If a union needs a paragraph to be safe, the union is the wrong shape.

If the type needs a comment to be safe, tighten the type. Then delete the comment.

— JV · Dark Heart Labs.
