---
layout: essay
title: How to Write Commit Messages Future You Will Thank You For
dek: "The diff shows what changed. The message explains why."
number: 007.86
sort_key: 000786
date: 2026-04-23
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
type: micro
brief:
  system: mystic-bytes git history on essay and pipeline commits
  issue: "wip" and "fixed stuff" on main; 2am blame with no constraint recorded
  constraint: conventional prefixes plus a why-body; incomplete work stays on a branch
---

The diff shows what changed. The message is the only record of why.

I have blamed my own commits at 2am and found `wip` and `fixed stuff`. The archaeology took longer than the original change. Future teammates include you, six months later, with no memory of tonight's constraint. Conventional prefixes — feat, fix, refactor, chore, docs — make scanning and changelogs possible. They do not replace a body. The body still has to answer three questions: what problem, why this approach, what to watch in production. A prefix without a why is a label on an empty box. You will still open the diff and guess.

They squash without a sentence and call it cleanliness. It is amnesia. Incomplete work stays on a branch. Main gets messages a stranger could use, not placeholders you meant to rewrite. A perfect subject line with an empty body is still a closed door. Future-you will not remember the hallway conversation. Put it in the commit.

One minute of why saves an hour of guessing. Write the sentence you will need when the constraint is gone and the code looks irrational.

— JV · Dark Heart Labs.
