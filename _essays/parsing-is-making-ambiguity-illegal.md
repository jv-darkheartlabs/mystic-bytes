---
layout: essay
title: Parsing Is Making Ambiguity Illegal
dek: "A parser is a bouncer. Illegal is kinder than probably."
number: 004.83
sort_key: 0004.83
date: 2026-08-07
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: mystic-bytes YAML frontmatter
  issue: unquoted dek with a colon parsed as nested keys; wrong subtitle shipped
  constraint: fail the build on invalid frontmatter; no best-effort YAML
---

A parser's job is not to be clever. It is to turn a byte stream into a structure or to refuse. Ambiguity left in is a bug that the next reader will interpret differently.

Jekyll frontmatter on mystic-bytes taught me this without writing a compiler. A dek with a colon, unquoted, became extra YAML keys. The build did not crash. The page shipped with the wrong subtitle. YAML's friendliness is a pile of legal interpretations. Making ambiguity illegal meant quoting strings, pinning a schema, and failing the build when a field was the wrong type. I consume parsers. I rarely write them. The discipline is the same: parse, don't cast; reject, don't guess.

If two readings are possible, the format is unfinished. Grammars exist so that "probably a title" is not a runtime personality. The kindness is the error at the boundary, while the author is still in the file — not a silent field drop three deploys later.

Ambiguity is cheap to type and expensive to debug. Illegal is cheaper. Fail closed, with a line number, before the page looks finished.

— JV · Dark Heart Labs.
