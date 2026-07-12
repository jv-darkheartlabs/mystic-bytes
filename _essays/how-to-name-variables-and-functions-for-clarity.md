---
layout: essay
title: How to Name Variables and Functions for Clarity
dek: "Naming is not ceremony — it is the map future readers use when the author is gone."
number: 006.30
sort_key: 0006.30
date: 2014-06-25
cover: /assets/images/cover-craft.svg
type: pillar
read_time: 7
tags: [design, craft]
cross_link: naming-things-is-still-the-hardest-problem
brief:
  system: TypeScript service layer with shared DTOs consumed by three client apps
  issue: ambiguous names (`data`, `status`, `handleClick`) caused duplicate logic and wrong-state bugs
  constraint: no mandated style guide yet; renames must be mechanical and reviewable in one PR
---

There are two hard problems in computer science: cache invalidation, naming things, and off-by-one errors. The middle one earns the joke because we treat it as optional polish instead of load-bearing design.

## Thesis

**Names are the cheapest documentation that never goes stale — until they lie.** Invest at the boundary where confusion compounds.

This essay pairs with [Naming Things Is Still the Hardest Problem](/p/naming-things-is-still-the-hardest-problem/) — that piece is about why naming resists automation. This one is about how to do it on purpose.

## Context

I have watched the same failure mode in every codebase that skipped naming discipline: a field called `status` in one module, `state` in another, and `phase` in the API contract — all describing overlapping concepts. New contributors grep for the wrong word, ship a fix that works in one path, and leave the bug dormant in the other. The code "worked." The vocabulary did not.

Naming is design work. It happens in the same breath as choosing data structures — not in a cleanup sprint that never ships.

## Mechanism

**Variables answer questions**

`data`, `temp`, and `result` are placeholders that expired before the commit landed. Prefer names that say *what* and often *why*: `unprocessedUserSubmissions`, `invoiceTotalCents`, `retryAfterMs`. If a comment explains the variable, rename first.

**Functions are verbs**

| Weak | Strong |
|------|--------|
| `userValidation` | `validateUser` |
| `payment` | `submitPayment` |
| `handleClick` | `openCheckoutDrawer` |

`handleClick` names the DOM event, not the business outcome. Public APIs should read like instructions someone could follow without opening the file.

**Length follows ambiguity**

Short names belong in tight scope (`i`, `id`). Exported symbols earn length proportional to the distance they travel. Keystrokes are cheap; misread diffs at midnight are not.

**Rename while the context is hot**

Modern tooling makes cross-repo renames mechanical. Do it when you understand the domain — not in a mythical "cleanup week." Renaming `fetchUser` to `loadUserProfile` everywhere is a one-commit clarity win with years of interest.

## Tradeoffs

**Domain language vs framework jargon.** Use product terms unless the framework term *is* the contract (`useEffect` is not interchangeable with `onMount` in team docs).

**Consistency vs local cleverness.** One verb per operation class: pick `fetch` or `get`, not both for the same shape of call.

**Abbreviation drift.** `config` is fine once. `cfg`, `conf`, and `configuration` across three packages is a glossary tax on every review.

## Close

Old maps named the deep places so sailors who came after would know where they were. Code is the same artifact: written once, read many times — often by you with amnesia.

Rename one misleading symbol before you extend the module. The diff is cheap; the wrong mental model is not.

— JV · Dark Heart Labs.

## References

[^1]: Robert C. Martin, *Clean Code* (Prentice Hall, 2008) — Ch. 2 on meaningful names; dated in places, still correct on intent-revealing identifiers.
[^2]: Peter Hilton, "Naming Things," presentations and essays on naming as collaborative design — useful framing for team-wide conventions.
