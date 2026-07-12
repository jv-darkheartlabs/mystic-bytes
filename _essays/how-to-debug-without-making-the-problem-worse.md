---
layout: essay
title: How to Debug Without Making the Problem Worse
dek: "Panic adds mutations. Debugging needs stillness and sequence."
number: 007.72
sort_key: 000772
date: 2003-05-27
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
---
The first impulse in a bug hunt is to change things — restart services, clear caches, redeploy last green. Sometimes that works. Often it destroys the evidence you need.

Start by reproducing. If you cannot reproduce, narrow the surface: user, request id, time window, feature flag. Write down what you know before you touch the system.

Change one variable at a time. Hypothesis, test, note result. Breath is not metaphor — literal pause reduces duplicate edits that compound confusion.

When stuck, explain the bug to someone or to an empty document. Forcing narrative exposes gaps in your model.

Debugging is not meditation because it is calm. It is meditation because attention is the tool, and attention requires you to stop thrashing.


— JV · Dark Heart Labs.
