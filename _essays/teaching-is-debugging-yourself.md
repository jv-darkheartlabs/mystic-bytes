---
layout: essay
title: Teaching Is Debugging Yourself
dek: "You only see the gaps when someone else points at them."
number: 371.1
sort_key: 0371.01
date: 2025-03-23
cover: /assets/images/cover-systems.svg
type: pillar
brief:
  system: the changelog
  issue: the fast path stopped being fast
  constraint: no downtime. no schema break. ship before EOW.
---

The fastest way to discover the gaps in your own understanding is to teach the thing. The student asks the question you assumed had an obvious answer, and the obvious answer turns out to be a folk belief you have been carrying for years.

## Context

I was explaining the mystic-bytes changelog pipeline to a new contributor — why entries land in the merge queue before the public doc updates, why we refuse empty CHANGELOG sections, why the fast path through CI had stopped being fast once we skipped the contract test. She asked why the generator did not simply read git history. I started to answer, heard myself reach for hand-waving, and realized I did not know the precise reason — only that we had rejected auto-generation in a decision I had never written down.

Teaching forced the bug in my own mental model into the open. Fixing the explanation became fixing the documentation became restoring the fast path. No downtime, no schema break: we shipped the clarified contract and the test that enforced it the same week.

## Mechanism

**Explanation is a test suite for comprehension.** Richard Feynman reportedly distrusted understanding he could not reconstruct from first principles — the "what I cannot create, I do not understand" standard.[^1] Teaching is that create step under observation. Slides hide gaps; live questions do not. The moment you cannot derive the next step without appeal to authority ("because we always have"), you have found untested code in your head.

Eric Mazur's peer instruction research at Harvard showed that students often master rote performance without conceptual mastery — and that explaining to peers surfaces misconceptions faster than listening alone.[^2] The mentor is not exempt. You are the student of your own explanation, with a sharper grader sitting across the call.

**Mentoring pays asymmetrically.** The mentee gets guidance. The mentor gets a fuzz test. Every quarter I teach something I think I know — a tool, a workflow, a subsystem — and every quarter something breaks in my model in the first hour. That is not embarrassment. That is return on investment cheaper than any certification.

**Teaching scales institutional memory.** Teams that only document after incidents write tombstones. Teams that teach as part of normal work write textbooks — informal, oral, corrected when wrong. The changelog fast path failed partly because the reasoning lived in one senior engineer's head. Teaching transferred it into a checkable artifact.

Concrete habits that work:

- **Teach one bounded topic per quarter** — not "the whole platform," but "how merge queue entries become release notes."
- **Require questions before demos** — force the learner to name what they expect; compare to what happens.
- **Write the answer you wish you had given** — if the session ended with "I'll get back to you," that is a doc debt ticket with your name on it.

## Tradeoffs

**Teaching time vs shipping time.** Short-term, the calendar cost is real. Long-term, untaught systems re-pay the cost as repeated interruptions, wrong assumptions, and re-explained context. The break-even arrives faster on systems with turnover.

**When the teacher is wrong.** Teaching while confidently incorrect propagates bugs. Pair teaching with written sources of truth; invite correction; treat "I don't know" as the strongest answer available.

**Performance vs pedagogy.** Some experts skip steps unconsciously. Teaching exposes the skipped steps — good for the team, uncomfortable for ego. That discomfort is diagnostic.

**Formal training vs apprenticeship.** Courses cover breadth; teaching covers your actual stack. Use both. Neither replaces the other.

## Close

Teach something every quarter. You will learn faster as a side effect than from any course you take — because courses optimize for completion, and teaching optimizes for being wrong in front of someone who needs the right answer.

Mentoring is not charity. It is debugging yourself with a human breakpoint.

The questions that stump you in a teach-back are the ones your mental model never finished compiling.

— JV · Dark Heart Labs.

## References

[^1]: Richard P. Feynman, *The Feynman Lectures on Physics* and recorded interviews on scientific understanding. Feynman's standard — understanding requires reconstructive ability, not recognition — is the canonical formulation of "explain to learn."

[^2]: Eric Mazur, *Peer Instruction: A User's Manual* (Prentice Hall, 1997) and subsequent studies on interactive teaching. Mazur is the leading reference for peer explanation as a mechanism that exposes and corrects expert blind spots in classroom and professional settings.
