---
layout: essay
title: TTRPGs Are Collaborative Software
dek: "The rulebook is the kernel; the table is the runtime."
number: 793.93
sort_key: 0793.93
date: 2026-08-18
cover: /assets/images/cover-craft.svg
type: pillar
brief:
  system: long-running Nightbind playtest campaign at the table
  issue: wizard's new feat breaks encounter math; no versioning story
  constraint: preserve table fun; patch rules without invalidating six sessions of canon
---

## Thesis

A tabletop role-playing game is collaborative software: specification, runtime, and userland, running on human hardware with the messiest deployment model in computing. The rulebook is the kernel. The table is the runtime. Session recaps are the migration scripts. If you have argued about whether a ruling applies retroactively, you have already done a schema migration with angry stakeholders.

## Context

Running a long Nightbind playtest campaign taught me more about product management than most product books. Last month a wizard player asked for a homebrew feat mid-arc. The feat was cool. It also stacked with an existing condition in a way the encounter design never assumed. A boss fight intended for four rounds collapsed in one. At a code table this is a feature request that breaks production invariants. At an RPG table it is Tuesday.[^1]

Constraint: preserve table fun, and patch the rules without invalidating six sessions of canon. That is a versioning problem. Fun is a legitimate success metric no sprint review captures. The metaphor is useful because it makes the contracts explicit. It is not useful if you start treating your friends like tickets.

Games as systems training is the companion essay. This one is about the table as a running program you cannot replay, only patch.

## Mechanism

The rulebook is the kernel. Core rules define syscalls: roll, move, apply damage, save. The kernel does not know your campaign's lore. It exposes primitives. Bad kernels are ambiguous, which means arguments at midnight. Good kernels are complete enough to run and loose enough to extend. Vincent Baker's design for Apocalypse World is the clean statement of that split: hard rules for what matters, soft space for fiction.[^2]

The table is the runtime. The GM interprets, schedules, allocates attention: scheduler plus supervisor. Players are processes with local state (character sheets) sending messages (declarations of intent) across a shared bus (the fiction). Latency is real. Three people talking at once is a race condition with no mutex. You can house-rule a talking stick. You cannot house-rule physics.

The session is userland. Each session is a program compiled from prep notes, player choices, and dice: non-deterministic output from deterministic rules. Replay is impossible. Logs are memory and scattered notes. That is why session recaps matter. They reconstruct schema for the next run. Skip the recap and next week you will argue about whether the door was locked.

Homebrew is fork management. A table rule that contradicts the printed text is a fork. Forks are fine if labeled and consistent. Silent forks — GM rulings that drift week to week — are production config drift. Nightbind's fix was a one-page table contract: which books are canonical, how homebrew gets proposed, when we retcon versus patch forward. The wizard feat went through that page. The feat still shipped. The encounter math got a patch note instead of a silent nerf the players would have felt as spite.

Encounter design is capacity planning. Challenge ratings and action economy are load tests. The wizard feat was an unexpected traffic spike on an endpoint (single-target burst) the boss had no rate limit for. Software teams load-test. GMs playtest. Same instinct, different costume. If you only balance on paper, you will meet the feat in production.

Social protocols are the API. X-card, lines and veils, session zero: consent and error-handling contracts. Skip them and you do not have fewer rules. You have undeclared failure modes that surface as interpersonal incidents instead of stack traces. D&D established the original fork-friendly platform: modular kernel, local deployment, every table a distro. The social layer is what keeps the distro from eating its users.[^3]

Retcons are migrations. When six sessions of canon contradict a new rule, you choose: in-fiction explanation (migration script), alternate timeline (hard fork), or invalidate and replay (breaking change). Software teams argue the same three options when schema drift hits production data. Naming the strategy at the table prevents the quiet resentment that builds when a player discovers their backstory no longer compiles.

## Tradeoffs

Rules strictness versus narrative speed. Crunchy systems reduce ambiguity and increase lookup cost. Narrative systems ship faster at the table and scale poorly when disputes need arbitration. Choose kernel complexity for your table's dispute rate, not for the aesthetic of your bookshelf.

GM fiat versus written rules. Fiat is an expedient patch. Overuse erodes trust because outcomes feel non-deterministic. Document recurring fiats as house rules. Treat them like internal API docs. If the ruling only lives in the GM's memory, you will get a different build next week.

Published module versus home campaign. Modules are third-party libraries with assumptions. Dropping one into a homebrew fork without reading dependencies causes the same pain as installing a package without checking peers. Read the adventure's implied party composition before you congratulate yourself on the map.

When the metaphor breaks. Friendship is not employment. The goal is not to corporate the table. The goal is to borrow software's explicit-contract habits so the collaborative program runs without silent corruption. If the versioning conversation is less fun than the game, you have overfit the metaphor. Stop. Play.

## Close

Run a campaign. Version your house rules. Write session recaps like changelogs. Playtest bosses like load tests. You will learn merge-conflict resolution from three players declaring the same action, rollback from retcons, and stakeholder management from the player who wants every spotlight minute.

Usually faster than backlog grooming. Better snacks. The kernel still needs a contract, or Tuesday will eat the boss again.

— JV · Dark Heart Labs.

## References

[^1]: Katie Salen and Eric Zimmerman, *Rules of Play: Game Design Fundamentals* (MIT Press, 2003). Games as systems with formal rules, emergent play, and social contracts — the academic frame for RPG-as-software.

[^2]: Vincent Baker, *Apocalypse World* (2010), and design essays at lumpley.com. Hard rules where they matter, soft space for fiction: kernel design for collaborative play.

[^3]: Gary Gygax and Dave Arneson, *Dungeons & Dragons* (TSR, 1974), and Gygax's later design writing. Modular rule kernel plus local table deployment: the original fork-friendly platform.
