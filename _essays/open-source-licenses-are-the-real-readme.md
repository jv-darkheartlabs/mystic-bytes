---
layout: essay
title: Open Source Licenses Are the Real README
dek: "MIT, GPL, and Apache are policy. The README is marketing until LICENSE speaks."
number: 340.2
sort_key: 0340.2
date: 2026-08-08
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: Dark Heart Labs public repos (NeuroShell, focus-guard, accessibility-rails-components)
  issue: README describes use; LICENSE decides who may fork, patent, and combine
  constraint: not legal advice; pick a license as published policy and keep it consistent
---

The README is how you hope people use the repo. The license is what they may do when hope is irrelevant — including the parts you will not like.

I am not a lawyer. This is not legal advice. It is operator experience: MIT is permission with a notice requirement, which is why it shows up in so many trees. GPL is copyleft: if you distribute a derivative, you often have to share source under the same terms, which is a political choice about remaining free, not a vibe. Apache 2.0 adds an express patent grant and a termination clause, which is why some companies prefer it to MIT. Those differences are policy. They decide whether a dependency is safe to combine, whether a wrapper is rude or a license problem, whether you can relicense later.

Dark Heart Labs repos need a LICENSE that matches intent, not a file copied from the last scaffold. If you cannot explain the license in one paragraph, you cannot explain the project. Put it where GitHub will index it. Do not contradict it in the README.

Read the license before the pitch. The pitch is optional. The policy is not.

— JV · Dark Heart Labs.
