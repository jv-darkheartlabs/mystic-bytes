---
layout: essay
title: Figma Is a File Format That Ate Design
dek: "Multiplayer won. The local file did not disappear. It just stopped being the default."
number: 005.442
sort_key: 0005.442
date: 2026-07-30
cover: /assets/images/cover-craft.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: design collaboration for UI that later lands in NeuroShell and Rails components
  issue: treating the Figma file as the only source of truth while git holds the pixels that ship
  constraint: collaboration in the cloud vs exportable local artifacts; no invented Figma employment
---

Figma won by making the file a room. More than one cursor, a browser, a URL you can paste into Slack. The old fight was `.psd` on a USB stick. The new fight is whether the cloud document is the design or only the conversation about the design.[^1]

I do not work at Figma. I use the format the way everyone else does: inspect a frame, argue in comments, export the bits that NeuroShell or accessibility-rails-components will actually ship. mystic-bytes still lives in git. A Figma link is a view. If the contrast ratio only exists in the file, it does not exist.

Collaboration is the feature. Local files are the backup and the handoff. When the vendor's auth blinks, a `.fig` export or a PNG in the repo is the difference between blocked and merely annoyed. Treat Figma as the multiplayer format of record for exploration. Treat git as the format of record for what users get.

If you cannot export it, you do not own it. The room is still rented.

— JV · Dark Heart Labs.

## References

[^1]: Figma Help, "Explore design files," <https://help.figma.com/hc/en-us/articles/15297425105303-Explore-design-files>. Live cloud documents as the shared object; see also "Save a local copy of files" for `.fig` export.
