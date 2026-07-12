---
layout: essay
title: TTRPGs Are Collaborative Software
dek: "The rulebook is the kernel; the table is the runtime."
number: 793.93
sort_key: 0793.93
date: 2025-05-04
cover: /assets/images/cover-craft.svg
type: pillar
brief:
  system: long-running Nightbind playtest campaign at the table
  issue: wizard's new feat breaks encounter math; no versioning story
  constraint: preserve table fun; patch rules without invalidating six sessions of canon
---

## Thesis

A tabletop role-playing game is **collaborative software** — specification, runtime, and userland — running on human hardware with the messiest deployment model in computing.

## Context

Running Nightbind's playtest campaign taught me more about product management than most product books. Last month a wizard player asked for a homebrew feat mid-arc. The feat was cool. It also stacked with an existing condition in a way the encounter design never assumed — a boss fight intended for four rounds collapsed in one. At the code table this is a feature request that breaks invariant assumptions in production. At the RPG table it is Tuesday.[^1]

Every software concept has a table analogue: versioning, forks, mods, technical debt, rollback, the moment a pull request from the wizard breaks the encounter kernel. If you have ever argued about whether a ruling applies retroactively, you have already done a schema migration with angry stakeholders.

## Mechanism

**The rulebook is the kernel.** Core rules define syscalls — roll, move, apply damage, save. The kernel does not know your campaign's lore; it exposes primitives. Bad kernels are ambiguous (arguments at midnight). Good kernels are complete enough to run and loose enough to extend — Vincent Baker's design principle for Apocalypse World: hard rules for what matters, soft space for fiction.[^2]

**The table is the runtime.** The GM interprets, schedules, allocates attention — scheduler plus supervisor. Players are processes with local state (character sheets) sending messages (declarations of intent) across a shared bus (the fiction). Latency is real: three people talking at once is a race condition with no mutex.

**The session is userland.** Each session is a program compiled from prep notes, player choices, and dice — non-deterministic output from deterministic rules. Replay is impossible; logs are memory and scattered notes. This is why session recaps are migration scripts: they reconstruct schema for the next run.

**Homebrew is fork management.** A table rule that contradicts RAW is a fork. Forks are fine if labeled and consistent. Silent forks — GM rulings that drift week to week — are production config drift. Nightbind's fix was a one-page *table contract*: which books are canonical, how homebrew gets proposed, when we retcon versus patch forward.

**Encounter design is capacity planning.** CR and action economy are load tests. The wizard feat was an unexpected traffic spike on a endpoint (single-target burst) the boss had no rate limit for. Software teams load-test; GMs playtest — same instinct, different costume.

**Social protocols are the API.** X-card, lines and veils, session zero — these are consent and error-handling contracts. Skip them and you do not have fewer rules; you have undeclared failure modes that surface as interpersonal incidents instead of stack traces.

**Retcons are migrations.** When six sessions of canon contradict a new rule, you choose: migration script (in-fiction explanation), hard fork (alternate timeline), or breaking change (invalidate and replay). Software teams argue the same three options when schema drift hits production data. Naming the strategy at the table prevents the quiet resentment that builds when players discover their backstory no longer compiles.

## Tradeoffs

**Rules strictness vs narrative speed.** Crunchy systems reduce ambiguity and increase lookup cost. Narrative systems ship faster at the table and scale poorly when disputes need arbitration. Choose kernel complexity for your table's dispute rate, not your aesthetic preference.

**GM fiat vs written rules.** Fiat is expedient patch; overuse erodes trust because outcomes feel non-deterministic. Document recurring fiats as house rules — treat them like internal API docs.

**Module vs home campaign.** Published modules are third-party libraries with assumptions. Dropping a module into a homebrew fork without reading dependencies causes the same pain as npm install without checking peer deps.

**When the metaphor breaks.** Friendship is not employment; fun is a legitimate success metric no sprint review captures. The goal is not to corporate the table — it is to borrow software's explicit-contract habits so the collaborative program runs without silent corruption.

Run a campaign. Version your house rules. Write session recaps like changelogs. Playtest bosses like load tests. You will learn merge conflict resolution from three players declaring the same action, rollback from retcons, and stakeholder management from the player who wants every spotlight minute — usually faster than any backlog grooming session, and with better snacks.

— JV · Dark Heart Labs.

## References

[^1]: Katie Salen and Eric Zimmerman, *Rules of Play: Game Design Fundamentals* (MIT Press, 2003). Salen and Zimmerman treat games as systems with formal rules, emergent play, and social contracts — the academic frame for RPG-as-software.

[^2]: Vincent Baker, *Apocalypse World* (2010) and subsequent design essays at lumpley.com. Baker is a leading authority on RPGs as explicit rule systems with disciplined GM/player division of labor — kernel design for collaborative fiction.

[^3]: Gary Gygax and Dave Arneson, *Dungeons & Dragons* (TSR, 1974) and Gygax's later design writing. D&D established the table RPG as modular rule kernel plus local deployment — the original fork-friendly platform.
