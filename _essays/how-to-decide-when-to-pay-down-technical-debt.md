---
layout: essay
title: How to Decide When to Pay Down Technical Debt
dek: "Debt compounds in code whether or not finance can see it. Scheduling the fix is a judgment call with a price tag."
number: 006.21
sort_key: 0006.21
date: 2005-07-16
cover: /assets/images/cover-craft.svg
read_time: 6
tags: [culture, ops]
cross_link: technical-debt-is-a-vocabulary-problem
---

Technical debt grows the way infrastructure accretes: one expedient at a time, in every direction, until the workaround is older than the team members who inherited it. That is not automatically failure. Some debt is a strategic loan — ship now, refactor when the product hypothesis is proven. Some debt is a payday advance: high interest, short horizon, regret guaranteed. The skill is telling them apart before the workaround owns your calendar.

## When the cost of carrying exceeds the cost of fixing

You do not refactor because the code offends you — though it might. You refactor when the tax of working around the mess exceeds the cost of addressing it. That calculation is never as clean as a spreadsheet, but it can be honest.

Ask four questions:

1. **How often does this path block shipping?** If every feature touches the same brittle module, the debt is on the critical path.
2. **What is the incident probability?** Manual deploy scripts, untested rollback paths, and schema shortcuts fail on schedule, not on luck.
3. **Who can safely change it?** Bus factor of one is debt with interest compounding in headcount risk.
4. **What would "paid down" mean in one sprint?** Vague "clean it up" tickets die in prioritization. Scoped outcomes survive.

If the answers are "weekly," "non-trivial," "one person," and "we can't define done," you are not debating philosophy. You are scheduling work.

Track carry cost the same way you track latency: a rough number beats a principled silence. Hours per sprint lost to manual steps, extra review rounds because tests cannot run locally, support tickets that trace back to the same module — write them down when they happen so prioritization has material to work with.

## When living with debt is rational

Not every system needs to be pristine. Some systems need to work reliably while carrying scars everyone understands.

Permanent debt is acceptable when:

- The domain is stable and the workaround is documented.
- The replacement cost exceeds product lifetime value.
- The team has containment: tests, monitors, and a runbook for the known failure modes.

Debt becomes toxic when it is invisible — when new hires treat the ritual as architecture and nobody remembers it was temporary.

## Pair with the vocabulary conversation

Engineering can see the reef. Finance sees "refactor." Until someone translates babysitting hours, incident risk, and onboarding drag into categories planning already optimizes for, the sprint will lose. See [Technical Debt Is a Vocabulary Problem](/p/technical-debt-is-a-vocabulary-problem/) for that translation layer. This essay is the engineering-side trigger: **pay down when carry cost wins, document when you choose not to, and never pretend the loan was free.**

Price the workaround before you name it debt. Then schedule the fix like any other work with a defined done state — or admit you are choosing to carry it and write down why.

— JV · Dark Heart Labs.
