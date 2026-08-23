---
layout: essay
title: Incidents Are Curriculum
dek: "The postmortem is the only honest training material the team will ever have."
number: 006.52
sort_key: 0006.52
date: 2026-04-01
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes reading merge queue
  issue: duplicate slug imports corrupt cover manifest; root cause spans three PRs from two departed contributors
  constraint: no new dependencies; fix forward and teach the next operator who has never seen the pipeline
---

## Thesis

**An incident archive is institutional memory with exercises attached.** The postmortem is not compliance paperwork. It is the syllabus for engineers who were not in the room when the system was built. Teams that treat outages as embarrassments to minimize are throwing away the most expensive training material they will ever pay for.

## Context

The mystic-bytes reading merge queue failed quietly. Two batch imports carried the same slug with different cover hashes. The manifest reconciler kept the first write and did not surface a conflict. Covers drifted on the site. No alert fired. The job exited zero. A new contributor would have seen "success" in the logs and moved on.

The root cause was not one bug. It was three PRs across six months: a slug normalizer that lowercased but did not trim, a batch importer that skipped dedup on retry, and a silent fallback in the vision rename step. Two authors had left. The remaining docs described the happy path. The incident write-up was the first honest map of how slugs actually moved through the system.

I could have patched the reconciler, merged, and hoped. That would have taught nobody. The next operator, who has never seen the pipeline and will not meet the people who wrote the normalizer, needed a chapter, not a shrug. Fix forward, no new dependencies, and leave a document that behaves like a lab.

## Mechanism

**Outages are tuition.** John Allspaw and the Etsy engineering culture treated blameless postmortems as a learning technology: fix the system, not the scapegoat.[^1] Richard Cook's "How Complex Systems Fail" adds the harder lesson. Failures are normal, clustered, and obvious only in hindsight.[^2] Together they imply a filing rule. Your incident library is not a shame folder. It is the closest thing you have to a course in your own architecture, taught with real wreckage.

**A useful chapter has a shape.** Timeline with decisions, not only what broke: what humans believed at each minute, including the belief that a zero exit code meant the covers were right. Contributing factors: the retry policy, the missing metric, the onboarding doc that skipped merge semantics. Sharp questions: what would have caught this in review? which test represents this failure mode? Homework with owners: not "be more careful," a ticket, a guard, a runbook diff. If the write-up cannot name an owner and a change, it is a diary entry about feelings.

**The teaching audience is specific.** You are writing for the engineer hired in eighteen months who will touch the merge queue without ever having met the person who wrote the slug normalizer. They will not read the architecture wiki. They will read the postmortem linked from the alert you finally added. Write to that person. Assume they are smart, new, and in a hurry. Assume they will delete the weird guard clause unless you tell them why it exists.

On Nightbind I keep a single `docs/incidents/` directory with the same template every time: impact, detection gap, remediation, follow-ups, links to PRs. New engineers read two entries in onboarding, one recent and one old, because the old one explains the clause they are about to "clean up." That pairing is the curriculum. A single recent postmortem teaches a bug. An old one plus a new one teaches that the system has a memory.

**Blamelessness is not softness.** It does not mean nothing happens next. It means the default question is *why did the system permit this?* rather than *whose finger was on the keyboard?* People still own follow-ups. Shame suppresses the data you need to teach. If the author of the silent fallback still works there, you need them to talk. They will not talk if the document is a prosecution.

**Incidents compound when the homework is optional.** Unreviewed postmortems decay into lore. Lore becomes "you had to be there." That is how teams re-learn the same outage every two years with a new cast. Close the loop in the same tracker you use for features. A follow-up that never ships is a seminar that never assigned the problem set.

**Near-misses belong in the catalog when the detection gap was real.** The mystic-bytes job exiting zero was the miss. Users noticed the covers; the system did not. That gap is the lesson even if you caught it the same afternoon. Waiting for a louder outage to write the chapter is how you pay full price for a quiz you already failed quietly.

## Tradeoffs

**Documentation hours vs repeat outages.** A real postmortem costs a working afternoon. Re-running the incident costs days and the reader's trust in the page they opened. The curriculum is cheaper. Teams that "do not have time to write it down" will find the time to debug it again.

**Transparency vs liability.** Legal sometimes wants a thin written record. The workable compromise is a factual timeline without adjectives, and a separate counsel review when the incident is the kind that draws letters. Skipping the doc to stay safe leaves the next operator unsafe.

**Postmortem theater.** Templates that demand twelve RCA categories breed paste. A short narrative plus concrete follow-ups beats a forty-field form nobody reads. If people are filling dropdowns instead of describing what they believed, the form has replaced the teaching.

**When not to write a seminar.** Pure user error with no system lesson may need a support macro, not a chapter. If the only contributing factor is "they clicked the wrong button and the UI was clear," say so in a sentence and stop. Do not inflate a support ticket into curriculum to look mature.

## Close

Write the next postmortem as if you are onboarding someone who starts Monday. Link the PR that introduced each contributing factor. Grade the homework when it ships. The curriculum is only valid if the exercises get done.

Incidents will keep arriving. The question is whether they leave a chapter or only a scar.

— JV · Dark Heart Labs.

## References

[^1]: John Allspaw, "Blameless PostMortems and a Just Culture," Code as Craft (Etsy), 2012; and *The Art of Capacity Planning* (O'Reilly). Allspaw is the industry reference for incident review as organizational learning — the practice that turns wreckage into a syllabus.

[^2]: Richard I. Cook, "How Complex Systems Fail," *Annals of Emergency Medicine* (2000). Cook's model treats failure as an emergent property of complex systems, which is why a postmortem that stops at one bug is usually incomplete.
