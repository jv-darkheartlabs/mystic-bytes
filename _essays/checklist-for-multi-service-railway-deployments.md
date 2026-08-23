---
layout: essay
title: Checklist for Multi-Service Railway Deployments
dek: "Repeatable deploy beats heroic memory — especially past three services."
number: 008.23
sort_key: 0008.23
date: 2026-06-08
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['ops']
---

Past three services, a deploy you cannot repeat from a list is a deploy you will invent under pressure.

I keep a Railway checklist for the self-hosted scheduler Dark Heart Labs runs — web app, Postgres, Redis, optional worker — because the first time I connected OAuth before a smoke test, I spent an evening chasing a redirect that was still bound to the wrong public URL. Heroic memory does not scale past "which process owns HTTP." They remember the happy path. The list remembers the port, the env names, and the backup you skip when you are tired.

Before a change lands:

- Pin the image or tag in config. Auto-latest is not a version.
- Write down which service owns public HTTP and which port it binds.
- Check env var names against the app docs. URL triplets confuse every team once.
- Smoke-test after first deploy, before OAuth.
- Back up the database before a schema migration.
- Close registration after the bootstrap admin exists.
- Turn on log retention and cost alerts on the host.

Rollback is previous tag plus a restore point. Write that story before you need it. A checklist is not bureaucracy. It is the deploy you can still perform at 11pm.

— JV · Dark Heart Labs.
