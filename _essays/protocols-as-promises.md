---
layout: essay
title: Protocols as Promises
dek: "A protocol is a promise two strangers agree to keep."
number: 004.6
sort_key: 0004.06
date: 2026-01-05
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes CI cache and Jekyll asset graph
  issue: local warm cache and CI cold cache produced different hashes
  constraint: no downtime. no schema break. ship before EOW.
---

## Thesis

**A protocol is a promise two strangers agree to keep.** Neither has read the other's source. The only thing between them and chaos is a written specification and a shared willingness to honor it — version numbers included.

## Context

The mystic-bytes pipeline looked fine until it was not. Local Jekyll builds on Fedora hit warm artifacts. GitHub Actions rebuilt from cold and got different hashes. Intent — cache the compiled asset graph — had drifted from implementation — cache a key that silently omitted one input the cover-preprocess still read. No downtime. No schema break. Ship before end of week. We could not blow the cache away and pretend the contract had never existed. We had to extend the promise without breaking callers who had already shipped against the old one.

That is protocol work even when the "protocol" is internal. Every boundary — HTTP, webhooks, cache keys, event schemas, the frontmatter fields Cursor keeps inventing — is a contract with strangers: future you, the next script, the vendor Action you do not control. Auckland 2026 does not give CI a second clock you can argue with. It gives you a weekday and a hash.

Nightbind's Stripe webhooks taught the same lesson on a louder surface. The partner's payload is a protocol. Your handler is an implementation. If you treat retries as a surprise, you did not read the promise.

## Mechanism

The boring parts are load-bearing. The exciting parts of a protocol — the new feature, the clever extension, the performance trick — are not what keeps it alive. Version numbers. Error codes. What counts as malformed. What the server may do when the client sends something it does not understand. Those define the conditions under which the promise survives when something goes wrong. Something always eventually goes wrong.

Jon Postel's robustness principle — be conservative in what you send, liberal in what you accept — is quoted more often than it is implemented with discipline.[^1] Liberal acceptance without documented rules becomes incompatible lenience. Half the ecosystem ignores unknown fields. Half rejects them. The drift shows up as a heisenbug in the build cache, not as a sentence in the README.

Forwards and backwards compatibility are ethical commitments. Every upgrade is a promise to implementers who shipped against the previous version. They wrote code in good faith. Breaking silently — changing a field's meaning, removing a status code, tightening validation without warning — is breach of trust at scale. Roy Fielding's REST work treats uniform semantics and cache invalidation as first-class design problems, not afterthoughts.[^2] Good protocol design treats compatibility as default and breakage as ceremony: major version, deprecation window with a real date, a migration path, an escape hatch for teams that cannot move on your schedule. Bad protocol design treats compatibility as friction for maintainers. The maintainers are not the customer. The ecosystem is.

An unwritten protocol's canonical reference is the source of whoever is most popular. That is how monocultures form. Smaller players spend years guessing what the leader meant. If the protocol matters, write it down — with examples, edge cases, and deliberate ambiguities labeled so implementers do not assume opposite resolutions.

A specification is not marketing. It does not get to use "should" when it means "must." RFC 2119 exists so readers can base production decisions on the precision of your prose.[^3] Mean the keywords.

A reserved field is a future feature with a name. An ignored unknown is a forwards-compatibility gift if and only if the rule is published before the first extension ships. If unknown fields are "ignore," say so. If the rule is "reject," say so, and accept that you have constrained every future change. Either is defensible. Leaving the rule unspecified is how strict and lenient camps stop interoperating.

For the mystic-bytes cache we documented the key formula, added a version byte to the namespace, and kept readers accepting both v1 and v2 keys through the week. No schema break. No downtime. The boring ceremony shipped on time. Cursor wanted to "simplify" the key. Simplifying a key without versioning it is how you break the promise while smiling.

## Tradeoffs

**Strict vs lenient parsing.** Strict parsers fail fast and reduce ambiguity. Lenient parsers survive partial upgrades and messy clients. Postel favors lenience on input. Security-sensitive surfaces often need strict rejection. Pick per boundary. Write the pick down.

**Specification cost vs velocity.** Writing the contract feels slow until the first cross-team incident. The crossover arrives faster than most people admit. A cache-key comment is cheaper than a week of "works on my laptop."

**When to break the promise.** Sometimes the old contract is wrong in ways you cannot extend: cryptographic weakness, an unsafe default, a field that silently truncated titles. Breakage with ceremony beats silent corruption. The ceremony is the ethics.

**Public API vs internal habit.** Internal cache keys still have strangers: next month's CI image, next year's you. Treat them with a slightly smaller ceremony, not with none.

## Close

Design protocols the way you would draft a contract with a stranger you trust but cannot supervise: explicit, conservative, extensible with notice. Assume the world where everyone updates simultaneously does not exist. It never has.

The protocol that survives is the one whose authors took the boring parts seriously. The exciting parts are why people adopt it. The boring parts are why they stay.

— JV · Dark Heart Labs.

## References

[^1]: Jon Postel, ed., RFC 793, *Transmission Control Protocol* (1981), and the robustness principle as cited across the TCP/IP suite. Conservative send, liberal receive.

[^2]: Roy T. Fielding, "Architectural Styles and the Design of Network-based Software Architectures" (doctoral dissertation, UC Irvine, 2000). Uniform interface, cache semantics, and versioning as architectural problems.

[^3]: S. Bradner, RFC 2119, "Key words for use in RFCs to Indicate Requirement Levels" (IETF, 1997). MUST, SHOULD, MAY as production language.
