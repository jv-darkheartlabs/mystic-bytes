---
layout: essay
title: RHCE Is Automation as a Gate
dek: "The old exam asked you to be the runbook. This one asks you to write it."
number: 371.22
sort_key: 0371.22
date: 2026-08-21
cover: /assets/images/cover-code.svg
type: pillar
read_time: 8
tags: ['ops']
brief:
  system: Ansible-era EX294 as the credential after RHCSA
  issue: confusing the Ansible tool with the exam that replaced the old service-config RHCE
  constraint: public Red Hat exam pages; DHL has no inventory; distinct from the Ansible-as-ledger essay
---

## Thesis

**RHCE is automation as a gate.** The current exam does not ask you to be the person who configures the service by hand. It asks you to write playbooks that make a fleet look like you were never in the room. That is a different credential from the old RHCE, and a different object from Ansible the tool.

## Context

I have written about Ansible as SSH with a YAML ledger. That essay is the tool. This one is the badge that turned the tool into a career gate. I do not run Ansible against Dark Heart Labs. Fedora is a workstation I patch by hand. Pages has no SSH. Auckland 2026 does not invent a fleet. I do not hold RHCE as a ticket here. I am looking at the exam as the institution that decided what "engineer" means after RHCSA.

Red Hat's EX294 page now titles the sitting "Red Hat Certified Advanced System Administrator in Ansible." Job posts still say RHCE. The RHCSA page still says you must be an RHCSA to become a Red Hat Certified Engineer in Ansible.[^1] The name weather is IBM-era taxonomy. The gate is stable: after you can administer a box, you prove you can automate the boxes.

The old RHCE was a service exam. Apache and NFS under a clock. You were the automation. The Ansible-era exam replaced that human with a playbook, then graded the playbook by applying it to fresh systems.[^2] That swap is the story.

## Mechanism

EX294 is still performance-based. Multiple systems. Configure Ansible Automation Platform, write playbooks, hit an end state. Red Hat is explicit: they apply your playbooks against freshly installed systems and check the spec.[^2] Persist after reboot. No internet. Product docs. The clock remains. The object under the clock changed.

That second apply is the institution. A playbook that "worked" on the machine you babysat is not enough. A pile of `command:` tasks that needed leftover state is not enough. Idempotence stops being a blog virtue and becomes the pass condition. I have watched a playbook succeed while the box drifted because a task was a raw shell loop. The exam punishes that by running the YAML where you cannot hover.

The old RHCE gated a different sentence: this person can make RHEL offer HTTP and storage by sitting on the box. Useful, and a bottleneck. The Ansible-era gate says the bottleneck is the point. If the fleet still requires you logged in, you are not this kind of engineer yet. RHCSA first, then multiply.[^1]

What it misses: AAP on an exam image is not your inherited repo, not the vault password two teams share, not the collection pin that breaks next quarter. It can grade whether you can express RHEL administration as plays. That is a real skill. It is not surviving someone else's inventory.

IBM bought Red Hat in 2019. Automation Platform is a SKU. The exam teaches the dialect that makes the SKU make sense. I will not buy AAP for a Jekyll site. The job market still uses RHCE as shorthand for "will not SSH into forty hosts like it is 2012." The tool essay covered the ledger. This one is the turnstile.

## Tradeoffs

**Playbooks vs hands.** Automating a task you cannot do by hand produces YAML that you cannot debug. The gate assumes RHCSA already happened. Skip that assumption and you get a certified person who cannot recover when the module lies.

**Clean apply vs inherited repo.** The exam's second-apply trick is the fairest version of Ansible. Work is the unfair version. Budget time for the repo the exam will never give you.

**Vendor exam vs the tool.** Ansible the project is broader than AAP on RHEL. Galaxy, collections, the controller you are not running: the badge is Red Hat's slice. Do not treat EX294 as a general automation license. Treat it as Red Hat's gate.

**When the gate is optional.** No inventory, no RHCE. I am on that side of the line on purpose. I still want the sentence in my head: the industry decided the engineer is the person who writes the play, not the person who was the play.

## Close

If you sit EX294, write plays you would trust on a machine you have never logged into. If you do not, keep the distinction. Ansible is a ledger. RHCE is the institution that made the ledger a gate. mystic-bytes will not grow an inventory for the badge. Read the job posts as policy about how fleets are supposed to change, not as a shopping list for a studio of one.

The old exam made you the runbook. The new one makes you author it, then proves the authoring where you cannot cheat with leftovers. That is a stricter idea of engineer. It is also a product decision wearing a certificate.

— JV · Dark Heart Labs.

## References

[^1]: Red Hat, "Red Hat Certified System Administrator exam | EX200," <https://www.redhat.com/en/services/training/ex200-red-hat-certified-system-administrator-rhcsa-exam>. RHCSA as the stated prerequisite toward Red Hat Certified Engineer credentials.

[^2]: Red Hat, "Red Hat Certified Advanced System Administrator in Ansible Exam | EX294," <https://www.redhat.com/en/services/training/ex294-red-hat-certified-engineer-rhce-exam-red-hat-enterprise-linux>. Performance exam using Ansible Automation Platform; playbooks evaluated by apply against freshly installed systems; persist after reboot; no internet.
