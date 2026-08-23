---
layout: essay
title: Encryption Is Not a Feature
dek: "It is the temperature at which trust is possible."
number: 005.82
sort_key: 0005.82
date: 2026-02-03
cover: /assets/images/cover-code.svg
type: pillar
read_time: 7
tags: ['craft']
brief:
  system: Nightbind session and payment token storage
  issue: PM asks to "add encryption" as a sprint line item after a security questionnaire
  constraint: no new crypto dependencies; clarify threat model before any code changes
---

Encryption keeps getting sold as a line item, as if a product could meaningfully ship without it. That framing helps the seller. Unencrypted hops are not a baseline. They are a regression you have not named yet.

## Thesis

**Encryption is ambient infrastructure, not a checkbox.** The conversation worth having is threat model, key custody, and failure behavior. Whether to encrypt is already answered. Who can decrypt, and when, is not.

## Context

On Nightbind a security questionnaire arrived mid-sprint: *Does the product encrypt data at rest and in transit?* The PM translated it into a story titled "Add encryption." Engineering already had TLS on every public edge and AES-256 on the payment token column. What we did not have was a written answer to who can decrypt what, under which authority, and what happens when keys rotate or a lawyer arrives with a request.

The gap was not algorithm choice. Nobody outside the backend had language for the system we had already built. Nobody inside had documented what we had not built, like client-side keys for exported notes. "Add encryption" sounded like progress. It was theatre unless it named a specific hole in the threat model.

I am writing this from Auckland in 2026, on Fedora, with mystic-bytes drafts in Cursor. The hosting story for a small writing site is boring on purpose: HTTPS at the edge, disk encryption from the provider, secrets out of the repo. Boring is the point. A relocation is a bad time to discover that a "privacy feature" was a marketing sentence sitting on top of server-held keys I can still read.

## Mechanism

When encryption is a feature, teams ship the minimum that satisfies a form: TLS at the load balancer, a column marked `encrypted` in a diagram, a lock icon. Each of those can be correct in isolation and wrong as a system. TLS that terminates at the edge and re-encrypts nowhere leaves plaintext on the internal hop. Database encryption at rest that the operator can read is access control with extra steps. It is not confidentiality against the person with the admin role.

Bruce Schneier's lasting point is still the useful one: crypto answers *who are you protecting against, and what are they allowed to do?*[^1] Without that question you optimize for auditors and incident lawyers, not for users.

Treat crypto like plumbing. You do not ship a house and offer indoor water as a premium tier. Water runs. The design work is diameter, shutoff valves, and what happens when a pipe bursts.

In transit means every hop, including service to service, not only browser to API. At rest means keys separated from data by at least one boundary the attacker must cross. In use is the expensive layer people skip. If you claim end-to-end encryption, this is where the claim lives or dies. mystic-bytes does not claim E2E. Postgres at-rest encryption from the host covers casual disk theft at the provider. It does not cover me, and it does not cover a stolen database credential. I say that out loud so I cannot oversell privacy I do not deliver.

Key custody is the politics. Diffie and Hellman gave us the mathematics of public-key exchange. The product question they leave you with is who holds the private key.[^2] Server-held keys mean the vendor can read user data, which is sometimes required for abuse response and sometimes a business model. Client-held keys mean recovery is the user's problem and lawful access is harder. Neither is free. Both are choices about power. AES versus ChaCha20 is almost never the decision that matters.

Theatre has a body count. WEP, MD5-signed cookies, "encrypted" backups stored next to the key on the same object prefix: users infer a guarantee the system never made. The breach is worse because the trust was explicit and false. A questionnaire that you answered "yes" to without a threat model is how theatre gets a signature.

## Tradeoffs

Server-side keys enable search, moderation, account recovery, and support debugging. Client-side keys enable a story against vendor compromise. Envelope schemes split the difference and multiply the ways to get it wrong. Pick the story you can operate at 2am from a different hemisphere, not the story that looks best on a marketing page.

Encrypting large blobs in the application layer costs CPU and complicates indexes. Full-disk or volume encryption is nearly free and protects a narrower adversary. Match the layer to the adversary you named.

SOC 2 and similar programs ask for evidence. Evidence is not the same as safety. You can pass a form with TLS 1.2 and encrypted volumes while logging payment payloads to a plaintext aggregator. The checklist is a floor.

"Add encryption" is the right ticket when the threat model names a gap: a new data class on an unencrypted bus, a backup copying to a public bucket, a webhook secret in git. Then the story is surgical. Name the hop.

## Close

Before the next questionnaire becomes a sprint, write three sentences: who we protect against, what material we protect, who holds keys and how they rotate. If those sentences are already true, the ticket is documentation. If they are not, the ticket names the hop, not the algorithm.

I keep the mystic-bytes version of those sentences in an operator note, not in a lock icon. Trust is a temperature. Features do not set it.

— JV · Dark Heart Labs.

## References

[^1]: Bruce Schneier, *Applied Cryptography* (Wiley, 1996) and essays at schneier.com. Threat modeling as the prerequisite to crypto design; security as a process rather than a product.

[^2]: Whitfield Diffie and Martin E. Hellman, "New Directions in Cryptography," *IEEE Transactions on Information Theory* 22, no. 6 (1976). Public-key cryptography, and the custody question asymmetric keys still force on products.
