---
layout: essay
title: Windows Is the OS Most Users Actually Have
dek: "NTFS and WSL are facts. Contempt is not a compatibility layer."
number: 005.438
sort_key: 0005.438
date: 2026-08-01
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: collaborators and readers on Windows, including WSL users opening DHL repos
  issue: POSIX-only assumptions in scripts and docs treated as moral high ground
  constraint: do not invent a Microsoft job; keep Fedora as personal daily driver
---

Windows is the operating system most people already paid for. That is not a personality flaw. It is the install base.

I daily-drive Fedora. NeuroShell ships on macOS. mystic-bytes is markdown in git. None of that makes NTFS optional for a reader who clones a repo on a lunch break in Auckland or anywhere else. Line endings, case-insensitive paths, and a drive letter are not "doing it wrong." They are the filesystem Microsoft documented and a billion machines still boot into.

WSL exists because a Unix-shaped toolchain still has to meet that world. It is a translation, not a conversion. You get a Linux userland beside NTFS, with all the usual surprises about what `chmod` means on a Windows mount. Git still trips on CRLF. I use WSL as a compatibility story in docs, not as proof that Windows users were supposed to dual-boot Fedora with me.

If a script assumes `/usr/bin` and a case-sensitive disk, say so. Do not dress the assumption as taste. Most users have Windows. Ship as if that were true, because it is.

— JV · Dark Heart Labs.
