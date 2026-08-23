---
layout: essay
title: Anthropic Bets on the Constitution
dek: "The principles are public. Claude is still a product with a price."
number: 338.763
sort_key: 0338.763
date: 2026-08-18
cover: /assets/images/cover-code.svg
type: pillar
tags: [ai]
brief:
  system: Claude as daily writing and coding vendor for Dark Heart Labs drafts
  issue: public constitution and papers get read as moral warranty; product behavior still follows a commercial assistant
  constraint: public papers, system prompts, and product only; no employment claim
---

## Thesis

Anthropic's bet is that a written constitution is a better control surface than unlabeled human taste. Claude is the product that bet funded. Treat the constitution as engineering and branding, not as a court.

## Context

I use Claude the way I use other frontier APIs from a remote desk in Auckland: drafts, code review, a second pair of eyes on mystic-bytes copy. The firm's public story is unusual among vendors. In 2022 they published *Constitutional AI: Harmlessness from AI Feedback*. Later they published the principles used to steer Claude, and a Responsible Scaling Policy for catastrophic-risk thresholds.[^1] Those documents are worth reading. They are also a product strategy.

I have never been on Anthropic's staff. I am a customer who has read the papers. The temptation, especially if you like the vibe of "helpful, honest, harmless," is to treat Claude as the aligned one and everyone else as the messy ones. That is fan behavior. The constitution is a training method. The assistant is a SKU. The gap between those two facts is the essay.

## Mechanism

**Constitutional AI is a substitution of labels.** Bai et al. describe two stages. In the supervised stage the model critiques and revises its own outputs against a list of principles. In the RL stage a model compares pairs and a preference model is trained from those AI judgments — RLAIF rather than a large pile of human harmlessness labels.[^1] Humans still write the constitution. They do not score every pairwise harm. That is a real engineering claim: principles scale cheaper than contractors, and chain-of-thought critiques can be inspected. It is also a power claim. Whoever drafts the list drafts the morality the product will perform.

**The published constitution is inspectable, which is the point.** Anthropic posted Claude's principles in public, including sources such as the UN Declaration of Human Rights alongside house rules about helpfulness and harm.[^2] Inspectable is better than "our raters had a rubric we do not show you." Inspectable is not the same as binding. A constitution that the lab can revise is a style guide with better typesetting. When they expand or rewrite it, the product changes. Users who built workflows around a refusal pattern will feel a policy change, not a founding-document change.

**Claude is the commercial object.** API, claude.ai, coding products: latency targets, rate limits, and a helpfulness gradient that competes with other vendors. Constitutional training was meant to produce a harmless-but-non-evasive assistant, one that explains objections instead of stonewalling.[^1] That is a UX bet as much as a safety bet. A constitution that over-weights agreeableness will sycophant. One that over-weights caution will refuse work you needed done. I have hit both. The papers predicted the tension. The product still picks a point on the curve every release.

**The RSP is a second bet, on process.** The 2023 Responsible Scaling Policy commits the lab to capability thresholds and to not deploying past a risk band without mitigations.[^3] They wrote it as a framework they can update. I cannot audit a board delay from Auckland. I can notice they published a delay condition, and still refuse to confuse a PDF with a guarantee.

**Safety as differentiation has a market logic.** If your competitor ships the vibes model, you ship the principles model. That can improve the industry. It can also become a moat made of PDFs. The test is behavioral: does the product still flatter a bad idea because helpfulness retains seats? When it does, the constitution failed as a complete control, which no training method is.

## Tradeoffs

**Explicit principles vs hidden raters.** Explicit is auditable and political. Hidden is opaque and also political. Prefer explicit, then argue the list.

**Non-evasion vs over-helpfulness.** Explaining a refusal is better manners. Agreeing with a confused user is worse epistemology. Watch which one the product actually does on your tasks.

**Public RSP vs private evals.** A published threshold is a claim you can cite. The evals behind the threshold are still theirs. Do not skip your own golden set.

**When the bet is worth taking.** If you want a vendor that writes down values and ships an assistant that will argue instead of only please, Anthropic is a coherent choice. Pay for the product. Quote the paper. Do not baptize the brand.

## Close

I will keep using Claude where it is the right SKU, and keep reading the constitution as a spec they chose to publish. Hold both: respect the research, price the product, and never outsource judgment to a document the vendor can version. Constitutions govern states when courts exist. This one governs a model because the lab says it does. That is still a bet. Bets can be good. They are not oracles either.

— JV · Dark Heart Labs.

## References

[^1]: Yuntao Bai et al., "Constitutional AI: Harmlessness from AI Feedback," arXiv:2212.08073 (December 2022). SL critique/revision plus RLAIF; a principle list in place of much of the harm-label pile.

[^2]: Anthropic, "Claude's Constitution" (public principles post, 2023) and later published constitution text. Inspectable, revisable, not a court.

[^3]: Anthropic, *Responsible Scaling Policy* v1.0 (19 September 2023) and later revisions. Catastrophic-risk thresholds, complementary to Constitutional AI.
