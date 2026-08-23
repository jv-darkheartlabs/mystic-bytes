---
layout: essay
title: WebAssembly Is a Compile Target, Not a Rewrite
dek: "WASM is an ISA for the web. It does not replace the language the page already speaks."
number: 005.218
sort_key: 0005.218
date: 2026-08-02
cover: /assets/images/cover-code.svg
read_time: 2
tags: [craft]
type: micro
brief:
  system: Nightbind WASM combat sim
  issue: treating WASM as a JavaScript replacement instead of a compile target with JS glue
  constraint: keep JS as the page language; WASM for the hot, defined kernel
---

WebAssembly is an instruction set the browser can run. It is not a rewrite of the web. You compile to it. JavaScript still loads the module, still talks to the DOM, still owns the page. I learned that on Nightbind's WASM combat sim: the kernel could be Rust compiled to `wasm32`, and the page still needed JS to fetch, instantiate, and wire input. Dropping JS was never on the table. The ISA does not know what a button is.

They pitch WASM as the thing that finally replaces JavaScript. The spec is a virtual ISA with linear memory, defined traps, and a validation step before execute.[^1] That is a compile target. It is a good one when you want Nightbind's combat math to be small and less undefined than a C++ adventure. It is a bad one when you wanted to delete the glue. I still debug the JS host when the module fails to instantiate. Cursor will offer a "rewrite the frontend in WASM" fantasy. The living page does not agree.

Use WASM for the hot kernel you can compile. Keep JavaScript as the platform that hosts it. A compile target is not a new web.

— JV · Dark Heart Labs.

[^1]: W3C, *WebAssembly Core Specification*. WASM as a virtual ISA — validation, linear memory, traps — the compile-target definition this note uses against rewrite folklore.
