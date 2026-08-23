---
layout: essay
title: Regular Expressions Are a Loaded Tool
dek: "A regex is a parser you did not write — until backtracking writes it for you in exponential time."
number: 004.82
sort_key: 0004.82
date: 2026-08-07
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: mystic-bytes slug and frontmatter cleanup
  issue: nested-quantifier pattern hung on a long title; CI looked wedged
  constraint: no new parser library; fail closed or keep the pattern linear
---

Regular expressions are a loaded tool. On a bounded string with a linear pattern they are a scalpel. On HTML, nested `.*`, or untrusted input they are a footgun with a scheduler.

I use regex. I am not writing a new Thompson NFA. A slug-cleanup pattern on mystic-bytes with nested quantifiers ran fine on short titles and then sat on a long, almost-matching line until the job looked hung. That is catastrophic backtracking, not "regex is slow." The engine was trying every partition of the string. ReDoS is what happens when an attacker, or a large paste, chooses the partition.

Do not parse HTML with regex. Do not validate email with a two-hundred-character masterpiece. Prefer a real parser for nested structure, and a boring character class for slugs. If you must run a regex on input you do not control, cap length and avoid nested `(.+)+` toys.

A loaded tool is still a tool. Keep the safety on unless you can name the worst-case input and time it. When you cannot, you wanted a parser, or a split on a literal, and you reached for a compact notation because it looked like intelligence.

— JV · Dark Heart Labs.
