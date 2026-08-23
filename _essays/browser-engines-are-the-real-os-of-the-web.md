---
layout: essay
title: Browser Engines Are the Real OS of the Web
dek: "Blink, WebKit, and Gecko are the kernels. HTML and CSS are what they execute."
number: 004.84
sort_key: 0004.84
date: 2026-08-12
cover: /assets/images/cover-code.svg
type: pillar
read_time: 8
tags: [craft]
brief:
  system: mystic-bytes static HTML/CSS tested in Firefox and Chromium on Fedora, Safari on a Mac
  issue: framework names treated as the platform when layout, paint, and the HTML parser live in three engines
  constraint: ship CSS the engines implement; no browser-vendor employment; cite HTML/CSS engine docs
---

## Thesis

**Browser engines are the real operating system of the web.** Blink, WebKit, and Gecko parse HTML, run the CSS cascade, layout boxes, paint pixels, and host the JavaScript VM. Your framework is a guest. If it only works in one engine, you did not ship for the web. You shipped for a kernel.

## Context

mystic-bytes is a Jekyll site: HTML, CSS, a little JS. I check pages in Firefox and a Chromium build on Fedora. I check Safari when I am on the Mac that also notarizes NeuroShell. Auckland in 2026 did not add a fourth engine. It added another laptop. I do not work at Google, Apple, or Mozilla. I live downstream of their parsers.

The industry conversation is full of framework names. The bug I actually hit is a cascade difference, a `position: sticky` quirk, a font metric, a form control that is a native widget in one engine and a CSS project in another. Those bugs do not live in React. They live in the thing that turns markup into a tree and a tree into paint.

## Mechanism

**An engine is a stack, not a window.** HTML parsing, the DOM, CSS cascade and inheritance, style computation, layout (used to be called reflow), paint, compositing: that is the kernel. JavaScript is a guest with a host API. WHATWG HTML is the living spec for how a document is fetched and how a `script` runs. CSS specifications from the CSS Working Group are the spec for how a used value becomes a box.[^1] Engines implement those books, plus a graveyard of compat hacks so old pages do not die. When I write a layout for mystic-bytes I am writing against that implementation, not against a Figma file.

**Blink is the majority kernel.** It lives in Chromium. Chrome, Edge, Opera, Brave, a long tail of Electron shells (including the VS Code workbench) all execute Blink's idea of HTML and CSS.[^2] That is convenient for "works on my machine." It is dangerous as an ABI. If I only test Chromium, I am testing one OS and calling it the web. Google can staff Blink from other revenue. Everyone else inherits the gravity. Interop is then a political project: other engines chase Chromium, or they look obsolete.

**WebKit is the kernel you cannot skip if you care about phones.** Safari ships WebKit. On iOS, every browser is WebKit underneath the chrome, because Apple's policy says so. I have shipped CSS that was clean in Firefox and Chromium and ugly in Safari because a `-webkit-` assumption or a viewport unit went sideways. That is not Safari being precious. That is a second OS. If your readers are on iPhones, you have a WebKit production dependency whether you like the badge.

**Gecko is the remaining large independent.** Firefox still parses and paints with Gecko. Servo was the parallel experiment; pieces came home. I keep Firefox in the mystic-bytes loop because it is the cheapest way to ask "is this CSS, or is this Blink." When Firefox and Chromium agree and Safari does not, I read WebKit bugs. When Firefox disagrees with both, I read the spec and then I decide whether I am relying on a Chromium accident.

**Interop is the syscall table.** WPT, Interop efforts, MDN's compat tables: this is how three kernels pretend to be one platform. They are not one platform. They converge. A feature is "the web" when two engines ship it and the third has a date, or when you accept a degradation. I write mystic-bytes CSS to be boring on purpose. Boring is the subset that already converged.

## Tradeoffs

**Chromium-only vs three kernels.** Shipping against Blink is fast and dishonest if you have Safari users. Shipping against all three is slower and is the actual job. I do not need a matrix of thirty browsers. I need one Blink, one Gecko, one WebKit.

**Polyfills vs engine politics.** A polyfill can fake an API. It cannot fake layout. If the box model disagrees, you change the CSS or you drop the readers. Do not npm-install your way out of a paint bug.

**When one engine is the right target.** An internal Electron tool can be Blink-only. A public essay site cannot. Know which one you are building. mystic-bytes is public.

## Close

Name the kernel before you name the framework. HTML and CSS are the instruction set. Blink, WebKit, and Gecko are the machines that run it. I will keep testing Firefox on Fedora and Safari when I have the Mac. If a layout only exists in one engine, it is a port, not a page.

— JV · Dark Heart Labs.

## References

[^1]: WHATWG, *HTML Living Standard* (parsing, scripting, the document lifecycle); CSS Working Group specifications (cascade, values, box model, positioning). The instruction set the engines implement.

[^2]: Chromium Blink; WebKit; Mozilla Gecko documentation. Three HTML/CSS engines, three kernels, one web if you bother to look.
