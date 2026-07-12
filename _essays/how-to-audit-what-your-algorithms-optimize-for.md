---
layout: essay
title: How to Audit What Your Algorithms Optimize For
dek: "An algorithm is not a force of nature — it is a question someone chose to ask the data."
number: 006.32
sort_key: 0006.32
date: 2007-06-26
cover: /assets/images/cover-code.svg
type: pillar
read_time: 7
tags: [ai, craft]
brief:
  system: content recommendation and sorting layer on a reading catalog with engagement telemetry
  issue: ranking boosted clickbait titles; stakeholders blamed "the algorithm" instead of the objective function
  constraint: small team; no ML platform; must make tradeoffs legible in code review and product docs
---

People fear algorithms like they fear the dark — because they cannot see what lives inside. But a recommendation engine, a feed ranker, and a sort function are the same species: rules, weights, and an objective someone picked. Fear fades when you can name the objective.

## Thesis

**Algorithms do not drift into harm — they optimize what you measured.** Audit the metric before you audit the math.

## Context

On catalog and feed products, "the algorithm" becomes a shield: impersonal, inevitable, above debate. That story survives until someone maps metric → behavior → harmed user. A sort keyed to click-through rate will elevate sensational titles — not because the model is evil, because CTR is a loud proxy for curiosity and a quiet proxy for regret.

The engineering task is not only accuracy. It is making the asked question visible enough that product and legal can disagree with it on purpose.

## Mechanism

**Write the question in plain language**

Before tuning weights, state the objective:

- "What should appear first in this feed?"
- "Which applicants score highest?"
- "Which price maximizes short-term revenue?"

The system answers literally. Wrong questions get precise wrong answers.

**Trace metric to behavior**

| Metric | Incentive | Possible cost |
|--------|-----------|---------------|
| CTR | sensational previews | calm readers leave |
| Session length | infinite engagement | time-poor users churn |
| Conversion | friction removal | dark patterns |

If you would not defend the incentive in a user interview, do not encode it as loss.

**Inspect inputs before outputs**

Wrong rankings often start in data: stale labels, historical bias, missing populations, feedback loops where past rankings become future training truth. When outputs embarrass you, walk backward through schema, labelers, exclusions, and sampling — not only through hyperparameters.

**Make change legible**

Version weights. Document objectives in the repo. Add kill switches and manual review paths before journalists add them for you. Change because the tradeoff is visible — not because the headline arrived.

## Tradeoffs

**Transparency vs gaming.** Publishing ranker principles invites manipulation; secrecy invites mistrust. Principle-level transparency often beats formula dumps.

**Plural fairness.** Fairness is not one formula — pick the definition that matches stakeholders and defend it in writing.

**Automation vs override.** Scale needs automation; justice needs contextual review. Build both.

## Close

You are not powerless against the algorithm. You are its author until you pretend otherwise. Name what it optimizes. Measure who it costs. Change it when the sentence embarrasses you.

Pick one production ranker. Write its objective in a single sentence. Decide whether that sentence is the product you mean to ship.

— JV · Dark Heart Labs.

## References

[^1]: Cathy O'Neil, *Weapons of Math Destruction* (Crown, 2016) — how opaque scoring systems encode values and harm at scale.
[^2]: Shira Mitchell et al., "Algorithmic Fairness: Choices, Assumptions, and Definitions," *Annual Review of Statistics* (2021) — fairness is plural; objectives must be chosen explicitly.
