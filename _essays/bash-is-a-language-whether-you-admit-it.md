---
layout: essay
title: Bash Is a Language Whether You Admit It
dek: "Quoting and `set -euo pipefail` are grammar. POSIX will not debug the Fedora script you treated as a comment."
number: 005.213
sort_key: 0005.213
date: 2026-08-08
cover: /assets/images/cover-code.svg
read_time: 6
tags: [craft]
type: pillar
brief:
  system: mystic-bytes vision bash operators and Fedora-local plus CI shells
  issue: unquoted expansions and mixed POSIX/bash assumptions passed locally and failed in CI
  constraint: keep bashisms explicit; fail on unset variables; no "it is only a wrapper" exception
---

I used to treat bash as the comment you type to launch the real program. Then a vision batch on mystic-bytes deleted nothing and also failed to rename, because an unquoted glob and a pipeline that hid `node`'s exit code both counted as success. The shell is a language. It has grammar. It has a standard and a dialect. Fedora's bash and CI's bash will not reconcile your denial.

## Thesis

**A shell script is source code with a user-facing blast radius.** Quoting, `set -euo pipefail`, and the POSIX-versus-bash split are the type system you get. Admit the language or keep paying incident tax on "wrappers."

## Context

mystic-bytes vision work is a pile of Node operators wrapped in bash so I can `tee` a log and set `PARALLEL`. `scripts/readings/run-vision-rename.sh` starts with `#!/usr/bin/env bash` and `set -euo pipefail`. So do reconcile and book-club batch. That header is not folklore I copied from a gist. It is the difference between a failed `node` in a pipeline and a green CI step that wrote a lie to `vision-rename-run.log`.

I still got it wrong. An early version used `PARALLEL=${PARALLEL:-6}` then passed `$PARALLEL` into a Node flag without quotes in a second script. Fine until `PARALLEL` had a space from a copy-paste in Cursor. Word-splitting is not a corner case. It is what unquoted expansions do. Local Fedora zsh is my interactive shell. The script is bash. CI on GitHub Actions is bash on Ubuntu. Three dialects if you count "commands I typed by hand." The bug was me treating the file as a sticky note.

Auckland 2026 does not make this more romantic. I still run these from a Fedora box. `/usr/bin/bash` is Bash 5.x. POSIX `sh` on the same machine is not bash. A script that uses arrays or `[[` and claims `#!/bin/sh` is a defect.

## Mechanism

POSIX defines a shell command language: grammar for pipelines, redirection, parameter expansion, quoting. If you quote nothing, expansion plus IFS splitting plus globbing all run. That is specified behavior, not a prank. Single quotes are literal. Double quotes still expand parameters. `"$file"` is the difference between a filename with a space and four arguments you did not mean.[^1]

Bash is a superset with a maintainer, Chet Ramey. Arrays, `[[`, process substitution, `pipefail`, `extglob` — none of those are POSIX. They are bash. Ramey's manual is explicit about the extensions. If you need them, shebang bash and stop pretending CI `sh` will do. If you do not need them, write POSIX and test with `dash` or `sh` so Fedora and Ubuntu do not surprise you.[^2]

`set -euo pipefail` is the closest thing bash has to strict mode. `-e` exits on a failing command. `-u` treats unset variables as errors. `-o pipefail` makes a pipeline fail if any stage fails, not only the last. Without `pipefail`, `node vision-rename-book-covers.mjs | tee -a "$LOG"` can fail in `node` and still exit 0 because `tee` succeeded. I have a log full of a crash and a CI check that did not see it. That is why the vision scripts set it before they `cd`.

`cd "$(dirname "$0")"` is language, not ritual. Relative paths in a wrapper are how you launch the wrong `node` module from CI versus your laptop. Quote `"$0"`. With `-e`, a failed `cd` should halt.

They write `rm $tmpdir/*` and call it ops. Unquoted glob, possible empty expansion: the language already named that bug. Write a loop. Admit you are programming.

CI is where the dialect split goes to production. GitHub's `run:` blocks are bash by default on Linux runners, with their own `set` defaults unless you change them. A YAML folded scalar can eat your quotes. I keep non-trivial logic in a file under `scripts/` with a shebang, then call the file from the workflow. The workflow is not the program.

## Tradeoffs

**Bash vs POSIX sh.** Bash is nicer to write. POSIX is nicer to port. mystic-bytes vision wrappers are bash on purpose because I want `pipefail` and arrays later. The shebang must match. A Fedora laptop with zsh as login shell does not make the file zsh.

**Strict header vs "simple" scripts.** `set -e` has sharp edges (`||` lists, commands in `if`). Learn them. Do not disable the header because one `grep` returned 1. `cmd || true` is an explicit swallow. Silence is not.

**Inline CI vs files.** Inline is fine for one line. Quoting belongs in a file under `scripts/`.

**When not to use bash.** Heavy JSON, retry graphs, anything with nested data — that is the Node (or Python) the wrapper already calls. Keep bash at the edges: env, cwd, logs, exit codes.

## Close

Bash is a language whether you admit it. Quoting is syntax. `set -euo pipefail` is the strictness you have. POSIX is not bash. Fedora plus CI will teach that if you will not. The vision wrappers in mystic-bytes are small on purpose. They are still programs.

Open the next wrapper. If the shebang, the `set` line, and the quotes would not survive a filename with a space, you have been commenting in a programming language.

— JV · Dark Heart Labs.

## References

[^1]: IEEE Std 1003.1, POSIX *Shell Command Language* (parameter expansion, quoting, pipelines). The baseline grammar; bash extensions are not implied.

[^2]: Chet Ramey, *Bash Reference Manual*. Bash versus POSIX, including `pipefail`, arrays, and `[[` — name the dialect in the shebang.
