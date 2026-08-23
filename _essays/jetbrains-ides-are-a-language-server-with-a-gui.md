---
layout: essay
title: JetBrains IDEs Are a Language Server With a GUI
dek: "The index is the product. Inspections, rename, debugger — then a window around them."
number: 005.445
sort_key: 0005.445
date: 2026-08-07
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: IntelliJ platform indexing, inspections, and refactorings as a thick language engine
  issue: opening a JetBrains IDE for Jekyll frontmatter, or treating LSP-in-VS-Code as the same bet
  constraint: Cursor is the mystic-bytes editor; JV is a JetBrains user on other codebases, not a JetBrains engineer
---

JetBrains IDEs are a language server with a window around it: an index of your code, inspections, refactorings, a debugger, a GUI that makes "find usages" a click. The IntelliJ platform did semantic indexing long before Microsoft published LSP. LSP is the later, editor-agnostic protocol. JetBrains still ships the thicker thing: a semantic engine plus chrome.[^1] I do not daily-drive IntelliJ for mystic-bytes. Cursor is the editor. I have used JetBrains products as a user on other codebases. I have never been a JetBrains engineer.

The product is the index. You wait for it. Then rename is safer, the bulb is a warning, the gutter is coverage. VS Code plus a language server approximates a slice of that. The JetBrains bet is that the GUI and the engine should be one company. That is why RubyMine knows Rails, why IDEA knows Spring, why people tolerate the RAM bill. A protocol cannot love a framework that hard.

Use a JetBrains IDE when the language's real tooling lives there and you will pay for the index. Do not open it to write Jekyll frontmatter. I already have an editor with a model in the loop. The language server with a GUI is a different default, for a different kind of repo.

— JV · Dark Heart Labs.

## References

[^1]: JetBrains Docs, "Language Server Protocol," <https://www.jetbrains.com/help/idea/language-server-protocol.html>. LSP as an add-on to an IDE that already indexed, inspected, and refactored in-process.
