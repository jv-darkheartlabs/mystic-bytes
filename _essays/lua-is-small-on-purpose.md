---
layout: essay
title: Lua Is Small on Purpose
dek: "Embed it, give it tables, leave. The smallness is the feature."
number: 005.219
sort_key: 0005.219
date: 2026-08-02
cover: /assets/images/cover-code.svg
read_time: 2
tags: [craft]
type: micro
brief:
  system: embedded Lua in games, editors, and config hosts (operator view, not a Lua product)
  issue: teams "complete" Lua until it is a second application language
  constraint: no invented game-studio job; treat tables and embedding as the design
---

Lua is small on purpose. You embed it in a host that already exists — a game, an editor, a device — and you give the script tables. Tables are the one data structure: arrays, maps, objects, all the same shape. The language stays small so the host stays in charge. I do not ship a Lua product. I meet it in other people's configs and in the way games and tools expose a programmable seam without adopting a second JVM.

They keep trying to grow it into the application. That misses the design. Roberto Ierusalimschy's bet is a tiny language with a C API, coroutines, and metatables, not a replacement for the host.[^1] You write a config that can loop. You write a boss AI that the engine ticks. You do not rebuild the engine in Lua unless you enjoy pain. Cursor will complete a framework. The point of Lua is that you can read the whole manual and still have afternoon left.

If the script needs a package graph that looks like Node, you wanted a different language. Keep Lua small. Tables, embed, leave. The host does the rest.

— JV · Dark Heart Labs.

[^1]: Roberto Ierusalimschy, *Programming in Lua*. The language designer's book: embedding, tables as the unified structure, smallness as the point.
