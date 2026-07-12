---
layout: essay
title: Checklist for Multi-Service Railway Deployments
dek: "Repeatable deploy beats heroic memory — especially past three services."
number: 008.23
sort_key: 0008.23
date: 2022-10-18
cover: /assets/images/cover-code.svg
read_time: 6
tags: ['ops']
---

When a project spans app + database + cache (+ optional worker):

- [ ] Pin image/tag version in config
- [ ] Document which service owns public HTTP and which port
- [ ] Verify env var names match app docs (URL triplets confuse every team once)
- [ ] Run smoke test after first deploy before connecting OAuth
- [ ] Back up database before schema migrations
- [ ] Set registration closed after bootstrap admin exists
- [ ] Log retention and cost alerts enabled on host

**Rollback story:** previous image tag + database restore point — write it before you need it.

— JV · Dark Heart Labs.
