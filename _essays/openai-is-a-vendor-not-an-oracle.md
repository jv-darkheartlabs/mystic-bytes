---
layout: essay
title: OpenAI Is a Vendor, Not an Oracle
dek: "You are buying a SKU with a retirement date, not a mind."
number: 338.762
sort_key: 0338.762
date: 2026-08-17
cover: /assets/images/cover-code.svg
type: pillar
tags: [ai]
brief:
  system: mystic-bytes drafting and rewrite passes via the public OpenAI API
  issue: model IDs rotate, evals in system cards do not match the writing job, fluency reads as authority
  constraint: customer of the public API and docs; no insider access; treat the firm as a vendor
---

## Thesis

OpenAI sells inference. Model names are stock-keeping units. System cards are spec sheets. Evals are the numbers on the box. None of that is a priest. If the sentence sounds sure, check the invoice: you paid a vendor.

## Context

I use the public API the way I use any other metered service from a desk in Auckland. Drafts for mystic-bytes go through a model ID, a temperature, a token budget, and a habit of treating fluent output as a first pass rather than a source. When a snapshot ID disappears from the catalog, the failure is not metaphysical. The failure is a deprecation notice.

I have never claimed to work there. The useful documents are the ones they published: the GPT-4 System Card, later cards such as GPT-4o's, the API deprecations page, and the Preparedness Framework as a process claim sitting next to a product catalog.[^1] Read those as vendor literature. They are more honest than the myth that a chat window contains a mind.

## Mechanism

**A model name is a SKU.** `gpt-4`, `gpt-4o`, `gpt-4-turbo`, dated snapshots, reasoning-line IDs: these are product codes with prices, rate limits, context windows, and shutdown dates. The deprecations page is explicit that older models retire as newer ones ship, with email and docs as the notice channel.[^2] That is how a platform company treats capacity. It is not how an oracle treats revelation. If your pipeline hard-codes a snapshot, you have a supply-chain dependency. Pin it, test the replacement, and budget the eval rerun the way you would budget a Postgres major version.

**System cards are the closest thing to a datasheet.** The GPT-4 card (March 2023) describes evaluations, refusal training, and a launch framed as a balance among risk, useful work, and learning from deployment.[^1] Later cards add a Preparedness scorecard: cybersecurity, CBRN, persuasion, autonomy. That is the firm's risk language. It is not a warranty that the model will be right about a citation or an undocumented timeout in your payment service. A card tells you what they measured. It does not tell you that your job was in the test set.

**Evals do two jobs at once.** On the research page they look like science: MMLU-style suites, expert red teams, third-party assessments. On the sales page they look like benchmarks that justify a price tier. Both readings can be true. The second-order effect for a builder is that you cannot outsource acceptance tests to the vendor's leaderboard. Their eval is for their launch. Yours is for your users. I keep a small golden set for mystic-bytes: citation format, no invented ISBNs, no fake employment claims. The model that wins a public eval can still fail that set. That is expected. Vendors optimize the metrics they publish.

**ChatGPT and the API are different products that share a brand.** The chat app sells a relationship: memory, voice, a UI that says "Assistant." The API sells HTTP, JSON, and a bill. Confusing them is how teams ship a consumer tone into a production path and then act shocked when the tone was never a contract. Usage policies and data-retention defaults also split by product. Read the API section, not the blog post, when you are putting someone else's text into a prompt.

**Helpfulness is a product requirement, not a truth requirement.** System cards spend pages on overreliance: fluent falsehoods, users who stop checking. That is the vendor admitting the failure mode in public. The commercial incentive still rewards answers that feel complete. Your job, as the customer, is to put a check after the completion. I treat OpenAI the way I treat a CDN: fast, useful, capable of being wrong in ways that look like success until you verify the origin.

## Tradeoffs

**Pinned snapshots vs latest aliases.** Aliases get you the new thing. Snapshots get you reproducibility until the shutdown date. For anything you will have to explain later, pin, then schedule the migration.

**Vendor evals vs private evals.** Public numbers are necessary to compare SKUs. They are insufficient to accept a SKU. Budget the private set. If you cannot afford it, you cannot afford the model for that job.

**Chat UX vs API contract.** The app is fine for thinking out loud. Production belongs on an ID you can grep for in the repo when the deprecation mail arrives.

**When the vendor is the right buy.** If you need a strong general model, a published card, and an API that exists on Monday, OpenAI is a coherent supplier. Buy tokens. Do not buy certainty.

## Close

The useful stance is procurement. Name the SKU, the card you read, the eval you ran, and the date the ID dies. That is respect for the work they shipped and a refusal to confuse it with wisdom. Oracles do not send deprecation email. Vendors do. I prefer the vendor. I can budget for a vendor.

— JV · Dark Heart Labs.

## References

[^1]: OpenAI, *GPT-4 System Card* (March 2023), https://cdn.openai.com/papers/gpt-4-system-card.pdf; OpenAI, *GPT-4o System Card* and Preparedness Framework. Evaluation write-ups sold next to the catalog.

[^2]: OpenAI, "Deprecations," API documentation, https://developers.openai.com/api/docs/deprecations. The operational proof that model IDs are products with retirement schedules.

[^3]: OpenAI API documentation (models, pricing, usage policies). The contract surface: tokens, limits, and what the HTTP response is allowed to be, as distinct from ChatGPT's product UX.
