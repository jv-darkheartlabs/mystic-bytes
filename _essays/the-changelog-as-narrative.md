---
layout: essay
title: The Changelog as Narrative
dek: "A changelog is the only history book some projects ever write."
number: 005.8
sort_key: 0005.08
date: 2026-01-15
cover: /assets/images/cover-code.svg
type: pillar
read_time: 6
tags: ['craft']
brief:
  system: mystic-bytes reading cover pipeline
  issue: rounding rule changed in 2.4 but nobody can find when or why
  constraint: no bisect marathon; next maintainer needs the answer in one search
---

A release notes file is easy to treat as packaging. Wrap the version, paste three bullets, ship. Then someone in Auckland at a wrong hour needs to know *when the rounding rule changed*, and git history has the diff without the reason.

## Thesis

**A changelog is institutional memory written in the only format most teams will actually maintain.** Version numbers are chapter headings. The sentences under them are the only history some projects ever keep.

## Context

Last winter I spent an afternoon bisecting the mystic-bytes cover pipeline because invoice-style rounding had drifted from what the manifest expected. The bug was not in the file I had open in Cursor on Fedora. It was a decision from a release nobody present had shipped. Git showed the hunk. Git did not show the *why*: regulator guidance, a customer ticket, a workaround that became permanent. The public changelog for that release said `Refactored billing module.` That is a tombstone, not a chapter.[^1]

Auckland 2026 makes the stranger more real. Relocating means the person who remembers the Slack thread might be twelve hours away, or gone. I write mystic-bytes from Tāmaki Makaurau. The next person who clones it might be me after a disk failure, or a future maintainer who never sat in that room. Either way, they will search the changelog before they bisect. If the changelog is marketing copy, they inherit an archaeology project.

Every long-running system eventually produces the question *when did this start.* Teams that treat changelogs as launch notes answer with fifty commits. Teams that treat them as narrative hand the next maintainer a hypothesis on page one.

## Mechanism

Write for the reader you will never meet: the maintainer in three years, the auditor on a deadline, the new hire on day four, support reconstructing what shipped the week a bug started. None of them were in the room. `Fixed bug in auth.` tells the stranger nothing. Which bug. Whose. What it cost while open. What you learned. Keep a Changelog exists because commit logs are not that document. Commits record what the machine did. A changelog records what a human should believe changed.[^1]

On mystic-bytes the durable fix was a PR template with a mandatory CHANGELOG section: what changed, why, what to watch for, merged in the same pull request as the code. Ninety seconds while the work is fresh. Six months later, for a release I shipped during a packing week, reconstruction without that paragraph takes an afternoon and is usually wrong. Cursor will draft a bullet if I let it. I still have to name the why. The model has the diff. It does not have the regulator email.

Narrative beats taxonomy. Added, Changed, Fixed, Removed are filing buckets. They help a scanner. They do not explain. The useful entry reads like a quiet diary: what changed, who asked, what to do if the change surprises you. Link the PR for the patient reader and the upgrade note for the impatient one. Admit mistakes: reverted the previous attempt; caused a webhook regression; postmortem here. Admission is what keeps the document trustworthy when the stranger needs to believe it.

Semantic Versioning is the chapter numbering system, not the story.[^2] A major bump says the contract broke. The changelog sentence has to say *which* contract and *for whom*. A minor bump without a user-facing paragraph is how you get "we shipped 2.4" as an answer to a rounding incident. Karl Fogel's release advice is still the adult version: tell downstream people what they must do, not what you refactored.[^3]

Automation enforces presence, not quality. A merge bot that refuses an empty CHANGELOG section moves the cost from a painful weekly ritual to a byproduct of work already happening. The bot cannot write the sentences. It can only refuse the merge until a human does. I let GitHub Actions fail the PR. I do not let it author the memory.

## Tradeoffs

Detailed entries cost minutes per PR. Vague entries cost seconds now and an afternoon later. For a throwaway script with one deployer, terse notes are fine. For mystic-bytes, Nightbind-era payment paths, or anything with a bus factor above one, the narrative tax is cheaper than the archaeology tax.

Public and internal logs are different channels. Some decisions belong in a runbook, not a customer-facing file. Split them. Do not let *internal* become *nowhere.* The rounding incident lived in neither channel. That is how institutional memory dies. I now keep a public CHANGELOG for contract changes and a `docs/` note for operator context. Both are searchable. Slack is not.

You cannot fully recover narrative you never wrote. Teams sometimes backfill major releases before an audit. Backfill captures facts. It rarely captures reasoning. Start the habit on the next merge, not the next questionnaire.

Prototypes and weekend experiments do not need diary entries. The threshold is whether someone else will need to know why. After month two, that is most production systems, including a Jekyll writing site that looks too small to bother.

## Close

Years from now the marketing site will smooth the story. Press will compress it. The only artifact that reliably remembers the sequence of decisions is the changelog, if you wrote it like it mattered. Codify the CHANGELOG section in the PR template. Write the entry while the work is fresh. Name the why.

I still open `CHANGELOG.md` before I bisect. When the sentence is there, the afternoon stays an afternoon. When it is not, Auckland is just a prettier place to grep.

— JV · Dark Heart Labs.

## References

[^1]: Olivier Lacan, [Keep a Changelog](https://keepachangelog.com/) (2014–present). Human-readable, versioned change histories distinct from commit logs.

[^2]: Semantic Versioning, [semver.org](https://semver.org/) (Tom Preston-Werner, 2013). Version numbers as chapter headings so breaking changes and changelog narrative stay aligned.

[^3]: Karl Fogel, *Producing Open Source Software* (O'Reilly, 2005, rev. 2017). Release management as communication with people who cannot read your repository.
