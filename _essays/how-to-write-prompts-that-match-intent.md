---
layout: essay
title: How to Write Prompts That Match Intent
dek: "If intent is missing from the prompt, the model will invent it in the output."
number: 006.31
sort_key: 0006.31
date: 2026-03-22
cover: /assets/images/cover-code.svg
type: pillar
read_time: 7
tags: [ai, craft]
hashnode: true
cross_link: prompt-engineering-is-just-writing
brief:
  system: Cursor and batch LLM jobs for mystic-bytes blurbs and code scaffolds
  issue: fluent interchangeable output until constraints, audience, and examples were explicit
  constraint: spot-check review budget; distinct from ChatGPT-as-product and the writing-analogy micro
---

Prompting is structured writing with a fast feedback loop. It fails the same way a vague email to a colleague fails. [Prompt Engineering Is Just Writing](/p/prompt-engineering-is-just-writing/) is the analogy in one breath. A different essay treats ChatGPT as a consumer product with a subscription ladder. This one is the operational brief: how I encode intent so a batch job, or a Cursor agent, cannot fill the silence with a default personality.

## Thesis

**Intent must be written into the prompt, or it will be invented in the output.** Specificity is the contract. Fluency is not evidence that the contract was read.

## Context

I ran a batch job for mystic-bytes blurbs and watched the first fifty rows arrive interchangeable: "a compelling tale of love and loss" with different titles swapped in. The model was not broken. The brief was. No audience, no format, adjectives where an example should have lived. Quality changed on the next pass when the prompt named the reader, forbade lazy phrases, and showed one finished row.

The same pattern shows up in codegen. "Add validation" yields a regex from a tutorial the weights loved. A typed discriminated union with named edge cases yields something I can merge after I read it.

I write these prompts from Auckland in 2026, in Cursor, on Fedora, with mystic-bytes as the repo in the loop. I do not treat the chat window as a mind. I treat it as a fast intern with amnesia. If I omit the house style, I inherit generic helpfulness. Stochastic parrots are fluent. They are not grounded unless you demand grounding.[^1]

## Mechanism

Write the user story, not the vibe. Language, contract, return shape, edge cases, in one block:

```
Write a TypeScript function validateEmail(input: string)
that returns a discriminated union:
{ ok: true; value: string } | { ok: false; errors: string[] }
Include empty-string and whitespace-only cases.
Do not invent extra exports.
```

That is diplomacy. You stated what success looks like before the model started sounding sure.

Brief like a colleague on day one. Stack, constraints, audience, one gold-standard example, and anti-patterns: do not invent ISBNs; no generic adjectives; no invented citations. Models imitate structure faster than they infer discipline from silence. Vendor prompt guides are repetitive because the pattern is repetitive: role, format, examples, what to do when information is missing.[^2]

Bound tone, length, and epistemic honesty. State the format (JSON, table, markdown essay with those headings), the length band, the reading level, and the missing-info behavior. "Say you don't know" is a prompt. Models default to helpful completion. Redefine helpful before you batch a thousand rows. I also state forbidden house-voice moves when I am drafting mystic-bytes: no landscape metaphors, no "in today's world," no listicle that never happened to me.

Review like an editor. Run the code. Spot-check facts. Reject fluent nonsense. For catalog copy I read a sample of rows, not all of them, which means the prompt has to make the sample representative. If ten rows share a skeleton, the prompt is still under-specified. For code, `tsc` and a test the model did not write are part of the prompt's success criteria even though they live outside the text box.

Iterate on the prompt, not on the thousand outputs. When a batch is wrong, I change the brief and rerun a slice. Line-editing a thousand fluent mistakes is how you pretend you had a writing staff.

## Tradeoffs

A single packed prompt suits a bounded task: one function, one blurb schema, one rewrite pass. Outline then draft then critique chains buy quality at latency and cost. I use a chain when the first output is structurally wrong. I do not use a chain because a blog post said agents are the future.

Temperature is a dial, not a personality. Lower for extraction and codegen. Higher for brainstorming titles I will throw away. Matching the dial to the task is cheaper than arguing with a creative validator.

Templates versus one-offs: if I will run it weekly, the prompt belongs in the repo next to the job. If I will run it once, a Cursor chat is fine. Most under-investment is on the weekly side. mystic-bytes cover copy that I regenerate should not live only in a thread I will lose after the move.

More context is not always more intent. Dumping the whole repo into a chat can dilute the instruction. I attach the schema and one example before I attach "the rest of writing."

## Close

You are not commanding a current. You are suggesting a direction the model can follow. Specific prompts are that suggestion made legible.

Pick one prompt you used this week. Add audience, format, one example, and one forbidden phrase. Compare outputs. If they still sound like everyone else's, the intent is still missing. The product around the prompt can wait. The sentence cannot.

— JV · Dark Heart Labs.

## References

[^1]: Emily M. Bender, Timnit Gebru, Angelina McMillan-Major, and Shmargaret Shmitchell, "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?" FAccT (2021). Fluency without grounded meaning; why prompts must encode verification, not just tone.

[^2]: OpenAI and Anthropic prompt engineering documentation. Structure, examples, and behavior when information is missing; patterns that transfer across chat products.
