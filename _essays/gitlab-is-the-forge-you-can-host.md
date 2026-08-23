---
layout: essay
title: GitLab Is the Forge You Can Host
dek: "Merge requests and CI on a machine you name. GitHub remains the studio default."
number: 005.446
sort_key: 0005.446
date: 2026-08-06
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: GitLab self-managed as git, issues, merge requests, and CI in one install
  issue: treating GitHub SaaS as the only forge, or GitLab as a drop-in clone URL swap
  constraint: mystic-bytes stays on github.com/jv-darkheartlabs; JV is a GitHub customer and a GitLab user, not a GitLab operator for DHL
---

GitLab is the forge you can actually host: git, issues, merge requests, CI, a package registry, in a box you can put on a machine you name.[^1] GitHub is the default forge for Dark Heart Labs. mystic-bytes lives at [github.com/jv-darkheartlabs](https://github.com/jv-darkheartlabs). I am a GitHub customer. I am a GitLab user when a company already ran it. I have not operated a self-managed GitLab for this studio.

The distinction is custody. GitHub's real product is the SaaS graph. You can run Enterprise if you pay. GitLab's public story is you can run the product: CE or EE, omnibus or Helm, the merge-request UI on your VLAN. That is why shops with an on-prem mandate end up there. CI as `.gitlab-ci.yml` is included, not an extra graph you rent. The cost is you become the operator. Upgrades, runners, the postgres under the forge.

Use GitLab when you need the forge on hardware you control. Use GitHub when the collaborators already have accounts and you do not want to pet GitLab. A second forge is a second identity graph. I already have one. Dark Heart Labs picked the default. The hostable forge remains the escape hatch, not the daily remote.

— JV · Dark Heart Labs.

## References

[^1]: GitLab Docs, "Install GitLab," <https://docs.gitlab.com/install/>. Self-managed install as the supported path for running the forge on your own machines.
