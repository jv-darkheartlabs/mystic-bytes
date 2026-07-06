#!/usr/bin/env python3
"""Split PDF page grids into individual cover crops."""
from pathlib import Path
from PIL import Image

INCOMING = Path.home() / "Pictures/bookish/_incoming/_FrontCovers"
OUT = INCOMING / "crops"
COLS, ROWS = 7, 6
MARGIN_X, MARGIN_Y = 0.015, 0.012
MIN_PAGE_BYTES = 200_000  # skip near-blank pages


def split_page(path: Path, page_id: str) -> int:
    im = Image.open(path)
    w, h = im.size
    mx, my = int(w * MARGIN_X), int(h * MARGIN_Y)
    cw = (w - 2 * mx) // COLS
    ch = (h - 2 * my) // ROWS
    n = 0
    for r in range(ROWS):
        for c in range(COLS):
            box = (mx + c * cw, my + r * ch, mx + (c + 1) * cw, my + (r + 1) * ch)
            crop = im.crop(box)
            out = OUT / f"{page_id}-r{r + 1:02d}c{c + 1:02d}.jpg"
            crop.save(out, "JPEG", quality=92)
            n += 1
    return n


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    pages = sorted(INCOMING.glob("page-*.jpg"))
    total = 0
    for page in pages:
        if page.stat().st_size < MIN_PAGE_BYTES:
            print(f"skip {page.name} ({page.stat().st_size} bytes)")
            continue
        pid = page.stem
        n = split_page(page, pid)
        total += n
        print(f"{page.name} → {n} crops")
    print(f"Total crops: {total} → {OUT}")


if __name__ == "__main__":
    main()
