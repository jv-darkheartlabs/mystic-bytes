---
layout: essay
title: Ansible Is SSH With a Ledger
dek: "Inventory plus playbooks. The shell history is not the record."
number: 005.456
sort_key: 0005.456
date: 2026-08-08
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: Ansible inventory and YAML playbooks over SSH
  issue: confusing a successful playbook run with a box that actually converged
  constraint: DHL has no host inventory; Fedora is a workstation, Pages has no SSH; user not fleet operator
---

Ansible is SSH with a YAML ledger: an inventory of hosts, playbooks of desired state, modules that should be idempotent if you wrote them that way. I have run playbooks as a user on machines I did not name. I do not run Ansible against Dark Heart Labs. The writing laptop is Fedora I rebuild by hand. Pages has no SSH. There is no inventory file for a studio this small.

The ledger is the point. A shell history is not repeatable. A playbook claims this package, this file, this service started, and you can read that claim in git.[^1] You can diff it. The transport is still SSH, which is why people who hated agents liked it, and why a bad key still ruins the evening. Idempotence is a promise of the module, not a law of YAML. I have watched a playbook "succeed" while the box drifted because a task was a raw command in a loop.

Use Ansible when you have more than a handful of boxes you refuse to click through. Skip it when the estate is a workstation and a PaaS. SSH with a ledger beats SSH with folklore. It does not beat "I do not have a fleet." I read the inventory docs so I can talk to people who do. I still patch this laptop like a laptop.

— JV · Dark Heart Labs.

## References

[^1]: Ansible Docs, "Working with playbooks," <https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_intro.html>. YAML plays as the recorded desired state, pushed over SSH rather than left in a shell history.
