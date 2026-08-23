---
layout: essay
title: How to Name Variables and Functions for Clarity
dek: "Naming is the map future readers use when the author is gone."
number: 006.30
sort_key: 0006.30
date: 2026-03-20
cover: /assets/images/cover-craft.svg
type: pillar
read_time: 7
tags: [design, craft]
cross_link: naming-things-is-still-the-hardest-problem
brief:
  system: mystic-bytes cover pipeline and TypeScript merge helpers
  issue: verbs that sounded interchangeable hid different operations; callers guessed wrong
  constraint: renames mechanical and reviewable; philosophy lives in the paired essay
---

There are two hard problems in computer science: cache invalidation, naming things, and off-by-one errors. The middle one earns the joke because we treat it as optional polish. It is load-bearing. [Naming Things Is Still the Hardest Problem](/p/naming-things-is-still-the-hardest-problem/) is the why: a name is a contract, and you cannot name a concept until you can see its edges. This is the how-to I run in the file in front of me.

## Thesis

**Names are the cheapest documentation that never goes stale, until they lie.** Invest at the boundary where confusion compounds: exports, types that cross packages, functions other people will call without opening the body.

## Context

I paid for bad names in the mystic-bytes cover pipeline. `processImage` cropped and hashed. `normalizeCover` resized and wrote metadata. Both touched paths. New contributors, including me after a week away, called the wrong one, added defensive comments, then invented wrappers to translate a lie into intent. The bug was not the image math. The bug was two operations hiding behind verbs that sounded interchangeable.

Auckland 2026 made the "future reader" less hypothetical. Relocating, changing machines, writing on Fedora in Cursor at hours when I should be asleep: I am the stranger. The name has to work when the Slack thread is gone. TypeScript helpers in the merge pipeline had the same disease in miniature: `data`, `status`, `handle` as if those were domain terms.

Naming happens in the same breath as choosing the data structure. A cleanup sprint that never ships is not a naming strategy. It is a wish.

## Mechanism

Variables should answer a question. `data`, `temp`, and `result` are placeholders that expired before the commit landed. Prefer names that say what, and often in which unit: `unprocessedUserSubmissions`, `invoiceTotalCents`, `retryAfterMs`. If a comment is required to make the variable safe, rename first. Clean Code is dated in places and still correct on intent-revealing identifiers.[^1]

Functions are verbs with outcomes. `userValidation` is a pile of noun. `validateUser` is an instruction. `payment` is a folder. `submitPayment` is a thing you can grep after an incident. `handleClick` names the DOM event. `openCheckoutDrawer` names the business outcome. Public APIs should read like instructions someone could follow without opening the file.

Length follows ambiguity. Short names belong in tight scope: `i` in a loop, `id` next to a `User`. Exported symbols earn length proportional to the distance they travel. Keystrokes are cheap. A misread diff at midnight in Auckland is not. I would rather type `loadCoverManifest` than debug why `load` fetched a path I already had.

Rename while the context is hot. Language servers make cross-file renames mechanical. Do it when you understand the domain, not in a mythical cleanup week. Renaming `fetchUser` to `loadUserProfile` everywhere is a one-commit clarity win. Waiting until "we have time" is how `processImage` lives another year.

Pick one verb per operation class and keep it. `fetch` versus `get` versus `load` for the same shape of call is a glossary tax. mystic-bytes now treats `load` as "read from disk or HTTP into memory" and `write` as "persist." Boring on purpose. Peter Hilton's naming talks are useful here: conventions are collaborative design, not taste.[^2]

If two functions need a translator comment (`// actually this one also writes metadata`), you have not named the difference. Split or rename until the comment dies.

Domain words beat framework slang at the edges you own. Use product terms unless the framework term *is* the contract. Do not rename `useEffect` in team docs. Do rename `status` when one module means HTTP and another means cover pipeline phase.

## Tradeoffs

Consistency costs local cleverness. A witty name that only you find funny is a private joke in a public API. I have deleted those jokes on my own PRs after a week.

Abbreviation drift is a tax. `config` is fine once. `cfg`, `conf`, and `configuration` across three packages is a scavenger hunt. Pick one. Put it in the PR template if you have to.

Mechanical rename versus behavior change: do not mix them. A rename PR that also "fixes" a path is how reviewers miss the fix. I split those commits. Cursor is happy to mix them. I am not.

When a bad name is load-bearing in a public URL or a stored column, keep the wire name and introduce a honest internal name. mystic-bytes public cover paths are a contract with the web. Internals can tell the truth without a 301.

## Close

Old maps named the deep places so sailors who came after would know where they were. Code is the same artifact: written once, read many times, often by you with amnesia.

Rename one misleading symbol before you extend the module. The diff is cheap. The wrong mental model is how you ship a second wrapper. I still grep for `process` when I am tired. When the name is honest, the grep is the whole investigation.

— JV · Dark Heart Labs.

## References

[^1]: Robert C. Martin, *Clean Code* (Prentice Hall, 2008), chapter 2. Intent-revealing names; still the common reference even where the rest of the book has aged.

[^2]: Peter Hilton, talks and essays on naming as collaborative design. Team-wide conventions as a designed vocabulary, not as individual style.
