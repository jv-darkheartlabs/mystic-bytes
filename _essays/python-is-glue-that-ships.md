---
layout: essay
title: Python Is Glue That Ships
dek: "The language wins because the next library is already there — and that is also how the footguns arrive."
number: 005.210
sort_key: 0005.210
date: 2026-08-05
cover: /assets/images/cover-code.svg
read_time: 6
tags: [craft]
type: pillar
brief:
  system: mystic-bytes inventory and date-band scripts
  issue: a "just a script" operator grew import-path and packaging debt with no declared package
  constraint: keep one-file operators runnable from the repo; no packaging rewrite mid-batch
---

Python is the language I open when the job is to join two formats before morning, not to found a new runtime. The next library is already there. That is why the work ships. That is also how the footguns arrive: an import that only works from one cwd, a dependency you never meant to own, a default argument that mutates across calls.

## Thesis

**Python wins as glue because the import path and the package index are the product.** The language is adequate. The library density is the reason a date-band script leaves the editor instead of waiting for a "real" rewrite. Treat that density as a shipping advantage and as a surface that will punish sloppy packaging.

## Context

mystic-bytes keeps inventory work in Python because YAML, dates, and path math are boring in the best way. `scripts/writing/assign-shelf-numbers.py` walks journal and wellness posts, writes `number` and `sort_key`, and stops. `scripts/writing/generate-manifest.py` stamps date bands onto a writing manifest from folder names and a handful of flagship paths. Neither started as a package. Both started as "just a script" with a shebang and a `from pathlib import Path`.

The footgun was not syntax. It was the lie that a file with imports is not a module. I ran the shelf-number script from `_essays/` once, Cursor-complete in the loop, and watched it miss `ROOT` because `Path(__file__).resolve().parents[2]` assumed a layout the shell had left. A later pass added `from __future__ import annotations` and a docstring that claimed the script was the interface. Packaging would have made the layout explicit. A one-file operator on a Fedora box in the Auckland 2026 window did not want a `pyproject.toml` ceremony in the middle of a batch. So the constraint stayed: runnable from the repo, no silent `sys.path` hacks, document the cwd in the header.

They call this pragmatism. It is, until the second script imports the first by copying functions instead of declaring a package.

## Mechanism

The Python import system is the language's theory of how code finds code: `sys.path`, finders, loaders, `sys.modules` as the cache, packages as directories with `__init__.py` (or namespace packages without it). A script you execute as `__main__` is not on that chain the way an installed package is. If you pretend otherwise, you get the mystic-bytes class of bug: it works on your machine because you always run it from the directory the comment forgot to name.[^1]

PEP 8 is a style guide, not a compiler. I follow it in these scripts because Cursor will invent a third import style in the same file if I do not pick one. The point is a shared grep surface so a one-file operator stays readable when the batch is fourteen hundred covers and you are tired.[^2]

Library density is why the job ships. Dates, JSON, pathlib, argparse, and re live in the stdlib. PyPI fills the rest. That is why I did not write a YAML parser. It is also why a "small" script can grow a virtualenv you never declared. If the job is inventory, pin what you import. If you only need the stdlib, say so in the header so the next clone does not `pip install` folklore.

Mutable defaults, import-time side effects, and `from module import *` hide state in the import graph. The date-band script kept `DATE_BANDS` as a module-level constant and did I/O in `main`. Import must not mean "run the job."

On Fedora I run these with `python3` and a shebang. No conda. No mystery `python` on PATH. The language is portable; the operator's PATH is not.

## Tradeoffs

**Ship tonight vs package tomorrow.** A declared package with `pyproject.toml` makes imports honest. It also adds a ceremony that kills a one-off inventory pass. I delay packaging until a second file needs to import the first. Copy-paste is the honest first draft. A third copy is a package you refused to name.

**Stdlib vs PyPI.** Stdlib glue is boring and present. Third-party glue is faster until the pin drifts. mystic-bytes inventory scripts stay on stdlib on purpose. Vision and cover work can pull more; the writing numbers should not.

**Cursor speed vs import hygiene.** Completions will add an import that pulls a library you do not own. Read the import block before you run.

**When "just a script" is correct.** One file, one job, stdlib only, documented cwd. The day it grows a sibling, you owe the import system a package.

## Close

Python is glue that ships because the next library is already there. Name the package when glue becomes a graph. Until then, treat `__file__`, `sys.path`, and the shebang as the contract, and PEP 8 as the grep surface. The footguns are not exotic. They are what happens when you deny that a script is already a module.

Run the inventory scripts from the path the header names. If you cannot say that path in one line, you are ready to package.

— JV · Dark Heart Labs.

## References

[^1]: Python Software Foundation, *The Python Language Reference*, "The import system." The canonical description of finders, loaders, `sys.modules`, and how `__main__` is not an installed package — the mechanism this essay treats as the real product.

[^2]: Guido van Rossum, Barry Warsaw, and Alyssa Coghlan, PEP 8 — *Style Guide for Python Code*. The shared naming and import conventions that make one-file operators greppable; not a type system, a social contract for readers.
