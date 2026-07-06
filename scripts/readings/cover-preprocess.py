#!/usr/bin/env python3
"""Trim whitespace borders and center-crop book covers to 2:3 for reading log assets."""
from __future__ import annotations

import json
import sys
from collections import deque
from pathlib import Path

from PIL import Image

TARGET_W = 533
TARGET_H = 800
WHITE_THRESHOLD = 238
BG_TOLERANCE = 32
EDGE_SAMPLE_FRACTION = 0.08  # row/col must exceed this non-bg density to count as content
SHAVE_PX = 1  # remove anti-aliased fringe after trim


def _corner_bg(rgb: Image.Image) -> tuple[int, int, int]:
    w, h = rgb.size
    corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    rs, gs, bs = [], [], []
    px = rgb.load()
    for x, y in corners:
        r, g, b = px[x, y][:3]
        rs.append(r)
        gs.append(g)
        bs.append(b)
    return (sum(rs) // 4, sum(gs) // 4, sum(bs) // 4)


def _is_background(r: int, g: int, b: int, bg: tuple[int, int, int]) -> bool:
    if r >= WHITE_THRESHOLD and g >= WHITE_THRESHOLD and b >= WHITE_THRESHOLD:
        return True
    dr = abs(r - bg[0])
    dg = abs(g - bg[1])
    db = abs(b - bg[2])
    return dr <= BG_TOLERANCE and dg <= BG_TOLERANCE and db <= BG_TOLERANCE


def _flood_edge_background(rgb: Image.Image) -> set[tuple[int, int]]:
    """Mark background pixels reachable from image edges (flood fill)."""
    w, h = rgb.size
    bg = _corner_bg(rgb)
    px = rgb.load()
    bg_mask: set[tuple[int, int]] = set()
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(1, h - 1):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if (x, y) in bg_mask:
            continue
        if x < 0 or y < 0 or x >= w or y >= h:
            continue
        r, g, b = px[x, y][:3]
        if not _is_background(r, g, b, bg):
            continue
        bg_mask.add((x, y))
        q.append((x - 1, y))
        q.append((x + 1, y))
        q.append((x, y - 1))
        q.append((x, y + 1))

    return bg_mask


def content_bbox(rgb: Image.Image) -> tuple[int, int, int, int]:
    w, h = rgb.size
    bg_mask = _flood_edge_background(rgb)
    px = rgb.load()

    if len(bg_mask) >= w * h * 0.98:
        return _content_bbox_scan(rgb)

    min_x, min_y = w, h
    max_x, max_y = 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if (x, y) in bg_mask:
                continue
            found = True
            min_x = min(min_x, x)
            max_x = max(max_x, x)
            min_y = min(min_y, y)
            max_y = max(max_y, y)

    if not found:
        return (0, 0, w, h)
    return (min_x, min_y, max_x + 1, max_y + 1)


def _content_bbox_scan(rgb: Image.Image) -> tuple[int, int, int, int]:
    """Fallback: scan rows/columns from edges for content density."""
    w, h = rgb.size
    bg = _corner_bg(rgb)
    px = rgb.load()

    def row_content(y: int) -> float:
        non_bg = sum(
            1 for x in range(w) if not _is_background(*px[x, y][:3], bg)
        )
        return non_bg / w

    def col_content(x: int) -> float:
        non_bg = sum(
            1 for y in range(h) if not _is_background(*px[x, y][:3], bg)
        )
        return non_bg / h

    top = 0
    while top < h and row_content(top) < EDGE_SAMPLE_FRACTION:
        top += 1
    bottom = h - 1
    while bottom > top and row_content(bottom) < EDGE_SAMPLE_FRACTION:
        bottom -= 1
    left = 0
    while left < w and col_content(left) < EDGE_SAMPLE_FRACTION:
        left += 1
    right = w - 1
    while right > left and col_content(right) < EDGE_SAMPLE_FRACTION:
        right -= 1

    if top >= bottom or left >= right:
        return (0, 0, w, h)
    return (left, top, right + 1, bottom + 1)


GUTTER_THRESHOLD = 0.88
GUTTER_MIN_RUN = 2


def _gutter_runs(length: int, is_gutter) -> list[tuple[int, int]]:
    """Contiguous index ranges [start, end) where is_gutter(i) is true."""
    runs: list[tuple[int, int]] = []
    start: int | None = None
    for i in range(length):
        if is_gutter(i):
            if start is None:
                start = i
        elif start is not None:
            if i - start >= GUTTER_MIN_RUN:
                runs.append((start, i))
            start = None
    if start is not None and length - start >= GUTTER_MIN_RUN:
        runs.append((start, length))
    return runs


def _segments(length: int, gutters: list[tuple[int, int]], *, min_len: int = 8) -> list[tuple[int, int]]:
    """Content segments between gutter bands."""
    if not gutters:
        return [(0, length)]
    segments: list[tuple[int, int]] = []
    cursor = 0
    for start, end in gutters:
        if start > cursor:
            segments.append((cursor, start))
        cursor = end
    if cursor < length:
        segments.append((cursor, length))
    return [s for s in segments if s[1] - s[0] >= min_len]


def _interior_gutters(rgb: Image.Image) -> tuple[list[tuple[int, int]], list[tuple[int, int]], list[tuple[int, int]], list[tuple[int, int]]]:
    """Detect horizontal/vertical gutter bands; returns (interior_h, interior_v, all_h, all_v)."""
    w, h = rgb.size
    px = rgb.load()
    bg = _corner_bg(rgb)

    def row_gutter(y: int) -> bool:
        return sum(1 for x in range(w) if _is_background(*px[x, y][:3], bg)) / w >= GUTTER_THRESHOLD

    def col_gutter(x: int) -> bool:
        return sum(1 for y in range(h) if _is_background(*px[x, y][:3], bg)) / h >= GUTTER_THRESHOLD

    h_all = _gutter_runs(h, row_gutter)
    v_all = _gutter_runs(w, col_gutter)

    h_gutters = [(a, b) for a, b in h_all if a > 2 and b < h - 2]
    v_gutters = [(a, b) for a, b in v_all if a > 2 and b < w - 2]
    return h_gutters, v_gutters, h_all, v_all


def _panel_slices(
    size: int,
    interior_gutters: list[tuple[int, int]],
    all_gutters: list[tuple[int, int]],
    edge: str,
) -> tuple[int, int]:
    """Resolve a single-axis panel slice, including gutters flush with an edge."""
    segments = _segments(size, interior_gutters, min_len=1)
    if len(segments) > 1:
        if edge == "start":
            return segments[0]
        if edge == "end":
            return segments[-1]
        return segments[len(segments) // 2]

    if edge == "start":
        touch_end = [g for g in all_gutters if g[1] >= size - 2]
        if touch_end:
            return (0, touch_end[0][0])
    if edge == "end":
        touch_start = [g for g in all_gutters if g[0] <= 2]
        if touch_start:
            return (touch_start[-1][1], size)
    return (0, size)


def extract_panel(img: Image.Image, panel: str) -> Image.Image:
    """Isolate one cover from a grid screenshot using detected gutters."""
    rgb = img.convert("RGB")
    bbox = content_bbox(rgb)
    trimmed = rgb.crop(bbox)
    w, h = trimmed.size
    h_gutters, v_gutters, h_all, v_all = _interior_gutters(trimmed)

    if panel == "center":
        row = _panel_slices(h, h_gutters, h_all, "end" if len(_segments(h, h_gutters)) == 1 and h_gutters else "start")
        col = _panel_slices(w, v_gutters, v_all, "end" if len(_segments(w, v_gutters)) == 1 and v_gutters else "start")
        if h_gutters and v_gutters:
            rows = _segments(h, h_gutters, min_len=1)
            cols = _segments(w, v_gutters, min_len=1)
            row = rows[1] if len(rows) > 1 else rows[0]
            col = cols[1] if len(cols) > 1 else cols[0]
        elif h_gutters:
            rows = _segments(h, h_gutters, min_len=1)
            row = rows[1] if len(rows) > 1 else rows[0]
            col = (0, w)
        elif v_gutters:
            cols = _segments(w, v_gutters, min_len=1)
            col = cols[1] if len(cols) > 1 else cols[0]
            row = (0, h)
        else:
            # L-shaped grid: first interior gutters from top/left edges.
            top_gutter = next((g for g in h_all if g[0] > 2), None)
            left_gutter = next((g for g in v_all if g[0] > 2), None)
            y0 = top_gutter[1] if top_gutter else 0
            x0 = left_gutter[1] if left_gutter else 0
            y1 = next((g[0] for g in h_all if g[0] > y0 + 8), h)
            x1 = next((g[0] for g in v_all if g[0] > x0 + 8), w)
            return trimmed.crop((x0, y0, x1, y1))
    elif panel == "top-left":
        row = _panel_slices(h, h_gutters, h_all, "start")
        col = _panel_slices(w, v_gutters, v_all, "start")
    elif panel == "top-right":
        row = _panel_slices(h, h_gutters, h_all, "start")
        col = _panel_slices(w, v_gutters, v_all, "end")
    elif panel == "bottom-left":
        row = _panel_slices(h, h_gutters, h_all, "end")
        col = _panel_slices(w, v_gutters, v_all, "start")
    elif panel == "bottom-right":
        row = _panel_slices(h, h_gutters, h_all, "end")
        col = _panel_slices(w, v_gutters, v_all, "end")
    elif panel == "top":
        row = _panel_slices(h, h_gutters, h_all, "start")
        col = (0, w)
    elif panel == "bottom":
        row = _panel_slices(h, h_gutters, h_all, "end")
        col = (0, w)
    elif panel == "left":
        row = (0, h)
        col = _panel_slices(w, v_gutters, v_all, "start")
    elif panel == "right":
        row = (0, h)
        col = _panel_slices(w, v_gutters, v_all, "end")
    else:
        raise ValueError(f"Unknown panel: {panel}")

    return trimmed.crop((col[0], row[0], col[1], row[1]))


def crop_to_aspect(img: Image.Image, ratio: float = 2 / 3) -> Image.Image:
    w, h = img.size
    current = w / h
    if abs(current - ratio) < 0.002:
        return img
    if current > ratio:
        new_w = max(1, int(round(h * ratio)))
        left = (w - new_w) // 2
        return img.crop((left, 0, left + new_w, h))
    new_h = max(1, int(round(w / ratio)))
    top = (h - new_h) // 2
    return img.crop((0, top, w, top + new_h))


def preprocess_cover(src: Path, dest: Path, quality: int = 82, panel: str | None = None) -> dict:
    with Image.open(src) as im:
        im = im.convert("RGB")
        before = im.size
        if panel:
            trimmed = extract_panel(im, panel)
            left, top, right, bottom = 0, 0, before[0], before[1]
        else:
            bbox = content_bbox(im)
            left = min(bbox[0] + SHAVE_PX, bbox[2] - 1)
            top = min(bbox[1] + SHAVE_PX, bbox[3] - 1)
            right = max(bbox[2] - SHAVE_PX, left + 1)
            bottom = max(bbox[3] - SHAVE_PX, top + 1)
            trimmed = im.crop((left, top, right, bottom))
        after_trim = trimmed.size
        cropped = crop_to_aspect(trimmed)
        after_crop = cropped.size
        final = cropped.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        final.save(dest, "JPEG", quality=quality, optimize=True)
    return {
        "src": str(src),
        "dest": str(dest),
        "before": {"w": before[0], "h": before[1]},
        "after_trim": {"w": after_trim[0], "h": after_trim[1]},
        "after_crop": {"w": after_crop[0], "h": after_crop[1]},
        "output": {"w": TARGET_W, "h": TARGET_H},
        "trim_px": {
            "left": left,
            "top": top,
            "right": before[0] - right,
            "bottom": before[1] - bottom,
        },
        "panel": panel,
    }


def main() -> None:
    if len(sys.argv) < 3:
        print(
            "Usage: cover-preprocess.py <src> <dest> [--json] [--panel top-left|top|bottom|left|right|center]",
            file=sys.stderr,
        )
        sys.exit(1)
    src = Path(sys.argv[1])
    dest = Path(sys.argv[2])
    panel = None
    if "--panel" in sys.argv:
        idx = sys.argv.index("--panel")
        if idx + 1 >= len(sys.argv):
            print("--panel requires a value", file=sys.stderr)
            sys.exit(1)
        panel = sys.argv[idx + 1]
    stats = preprocess_cover(src, dest, panel=panel)
    if "--json" in sys.argv:
        print(json.dumps(stats))
    else:
        print(f"{src.name}: {stats['before']} -> {stats['output']}")


if __name__ == "__main__":
    main()
