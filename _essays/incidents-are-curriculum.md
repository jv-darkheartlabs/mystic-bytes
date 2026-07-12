---
layout: essay
title: Incidents Are Curriculum
dek: "The postmortem is the only honest training material the team will ever have."
number: 006.52
sort_key: 0006.52
date: 2024-09-29
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes reading merge queue
  issue: duplicate slug imports corrupt cover manifest; root cause spans three PRs from two departed contributors
  constraint: no new dependencies; fix forward and teach the next operator who has never seen the pipeline
---

Every incident is curriculum. The postmortem is the textbook chapter. The blameless retrospective is the seminar. The fix is the homework. Teams that treat incidents as embarrassments to minimize are throwing away the most expensive training material they will ever pay for.

## Thesis

**An incident archive is institutional memory with exercises attached.** The postmortem is not compliance paperwork — it is the syllabus for engineers who were not in the room when the system was built.

## Context

The mystic-bytes reading merge queue failed quietly: two batch imports carried the same slug with different cover hashes, and the manifest reconciler kept the first write without surfacing a conflict. Covers drifted on the site. No alert fired — the job exited zero. A new contributor would have seen "success" in the logs and moved on.

The root cause was not one bug. It was three PRs across six months: a slug normalizer that lowercased but did not trim, a batch importer that skipped dedup on retry, and a silent fallback in the vision rename step. Two authors had left. The remaining docs described the happy path. The incident doc was the first honest map of how slugs actually moved through the system.

## Mechanism

**Outages are tuition.** John Allspaw and the Etsy engineering culture popularized blameless postmortems as a learning technology: fix the system, not the scapegoat.[^1] Richard Cook's "How Complex Systems Fail" adds the harder lesson — failures are normal, clustered, and visible only in hindsight.[^2] Together they imply: your incident library is not a shame folder; it is the closest thing you have to a lab course in your own architecture.

**What good curriculum contains:**

1. **Timeline with decisions** — not only what broke, but what humans believed at each minute.
2. **Contributing factors** — the retry policy, the missing metric, the onboarding doc that skipped merge semantics.
3. **Sharp questions** — what would have caught this in review? what test represents this failure mode?
4. **Homework with owners** — not "be more careful"; a ticket, a guard, a runbook diff.

**The teaching audience is specific.** You are writing for the engineer hired in eighteen months who will touch the merge queue without ever having met the person who wrote the slug normalizer. They will not read the architecture wiki. They will read the postmortem linked from the alert you finally added.

On Nightbind I keep a single `docs/incidents/` directory with the same template every time: impact, detection gap, remediation, follow-ups, links to PRs. New engineers read two entries in onboarding — one recent, one ancient — because the ancient one explains the weird guard clause they are about to delete.

**Blamelessness is not softness.** Blameless does not mean consequence-free. It means the default question is *why did the system permit this?* rather than *whose finger was on the keyboard?* People still own follow-ups. The culture shift is that shame suppresses the data you need to teach.

**Incidents compound.** Unreviewed postmortems decay into lore. Lore becomes "you had to be there." That is how teams re-learn the same outage every two years with a new cast.

## Tradeoffs

**Documentation tax vs repeat outages.** Writing a real postmortem costs hours. Re-running the incident costs days and customer trust. The curriculum is cheaper.

**Transparency vs liability.** Legal sometimes wants minimal written record. The compromise is factual timelines without adjectives, and separate counsel review — not skipping the doc.

**Postmortem theater.** Templates that demand RCA categories breed paste. A short narrative plus concrete follow-ups beats a forty-field form nobody reads.

**When not to write.** Near-misses with no user impact still teach if the detection gap was real. Pure user error with no system lesson may need only a support macro, not a seminar.

Write the next postmortem as if you are onboarding someone who starts Monday. Link the PR that introduced each contributing factor. Close the loop when homework ships — the curriculum is only valid if the exercises get graded.

— JV · Dark Heart Labs.

## References

[^1]: John Allspaw, "Blameless PostMortems and a Just Culture," Code as Craft (Etsy), 2012; and *The Art of Capacity Planning* (O'Reilly). Allspaw is the industry reference for blameless incident review as organizational learning — the practice that turns outages into curriculum.

[^2]: Richard I. Cook, "How Complex Systems Fail," *Annals of Emergency Medicine* (2000). Cook's seventeen-point model is the standard clinical-and-ops reference for failure as an emergent property of complex systems, not an exceptional one.
