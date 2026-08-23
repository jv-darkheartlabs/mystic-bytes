---
layout: essay
title: Privacy Is a Design Constraint
dek: "Every field you collect is a promise you have to keep, including the ones hiding in the logs."
number: 323.448
sort_key: 0323.448
date: 2026-08-23
cover: /assets/images/cover-code.svg
type: pillar
read_time: 6
brief:
  system: mystic-bytes analytics, 404 logs, and Jekyll build output
  issue: default collection of referrers, search queries, and IP-adjacent headers "for debugging"
  constraint: no counsel on call; purpose limitation before the first tracker snippet; not legal advice
---

Encryption answers how you protect bytes you already decided to hold. I have written that piece. This one is earlier: whether you should have the bytes at all, how long they stay, and who they identify when a log line is enough. GDPR-shaped thinking is useful even when GDPR is not your statute. I am not your privacy lawyer. Recitals and taxonomies are design tools, not a sticker for mystic-bytes.

## Thesis

**Privacy is a constraint on collection, retention, and identification, decided at design time.** If the schema, the log format, and the analytics snippet can grow without a purpose written down, you have a hobby of accumulating people.

## Context

mystic-bytes is a Jekyll site. The temptation to "just add" is constant: a 404 log so I can fix dead links, a referrer list, a newsletter field I do not need yet. Each one is a collection event dressed as curiosity.

The 404 log was the one that caught me. Paths are useful. Paths with query strings are often emails, reset tokens, internal preview keys, or search terms someone typed in a moment they did not think of as a data submission. IP-adjacent headers on a small origin make a reading session into a record of a person at a time. I wanted a carpenter's list of broken URLs. I almost built a miniature surveillance file because the default in the logging library was verbose and I had not written a purpose.

Auckland 2026 adds a second clock. New Zealand's Privacy Act 2020 is principle-based: collect for a purpose, do not keep what the purpose does not need, be careful when the information can identify someone. The EU regulation is louder in the industry press. The design move is the same. Small sites inherit large-site defaults: trackers, verbose access logs, form fields kept "in case." Later is not a purpose. Later is how you hold a biography you cannot defend.

## Mechanism

**Collection is the fork that matters.** Daniel Solove's taxonomy puts information collection in a family with processing, dissemination, and invasion: distinct harms, not one blob called "privacy."[^1] Designers collapse them into a lock icon. The lock is encryption and access control. Collection is the moment you create a record that can be processed or leaked at all. If the field does not exist, Solove's later categories have less to eat.

**Purpose limitation is a schema review.** GDPR Recital 39 talks about data minimized to what is necessary, kept no longer than needed, and processed for purposes the person can understand.[^2] Translate that out of recital voice: every column and every log field needs a sentence that names why it exists and when it dies. "Debugging" is a sentence only if you name the incident class and the retention. Infinite debug is a second product.

On mystic-bytes I keep referrer collection off unless I am diagnosing a crawl problem for a bounded window. Search queries do not belong in lasting 404 archives. Build logs should not print draft titles next to emails. The Jekyll source in git is already a disclosure surface.

**Identification is a gradient.** A name is obvious. A stable device id, a full IP plus timestamp plus user agent, a unique URL sent to one person: identification by other means. Hash or truncate where the purpose is counting. Drop where the purpose is curiosity.

**Defaults are the real policy.** A logging library that dumps headers, an analytics snippet with extra events on, a form generator that asks for phone "in case": those are collection architecture. Changing the default is the design work. A privacy page that apologizes afterward documents a constraint you refused to put in the code.

## Tradeoffs

**Useful diagnostics vs a file on a person.** I still want to know that `/p/old-slug/` 404s. Path allowlist, short retention, no query string. Less colour in the graph, a lot less accident.

**First-party analytics vs none.** Aggregate page counts without a cross-site profile is a different product from dumping raw logs into a spreadsheet. If I cannot explain the identifier, I do not enable the event.

**Legal floors vs studio practice.** GDPR, the NZ Privacy Act, and sector rules set floors that may or may not apply. Studio practice can be stricter: collect less than the floor allows. That is cheaper than becoming a processor of stories you never needed. When collection *is* the point (comments, a workshop signup), write the purpose anyway, with deletion in the same design. The constraint forbids holding data as a side effect of debugging, not holding it on purpose.

## Close

mystic-bytes stays small on purpose: HTTPS, boring logs, no bonus dossier in the 404 file, no field that exists because a template included it. Encryption is how you treat secrets you already mint. Privacy is how you decide which secrets you mint.

Before the next snippet or column, write the purpose in the PR. If you cannot, do not collect it.

— JV · Dark Heart Labs.

## References

[^1]: Daniel J. Solove, "A Taxonomy of Privacy," *University of Pennsylvania Law Review* 154, no. 3 (2006). Collection, processing, dissemination, and invasion as separate harms.

[^2]: Regulation (EU) 2016/679, Recital 39. Minimisation, storage limitation, and purpose a person can understand: design requirements on fields and logs, not a claim that this site is a GDPR programme.
