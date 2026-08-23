---
layout: essay
title: Deploying a Self-Hosted Social Scheduler on Railway
dek: "Multi-service deploy on Railway — app, Postgres, Redis — with sane defaults."
number: 008.22
sort_key: 0008.22
date: 2026-06-07
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['ops']
---

A self-hosted scheduler is three services that must agree on a URL before they agree on a post.

I run one on Railway so Dark Heart Labs can RSS-cross-post from mystic-bytes without handing the calendar to a SaaS buffer. Typical topology: web app, PostgreSQL, Redis. Pin the application version. Auto-upgrades break OAuth and migrations on a Tuesday you did not schedule. They want "the template just works." It works until the public hostname and the env vars describe two different sites.

Order matters. Deploy the services. Expose networking. Set public URL env vars after the port is actually reachable — not before. Generate a strong JWT secret. Create the admin account, then close open registration. Connect OAuth in the provider consoles; store client secrets in the host env, never in the repo.

The feed path is site to scheduler to platforms. Canonical URL always points at darkheartlabs.technology. If a post exists only on a network, you lost the original.

Hobby volume fits a small tier. Watch database growth from media uploads; that is the bill that surprises people. Pin the tag. Smoke-test the RSS fetch. Then connect the first provider.

— JV · Dark Heart Labs.
