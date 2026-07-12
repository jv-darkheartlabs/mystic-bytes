#!/usr/bin/env python3
"""Assign Dewey-ish signal numbers, sort keys, and covers to journal/wellness posts."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
JOURNAL = ROOT / "_journal"
WELLNESS = ROOT / "_wellness"

COVER_ARCHIVE = "/assets/images/cover-archive.svg"
COVER_CRAFT = "/assets/images/cover-craft.svg"


def sort_key_for(number: str) -> str:
    major, minor = number.split(".", 1)
    return f"{int(major):04d}.{minor}"


def parse_frontmatter(text: str) -> tuple[str, str]:
    if not text.startswith("---"):
        return "", text
    end = text.index("---", 3)
    return text[3:end], text[end + 3 :]


def upsert_field(fm: str, key: str, value: str) -> str:
    pattern = rf"^{re.escape(key)}:.*$"
    line = f"{key}: {value}" if key == "cover" else f'{key}: "{value}"' if key == "dek" else f"{key}: {value}"
    if key in ("number", "sort_key", "read_time", "cover", "date"):
        line = f"{key}: {value}" if key != "cover" else f"cover: {value}"
    if key == "number":
        line = f"number: {value}"
    elif key == "sort_key":
        line = f"sort_key: {value}"
    elif key == "cover":
        line = f"cover: {value}"
    elif key == "read_time":
        line = f"read_time: {value}"
    if re.search(pattern, fm, re.MULTILINE):
        return re.sub(pattern, line, fm, count=1, flags=re.MULTILINE)
    return fm.rstrip() + f"\n{line}\n"


def add_redirect(fm: str, url: str) -> str:
    if url in fm:
        return fm
    if "redirect_from:" in fm:
        return re.sub(
            r"(redirect_from:\n(?:  - .+\n)+)",
            lambda m: m.group(1) + f"  - {url}\n",
            fm,
            count=1,
        )
    return fm.rstrip() + f"\nredirect_from:\n  - {url}\n"


def strip_layout(fm: str) -> str:
    return re.sub(r"^layout: (journal|wellness)\n", "", fm, flags=re.MULTILINE)


def process_dir(directory: Path, band: str, cover: str, redirect_prefixes: list[str]) -> int:
    files = sorted(directory.glob("*.md"), key=lambda p: p.read_text(encoding="utf-8"))
    # sort by date in frontmatter
    dated: list[tuple[str, Path]] = []
    for path in files:
        fm, _ = parse_frontmatter(path.read_text(encoding="utf-8"))
        m = re.search(r"^date:\s*(.+)$", fm, re.MULTILINE)
        dated.append((m.group(1).strip() if m else "", path))
    dated.sort(key=lambda x: x[0])

    count = 0
    for idx, (_, path) in enumerate(dated, start=1):
        slug = path.stem
        number = f"{band}.{idx:02d}"
        sk = sort_key_for(number)
        text = path.read_text(encoding="utf-8")
        fm, body = parse_frontmatter(text)
        fm = strip_layout(fm)
        fm = upsert_field(fm, "number", number)
        fm = upsert_field(fm, "sort_key", sk)
        fm = upsert_field(fm, "cover", cover)
        if "read_time:" not in fm:
            fm = upsert_field(fm, "read_time", "6")
        for prefix in redirect_prefixes:
            fm = add_redirect(fm, f"{prefix}{slug}/")
        path.write_text(f"---{fm}---{body}", encoding="utf-8")
        count += 1
    return count


def main() -> None:
    j = process_dir(
        JOURNAL,
        "910",
        COVER_ARCHIVE,
        [
            "/writing/journal/",
            "/media/written/journal/",
            "/media/written/journal/travel/",
        ],
    )
    w = process_dir(
        WELLNESS,
        "615",
        COVER_CRAFT,
        [
            "/writing/wellness/",
            "/media/written/wellness/",
            "/media/written/journal/wellness/",
        ],
    )
    print(f"numbered {j} travel + {w} wellness")


if __name__ == "__main__":
    main()
