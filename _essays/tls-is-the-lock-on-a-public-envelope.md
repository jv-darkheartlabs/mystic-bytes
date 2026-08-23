---
layout: essay
title: TLS Is the Lock on a Public Envelope
dek: "The envelope is public. The lock is the only private part."
number: 004.73
sort_key: 0004.73
date: 2026-08-02
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: darkheartlabs.technology HTTPS
  issue: padlock treated as "encrypted, therefore safe," including after mixed-content holes
  constraint: Let's Encrypt via the host; I do not implement a TLS stack
---

TLS is a lock on an envelope anyone can watch travel. It does not hide that you mailed something, to whom, or how often. It hides the contents from the path — if the lock is real, current, and actually used for that hop.

I am a Let's Encrypt user, not a TLS implementer. The host terminates HTTPS. My job is to check that the certificate matches the name, that mixed content does not punch a hole in the padlock, and that I am not describing "encrypted" when the next hop is plaintext. The padlock is not encryption theatre when the handshake is modern and the name binding is valid. It becomes theatre when teams terminate TLS at the edge, speak cleartext internally, and sell the lock icon as a personality.

RFC 8446 (TLS 1.3) cut leftover handshake modes that made downgrade a sport. Let's Encrypt made certificates cheap, which is how defaults change. Cheap is not the same as knowing who holds the private key, or where the bytes sit after the handshake. Trust the name binding for the window it covers. Still ask who can decrypt this hop.

The lock is load-bearing. It is not a brand.

— JV · Dark Heart Labs.

[^1]: E. Rescorla, RFC 8446, "The Transport Layer Security (TLS) Protocol Version 1.3" (IETF, 2018).
