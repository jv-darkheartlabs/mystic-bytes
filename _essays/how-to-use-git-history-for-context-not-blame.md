---
layout: essay
title: How to Use Git History for Context, Not Blame
dek: "Git blame shows who touched a line. It does not show what the room sounded like when they wrote it."
number: 006.20
sort_key: 0006.20
date: 2004-05-16
cover: /assets/images/cover-craft.svg
read_time: 6
tags: [culture]
---

`git blame` answers a narrow question: who last changed this line, and when. That is useful archaeology. It is not a verdict. The engineer staring at a confusing conditional at 2 PM on a Tuesday is not the same person who wrote it at 11 PM before a deadline with incomplete requirements and a staging environment that lied about database state. Authorship without context produces shame, and shame makes people hide problems until they are expensive.

## Read history like an incident timeline

When a line looks wrong, treat blame output the way you treat production logs: sequence first, judgment later.

1. **Open the commit, not just the name.** Read the message. Follow the diff. Check whether the change was a hotfix, a migration shim, or a deliberate trade documented in the PR.
2. **Ask what was true at commit time.** Schema constraints, vendor API limits, and team size all change. Code that looks irrational now may have been the smallest reversible move then.
3. **Separate the decision from the person.** "This assumption no longer holds" is reviewable. "Why did you write this?" is prosecutorial. Same facts, different safety.

Teams that use history constructively ship faster because people flag weird code early instead of working around it in silence.

## What blame cannot tell you

Blame does not capture pairing sessions, verbal agreements, or tickets that were closed without updating the spec. It does not show that the author was covering for a teammate on leave or that the merge was forced because production was on fire. If the commit message is empty and the ticket is gone, you have a documentation gap — not a character flaw.

When you need more context, use the tools blame implies: `git log -L` for line history, `git show` for surrounding changes, issue links in the PR description. If none of that exists, the fix is process — require messages that name the constraint — not a Slack thread that starts with "who broke this."

## Build a blame-safe culture

Safety is not softness. It is throughput.

- **Normalize curiosity.** "I'm trying to understand why we map status this way" invites collaboration. "Who wrote this mess?" trains people to avoid ownership.
- **Review the system, not the author.** Postmortems and refactors should name failure modes and missing guardrails. Individual callouts belong in performance conversations, not standups.
- **Write commits for future readers.** Future readers include you, six months later, with no memory of tonight's constraint. One sentence of why beats a perfect subject line with an empty body.

The goal is not to find who broke it. The goal is to understand why it broke, whether the constraint still exists, and what would make the same class of mistake harder next time.

Use `git blame` the way you use a map: to orient, not to assign fault.

— JV · Dark Heart Labs.
