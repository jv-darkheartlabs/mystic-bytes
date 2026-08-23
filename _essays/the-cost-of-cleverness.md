---
layout: essay
title: The Cost of Cleverness
dek: "Clever code is a loan against the next reader's attention."
number: 005.12
sort_key: 0005.12
date: 2026-01-19
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: Nightbind auth middleware and mystic-bytes cover-preprocess
  issue: a 403 (or a bad crop) that a stranger cannot trace at 2am
  constraint: no new dependencies; clarify in place with the existing stack
---

## Thesis

**Clever code is a recurring comprehension tax.** You write the line once. Every future reader pays interest: team turnover, incident hour, months since authorship.

## Context

Nightbind had an auth middleware nobody wanted to touch. It worked. It also used three language features to say what a flat conditional would have said in five lines. When 403s spiked, the person on the hook — not the original author, who had already left — spent the first half hour reverse-engineering intent before finding a misconfigured header check. The bug was boring. The code was not. Ownership was ambiguous because *clever* had been mistaken for *encapsulated*.

I have done the same damage to myself. `cover-preprocess.py` on mystic-bytes is a crop-and-trim script. Cursor will happily fold the background-detection into a one-liner that reads like a puzzle. At 2am on Fedora, with a batch of covers and an Auckland weekday coming, I do not want a puzzle. I want a named predicate I can print.

Kernighan's line still holds: debugging is twice as hard as writing the code; if you write it as cleverly as possible, you are not smart enough to debug it.[^1] The original author leaving is not a people failure. It is what happens when the only documentation for a critical path lives in one head and that person's stylistic choices.

## Mechanism

Software is a multi-reader medium. You write a line once. It is read by you six months later, by someone new on day twelve, by on-call at 3am, by an auditor, by static analysis, by the next refactor. Each reader pays a small tax. Multiply by readers and years and the bill exceeds whatever elegance you felt at the keyboard.

Boring code is slightly longer to write and much cheaper to read. The honest measure of quality is not conciseness. It is how cheap it is for a stranger to change safely. Most language-showcase code fails that measure. It is exhibition code, designed to be looked at, not lived with.

Cleverness is often status performance. The one-liner that uses trivia to avoid a named loop is rarely about performance. It signals fluency. The team receives the signal and also receives a line they cannot modify without a meeting. Senior engineers tend toward boring code because they have been the reader on the other end of someone else's brilliance and they remember the invoice.

Cleverness earns its keep on hot paths where a smarter algorithm shaves real time at real scale; in library internals thousands of callers depend on; in cryptography, lock-free structures, parsers for languages you cannot change. In those places, write the clever code, then write why the obvious version failed, the test that pins behavior, and the benchmark that proves the cost was worth paying.[^2] Everywhere else, hospitality beats flair: verbose names, explicit early returns, intermediate variables that give the reader a place to rest.

Weinberg treated programs as social artifacts long before "code as communication" became a slide.[^3] Pull requests that lean clever should justify cleverness, not the reverse. Default review stance: rewrite for obvious unless you can explain why obvious is worse. Hold that line and onboarding shortens. The savings show up in incident response and in how fast you can change your mind.

We flattened Nightbind's middleware in one PR: name the header checks, delete the combinator nobody else used. Lines went up. Time to comprehension went down. The next 403 was a five-minute read. On accessibility-rails-components I keep the same rule in Ruby. A focus trap written as a clever DSL is a trap for the next maintainer too. WCAG behavior stays in Ruby a tired reader can follow.

Cursor biases the other way. Completions love density. Density is not kindness. I accept the suggestion when I can still narrate the branch. I reject it when I would need the language spec.

## Tradeoffs

**Obvious vs DRY.** Repetition that aids reading is not always sin. Abstraction that hides a critical branch to save three lines often is. The middleware failed because behavior was compressed past the point a stranger could decompress under pressure.

**Comments vs clearer code.** A comment explaining clever code is a partial payment. Comments rot separately from the logic. Prefer structure that does not need a decoder ring. Use comments for *why this had to be non-obvious*, not for *what this line does*.

**When clever is the job.** Measure before you rewrite a hot path. If the benchmark says the clever version wins at your scale, put the benchmark in the PR. If it says tie, choose obvious. Knuth's warning about premature optimization was about aesthetic cleverness wearing a performance costume.[^2]

**Generated cleverness.** A model will invent a third style in the same file if you let it. Pick a boring dialect and make the review enforce it. Fedora's `python3` does not care how pretty the crop function looks. The next batch of covers does.

## Close

Read your diff as a stranger. If a line sends you to the language spec, the next reader will go there too, without having written it. Rewrite the line. Be boring on purpose. The next reader is you, eighteen months from now, on a Sunday night, trying to ship before Monday.

Cleverness is a debt. Pay it where the return justifies it. Decline it everywhere else.

— JV · Dark Heart Labs.

## References

[^1]: Brian Kernighan, quoted in Jon Bentley, *Programming Pearls* (Addison-Wesley, 1986). Readability as a debuggability constraint.

[^2]: Donald Knuth, "Structured Programming with go to Statements," *ACM Computing Surveys* 6, no. 4 (1974). Measured cleverness on hot paths versus aesthetic cleverness everywhere else.

[^3]: Gerald M. Weinberg, *The Psychology of Computer Programming* (Van Nostrand Reinhold, 1971). Programs as social artifacts read by humans.
