---
layout: essay
title: Protocols as Promises
dek: "A protocol is a promise two strangers agree to keep."
number: 004.6
sort_key: 0004.06
date: 2026-05-17
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: the build cache
  issue: drift between intent and implementation is widening
  constraint: no downtime. no schema break. ship before EOW.
---

A protocol is a promise two strangers agree to keep. Neither party has met the other. Neither will read the other's source code. The only thing standing between them and chaos is a written specification and a shared willingness to honor it.

## Context

The build cache on the mystic-bytes pipeline looked fine until it wasn't. Local builds hit warm artifacts; CI rebuilt from cold and got different hashes. Intent — "cache the compiled asset graph" — had drifted from implementation — "cache a key that silently omitted one input dimension." No downtime, no schema break, ship before end of week: the constraint meant we could not blow away the cache and pretend the contract had never existed. We had to extend the promise without breaking callers who had already shipped against the old one.

That is protocol work, even when the "protocol" is internal. Every boundary — HTTP, webhooks, cache keys, event schemas — is a contract with strangers: future you, the next service, the vendor SDK you do not control.

## Mechanism

**The boring parts are load-bearing.** The exciting parts of a protocol — the new feature, the cool extension, the performance trick — are not what keeps it alive. Version numbers. Error codes. What counts as malformed. What the server may do when the client sends something it does not understand. These define the conditions under which the promise survives when something goes wrong, and something always eventually goes wrong.

Jon Postel's robustness principle — be conservative in what you send, liberal in what you accept — is often quoted and rarely implemented with discipline.[^1] Liberal acceptance without documented rules becomes incompatible lenience: half the ecosystem ignores unknown fields, half rejects them, and the drift shows up as heisenbugs in the build cache, not in the README.

**Forwards and backwards compatibility are ethical commitments.** Every protocol upgrade is a promise to implementers who shipped against the previous version. They wrote code in good faith. They built pipelines on the assumption the contract would hold. Breaking silently — changing a field's meaning, removing a status code, tightening validation without warning — is breach of trust at scale.

Roy Fielding's architectural work on REST treats explicit versioning, uniform semantics, and cache invalidation rules as first-class design problems, not afterthoughts.[^2] Good protocol design treats compatibility as default and breakage as ceremony: major version bump, deprecation window with real timelines, migration path, escape hatch for teams that cannot move on your schedule. Bad protocol design treats compatibility as friction for maintainers. The maintainers are not the customer. The ecosystem is.

**The specification is the substrate.** An unwritten protocol's canonical reference is the source code of whoever is most popular. That is how monocultures form and smaller players spend years guessing what the leader meant. If the protocol matters, write it down — with examples, edge cases, and deliberate ambiguities labeled so implementers do not assume opposite resolutions.

A specification is not marketing. It does not get to use "should" when it means "must." RFC 2119 exists so readers can base production decisions on the precision of your prose.[^3] Mean the keywords.

**Extension without silence.** A reserved field is a future feature with a name. An ignored unknown is a forwards-compatibility gift — if and only if the rule is published before the first extension ships. If unknown fields are "ignore," say so. If the rule is "reject," say so, and accept that you have constrained every future change. Either is defensible. What is not defensible is leaving the rule unspecified and watching strict and lenient camps stop interoperating.

For the build cache: we documented the key formula, added a version byte to the cache namespace, and kept readers accepting both v1 and v2 keys through the week. No schema break. No downtime. The boring ceremony shipped on time.

## Tradeoffs

**Strict vs lenient parsing.** Strict parsers fail fast and reduce ambiguity; lenient parsers survive partial upgrades and messy clients. Postel favors lenience on input, but security-sensitive surfaces often need strict rejection. Pick per boundary and document the pick.

**Specification cost vs velocity.** Writing the contract feels slow until the first cross-team incident. The crossover point arrives faster than most teams admit.

**When to break the promise.** Sometimes the old contract is wrong in ways that cannot be extended — cryptographic weakness, fundamentally unsafe defaults. Breakage with ceremony beats silent corruption. The ceremony is the ethics.

## Close

Design protocols the way you would draft a contract with a stranger you trust but cannot supervise: explicit, conservative, extensible with notice. Assume the world where everyone updates simultaneously does not exist, because it never has.

The protocol that survives is the one whose authors took the boring parts seriously. The exciting parts are why people adopt it. The boring parts are why they stay.

— JV · Dark Heart Labs.

## References

[^1]: Jon Postel, ed., RFC 793 (Transmission Control Protocol, 1981) and the robustness principle as cited across the TCP/IP suite. Postel is the canonical source for conservative-send / liberal-receive interoperability guidance.

[^2]: Roy T. Fielding, "Architectural Styles and the Design of Network-based Software Architectures" (doctoral dissertation, UC Irvine, 2000) — the REST dissertation specifying uniform interface constraints, cache semantics, and explicit versioning concerns for networked systems.

[^3]: S. Bradner, RFC 2119, "Key words for use in RFCs to Indicate Requirement Levels" (IETF, 1997). The standard reference for normative language (MUST, SHOULD, MAY) in protocol specifications.
