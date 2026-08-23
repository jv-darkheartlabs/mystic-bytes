---
layout: essay
title: Neovim Is a Modal Editor That Refused to Die
dek: "Vim's grandchildren kept hjkl. Lua and LSP made the terminal feel like an IDE."
number: 005.444
sort_key: 0005.444
date: 2026-08-07
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: Neovim as a Vim-lineage modal editor with Lua, LSP, and a UI protocol
  issue: treating Cursor as the only honest editor, or Neovim as a moral requirement
  constraint: Cursor is the mystic-bytes daily driver; Fedora still has a modal editor; user not Neovim core
---

Neovim is Vim that refused to stay a 1990s binary: modal editing, Lua config, a built-in language-server client, a UI protocol so the terminal is optional.[^1] I daily-drive Cursor for mystic-bytes. On Fedora, when I want the buffer to sit still, I still open a modal editor. I am a user of that lineage, not a Neovim core contributor. The publishing stack does not depend on an `init.lua`.

Modal editing survived because the keyboard stayed faster than the mouse for text. Vim did not vanish. Neovim forked the culture toward Lua, treesitter, and LSP so people could have an IDE inside a terminal without waiting on upstream taste. The refusal is cultural: a generation kept `hjkl` while the industry moved to Electron. Cursor is Electron with a model. Neovim is the opposite bet. Both can edit markdown. Only one of them is my loop for this repo most days.

Use Neovim when you want the editor to be a programmable machine you understand. Use Cursor when the task is a repo-shaped agent. I keep both in the toolkit. The modal editor refused to die. That is not an obligation to live there.

— JV · Dark Heart Labs.

## References

[^1]: Neovim Docs, "Intro," <https://neovim.io/doc/user/nvim.html>. Nvim as a Vim-compatible editor with a Lua runtime, LSP client, and remote UI protocol.
