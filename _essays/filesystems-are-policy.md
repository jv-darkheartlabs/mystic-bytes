---
layout: essay
title: Filesystems Are Policy
dek: "POSIX is a dialect. Case is a political choice that will break your deploy."
number: 004.81
sort_key: 0004.81
date: 2026-08-06
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: mystic-bytes repo on Fedora vs NeuroShell work on macOS
  issue: Cover.png vs cover.png; present on Mac, missing in Linux CI
  constraint: no filesystem rewrite; enforce naming in git and CI
---

A filesystem is not a neutral bag of files. It is policy: who may write, whether names are case-sensitive, whether you may have a colon in a path, whether timestamps are something you should trust. POSIX is a family resemblance, not a single law.

I develop mystic-bytes on Fedora, where `Cover.png` and `cover.png` are two files. NeuroShell work happens on macOS, where they are often the same file wearing different capitalization. I have shipped a path that existed on the laptop and vanished in Linux CI. That is not a Git bug. That is two policies pretending to be one tree. I do not write filesystems. I live in their disagreements.

Assume the strictest common subset: case-sensitive names, no relying on default NFD versus NFC, no treating `stat` times as causal truth. Git on a case-insensitive volume will not save you; `core.ignorecase` hides collisions until CI. If the artifact must exist on production Linux, test on Linux. macOS APFS defaults are a courtesy to the person at the keyboard, not a contract with the server.

Pick a naming policy. Enforce it in CI. The disk will not reconcile culture for you.

— JV · Dark Heart Labs.
