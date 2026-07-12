---
layout: essay
title: Monorepo Tradeoffs for Small Teams
dek: "Shared code is easier to find; shared build pain is easier to spread."
number: 007.93
sort_key: 000793
date: 2023-08-22
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
---
Monorepos reduce cross-repo versioning friction and enable atomic changes across services.

Costs: CI complexity, slow builds without caching, ownership blur, tool investment.

Small teams benefit when products share types and release together. Pain rises when unrelated products share one pipeline without boundaries.

Use path filters, affected-target builds, and CODEOWNERS. Split before politics exceeds tooling benefits.

Proximity forces conversation — design boundaries so forced proximity does not force coupling.


— JV · Dark Heart Labs.
