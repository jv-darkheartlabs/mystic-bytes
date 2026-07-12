---
layout: essay
title: The Changelog as Narrative
dek: "A changelog is the only history book some projects ever write."
number: 005.8
sort_key: 0005.08
date: 2026-04-05
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes reading cover pipeline
  issue: rounding rule changed in 2.4 but nobody can find when or why
  constraint: no bisect marathon; next maintainer needs the answer in one search
---

## Thesis

A changelog is not release packaging — it is the **institutional memory** of a system, written in the only format most teams will actually maintain.

## Context

Last month I spent an afternoon bisecting the mystic-bytes cover pipeline because invoice-style rounding had drifted from what the manifest expected. The bug was not in today's code. It was in a decision from a release nobody present had shipped. Git history had the diff. Git history did not have the *why* — regulator guidance, customer ticket, temporary workaround that became permanent. The public changelog for that release said `Refactored billing module.` That is a tombstone, not a chapter.[^1]

Every long-running system eventually produces the question *when did this start.* Teams that treat changelogs as marketing copy answer that question with fifty commits and a week of archaeology. Teams that treat changelogs as narrative hand the next maintainer the hypothesis on page one.

## Mechanism

**The reader you will never meet.** Write for the stranger — the maintainer in three years, the auditor on a deadline, the new hire on day four, support reconstructing what shipped the week a bug started. None of them were in the room when the decision was made. `Fixed bug in auth.` tells the stranger nothing: which bug, whose bug, what it cost while open, what you learned. The version number is a chapter heading; the entry beneath it must be the chapter.

**Changelog as debugging artifact.** A good entry lets a reader form a hypothesis: *is this the change that caused the symptom I am investigating?* On mystic-bytes, the fix was to adopt a PR template with a mandatory CHANGELOG section — what changed, why, what to watch for — merged in the same pull request as the code. Ninety seconds while the work is fresh. Six months later, for a release manager who was on parental leave when it shipped, reconstruction takes an afternoon and is usually wrong.

**Narrative beats taxonomy.** Added, Changed, Fixed, Removed are filing buckets, not explanations. The best changelogs read like a quiet, accurate diary: what changed, why, who asked, what to do if the change surprises you. Link the PR for the patient reader and the upgrade note for the impatient one. Admit mistakes — *reverted previous attempt; caused webhook regression; postmortem here* — because admission is what keeps the document trustworthy when the stranger needs to believe it.

**Automation as enforcement, not substitute.** A merge bot that refuses empty CHANGELOG sections moves the cost from a painful weekly ritual to a frictionless byproduct of work already happening. The bot cannot write the sentences. It can only refuse the merge until a human does. Narrative quality still belongs to the author; the pipeline's job is to make omission expensive.

## Tradeoffs

**Detailed entries vs release velocity.** Full narrative entries take minutes per PR. Vague entries take seconds and externalize the cost to every future reader. For internal tools with one deployer, terse notes may suffice. For anything with external consumers, compliance obligations, or a bus factor above one, the narrative tax is cheaper than the archaeology tax.

**Public vs internal changelogs.** Some decisions belong in an internal runbook, not a customer-facing document. Split the channels — public changelog for contract changes, internal decision log for the rest — but do not let *internal* become *nowhere.* The mystic-bytes rounding incident lived in neither channel. That is how institutional memory dies.

**Retroactive changelogs.** You cannot fully recover narrative you never wrote. Teams sometimes backfill major releases before an audit. Backfill captures facts; it rarely captures reasoning. Start the habit on the next merge, not the next audit.

**When minimal is enough.** Prototypes, single-maintainer scripts, and throwaway experiments do not need diary entries. The threshold is **someone else will need to know why** — which is most production systems after month two.

Years from now the marketing site will smooth the story. Press releases will compress it. Conference talks will dramatize it. The only artifact that reliably remembers the actual sequence of decisions is the changelog — if you wrote it like it mattered. Codify the CHANGELOG section in the PR template. Write the entry while the work is fresh. Name the why, not just the what.

— JV · Dark Heart Labs.

## References

[^1]: Olivier Lacan, [Keep a Changelog](https://keepachangelog.com/) (2014–present). Lacan's specification popularized the practice of human-readable, versioned change histories distinct from commit logs — the closest thing the industry has to a shared standard for changelog-as-documentation.

[^2]: Karl Fogel, *Producing Open Source Software* (O'Reilly, 2005, rev. 2017) — especially the material on release management and communicating change to downstream consumers who cannot read your repository.

[^3]: Semantic Versioning specification, [semver.org](https://semver.org/) (Tom Preston-Werner, 2013). Version numbers are the chapter headings; SemVer defines what a breaking change means so changelog narrative and API contract stay aligned.
