---
layout: essay
title: CI Is the Norm Enforcer
dek: "The pipeline is the team's collective conscience."
number: 006.42
sort_key: 0006.42
date: 2024-10-20
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: mystic-bytes Jekyll build and essay lint pipeline
  issue: micro essay word counts drift without failing the merge
  constraint: no downtime; add check to existing GitHub Actions workflow before next rewrite batch
---

Continuous integration is the team's collective conscience, made executable — and the merge button cannot negotiate with it.

We added a word-count gate to the mystic-bytes essay pipeline after three micro posts shipped at ninety words and broke the style contract silently. Code review had noticed none of them. Reviewers vary; fatigue varies; politeness varies. The pipeline does not.[^1] Whatever CI requires, the codebase eventually becomes — formatting, coverage floors, frontmatter fields, link checks. The rule nobody wanted to enforce in review becomes a check the merge button cannot ignore. A rule argued in Slack but absent from YAML is a suggestion. A rule in YAML is culture with teeth.

Invest in CI like you are designing habits, because you are. Every check you defer becomes a recurring code-review argument someone will lose on a Friday. Individual engineers vary. The pipeline is invariant.

If a rule matters at scale, make the bot enforce it.

— JV · Dark Heart Labs.

[^1]: Nicole Forsgren, Jez Humble, and Gene Kim, *Accelerate* (IT Revolution, 2018) — on continuous integration as a predictor of delivery performance, not merely a build tool.
