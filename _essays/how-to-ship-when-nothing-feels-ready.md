---
layout: essay
title: How to Ship When Nothing Feels Ready
dek: "Readiness is a story we tell ourselves. Shipping is the practice of acting before the story finishes."
number: 006.8
sort_key: 0006.08
date: 2006-09-15
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
hashnode: true
---

There is a particular kind of courage that belongs to the person who hits deploy after the logs have been read and the tests have run — and still feels uncertainty sitting in the chest. That feeling is not a stop sign. It is the ordinary weather of building things that matter.

## The myth of readiness

Nothing is ever fully ready. Not the feature, not the design, not you on the Tuesday when the deadline is real. Readiness is often a polite fiction we use to justify staying still: one more refactor, one more review cycle, one more week until conditions feel safer. The work does not need to be perfect. It needs to exist in an environment where you can observe it, fix it, and learn from what users actually do.

Perfectionism and caution look similar from the outside. The difference is measurable. Perfectionism rewrites the same module indefinitely. Caution ships a thin slice with monitoring, a rollback plan, and a list of known gaps. You can be careful without being frozen.

## Ship with a named contract

Before you deploy, write down what you are promising: which paths are tested, which edge cases are documented, what you will watch for in the first hour. That list is not bureaucracy. It is how you separate legitimate risk from ambient anxiety.

Then ship anyway — not recklessly, but deliberately. A deployment is not a verdict on your worth. It is a change introduced into a system you partially control. You cannot dictate every outcome. You can control the clarity of the diff, the quality of the rollback, and your willingness to respond when the graph moves.

If you are solo, the contract is still useful. Future-you at 2 AM will not remember what felt obvious at 4 PM. Write it down.

## The cost of unshipped work

Private repositories are full of projects that never met production. They gather dust while the builder waits for a confidence that was never going to arrive pre-launch. Unshipped code teaches you nothing about real failure modes. It cannot be patched by users you have not yet earned. It cannot reveal the assumption you forgot because staging was too polite.

Shipping is how you convert intention into evidence. The first version will be wrong in ways you could not simulate. That is not humiliation. That is the job.

## What to do when fear returns

Fear before deploy often means you care about the outcome — which is preferable to the alternative. Name the specific worry: data loss, performance regression, a support queue you cannot staff tonight. Address what can be addressed. Accept what must be learned live.

Keep a personal pre-deploy checklist and use it every time so discipline does not depend on mood. Feature flags, staged rollouts, and canary deploys exist because mature teams assume uncertainty — they do not wait for it to disappear.

You will ship again. The uncertainty will visit again. The practice is not to eliminate it but to stop treating it as permission to hide.

— JV · Dark Heart Labs.
