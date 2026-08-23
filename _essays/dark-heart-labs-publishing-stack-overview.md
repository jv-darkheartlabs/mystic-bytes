---
layout: essay
title: Dark Heart Labs Publishing Stack Overview
dek: "How writing, site, media, and deploy pipelines fit together — at a high level."
number: 008.20
sort_key: 0008.20
date: 2026-06-04
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['ops']
---

Dark Heart Labs publishes from one canonical site. Everything else is a copy with a pointer back.

mystic-bytes is the source: Jekyll, markdown in git, essays and journal and wellness as collections, media embeds, GitHub-backed project pages. I do not treat a scheduler, a cross-post flag, or a social draft as the original. The original is the file in the repo and the URL it builds to. When those drift, you spend a week reconciling titles that never needed two homes.

Four layers, on purpose. Source: markdown plus a manifest that tracks what migrated from the old archive. Build: static generation, CI on push, fail the merge when frontmatter or links lie. Distribution: the site first; optional cross-posts only when the article says so, always with the canonical URL on darkheartlabs.technology. Media: playlists, podcast, gallery as separate collections, not a dumping ground inside the essay body.

Principles that survive a bad week: no credentials in git; secrets in the host dashboard; one canonical URL per article; legacy brand names gone from new copy. Pin service versions. Document rollback. Treat social schedulers as optional dependents, not the source of truth.

If it is not in the repo, it is not published. Ship the site. Then copy if you must.

— JV · Dark Heart Labs.
