---
layout: essay
title: How to Audit What Your Algorithms Optimize For
dek: "An algorithm is a question someone chose to ask the data. Audit the question."
number: 006.32
sort_key: 0006.32
date: 2026-03-24
cover: /assets/images/cover-code.svg
type: pillar
read_time: 7
tags: [ai, craft]
brief:
  system: "mystic-bytes catalog order, sort_key, and any ranking that pretends to be neutral"
  issue: '"the algorithm" used as a shield; proxies like clicks quietly rewrite editorial intent'
  constraint: "small studio; make the objective legible in code review and in the repo"
---

People talk about algorithms as weather. A recommendation engine, a feed ranker, and a `ORDER BY` are the same species: rules, weights, and an objective someone picked. Fear fades when you can name the objective. This is not a machine-learning platform essay. I do not run one. It is about the sort you already shipped.

## Thesis

**Algorithms do not drift into harm. They optimize what you measured.** Audit the metric before you audit the math. If you cannot write the asked question in one sentence, you are not looking at an algorithm. You are looking at a habit.

## Context

On catalog and feed products, "the algorithm" becomes a shield: impersonal, inevitable, above debate. That story lasts until someone maps metric to behavior to a harmed user. A sort keyed to click-through rate will elevate sensational titles. Not because the model is evil. Because CTR is a loud proxy for curiosity and a quiet proxy for regret.

mystic-bytes looks too small for this lecture. It still has an objective. Essays have `sort_key` and `number` and dates. The writing index can pretend to be chronological, or editorial, or "whatever Cursor last touched." Those are different products. Auckland 2026, writing from Tāmaki Makaurau, I care whether the homepage is a timeline of craft or a slot machine for whichever title a model thought would perform. I am the ranker. Pretending otherwise is how a personal site inherits engagement logic from platforms I claim to distrust.

Cathy O'Neil's point still holds at this scale: a scoring system encodes values, and opacity is part of how those values avoid argument.[^1] You do not need a neural net. You need a sort and a story that the sort is natural.

## Mechanism

Write the question in plain language before you tune anything. What should appear first in this feed. Which items are "done" enough to list. Which failures get paged. The system answers literally. Wrong questions get precise wrong answers.

Trace the metric to the incentive. Click-through rewards sensational previews; calm readers leave. Session length rewards infinite engagement; time-poor users pay. Conversion rewards friction removal, including the dark kind. If you would not defend the incentive in a conversation with a reader, do not encode it as loss. mystic-bytes does not optimize for dwell. If I added an analytics-driven reorder, I would be running a different site. I would have to say so in the README.

Inspect inputs before outputs. Wrong rankings often start in data: stale labels, historical bias, missing populations, feedback loops where yesterday's ranking becomes today's training truth. When outputs embarrass you, walk backward through schema, exclusions, and sampling. Hyperparameters are the last place to look. On a writing catalog the "input" might be `date` versus `sort_key`. If `sort_key` was assigned in a batch and never revisited, you have a frozen editorial decision wearing a numeric costume.

Make change legible. Version the weights, even if the "weights" are a SQL `ORDER BY` and a comment. Document the objective in the repo. Add a kill switch or a manual order before a journalist, or a tired future-you, has to invent one. Change because the tradeoff is visible.

Fairness is plural. There is no single formula that makes a ranking kind. Mitchell and coauthors are dry about this: you choose a definition and you own the assumptions.[^2] For a small site the honest version might be: chronological within a series, editorial featured slots named as such, no engagement re-rank. For a hiring or lending system the stakes are different and this essay is not a substitute for that work. Name the domain. Do not copy a fairness slogan from a slide.

## Tradeoffs

Publishing ranker principles invites gaming. Secrecy invites mistrust. Principle-level transparency usually beats dumping a formula. "We order by editorial sort_key, then date" is a principle. A 40-factor secret sauce is a brand.

Automation versus override: scale wants a script; justice and taste want a human who can pin a piece. mystic-bytes pins by frontmatter. I would rather a boring YAML field than a clever scorer I cannot explain in a footnote.

Accuracy versus the asked question. A model can be accurate at predicting clicks and still be the wrong product. Do not celebrate the ROC curve until you like the sentence the metric implies.

Proxies rot. Page views were a proxy for interest. They became a proxy for outrage and thumb-stopping. Re-audit yearly, or after a move, or after you add a new surface. Auckland readers and US readers are not the same traffic shape. A global CTR will hide that.

## Close

You are not powerless against the algorithm. You are its author until you pretend otherwise. Name what it optimizes. Measure who it costs. Change it when the sentence embarrasses you.

Pick one production ranker, even if it is an `ORDER BY`. Write its objective in a single sentence. Decide whether that sentence is the product you mean to ship. If it is not, the fix is the question, not a smarter model.

— JV · Dark Heart Labs.

## References

[^1]: Cathy O'Neil, *Weapons of Math Destruction* (Crown, 2016). Opaque scoring systems encode values and can harm at scale; the argument applies to sorts and proxies, not only to branded "AI."

[^2]: Shira Mitchell, Eric Potash, Solon Barocas, Alexander D'Amour, and Kristian Lum, "Algorithmic Fairness: Choices, Assumptions, and Definitions," *Annual Review of Statistics and Its Application* 8 (2021). Fairness is plural; objectives and assumptions must be chosen explicitly.
