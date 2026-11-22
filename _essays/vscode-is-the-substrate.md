---
layout: essay
title: VS Code Is the Substrate
dek: "The forks and the AI editors sit on a Microsoft workbench. The marketplace is the policy."
number: 005.443
sort_key: 0005.443
date: 2026-08-18
cover: /assets/images/cover-code.svg
type: pillar
read_time: 8
tags: [craft]
brief:
  system: the VS Code editor platform — workbench, extension API, LSP, and Marketplace
  issue: forks and AI overlays treated as different editors when they share one workbench, one extension API, and one marketplace gravity
  constraint: analysis of public builds and docs; no Microsoft employment claim; distinct from the agent loop essay
---

## Thesis

**VS Code is the editor substrate.** The workbench, the extension host, and the Language Server Protocol are the platform. VSCodium, Codespaces, the AI editors, and a pile of "new IDEs" are skins, forks, and billing layers on that platform. If you only audit the skin, you miss who owns the sockets.

## Context

The window looks like VS Code because it is VS Code's chrome: explorer, editor groups, problems panel, integrated terminal, the same keybinding vocabulary. Open nearly any "new editor" of the last five years and that is the room you are standing in.

This is an analysis of public builds, public docs, and a public store; no one quoted here works at Microsoft. There is a separate essay about the agent with a repo in the loop. That one is about judgment and diffs. This one is about the floor those products stand on.

The floor is easy to forget because it is comfortable. Comfort is how a substrate wins.

## Mechanism

**The workbench is the shared ABI.** Microsoft shipped Visual Studio Code as an Electron app with a documented extension API: contributes, activation events, webviews, the debug adapter protocol. Languages do not each reinvent a UI. They ship an extension that talks to a language server. The Language Server Protocol, published by Microsoft and now a community spec, is the move that made "VS Code support" the default definition of editor support.[^1] Once `gopls`, `rust-analyzer`, and a hundred others spoke LSP, the interesting editor was the one that already hosted those processes. Vim can speak LSP. Most teams did not wait for Vim. They waited for the marketplace listing.

**The Marketplace is industrial policy.** An extension is not just a folder of TypeScript. It is an identity in a Microsoft-operated store: publisher verification, malware scanning, a take-down path, and a search rank that decides whether your theme or your linter exists for people who will never clone a VSIX by hand. Forks that refuse Microsoft telemetry still want those extensions. VSCodium's whole plot is "the MIT editor without the Microsoft brand and phone-home," plus the awkward truth that many extensions are licensed or signed for the official Marketplace only.[^2] Open source the workbench; keep the economy. That is a platform move, not a charity.

**Forks inherit the substrate. They do not replace it.** The AI editors add a model loop and their own accounts. GitHub Codespaces is VS Code in a browser billed as compute. Other AI editors clone the activity bar because users already have muscle memory and a `settings.json`. When Microsoft changes the extension API or the proposed API surface, the forks chase. When the Marketplace changes terms, the forks negotiate or they ship a thinner plugin list. A user can switch binaries in an afternoon. Nobody can switch the decade of extensions, snippets, and "just install this" onboarding docs that assume the VS Code API.

**Telemetry and branding are the remaining fork arguments.** Upstream VS Code is MIT on GitHub and a Microsoft product in the installer. The product build talks home. VSCodium rebuilds from the repo with that stripped. The AI editors talk to their own vendors. The editing model is still Monaco, still the same command palette, still the same assumption that a language is an extension plus a server. Choose the phone-home policy. Do not pretend you chose a different architecture.

## Tradeoffs

**Marketplace convenience vs custody.** The store is why a new hire is productive on day one. It is also why a publisher outage, a broken update, or a policy change can take a linter off every machine at once. Pin versions. Mirror the VSIX you actually depend on. Treat "latest" like you treat `latest` on Docker Hub.

**Fork vs upstream.** VSCodium buys a quieter build and costs Marketplace friction. An AI editor buys a loop and costs a second vendor in the same window. Upstream VS Code buys the path of least resistance and Microsoft's defaults.

**When a thinner editor is correct.** For hex, a layout file, a buffer that needs to sit still: Vim or a stock VS Code window with extensions disabled still wins. The substrate is optional at the file. It is not optional at the industry. Your collaborators will paste a Marketplace link. Plan for that, even if your own config is a `settings.json` you wrote by hand.

## Close

Audit the workbench you are actually running: binary, telemetry, Marketplace account, which extensions can phone whom. Call the AI editors loops. Call VSCodium a rebuild. Call VS Code the substrate those sentences sit on. Microsoft did not win by being the only editor. Microsoft won by becoming the one every other editor has to speak.

— JV · Dark Heart Labs.

## References

[^1]: Microsoft, Visual Studio Code documentation and the Language Server Protocol specification, <https://microsoft.github.io/language-server-protocol/>. The workbench plus LSP is why "editor support" collapsed into "does it run here."

[^2]: VSCodium, project documentation, <https://github.com/VSCodium/vscodium>; Visual Studio Marketplace terms and publisher agreements. The MIT repo is not the store. The store is the economy.
