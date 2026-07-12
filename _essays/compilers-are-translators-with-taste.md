---
layout: essay
title: Compilers Are Translators with Taste
dek: "Every optimization is an aesthetic preference."
number: 005.45
sort_key: 0005.45
date: 2025-06-22
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: Nightbind WASM combat sim build
  issue: release binary smaller but divergent from debug behavior on overflow path
  constraint: no new dependencies; tune flags in existing Rust toolchain only
---

A compiler is not a neutral pipeline — it is a translator with taste, and every optimization is a preference about what your program should mean.

We chased size in Nightbind's WASM combat sim and `-C opt-level=z` rewrote an overflow check the debug build still exercised. Same source, different binaries, because LLVM decided the panic path was dead under release assumptions. QA caught it only because a stress test ran against release artifacts — the kind of gap teams skip when "it works on my machine" means debug.[^1] Engineers who treat the compiler as a black box surrender decisions they never knew they were making: inlining thresholds, alias rules, undefined-behavior edges.

Read the assembly occasionally. Diff debug against release when behavior diverges. Two compilers given the same source will not produce equivalent binaries because they do not share preferences. The argument between your source and the backend is instructive.

Your compiler has opinions. Know what they are before they ship.

— JV · Dark Heart Labs.

[^1]: LLVM Project documentation on undefined behavior and optimization — the canonical reminder that compilers may assume UB cannot happen and rewrite accordingly.
