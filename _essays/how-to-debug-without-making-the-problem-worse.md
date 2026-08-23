---
layout: essay
title: How to Debug Without Making the Problem Worse
dek: "Panic adds mutations. Debugging needs stillness and sequence."
number: 007.72
sort_key: 000772
date: 2026-04-05
cover: /assets/images/cover-craft.svg
type: micro
read_time: 2
tags: ['craft']
---

The first impulse in a bug hunt is to change things, and that impulse often destroys the evidence.

I did this on a Nightbind webhook retry: restart the worker, flush Redis, redeploy last green. The double-fulfillment stopped. So did the payload, the timing, and the request id I needed to prove why it happened. Caches and restarts feel like action. They are also erasers. Sometimes a restart works. Often it erases the only copy of the crime. Start by reproducing. If you cannot, narrow the surface: user, request id, time window, feature flag. Write down what you know before you touch the system.

Change one variable at a time. Hypothesis, test, note the result. A literal pause beats the duplicate edits that compound confusion. They equate speed with thrashing. Speed is a clean bisect. When you are stuck, explain the bug to someone or to an empty document. Forcing a narrative exposes the gap in your model — the assumption you never wrote down.

Debugging is not calm because it feels spiritual. Attention is the tool, and attention requires you to stop mutating the scene. Reproduce. Then change one thing.

— JV · Dark Heart Labs.
