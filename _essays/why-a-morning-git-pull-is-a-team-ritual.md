---
layout: essay
title: Why a Morning Git Pull Is a Team Ritual
dek: "Sync before you speak — know the trunk before you branch."
number: 008.15
sort_key: 0008.15
date: 2026-05-29
cover: /assets/images/cover-craft.svg
type: micro
read_time: 2
tags: ['craft', 'culture']
brief:
  system: mystic-bytes shared main for essays and generated indexes
  issue: standup debates stale local trees while main already moved
  constraint: pull before speaking; no extra ceremony beyond existing standup
---

Standup is cheaper when everyone already pulled main.

A morning git pull is not superstition. It is how a team shares one trunk before they argue about what is true. Conflicts found before you branch are cheaper than conflicts found at merge, when the context that created them has already left Slack.

I started pulling mystic-bytes main before I opened the essay files for the day. Twice in one week I would have "fixed" an index that another commit had already repaired. The conversation at standup changed: we talked about the current tree, not yesterday's laptop. They treat pull-as-ritual as cargo cult. It is a five-second sync that keeps two people from debugging two different worlds.

Keep the ritual short and daily. Same window, same command, no extra meeting. If your team writes a changelog, skim it. Context beats surprise. The pull does not replace review. It just means you are speaking about the same repo, which is the cheapest form of alignment an async team gets. A stale tree makes confident people wrong in public.

Pull main before you speak. Then branch.

— JV · Dark Heart Labs.
