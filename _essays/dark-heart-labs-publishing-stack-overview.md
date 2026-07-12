---
layout: essay
title: Dark Heart Labs Publishing Stack Overview
dek: "How writing, site, media, and deploy pipelines fit together — at a high level."
number: 008.20
sort_key: 0008.20
date: 2022-03-01
cover: /assets/images/cover-code.svg
read_time: 6
tags: ['ops']
---

This is an internal-style overview without vendor secrets. Dark Heart Labs publishes from a Jekyll site (essays, journal, wellness), with media embeds and GitHub-backed projects.

**Layers**

1. **Source** — markdown in repo; manifest tracks migration from legacy blog archive
2. **Build** — static site generator, CI on push
3. **Distribution** — site first; optional cross-post platforms flagged per article
4. **Media** — playlists, podcast, gallery as separate collections

**Principles:** no credentials in git; env vars in host dashboard; one canonical URL per article; de-brand legacy properties completely.

**Ops hygiene:** pin service versions; document rollback; treat social schedulers as optional deps, not source of truth.

— JV · Dark Heart Labs.
