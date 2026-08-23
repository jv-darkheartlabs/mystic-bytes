---
layout: essay
title: Teaching Is Debugging Yourself
dek: "You only see the gaps when someone else points at them."
number: 371.1
sort_key: 0371.01
date: 2026-07-12
cover: /assets/images/cover-systems.svg
type: pillar
brief:
  system: the changelog pipeline
  issue: the fast path stopped being fast
  constraint: no downtime. no schema break. ship before EOW.
---

## Thesis

Teaching is a debugger attached to your own head. The student asks the question you treated as settled, and the settled answer turns out to be a folk belief you have been carrying for years. You cannot patch a model you have never executed in front of someone who needs it to work.

## Context

I was walking a new contributor through the mystic-bytes changelog pipeline: why entries land in the merge queue before the public doc updates, why empty CHANGELOG sections are refused, why the fast path through CI had stopped being fast once we skipped the contract test. She asked why the generator did not simply read git history.

I started to answer. I heard myself reach for tone instead of a reason. I did not know the precise cause. I knew we had rejected auto-generation in a decision I had never written down. The pipeline still ran. The explanation did not.

Teaching forced the bug in my mental model into the open. Fixing the explanation became fixing the documentation, which became restoring the fast path. No downtime, no schema break: we shipped the clarified contract and the test that enforced it the same week. The contributor got a usable map. I got the missing ADR.

Mentorship, in the career sense, is a different essay. This one is narrower. The person across the table is a human breakpoint. Your job in that hour is not to perform expertise. It is to find the line of code in your head that never compiled.

## Mechanism

Explanation is a test suite for comprehension. Richard Feynman distrusted understanding he could not reconstruct from first principles. Recognition is not reconstruction. You can nod along to a talk about merge queues and still be unable to derive the next step when a stranger asks why. Teaching is the create step under observation. Slides hide gaps. Live questions do not. The moment you cannot continue without "because we always have," you have found untested code.[^1]

Eric Mazur's peer instruction work at Harvard showed that students often master rote performance without conceptual mastery, and that explaining to a peer surfaces misconceptions faster than listening alone. The mentor is not exempt. You are the student of your own explanation, with a sharper grader sitting across the call. The embarrassment is diagnostic. Treat it that way and the session pays rent.[^2]

Mentoring pays asymmetrically. The mentee gets guidance. The mentor gets a fuzz test. Every quarter I teach something I think I know — a tool, a workflow, a subsystem — and every quarter something breaks in my model in the first hour. That is not a personality flaw. That is cheaper than a certification that never touches the actual stack.

Teaching also scales institutional memory, which is the part teams skip because it does not demo well. Teams that only document after incidents write tombstones. Teams that teach as part of normal work write living maps: informal, oral, corrected when wrong. The changelog fast path failed partly because the reasoning lived in one person's head. Teaching transferred it into a checkable artifact. The next person can fail the same test in CI instead of in a hallway.

Habits that have survived contact with real work:

Teach one bounded topic per quarter. Not "the whole platform." Something like "how merge queue entries become release notes." Breadth is how you hide.

Require questions before demos. Force the learner to name what they expect, then compare it to what happens. Surprise is the failing assertion.

Write the answer you wish you had given. If the session ended with "I'll get back to you," that is a doc-debt ticket with your name on it. Unanswered questions do not evaporate. They become folklore.

Rubber-duck the night before if the topic still feels foggy. If you cannot explain it to an empty chair, you will not explain it to a person who can ask follow-ups.

## Tradeoffs

Teaching time versus shipping time. The calendar cost is real this week. Untaught systems repay that cost as repeated interruptions, wrong assumptions, and the same context re-explained to the next hire. Break-even arrives faster on systems with turnover. If only you can answer the question, you are the outage.

When the teacher is wrong. Teaching while confidently incorrect propagates bugs. Pair the session with a written source of truth. Invite correction in the room. "I don't know" is the strongest answer available, because it stops the folklore from shipping.

Performance versus pedagogy. Experts skip steps they no longer see. Teaching exposes the skipped steps. Good for the team, rough on ego. That discomfort is the debugger working. If you never feel it, you are lecturing, not teaching.

Formal training versus apprenticeship. Courses cover breadth. Teaching covers your actual stack. Use both. Neither replaces the other, and a certificate will not tell you why the changelog generator refuses git history.

## Close

Teach something every quarter. You will learn faster as a side effect than from any course you take, because courses optimize for completion and teaching optimizes for being wrong in front of someone who needs the right answer.

Mentoring, in this frame, is not charity. It is debugging yourself with a human breakpoint. The questions that stump you in a teach-back are the ones your mental model never finished compiling. Write those down. They are the real curriculum.

— JV · Dark Heart Labs.

## References

[^1]: Richard P. Feynman, *The Feynman Lectures on Physics*, and recorded interviews on scientific understanding. The reconstructive standard — you understand what you can rebuild, not what you can recognize — is the frame for teaching as a comprehension test.

[^2]: Eric Mazur, *Peer Instruction: A User's Manual* (Prentice Hall, 1997), and later studies on interactive teaching. Mazur's work is the classroom evidence that explanation exposes expert blind spots faster than lecture.
