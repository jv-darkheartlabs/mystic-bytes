---
layout: essay
title: How to Give Code Review Feedback That Builds Trust
dek: "A pull request is a conversation about the system. Tone is part of the interface."
number: 006.24
sort_key: 0006.24
date: 2010-05-26
cover: /assets/images/cover-craft.svg
read_time: 6
tags: [culture]
---

Code review is not a trial. It is a conversation with a technical object in the middle — and in async remote teams, your PR comments are your personality rendered as text. The best reviewers read diffs the way a good editor reads a manuscript: respect for what the author is trying to say, and suggestions for saying it more clearly to the next reader.

## Tone is information

"Why did you do it this way?" and "I see you chose X — have you considered Y?" can describe the same concern. The first sounds like cross-examination. The second invites collaboration. Same information, different safety.

Assume good intent until evidence says otherwise. The author probably had a constraint you cannot see from the diff alone. Ask before you accuse.

In distributed teams, async latency amplifies tone. A comment that would sound fine in person reads cold in GitHub. Add context: what you tried to understand, what risk you are worried about, what would unblock your approval. "Blocking: need idempotency key before merge" is clearer than a string of question marks on line forty-two.

## What useful feedback contains

**Specific beats vague.** "This function handles validation, formatting, and persistence" is actionable. "Needs refactoring" is a mood.

**Kind is not soft.** Kind means separating the author from the artifact. Critique the code path, not the person's competence.

**Actionable means paths.** Do not only point at problems. Suggest an alternative, link to a pattern the codebase already uses, or ask a question that narrows the design space.

**Scope matches risk.** Nitpicking formatting on a hotfix teaches people to avoid you on urgent work. Saving architectural debate for the right PR teaches them to bring you in early.

**Separate nits from blockers.** Use labels, prefixes, or a short summary comment so authors know what must change before merge and what can wait. Ambiguous review threads create thrash.

**Respond to responses.** When an author explains a constraint you did not see, acknowledge it. Trust grows when reviewers update their position based on new information — not when the first comment wins by exhaustion.

## Approvals are trust signals

When you approve a PR, you are saying: I trust this change in production, and I trust you to own what I might have missed. That is not ceremonial. It is the foundation of teams that ship quality software without burning out the people who read every line.

Request changes when you must; approve when you would accept ownership if the author disappeared tomorrow. The middle ground — endless comment threads without a clear verdict — erodes trust faster than a direct "not yet."

Review the system. Ask questions before you assign motives. Leave comments you would not mind receiving at the end of a long day.

— JV · Dark Heart Labs.
