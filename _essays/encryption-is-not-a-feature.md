---
layout: essay
title: Encryption Is Not a Feature
dek: "It is the temperature at which trust is possible."
number: 005.82
sort_key: 0005.82
date: 2025-10-26
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: Nightbind session and payment token storage
  issue: PM asks to "add encryption" as a sprint line item after a security questionnaire
  constraint: no new crypto dependencies; clarify threat model before any code changes
---

Encryption keeps getting marketed as a feature, as if a product could meaningfully ship without it. That framing benefits the seller and harms the user. Unencrypted communication is not a baseline — it is a regression you have not fixed yet.

## Thesis

**Encryption is ambient infrastructure, not a checkbox.** The engineering conversation worth having is threat model, key custody, and failure behavior — not whether to encrypt.

## Context

On Nightbind a security questionnaire arrived mid-sprint: *Does the product encrypt data at rest and in transit?* The PM translated it into a story: "Add encryption." Engineering already had TLS on every edge and AES-256 on the payment token column. What we did not have was a written answer to *who can decrypt what, under which authority, and what happens when keys rotate or are subpoenaed.*

The gap was not algorithm choice. It was that nobody outside the backend had language for the system we had already built — and nobody inside had documented what we had not built, like client-side key escrow for user-exported notes. "Add encryption" sounded like progress. It was theatre unless it named a specific gap in the threat model.

## Mechanism

**Feature framing hides the contract.** When encryption is a feature, teams ship the minimum that satisfies a checkbox: TLS termination at the load balancer, a column marked `encrypted` in the schema diagram, a marketing page with a lock icon. Each of those can be correct in isolation and wrong as a system. TLS that terminates at the edge and re-encrypts nowhere leaves plaintext on the internal hop. Database encryption at rest that the DBA can read is access control with extra steps, not confidentiality against insider threat.

Bruce Schneier's enduring formulation: encryption is a tool that answers *who are you protecting against, and what are they allowed to do?*[^1] Without that question, you optimize for auditors and incident lawyers, not for users.

**The ambient model treats crypto like plumbing.** You do not ship a house and offer "indoor plumbing" as a premium tier. Water runs through pipes by default; the design work is pipe diameter, pressure, shutoff valves, and what happens when a pipe bursts. Encryption works the same way:

1. **In transit** — every hop, including service-to-service, not only browser-to-API.
2. **At rest** — with keys separated from data by at least one boundary the attacker must cross.
3. **In use** — the hardest layer; often skipped because it is expensive. If you claim end-to-end encryption, this is where the claim lives or dies.

**Key custody is the politics.** Whitfield Diffie and Martin Hellman gave us the mathematics of public-key exchange; the product question they leave you with is *who holds the private key?*[^2] Server-held keys mean the vendor can read user data — sometimes legally required for abuse response, sometimes a business model. Client-held keys mean recovery is the user's problem and lawful access is harder. Neither is free. Both are choices about power distribution, not about AES vs ChaCha20.

On mystic-bytes I store reading metadata in Postgres with standard at-rest encryption from the host. I do not pretend that encrypts against me or against a compromised database credential. The threat model is *casual disk theft at the provider*, not *malicious operator*. Naming that aloud prevents me from overselling privacy I do not deliver.

**Theatre has a body count.** When encryption is marketed but not wired — WEP, MD5-signed cookies, "encrypted" backups stored next to the key on the same S3 prefix — users infer a guarantee the system never made. The breach is worse because the trust was explicit and false.

## Tradeoffs

**Server-side vs client-side keys.** Server-side enables search, moderation, account recovery, and support debugging. Client-side enables plausible deniability against vendor compromise. Hybrid schemes (envelope encryption, per-user keys wrapped by a master) split the difference and multiply the ways to get it wrong.

**Performance vs coverage.** Encrypting large blobs in the application layer costs CPU and complicates indexing. Full-database TDE is nearly free and protects a narrower threat. Pick the layer that matches the adversary you named.

**Compliance vs security.** SOC2 and HIPAA ask for evidence. Evidence is not the same as safety. You can pass a questionnaire with TLS 1.2 and encrypted EBS while logging full payment payloads to a plaintext log aggregator. The checklist is a floor.

**When "add encryption" is the right ticket.** When the threat model names a gap: a new data class crossing an unencrypted bus, a backup pipeline copying to a public bucket, a webhook signing secret stored in the repo. Then the story is surgical.

Before the next security questionnaire becomes a sprint, write three sentences: who we protect against, what material we protect, who holds keys and how they rotate. If the answer is already satisfied, the ticket is documentation. If it is not, the ticket names the hop, not the algorithm.

— JV · Dark Heart Labs.

## References

[^1]: Bruce Schneier, *Applied Cryptography* (Wiley, 1996) and subsequent essays at schneier.com. Schneier is the standard public reference for threat modeling as the prerequisite to any crypto design — the author who popularized "security is a process, not a product."

[^2]: Whitfield Diffie and Martin E. Hellman, "New Directions in Cryptography," *IEEE Transactions on Information Theory* 22, no. 6 (1976). The paper that introduced public-key cryptography; the custody implications of asymmetric keys remain the decisive product fork for any system claiming encryption.
