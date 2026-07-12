---
layout: essay
title: How to Review AI-Generated Code Without Outsourcing Judgment
dek: "Your assistant can type faster than you can read. That asymmetry is a trust problem, not a velocity win."
number: 006.4
sort_key: 0006.04
date: 2002-01-15
cover: /assets/images/cover-code.svg
type: pillar
read_time: 9
tags: [ai, craft]
hashnode: true
related_projects: [NeuroShell]
brief:
  system: macOS terminal with plain-English command layer and AI-assisted workflows
  issue: contributors accept model output without reading; subtle context bugs ship as "AI velocity"
  constraint: product promises human-centered AI; review discipline must match the marketing
---

Your AI coding assistant can generate faster than you can read. That is either a productivity gain or a trust exercise — depending on whether review keeps pace with generation.

## Thesis

**AI pair programming works when judgment stays local.** The model proposes; you own merge.

## Context

[NeuroShell](https://github.com/jv-darkheartlabs/NeuroShell) treats AI as augmentation for loud minds — plain-English input, session recovery, focus tooling — not replacement for the developer's responsibility to the user. The same boundary applies in the editor: if you would not sign a contract unread, do not merge a diff unread because the font changed color.

The failure pattern is uniform across teams: accept suggestion, run tests, ship. Tests pass because they cover the happy path the model also guessed. The 3-second payment timeout that lives only in a senior engineer's memory does not appear in the training set.

## Mechanism

**What models do well**

- Boilerplate that matches established patterns in the repo.
- Test scaffolding for interfaces already documented.
- Refactors that surface repetition humans stopped seeing.
- First drafts of docs that capture intent — not final copy.

**What models do not do**

- Know undocumented business constraints.
- Feel accountability to users at 2 AM.
- Refuse a plausible wrong answer because the stakes are high.

**Review protocol that scales**

1. Read the diff line by line — not the summary panel.
2. Ask one adversarial question: *what breaks if the input is empty, stale, or malicious?*
3. Run tests you distrust, then add one test for the constraint the model could not know.
4. Reject velocity metrics that count lines accepted without lines understood.

**Partnership, not delegation**

The useful mental model is a fast, literal colleague who never tires and rarely pushes back. Pushback is your job. Do not outsource it because the suggestion glows.

## Tradeoffs

**Tab-complete vs architect.** Completion helps locally; architecture still needs human map of failure domains.

**Privacy vs context.** More context improves suggestions; classify what the model may see.

**Tool optimism vs team norms.** The best guardrail is culture: "show me the diff" beats any linter for judgment calls.

## Close

AI amplifies reach; it does not transfer liability. Keep review boring, repeatable, and non-negotiable — especially on auth, money, and data migration paths.

If you ship one habit this week: no merge without a named human hypothesis for what changed.

— JV · Dark Heart Labs.

## References

[^1]: Emily Bender and colleagues, "On the Dangers of Stochastic Parrots" (FAccT, 2021) — why fluency is not understanding in language models.
[^2]: GitHub, *Research: Quantifying GitHub Copilot's impact on developer productivity and happiness* — useful baseline on gains and limits; pair with internal review metrics, not instead of them.
