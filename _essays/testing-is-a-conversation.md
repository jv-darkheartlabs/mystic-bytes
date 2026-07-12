---
layout: essay
title: Testing Is a Conversation
dek: "The suite tells you what the system is actually willing to promise."
number: 006.4
sort_key: 0006.04
date: 2024-10-27
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: the merge queue
  issue: the fast path stopped being fast
  constraint: one operator. one terminal. no rollback window.
---

A test suite is not a quality assurance artifact. It is a conversation between past-you and future-you about what the system is actually willing to promise. Every test is a statement of intent that the codebase has accepted as binding.

## Context

The merge queue on a Nightbind-adjacent project had a fast path — green main, small diff, skip the heavy integration lane — until it didn't. One operator, one terminal, no rollback window: a bad merge shipped because the fast path's assumptions were never written as promises. The suite tested implementation details (mock shapes, private helpers) instead of contracts (what callers may rely on). Future-you, reading green CI, believed a promise the system never made.

When I rewrote the lane guards as contract tests — merge allowed when changelog present, semver valid, consumer fixtures pass — the conversation changed. Past-me stopped whispering "probably fine." Future-me got sentences.

## Mechanism

**Tests are executable specifications.** Kent Beck framed test-driven development as design feedback: you write the promise first, then negotiate with reality until the code keeps it.[^1] The negotiation record is the suite. Commits are proposals; tests are the thread where past-you replies.

Glenford Myers argued decades earlier that testing can only show the presence of defects, not their absence — which sounds pessimistic until you realize the suite's job is not omniscience. Its job is to make explicit which risks you are willing to detect and which you are accepting.[^2] A conversation with omissions is still a conversation; silent omissions are lies.

**Wrong tests document wrong promises.** Suites that assert HTTP 200 on happy paths but not error shapes teach future-you that failures are unimportant. Suites that snapshot entire JSON blobs teach that any change is breakage, even when the contract improved. Suites that mock everything teach that integration is someone else's problem — usually the on-call engineer, alone, without rollback.

**The right tests read like an API for trust.** Name the behavior a stakeholder cares about. "Merge queue rejects empty changelog" is a promise to release managers. "Consumer fixture matches published entry schema" is a promise to downstream callers. "Fast path skips heavy lane only when contract tests pass" is a promise to the operator at the terminal.

Jerry Weinberg's writing on the psychology of software testing treats quality as a relationship among people, not a property of disks — testers, developers, operators negotiating what "good enough" means under constraint.[^3] Automated tests automate part of that relationship. They do not remove the need for judgment about which promises matter.

**One operator, no rollback** is the extreme case where the conversation must be complete before the click. Manual checklist plus missing automated contract equals folklore. The merge button should invoke promises you can read without opening the author's brain.

## Tradeoffs

**Coverage vs meaningful promises.** High line coverage with shallow assertions is noise. Prefer fewer tests that encode invariants callers depend on over many tests that encode implementation accidents.

**Speed vs fidelity.** The fast path exists because full integration is expensive. Contract tests at the boundary buy speed without lying — if they track real caller expectations, not wishful stubs.

**Brittleness vs precision.** Overspecified tests increase maintenance tax; underspecified tests increase incident tax. Tune to the stability of the boundary: public contracts deserve precision; internal refactor surfaces deserve behavior-level assertions.

**When not to test.** Exploratory spikes and throwaway prototypes may not earn promises yet. Document the absence deliberately; do not let green CI imply guarantees you have not written.

## Close

Write tests like you are dictating the system's contract — because you are. Future-you is a stranger with fewer context switches and less patience. Past-you owes them sentences, not vibes.

Suites that test the right things become the most useful documentation a project ever has. Suites that test the wrong things become a second codebase you maintain to justify a false sense of safety.

— JV · Dark Heart Labs.

## References

[^1]: Kent Beck, *Test-Driven Development: By Example* (Addison-Wesley, 2002). Beck created/rediscovered TDD as a design practice; the book is the canonical reference for tests as specification and feedback loop.

[^2]: Glenford J. Myers, *The Art of Software Testing* (Wiley, 1979, revised editions). Myers is the foundational authority on what testing can and cannot prove — essential framing for honest test suites.

[^3]: Gerald M. Weinberg, *Perfect Software and Other Illusions about Testing* (Dorset House, 2008). Weinberg's work centers testing as human communication about risk, quality, and shared expectations.
