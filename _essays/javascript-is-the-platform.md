---
layout: essay
title: JavaScript Is the Platform
dek: "TypeScript is the contract; JS is still what the browser runs."
number: 005.212
sort_key: 0005.212
date: 2026-08-07
cover: /assets/images/cover-code.svg
read_time: 6
tags: [craft]
type: pillar
brief:
  system: mystic-bytes vision pipeline .mjs operators and dark-heart-themes browser JS
  issue: teams treat TypeScript as the runtime and forget ECMAScript plus HTML host behavior
  constraint: ship what the browser and Node actually execute; types may erase, the platform does not
---

TypeScript is how I write contracts in the editor. JavaScript is what the page still runs. I keep mixing those up when Cursor paints types in the gutter and the file on disk is already `.mjs`. The mystic-bytes vision pipeline calls Node. dark-heart-themes still has to speak the browser. Neither host compiles your feelings. Both host ECMAScript as specified, inside HTML's idea of a script.

## Thesis

**JavaScript is the platform language of the web because the browser's job is to run ECMAScript in an HTML document, not to honor your typechecker.** TypeScript is a contract that erases. The platform is `script`, the event loop, modules, and whatever the living standard says happens when the parser hits your tag.

## Context

I already wrote about types as contracts and about strict TypeScript as kindness. This is the other half. The vision rename and reconcile operators in mystic-bytes are `.mjs` files driven from bash. They are JavaScript. Node runs them. There is no `tsc` in that path unless I add one. dark-heart-themes still ships CSS and JS the browser will parse as classic or module scripts. If I pretend the platform is TypeScript, I debug the wrong layer: I stare at a `.d.ts` while the bug is `type="module"` versus a classic script, or a `defer` I never set.

Last winter I chased a cover-sync failure that only happened in CI. Locally I ran the `.mjs` with a Node that matched my Fedora laptop. CI had a different major. Optional chaining and a newer `fetch` behavior were not the issue. ESM resolution was. The file was JavaScript. The platform was Node's module loader, which is an implementation of ECMAScript modules plus Node's own rules. Types would not have saved me. Reading what the host does with a module specifier would have.

They treat "we use TypeScript" as a runtime claim. It is a compile-time claim. The Auckland 2026 relocate does not change what Chrome executes on a reader's phone.

## Mechanism

ECMA-262 is the language. It defines values, syntax, `Promise`, modules, the job of `await`, what `this` does in a function that is not a method. It does not define `document`, `window`, or when a script runs relative to parsing. That is the host. On the web, the host is HTML.[^1]

The HTML living standard is the other book. It says how `script` is fetched, whether it blocks, how classic scripts and module scripts differ, how the event loop tasks and microtasks queue, how `DOMContentLoaded` relates to deferred scripts. If you only read TypeScript handbooks, you miss the platform: a module script is deferred by default; a classic `script` in the middle of `body` is not; `type="module"` changes error handling and scope. I have shipped a theme toggle that "worked" in a bundled preview and failed as a classic script because I leaned on implicit strict mode I only had in modules.[^2]

JavaScript-the-platform also means the language you cannot opt out of on the public web. WASM can compute. CSS can draw. The glue, the event handlers, the progressive enhancement, the import map, the worker that still talks `postMessage` in JS values — that is still JavaScript. TypeScript is a dialect that compiles to this. If the emit is wrong, the platform does not care that the `.ts` looked clean.

Cursor makes this worse in a specific way. It completes types and imports as if the editor were the host. I have to ask: what file does Jekyll or the theme actually emit? What does Node execute in `run-vision-rename.sh`? The answer is JavaScript. Write the contract in TypeScript where you have a checker. Test the platform in the file the browser or Node will load.

Event-loop bugs are platform bugs. A `fetch` that races `DOMContentLoaded` is not a type error. A double `addEventListener` because a classic script ran twice is not a generic. You fix those by reading HTML's script processing, not by tightening an interface.

## Tradeoffs

**Contract vs emit.** Strict TypeScript is still worth it on app code. It does not replace knowing whether you ship modules or classic scripts. If the emit target and the `<script>` tag disagree, the contract was theater.

**Node vs browser.** Both run JavaScript. They are not the same host. mystic-bytes `.mjs` operators can use Node builtins. dark-heart-themes cannot. Sharing a file across both without a boundary is how `fs` shows up in a bundle.

**Bundler vs native modules.** Bundlers hide the platform until import maps and HTTP caching matter. Pick one per surface and write it down.

**When types are the right obsession.** Public APIs, state machines, anything you will refactor under Cursor. When the bug is "when does this run," open HTML.

## Close

TypeScript is the contract I want in the editor. JavaScript is still what the browser runs, and what Node runs when the shebang path says so. ECMA-262 plus HTML is the platform. Everything else is a compile step or a host extension.

Look at the actual file on the wire. If you cannot name whether it is a module script, you are debugging types for a host bug.

— JV · Dark Heart Labs.

## References

[^1]: Ecma International, *ECMA-262: ECMAScript Language Specification*. The language the hosts run, independent of TypeScript's type grammar.

[^2]: WHATWG, *HTML Living Standard*, scripting and event loop. Host rules for `script`, module versus classic processing, and task queuing.
