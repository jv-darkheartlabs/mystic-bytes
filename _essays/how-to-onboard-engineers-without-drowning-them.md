---
layout: essay
title: How to Onboard Engineers Without Drowning Them
dek: "Starting a new codebase is learning a city by walking it. Drop them near a map, not the ocean."
number: 006.27
sort_key: 0006.27
date: 2012-02-24
cover: /assets/images/cover-craft.svg
read_time: 6
tags: [culture]
---

Starting a new engineering role is learning a codebase that took years to accrete — while also learning how PTO works, which Slack channels matter, and why the staging environment behaves like a different product. Everyone assumes you can swim because your resume said you could. The first week proves otherwise, and that gap is normal, not a hiring mistake.

## The first PR will take too long

Your first pull request will take three days for work that would take three hours six months later. You are not slow. You are building a mental model without landmarks. Good onboarding shortens that map-making phase instead of pretending it does not exist.

**Day-one local environment.** If `docker compose up` or the equivalent does not work before lunch on day one, fix that before you fix culture slides. Broken setup teaches people that asking for help is expensive.

**A low-stakes first ticket.** Touch real code with bounded blast radius: a doc fix that requires running tests, a small bug with a clear repro, a logging improvement in a well-owned module. Avoid "pick anything from the backlog" as a hazing ritual.

**Permission to ask obvious questions.** Undocumented systems produce "dumb" questions that are actually diagnostics of missing docs. A channel where "I don't understand" is safe saves more time than a wiki nobody updates.

## The buddy system

Pair new hires with someone who remembers being new — not automatically the most senior engineer, but the most empathetic one who knows where the sharp edges are. The buddy's job is translation: this meeting matters, this script is legacy, this test flake is known, this person owns payments.

Thirty minutes daily for the first two weeks beats a single three-hour architecture tour. Context compounds in conversation, not in slide decks.

**Make the first win visible.** Merge something small early. Momentum matters more than impressing the room with scope. A merged doc fix or test improvement proves the pipeline works and reduces the impostor noise every new hire hears internally.

## What six months later looks like

You become the person who helps the next arrival. The abyss becomes familiar, then home — not because the codebase got simpler, but because someone left breadcrumbs: README steps that work, runbooks for the scary scripts, and a culture that measures onboarding by time-to-first-merge without punishing the learning curve.

Onboarding is infrastructure. Invest in it the way you invest in CI: visibly, continuously, before the next hire arrives cold.

Measure time-to-first-merge and time-to-first-production deploy, not time-to-"looks busy." The goal is confidence in the system, not speed that skips understanding.

— JV · Dark Heart Labs.
