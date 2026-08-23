---
layout: essay
title: Why Clean Install Docs Save Deployments
dek: "If only one laptop can deploy, you do not have a process — you have a ritual."
number: 007.97
sort_key: 000797
date: 2026-05-07
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['ops']
brief:
  system: mystic-bytes local Jekyll and Ruby toolchain
  issue: deploy and preview only reproduce on one laptop's undocumented PATH
  constraint: document empty-machine setup; quarterly clean VM before the next publish
---

A deploy that only works on one laptop is not a process.

Clean-install docs exist so the second machine can ship. Runtime versions, env vars, seed data, the smoke-test command: written from an empty disk, not from memory of a box that has accumulated PATH hacks for a year. I learned this the week a mystic-bytes preview failed on a fresh clone because Bundler, a Node version, and one undocumented image tool all lived only on my machine. The site was fine. The process was a ritual with one priest.

Run the clean install on a fresh VM or container on a schedule. Drift hides in the step nobody wrote down. Onboarding is a deploy rehearsal. If a new engineer cannot get to a green preview in week one, the install path is broken, and so is your next emergency publish from a loaner.

They treat "works on my machine" as a joke. It is an incident waiting for a hardware failure. Ceremony becomes reliability when every step is written and someone else has already run it once.

Write the empty-machine path. Then make someone else follow it without you in the room.

— JV · Dark Heart Labs.
