---
layout: essay
title: Terraform Is a Plan You Can Diff
dek: "Apply is a blast radius. The plan is the review."
number: 005.454
sort_key: 0005.454
date: 2026-08-09
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: Terraform HCL plus state, with `terraform plan` as the review surface
  issue: treating apply as the work while unread plans become hope with a .tf extension
  constraint: DHL does not keep Terraform state for mystic-bytes; Pages and Railway; user not cloud operator
---

Terraform's useful output is not the apply. It is the plan: a diff of what the cloud is versus what the files claim it should be.[^1] I have run that plan as a user on other people's accounts. I do not keep a Terraform state bucket for Dark Heart Labs. mystic-bytes is GitHub Pages. Railway is a dashboard. There is no `aws_instance` with essays on it.

HCL describes resources. The state file remembers what was created. `terraform plan` prints create, update, destroy before you gamble. That is the product. Apply is a button with a blast radius. The plan is the review surface, the way a pull request is the review surface for code. If you cannot read the plan, you are not doing infrastructure as code. You are doing hope with a `.tf` extension.

State is the catch. It is a database of real IDs. Two people applying without a lock is a split brain. A state you cannot decrypt is a hostage. I treat Terraform like git: the files are the intent, the state is the working tree you must not lose. Use it when the failure mode is "we clicked the console and forgot." Skip it when the estate is three services on a PaaS with a UI you already screenshot. A plan you can diff is only valuable if there is a fleet worth diffing.

— JV · Dark Heart Labs.

## References

[^1]: HashiCorp Terraform Docs, "terraform plan," <https://developer.hashicorp.com/terraform/cli/commands/plan>. The execution plan as a readable create/update/destroy diff before apply.
