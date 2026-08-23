---
layout: essay
title: CompTIA Security+ Is a Hiring Filter
dek: "HR wants a checkbox. The threat model wants a named adversary."
number: 371.20
sort_key: 0371.20
date: 2026-08-23
cover: /assets/images/cover-code.svg
type: pillar
read_time: 8
tags: ['ops']
brief:
  system: CompTIA Security+ SY0-701 as the default security checkbox on job posts
  issue: treating a domain-weighted multiple-choice exam as a substitute for a threat model
  constraint: public exam objectives only; no claim of holding the cert; DHL threat model is a Fedora laptop and a Jekyll site
---

## Thesis

**Security+ is a hiring filter with a syllabus attached.** It measures whether you can speak the industry's control vocabulary under a clock. It does not measure whether you have named the adversary that can actually hurt the system you run.

## Context

I write this from Auckland in 2026, on Fedora, with mystic-bytes as a Jekyll site on GitHub Pages. I do not hold this badge as a claim in this essay. I read the public objectives the way I read a job post: as an institution that decides who gets past the ATS.

The filter is not subtle. US contractor boards still treat Security+ as a baseline ticket. CompTIA publishes SY0-701 as a maximum of ninety mixed multiple-choice and performance-based items in ninety minutes, split across five weighted domains.[^1][^2] That is a map of what HR is allowed to ask. It is not a map of my disk.

My threat model is a leaked GitHub token, a secret in a repo, a dependency that ships someone else's JavaScript, a laptop changing countries. Bollards and honeyfiles are on the syllabus. They are not on this writing machine. Treating the syllabus as the model is how you pass a screen and still leave a PAT in a gist.

## Mechanism

The exam works because it is a shared language. Domain 1 asks you to compare control categories and types, then recite CIA, AAA, and a Zero Trust sketch with a control plane and a data plane.[^2] That vocabulary is useful. I have sat in rooms where "compensating control" was the only phrase that let a reviewer stop arguing about the missing scanner. Shared nouns are how institutions talk. The hiring filter is buying those nouns.

The format does the rest. Multiple choice rewards the best-named category. Performance-based items add a click-through of a simulated console. Neither asks you to inventory *this* system. Operations is the heaviest domain at twenty-eight percent. Program management is another twenty: governance, risk, evidence.[^2] The exam is a survey of the profession's default nouns, weighted toward the work that generates tickets.

What it cannot do is bind those nouns to an asset list. mystic-bytes has no SOC. Confidentiality here is "the draft is not public until I say so" and "the deploy key is not in the markdown." Integrity is git history I can read. Availability is Pages staying up. The domains will mention all three letters. They will not tell a recruiter whether I rotated the token after airport security.

A hiring filter has to be portable. A threat model is not. CompTIA sells the portable story: pass this, speak security, clear the DoD-shaped checkbox that still shows up in postings with no base attached. I am not in that pipeline. I still inherit the weather. "Security+ or equivalent" is cheaper than reading a threat model in a repo they will not open.

Fedora ops does not map cleanly onto the item bank. SELinux, `firewalld`, disk encryption, SSH keys: real controls on this laptop. The exam scores the category. I can fail to patch a browser and still pick the right letter for "corrective control." The letter is the product.

## Tradeoffs

**Shared language vs local truth.** Take the exam if you need the nouns to get past a gate. Write the threat model anyway. The badge does not name your adversary. You do.

**Breadth vs depth.** Ninety minutes across five domains produces a person who can define phishing, zero trust, and a business continuity phrase. It does not produce a person who has recovered a failed disk or revoked a leaked PAT. Those are different exams, and some of them are just Tuesdays.

**Performance-based garnish vs actual performance.** A simulated firewall rule is not a box that has to boot tomorrow. If you want a stopwatch on a live system, that is a different vendor's product. Do not confuse a PBQ with a lab you own.

**When the filter is the job.** Some roles are the checkbox. Compliance evidence, baseline lists, a contract that names the cert. Then Security+ is not a metaphor. It is the deliverable. Say that out loud so you do not pretend the syllabus was your architecture.

## Close

Read the objectives. Learn the nouns if the market you are entering uses them as a key. Then write three sentences the PDF will not grade: what you are protecting, who you are protecting it from, and what you will do when the control fails. mystic-bytes has those sentences. They mention git and a laptop. They do not mention bollards.

A hiring filter is allowed to be coarse. Your threat model is not. Do not let HR's checkbox become the only document that describes the risk.

— JV · Dark Heart Labs.

## References

[^1]: CompTIA, "Security+ (Plus) Certification," <https://www.comptia.org/en-us/certifications/security/>. Public exam page for series SY0-701: maximum of 90 multiple-choice and performance-based questions, 90 minutes.

[^2]: CompTIA, *Security+ SY0-701 Certification Exam Objectives* (public PDF), <https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-security-sy0-701-exam-objectives-(5-0).pdf>. Five domains and weights: General Security Concepts 12%; Threats, Vulnerabilities, and Mitigations 22%; Security Architecture 18%; Security Operations 28%; Security Program Management and Oversight 20%.
