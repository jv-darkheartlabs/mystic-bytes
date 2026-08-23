---
layout: essay
title: Semver Is a Social Contract
dek: "The numbers only work if people mean them. 0.x is an advertised shrug."
number: 005.221
sort_key: 0005.221
date: 2026-08-08
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: NeuroShell and accessibility-rails-components versioning
  issue: a minor bump broke a caller; 0.x used as permission to ghost the contract
  constraint: no legal team; follow semver.org as published policy
---

Semantic versions are not a compiler feature. They are a social contract: major for breakages, minor for compatible additions, patch for compatible fixes. The numbers work when authors and dependents share that meaning. They fail when "minor" means we felt like shipping.

I publish small libraries and I consume a forest of them. NeuroShell and accessibility-rails-components live on other people's version numbers; callers live on ours. A bump that changed behavior without a major was not a tooling error. It was a broken promise. semver.org is explicit: 0.x means the public API may change at any time, and 1.0.0 is when you admit you have users.[^1] Hiding breakages in 0.9.99 does not make them compatible. It makes the leading zero a costume.

I am not your lawyer. I pin lockfiles because trust is earned per major. If you break a public function, bump major — or stay in 0.x and say so in the README so dependents do not pretend they have a lease. Compatible means a caller who followed the documented surface still compiles and still behaves. Feeling sorry in the changelog does not restore that.

The contract is social. Honor it, or stop numbering as if you had one.

— JV · Dark Heart Labs.

[^1]: Tom Preston-Werner, Semantic Versioning 2.0.0, [semver.org](https://semver.org/).
