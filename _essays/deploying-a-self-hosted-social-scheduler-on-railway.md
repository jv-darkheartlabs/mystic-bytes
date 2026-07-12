---
layout: essay
title: Deploying a Self-Hosted Social Scheduler on Railway
dek: "Multi-service deploy on Railway — app, Postgres, Redis — with sane defaults."
number: 008.22
sort_key: 0008.22
date: 2022-08-02
cover: /assets/images/cover-code.svg
read_time: 6
tags: ['ops']
---

Self-hosted schedulers replace SaaS buffers when you want RSS-driven cross-posting under your control.

**Topology (typical):** web app + PostgreSQL + Redis on a PaaS. Pin application version explicitly — auto-upgrades break OAuth and migrations.

**Critical steps**

1. Deploy template or compose equivalent services
2. Set public URL env vars *after* networking exposes the correct port
3. Generate strong JWT secret; disable open registration after admin account exists
4. Connect OAuth per platform in provider settings — store secrets in host env, not repo

**RSS flow:** canonical blog feed → scheduler → platforms. Canonical URL always points to your site.

**Cost awareness:** hobby tier suffices for personal volume; watch database storage growth from media uploads.

— JV · Dark Heart Labs.
