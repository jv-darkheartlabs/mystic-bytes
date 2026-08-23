---
layout: essay
title: How to Be a Good Custodian of Open Source Dependencies
dek: "Every install is trust in strangers' maintenance labor."
number: 007.83
sort_key: 000783
date: 2026-04-19
cover: /assets/images/cover-craft.svg
type: micro
read_time: 2
tags: ['craft']
---

Every install is trust in someone else's maintenance labor, and that trust has a protocol.

I felt this from both chairs. NeuroShell sits on other people's crates and formulas; accessibility-rails-components sits on Rails and on whoever next clones the repo at 11pm. A pinned lockfile on NeuroShell saved a morning when an upstream formula moved a flag. Open source runs on gift economics. Your `bundle install` is not free. It is an implicit promise to participate without making the maintainer's week worse. Pin versions. Report bugs that reproduce. Improve the README when you learn something painful. Fund or send a fix upstream when a library is load-bearing for you.

When you publish: a clear license, a README with setup and scope, issue templates, a security contact that is not a black hole. They inherit thousands of packages and then open issues titled "doesn't work" with no OS, no version, no log. That is not participation. That is depositing your confusion on someone who already shipped.

You inherit a chain. Be the maintainer you wish your dependencies had — even if the contribution is a one-line doc fix. Inheritance is a chain. Act like a good ancestor.

— JV · Dark Heart Labs.
