---
layout: essay
title: Security Basics Every Developer Should Default To
dek: "Most breaches are boring failures of defaults — not genius attackers."
number: 007.80
sort_key: 000780
date: 2010-01-04
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
---
Security is not a specialist-only concern. It is hygiene at boundaries.

Defaults worth enforcing: least-privilege credentials, secrets in vaults not repos, dependency scanning in CI, parameterized queries, CSRF and auth on state-changing routes, rate limits on auth endpoints, audit logs on admin actions.

Threat model the feature, not the whole company — *what happens if this input is malicious, duplicated, or replayed?*

Fix the boring items before buying exotic tools. Rotated keys, patched dependencies, and MFA stop more incidents than buzzword appliances.

A fortress is layers, not one wall.


— JV · Dark Heart Labs.
