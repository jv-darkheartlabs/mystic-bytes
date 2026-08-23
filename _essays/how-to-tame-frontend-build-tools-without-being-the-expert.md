---
layout: essay
title: How to Tame Frontend Build Tools Without Being the Expert
dek: "You do not need to master webpack — you need a config that builds and an owner when it breaks."
number: 007.89
sort_key: 000789
date: 2026-04-27
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
type: micro
brief:
  system: dark-heart-themes frontend bundler
  issue: toolchain and framework upgraded in one PR; week lost to an un-bisectable break
  constraint: pin versions; one documented config; one owner; never two axes at once
---

You do not need to master the bundler. You need a config that builds, a pin that holds, and a named owner when it breaks.

I am not a webpack expert. I am someone who watched a frontend pipeline eat a week because two upgrades landed in the same pull request — toolchain and framework — and nobody could bisect which axis died. dark-heart-themes survived by treating the bundler as infrastructure: pinned versions, one documented config that works, comments on why each plugin exists, and a person who owns upgrades. Copy a proven config from a similar project. Adapt it incrementally. Change one axis, verify, then proceed. Expertise is optional. Reproducibility is not. The next person should be able to restore a green build from the comment, the pin, and the owner — not from a hallway conversation.

When build times triple, treat it as an incident. Profile. Bisect plugin changes. Restore the baseline before you invent a new architecture. Teams romanticize the toolchain because it feels like craft. Most of the time it is a snowball of defaults nobody re-read after the last major.

Respect the build. Do not worship it. Pin it, document it, and give it an owner.

— JV · Dark Heart Labs.
