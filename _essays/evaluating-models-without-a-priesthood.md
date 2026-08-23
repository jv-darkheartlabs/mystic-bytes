---
layout: essay
title: Evaluating Models Without a Priesthood
dek: "A golden set you can rerun beats a vibe you can only describe in Slack."
number: 006.35
sort_key: 0006.35
date: 2026-08-23
cover: /assets/images/cover-code.svg
type: pillar
read_time: 6
tags: [ai]
brief:
  system: Cursor-assisted mystic-bytes catalog blurbs
  issue: model swaps change tone and facts; review is "looks fine" until a name or Dewey number is invented
  constraint: no eval platform; a checked-in fixture of inputs and must-pass properties
---

Prompt craft is not evaluation. Reviewing a generated diff is not evaluation either. Both fail the moment you change the model in Cursor and your only test is "eh, reads okay." Evaluation is a set you can rerun when the vendor ships a new default. You do not need a research lab. You need fixtures, properties, and the admission that fluency is not a metric.

## Thesis

**A model is unevaluated until a fixed input set can fail it in public.** Golden tests for generation are golden tests for a compiler: known inputs, stated must-holds, a diff you can read without a priesthood of prompt whisperers.

## Context

I use Cursor on mystic-bytes the way I use any compiler: daily, suspiciously, knowing the default model will change under me. The failure that made this concrete was catalog blurbs. I asked for short descriptions from titles and deks. First pass was fluent and interchangeable: "a thoughtful look at" attached to whatever proper noun I fed it. After I tightened the prompt I swapped models. One invented a Dewey-ish number that looked like mine and was wrong. Another dropped the macrons in Tāmaki Makaurau. Another contradicted the dek.

None of that showed up as a red underline. The prose was confident. My review budget was "spot-check a few." That is how a wrong number gets into a sidebar.

The fix was a folder of fixtures: twenty real titles, each with must-include facts, must-not phrases, and forbidden behaviour (no invented catalog numbers, keep tohutō if the source has it). Run the batch. Diff against the last good run. Read the failures. That is an eval: a test suite with opinions.

HELM exists because one leaderboard number is a lie about what a model is for.[^1] NIST's AI Risk Management Framework says it in adult clothes: measure the things that can go wrong, then decide.[^2] I am not Stanford CRFM. A studio golden set of twenty is still the same species of work. The priesthood is optional. The fixtures are not.

## Mechanism

**Write properties, not adjectives.** "Good blurb" is not a test. "Does not mention a Dewey number unless it appears in the input," "keeps macrons from the source line": those fail in code or on a ruthless checklist. I keep the properties next to the fixtures so a future me cannot "improve" the prompt by deleting the only assertions that catch invention.

**Keep the set small and nasty.** Random happy titles will not catch the macron or the piece that shares a motif with another essay. I pick the cases that already burned me. Twenty is enough to notice a model swap. Start with the burns.

**Rerun on every model change.** Cursor lets me switch models in an afternoon. That is a distribution shift. The golden set is how I know whether I got cheaper-and-fine or cheaper-and-lying. I do not need statistical significance. I need a fail I can point at: fixture 07 invented `004.99`. Log `{fixture_id, model, prompt_hash, pass}` so a new failure is attributable.

**Separate quality from hard fails.** HELM splits scenarios and metrics so "helpful" and "accurate" do not hide in one average. On mystic-bytes, tone match is a human grade on a sample; fact invention is a hard fail. A drier model that never invents numbers wins the blurb job. OpenAI and Anthropic publish eval writeups for the same boring reasons: distribution shift, metric gaming, contamination of the test into the prompt.[^3] Do not paste golden outputs back into the system prompt as few-shot examples and celebrate that the model "learned." That is memorizing the exam.

## Tradeoffs

**Coverage vs cost.** Each fixture is a generation bill and a few minutes of reading. I rerun the full twenty when I change models or the prompt. I do not rerun on every essay save. That would be a priesthood of my own.

**Automatic checks vs taste.** Regex and string contains catch invention and dropped macrons. They will not catch a blurb that is technically true and dead on the page. I still read a sample. The automatic layer is there so I do not spend the sample budget on catching `004.99`.

**Public benchmarks vs private goldens.** HELM tells me something about a model in general. It will not tell me whether this model respects *this* catalog. Use public numbers to shortlist. Use private fixtures to hire.

**When a priesthood is real.** Medical or hiring models need domain experts and documented harm cases, not twenty blurbs. This essay is the studio case: generation into a repo you still own.

## Close

Evaluating models is ordinary testing with a nondeterministic compiler. mystic-bytes blurbs taught me that Cursor-speed model swaps are an untested deploy unless a golden set exists.

Check in one fixture file this week. Put three must-holds under it. Run it after the next model toggle. If you cannot say what failed, you were reading, not evaluating.

— JV · Dark Heart Labs.

## References

[^1]: Percy Liang et al., "Holistic Evaluation of Language Models (HELM)," Stanford CRFM. Multi-metric evaluation against the single-leaderboard story.

[^2]: NIST, *Artificial Intelligence Risk Management Framework (AI RMF 1.0)* (2023). Map, measure, manage, govern: measurement as a prerequisite to claims.

[^3]: OpenAI evals documentation; Anthropic public measurement writeups. Specified tasks, held-out examples, metrics that can fail.
