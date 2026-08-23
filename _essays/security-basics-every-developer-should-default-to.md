---
layout: essay
title: Security Basics Every Developer Should Default To
dek: "Most breaches are boring failures of defaults — not genius attackers."
number: 007.80
sort_key: 000780
date: 2026-04-15
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
type: micro
brief:
  system: mystic-bytes GitHub Actions and Jekyll deploy credentials
  issue: hygiene at repo and route boundaries skipped because "we are a small site"
  constraint: vault secrets, CI scanning, least privilege — no new appliance until defaults hold
---

Most breaches are skipped defaults, not genius attackers.

I default to hygiene at boundaries because that is where the boring failures live: a secret that should have been in a vault, a query concatenated instead of parameterized, an admin route without an audit log, an auth endpoint without a rate limit. mystic-bytes is a small site. Small is not a threat model. Threat-model the feature in front of you — what happens if this input is malicious, duplicated, or replayed — not the entire company. Least-privilege credentials, secrets out of the repo, dependency scanning in CI, CSRF and auth on state-changing routes. Rotated keys, patched dependencies, and MFA stop more incidents than a new appliance with a better logo. The specialist work starts after the floor exists. Without the floor, the specialist is decorating a hole.

They buy tools to feel finished. Tools do not replace defaults. Fix the boring items first. A specialist can still raise the ceiling. They cannot save a floor you refused to pour.

Make the safe path the default path. Then you can argue about the exotic layer.

— JV · Dark Heart Labs.
