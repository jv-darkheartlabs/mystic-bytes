---
layout: essay
title: Linkers Are the Compile Step You Forget
dek: "Object files are unfinished sentences. The linker decides whether they form a program."
number: 004.79
sort_key: 0004.79
date: 2026-08-05
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: Nightbind WASM native build
  issue: compile succeeded; link failed on a missing symbol from a crate feature flag
  constraint: existing Rust toolchain; no custom linker script
---

Compilers get the essays. Linkers get the shrug. After the compiler emits object files, someone still has to resolve symbols, pick sections, and decide which `main` is the real one. That someone is the linker. I do not write linkers. I consume rustc and wasm-ld until a symbol is undefined and the build log suddenly speaks a language I skipped.

Nightbind's WASM combat sim compiled clean and then failed at link because a crate feature had not pulled in the symbol the sim actually called. The compiler was happy: each crate was a coherent object. The program was not a program until the linker said the graph closed. Duplicate symbols, missing libraries, and "works on my machine" because the system linker found a dylib CI did not — these are linker problems wearing compiler costumes.

Read the link line when the compile line is green. Object files are not binaries. Symbols are the contract between translation units. If you only debug compile errors, you are debugging the chapter, not the book. The forgotten step is still a compile step. It just happens after you stopped watching.

— JV · Dark Heart Labs.
