---
layout: essay
title: How to Navigate Dependency Risk
dek: "Your supply chain is a forest — map it before you get lost."
number: 007.98
sort_key: 000798
date: 2026-05-08
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
type: micro
brief:
  system: mystic-bytes Jekyll build — Ruby gems, Node packages, GitHub Actions
  issue: transitive CVE two layers under a markdown preprocessor, lockfile green for quarters
  constraint: no freeze; pin and triage without blocking the essay pipeline
---

Every dependency is a team you did not hire, shipping on a calendar you do not control.

I found that in a lockfile, not a keynote. mystic-bytes sat on a markdown preprocessor whose transitive graph included a CVE two layers down. Direct `Gemfile` review never saw it. The build stayed green for two quarters. A green build is not a mapped supply chain. Pins and lockfiles are the inventory. Exploitability in your actual call graph is the triage. A critical advisory on a helper you never invoke is noise. The same advisory on the path that signs deploys is an incident waiting for a scanner you have not installed yet.

They collect micro-packages because each one looks cheap at install time. The cost arrives later: unmaintained owners, surprise majors, and a bus factor of one. Before you adopt, look at release cadence, issue response, and whether you would fork if the maintainer vanished. Prefer fewer, maintained libraries. Vendor SDKs and SaaS APIs are dependencies too — they deprecate, they rate-limit, they change error shapes without opening a pull request in your repo.

Inventory direct and transitive deps. Pin in lockfiles. Scan in CI. Name an owner for upgrades. The work is lists, pins, and owners — not folklore.

— JV · Dark Heart Labs.
