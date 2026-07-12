---
layout: essay
title: How to Write Prompts That Match Intent
dek: "Talking to an LLM is diplomacy — align its tendencies with your goal, or inherit its defaults."
number: 006.31
sort_key: 0006.31
date: 2005-09-25
cover: /assets/images/cover-code.svg
type: pillar
read_time: 7
tags: [ai, craft]
hashnode: true
cross_link: prompt-engineering-is-just-writing
brief:
  system: batch LLM job generating catalog blurbs and code scaffolds for mystic-bytes pipelines
  issue: first-pass outputs were fluent, interchangeable, and wrong on facts without explicit constraints
  constraint: hundreds of rows per run; human review budget is spot-checking, not line editing
---

Prompt engineering is not a priesthood. It is structured writing with a fast feedback loop — and the same failure mode as a vague email to your team.

## Thesis

**Intent must be encoded in the prompt, or it will be invented in the output.** Specificity is not pedantry; it is the contract.

This essay pairs with [Prompt Engineering Is Just Writing](/p/prompt-engineering-is-just-writing/) — that piece is about the craft analogy in one paragraph. This one is the operational checklist.

## Context

I have run batch jobs that turned fifty titles into fifty identical sentences — "a compelling tale of love and loss" with different proper nouns swapped in. The model was not broken. The brief was: no audience, no format, adjectives where examples should have lived. Quality changed on the next pass when the prompt named the reader, forbade lazy phrases, and showed one finished row.

The same pattern appears in codegen: "add validation" yields a regex from 2009; a typed discriminated union with named edge cases yields something you can merge.

## Mechanism

**Write the user story, not the vibe**

```
Write a TypeScript function validateEmail(input: string)
that returns a discriminated union:
{ ok: true; value: string } | { ok: false; errors: string[] }
Include empty-string and whitespace-only cases.
```

Language, contract, return shape, edge cases — in one block. That is diplomacy: you stated what success looks like before negotiating the details.

**Brief like a colleague on day one**

Supply stack, constraints, audience, one gold-standard example, and anti-patterns ("do not invent ISBNs," "no generic adjectives"). Models imitate structure faster than they infer discipline from silence.

**Bound tone, length, and epistemic honesty**

State format (JSON, table, memo), length, reading level, and missing-info behavior ("say you don't know"). Models default to helpful completion; redefine helpful before you batch a thousand rows.

**Review like an editor, not an oracle**

Run the code. Spot-check facts. Reject fluent nonsense. AI amplifies domain judgment — it does not substitute for it.

## Tradeoffs

**Mega-prompt vs chain.** Single prompts suit bounded tasks. Outline → draft → critique chains buy quality at latency cost.

**Temperature.** Higher for brainstorming; lower for extraction and codegen. Match the setting to the task.

**Templates vs one-offs.** Repeat weekly? Encode the prompt. Repeat once? Ad hoc is fine. Most teams under-invest in templates.

## Close

You are not commanding the current. You are suggesting a direction the model can follow. Specific prompts are that suggestion made legible.

Pick one prompt you used this week. Add audience, format, one example, and one forbidden phrase. Compare outputs.

— JV · Dark Heart Labs.

## References

[^1]: Emily M. Bender et al., "On the Dangers of Stochastic Parrots" (FAccT, 2021) — fluent text without grounded facts; why prompts must encode verification expectations.
[^2]: OpenAI / Anthropic prompt guides — practical patterns for structure, examples, and refusal behavior (vendor docs; principles transfer across models).
