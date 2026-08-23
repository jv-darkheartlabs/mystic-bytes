---
layout: essay
title: Monorepo Tradeoffs for Small Teams
dek: "Shared code is easier to find; shared build pain is easier to spread."
number: 007.93
sort_key: 000793
date: 2026-05-02
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
type: micro
brief:
  system: small-team repo sharing site packages and a theme toolchain
  issue: a docs typo blocked a production hotfix in the same pipeline
  constraint: path filters and CODEOWNERS before politics exceeds tooling; split if products do not release together
---

A monorepo does not make a small team larger. It makes shared code cheaper to find and shared pain cheaper to spread.

I have wanted one repo for types, CI, and atomic changes across a site and a theme toolchain. The benefit is real when products release together and share a type boundary: one pull request can move a type and both callers. The cost arrives as CI complexity, slow builds without caching, and ownership blur — everyone can touch everything, so nobody owns the pipeline. Small teams feel this first because they cannot staff a dedicated developer-platform group to hide the pain. Shared search is a gift. Shared wait time is a tax.

They survive with path filters, affected-target builds, and CODEOWNERS. Split before politics exceeds the tooling benefit. Unrelated products sharing one pipeline without boundaries is how a docs typo blocks a production hotfix. Forced proximity is useful conversation. It is not an excuse for a junk drawer with a better search.

If you cannot name an owner per package, you do not have a monorepo. You have a magnet for other people's wait time. Draw the boundaries on purpose.

— JV · Dark Heart Labs.
