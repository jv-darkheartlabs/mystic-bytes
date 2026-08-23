---
layout: essay
title: Ruby Still Optimizes for the Reader
dek: "Blocks and honest nil still assume a person will read the next line."
number: 005.211
sort_key: 0005.211
date: 2026-08-06
cover: /assets/images/cover-code.svg
read_time: 6
tags: [craft]
type: pillar
brief:
  system: accessibility-rails-components ViewComponent and Stimulus helpers
  issue: clever metaprogramming hid nil and block intent from the next reader
  constraint: WCAG behavior stays in Ruby the reader can follow; no DSL for its own sake
---

Ruby is still the language I reach for when the next person who has to change the code is a person. Blocks make control flow look like English if you let them. `nil` is honest if you do not paper over it with method_missing theater. I maintain that stance in [accessibility-rails-components](https://github.com/jv-darkheartlabs/accessibility-rails-components) because a focus trap that only the author understands is not a default. It is a private dialect.

## Thesis

**Ruby still bets that the next reader is a human scanning a block, not a compiler eating a macro.** Matz's design goal was programmer happiness. Happiness here is not emoji in the README. It is being able to see what a helper does when you open it at 11pm after cloning the repo.

## Context

accessibility-rails-components exists because I kept finding the same Rails failures in audits: modals that steal keyboard context, labels that look like labels and are not, contrast that passes a designer monitor and fails a bus. The library is ViewComponents and Stimulus, wired so the accessible path is the default path. The Ruby in those components has to be readable or the default will get "simplified" into a trap.

I inherited a helper that used `class_eval` to generate aria wiring from a hash. It was short. It was also a wall. A contributor could not see where `nil` for an optional labelled-by would skip the attribute versus emit `aria-labelledby=""`. Empty string and missing are different to a screen reader. The block form of the component made that branch visible: if the id is present, yield the attribute; if not, skip. Honest `nil` is a branch you can read. Clever generation is a branch you have to simulate.

Cursor will happily write the clever version. Rails culture has a long romance with DSLs. The constraint I keep on this repo is: WCAG behavior stays in Ruby a tired reader can follow. No DSL whose only user is the person who wrote it.

## Mechanism

Yukihiro Matsumoto has said for decades that Ruby is designed to make programmers happy. That is a reader-first claim. Syntax that looks like the sentence you would say in stand-up is not decoration. `each`, `map`, `open` with a block that closes the file, `def` at the same indentation you would use in a paragraph — the language keeps choosing the human scanning the file.[^1]

The Pickaxe (*Programming Ruby*) taught a generation that blocks are the unit of reuse, not only methods. A block is a deferred chunk of code with the current binding nearby. You pass it to `each` or to a component that wraps a focus trap. The reader sees the wrap and the interior in one screen. That is why I keep the modal component's yield in the template instead of hiding the yield behind a generated method. If you cannot point at the block and say "keyboard users live here," the component is not done.[^2]

Honest `nil` is the other half. Ruby will not shout when you call a method on `nil` until runtime. That is the famous footgun. The reader-first move is not to pretend `nil` cannot happen. It is to make absence a named branch: `presence`, explicit `if id`, `&.` only when the chain is still obvious. `method_missing` that invents aria attributes from typos is the opposite. It optimizes for the writer who likes magic and against the reader who has to debug VoiceOver.

They treat Ruby as Rails. Rails sits on this reader bet and sometimes spends it on metaprogramming. You can write unreadable Ruby in a ViewComponent as easily as in a Java class. The language gives you `yield`, `nil`, and a culture that still quotes Matz. Spend that culture on the accessibility path, not on a DSL that needs a wiki.

On this library I keep helpers small enough that a grep for `aria-` hits the actual branch. If the grep hits a generated string, the reader has already lost. A clone at 11pm is still a person.

## Tradeoffs

**Magic vs grep.** Rails helpers and `class_eval` save lines. They cost the next audit. I allow a thin DSL when every call site would otherwise repeat the same three lines, not one that hides `nil`.

**Honesty vs noise.** Explicit `if object.nil?` is searchable. `&.` is fine when the chain is one screen. Nested safe navigation is how `nil` becomes a rumor.

**Cursor vs the block.** Generated Ruby loves one-liners. Prefer the block when the interior is policy (focus, labels, names).

**When another language is kinder.** If the team does not read Ruby, the reader-first bet is wasted. Ship the component in the language they will actually open.

## Close

Ruby still optimizes for the reader when you let blocks show the wrap and `nil` show the absence. Matz's bet only pays if you refuse the private dialect. If a contributor cannot see the keyboard path in the component, I wrote it for myself.

Open the modal component. If you cannot find the focus trap without running the app, the reader lost.

— JV · Dark Heart Labs.

## References

[^1]: Yukihiro Matsumoto, public remarks on Ruby's design goal of programmer happiness (see also ruby-lang.org). Reader-first as a language goal, not a slogan.

[^2]: Dave Thomas, with Chad Fowler and Andy Hunt, *Programming Ruby* (the Pickaxe). Blocks, objects, and `nil` as everyday Ruby — the reader baseline this essay applies to ViewComponents.
