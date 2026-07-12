---
layout: essay
title: Naming Things Is Still the Hardest Problem
dek: "A name is a contract with every future reader of the code."
number: 401.9
sort_key: 0401.09
date: 2026-06-14
cover: /assets/images/cover-language.svg
type: micro
brief:
  system: mystic-bytes cover pipeline
  issue: processImage and normalizeCover both mutate paths; callers guess wrong
  constraint: preserve public URLs; rename internals without a second vision pass
---

A name is the smallest unit of design in a codebase — a contract with every future reader, including you at 2am, that this thing does what it says on the tin.

I paid for bad names in the mystic-bytes cover pipeline. `processImage` cropped and hashed. `normalizeCover` resized and wrote metadata. Both touched paths. New contributors called the wrong one, added defensive comments, then invented wrapper functions to translate a lie into intent. The bug was not logic. The bug was vocabulary that hid two different operations behind verbs that sounded interchangeable.[^1]

Good names require that you already understand the system. You can only name a concept once you see its edges. That is why early code fills with `helper`, `utils`, and `manager` — placeholders for concepts the author has not resolved yet. The fix is not a thesaurus. The fix is renaming when the concept finally sharpens, with the same respect you give an extraction or a module split.

If the name needs a comment to be safe, the name is wrong. Fix the name first.

— JV · Dark Heart Labs.

[^1]: Phil Karlton, attributed quip on cache invalidation and naming — quoted in Martin Fowler's *Refactoring* (Addison-Wesley, 1999) as the hardest problem in computer science, because names are the API your team thinks through.
