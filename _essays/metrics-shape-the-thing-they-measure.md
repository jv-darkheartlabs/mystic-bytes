---
layout: essay
title: Metrics Shape the Thing They Measure
dek: "The dashboard becomes the org chart."
number: 658.51
sort_key: 0658.51
date: 2025-01-19
cover: /assets/images/cover-craft.svg
type: micro
brief:
  system: mystic-bytes site analytics
  issue: page views rise while newsletter signups and return visits flatline
  constraint: no new tracking vendors; reinterpret what the dashboard already captures
---

The metric you pick is the behavior you will get — including the parts of the metric that have nothing to do with the outcome you actually wanted.

I saw this on the mystic-bytes analytics board. Page views climbed after we split essays into shorter URLs. Newsletter signups did not. Return visits did not. The team had optimized for a counter that rewarded pagination, not comprehension. Nobody cheated. The dashboard won. When a number is visible, people improve the number. Goodhart's law is not a joke — it is an org chart written in SQL.[^1]

If the dashboard tracks response time, slow work migrates off the measured path. If it tracks deploy count, you get smaller, noisier releases. If it tracks lines changed, you get refactors that should have been deletes.

Choose the metric like you are choosing a destiny. Then ask what honest behavior would make that number worse — and fix the metric before the team does.

— JV · Dark Heart Labs.

[^1]: Charles Goodhart, "Problems of Monetary Management: The U.K. Experience" (Reserve Bank of Australia, 1975) — the origin of the observation that any measure used for control ceases to be a reliable measure.
