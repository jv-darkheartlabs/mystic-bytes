---
layout: essay
title: How to Tame Frontend Build Tools Without Being the Expert
dek: "You do not need to master webpack — you need a config that builds and an owner when it breaks."
number: 007.89
sort_key: 000789
date: 2015-08-25
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
---
Frontend bundlers are powerful and opaque. Teams survive by: pinning versions, documenting the one config that works, and assigning an owner for upgrades.

Do not upgrade toolchain and framework simultaneously. Change one axis, verify, proceed.

Copy proven configs from similar projects; adapt incrementally. Comment why each plugin exists.

When build times triple, treat it as incident — profile, bisect plugin changes, restore baseline.

Build tooling is infrastructure. Respect it without romanticizing it.


— JV · Dark Heart Labs.
