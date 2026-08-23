---
layout: essay
title: What Annihilation Teaches About Uncontrolled Refactors
dek: "The shimmer rewrites everything it touches — so do migrations without tests."
number: 008.12
sort_key: 0008.12
date: 2026-05-25
cover: /assets/images/cover-craft.svg
read_time: 2
tags: ['film', 'craft']
type: micro
brief:
  system: Rails demo app behind accessibility-rails-components
  issue: one PR renamed tables, collapsed callbacks, and shipped the happy path
  constraint: old polymorphic attachments and a cron job still wrote the previous schema
---

A refactor without tests is a rewrite the running system did not agree to. The damage is not the new names. It is the lost path back.

I watched this happen on the Rails demo that fed accessibility-rails-components. One PR renamed tables, collapsed callbacks, and "simplified" the request path. Staging passed the happy path. Production still had polymorphic attachments and a cron job writing the previous schema. We spent a week reconstructing behavior from git history because nobody had pinned what "done" meant before the rewrite started. Characterization tests would have been a fence. We built a corridor instead and called it cleanup. Someone will call it bold. It is just irreversible.[^1]

Containment is a border you draw first: tests that lock current behavior, a flag that can still speak the old contract, a canary with a blast radius you can live with. Some legacy cannot be saved in place. Isolate it, replace it, and keep the old path until the new one has real traffic, not a checklist.

Do not start a rewrite you cannot stop. Draw the border before you touch the code.

— JV · Dark Heart Labs.

[^1]: Michael Feathers, *Working Effectively with Legacy Code* (Prentice Hall, 2004) — characterization tests as the fence around behavior you do not yet understand.
