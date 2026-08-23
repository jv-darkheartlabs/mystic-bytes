---
layout: essay
title: GitHub Is the Default Forge
dek: "Git moves bytes. The forge moves the work."
number: 005.433
sort_key: 0005.433
date: 2026-08-11
cover: /assets/images/cover-code.svg
type: pillar
read_time: 9
tags: ['craft']
brief:
  system: jv-darkheartlabs repos for mystic-bytes, NeuroShell, and accessibility-rails-components
  issue: treating GitHub as "just git hosting" while Issues, pull requests, and Actions run the actual process
  constraint: stay on the forge collaborators already have accounts on; no second board of record
---

Git is a content-addressed filesystem with a good story about branches. That is not why the studio's work happens on GitHub. The work happens there because Issues, pull requests, and Actions became the operating system around the filesystem.

## Thesis

**GitHub is the default forge.** The product is not clone URLs. The product is the queue, the review ritual, and the CI that runs when you push. Git remains portable. The social machine is not.

## Context

mystic-bytes, [NeuroShell](https://github.com/jv-darkheartlabs/NeuroShell), and [accessibility-rails-components](https://github.com/jv-darkheartlabs/accessibility-rails-components) all live under [github.com/jv-darkheartlabs](https://github.com/jv-darkheartlabs). I did not pick that because I confuse git with a website. I picked it because a second human — or a future me in Auckland with a different laptop — already knows how to open an Issue, leave a review, and read a red X on a pull request.

This essay is not about commit hygiene, branch lifespan, or morning pulls. Those are git practices. They work on any remote. This is about the forge that ate the remote: the place where "the work" is a thread with labels, not a blob in `.git`.

When mystic-bytes fails a frontmatter check, the failure is an Actions log. When NeuroShell needs a notarization note, it starts as an Issue. When accessibility-rails-components takes a WCAG fix, the proof is a pull request, not a private tarball. That is GitHub as process, not GitHub as disk.

## Mechanism

Issues are the work queue GitHub documents as the default way to track ideas, feedback, and tasks on a repo.[^1] I use them as durable notes that survive Slack's disappearance. A Fedora packaging snag, a Jekyll collection quirk, a VoiceOver miss in a Rails component: if it is not an Issue, it is a vibe. The forge's trick is making the vibe linkable.

Pull requests are the review surface: a compare view, a conversation, a merge button with required checks.[^2] They are also a social protocol. You do not "send a patch" in 2026 unless you are in a project that still lives on mailing lists. You open a PR. Collaborators learned that gesture in school, at work, on a weekend OSS drive-by. The default forge is the one whose gesture they already have muscle memory for.

Actions is CI as a file in the repo. YAML under `.github/workflows`, runners, secrets in the host dashboard.[^3] mystic-bytes uses that path so a bad essay does not wait for me to remember a local hook. The interesting part is not YAML aesthetics. The interesting part is that "green on GitHub" became the shared definition of shippable for a huge slice of software. Other forges copied the shape. GitHub still owns the default.

Network effects did the rest. npm packages point at GitHub. Rails issues live on GitHub. Apple's docs do not. Cursor's public docs do not. The studio still files the work where the graph already is. I can `git remote add` a Forgejo box tomorrow. I cannot move the graph tomorrow.

Pages is a side effect I actually use: Jekyll on GitHub's builders, the same account, the same repo. That is forge gravity again. The static site is not why GitHub won. It is a perk of already having lost the argument about where the canonical git remote lives.

## Tradeoffs

**Convenience versus lock-in.** Issues, project boards, Actions caches, and Pages hostnames do not `git clone` cleanly. The bytes in the repo do. I keep canonical writing in markdown and canonical code in git for that reason. The threads around them are GitHub-shaped. I accept the debt. I do not pretend it is zero.

**Public by default versus private by necessity.** The forge rewards public work. playlist-curator stays private on purpose. Public is a stance, not a moral law. The default forge makes public cheap and private a billing line. Budget for that.

**Actions versus a runner you pet.** GitHub-hosted runners are machines you do not ssh into. That is fine for mystic-bytes. It is a problem when you need Fedora-specific kernels or Apple notarization hardware. Then the forge is the queue and the real builder is elsewhere. Keep the boundary honest in the workflow file.

**When another forge is the right default.** A company with an on-prem mandate, a project that wants mailing-list culture, a government that cannot use Microsoft-owned infrastructure: those are real constraints. Dark Heart Labs is a small studio on the public internet. GitHub is the default because our collaborators already have logins, not because I confuse it with git.

## Close

Use git like a filesystem. Use GitHub like the office. Write down which facts live in markdown and which live in Issues so a laptop swap in Auckland does not require archaeology in a web UI.

The default forge wins by being the place the pull request already happened. If you want out, you need a replacement for the queue, not a replacement for `git fetch`.

— JV · Dark Heart Labs.

## References

[^1]: GitHub Docs, "About issues," <https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues>. Issues as the built-in tracker for feedback, tasks, and conversation on a repository.

[^2]: GitHub Docs, "About pull requests," <https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests>. Compare views, review, and merge as the collaboration unit around git commits.

[^3]: GitHub Docs, "Understanding GitHub Actions," <https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions>. Workflows, runners, and events — CI as files in the repo that define "green."
