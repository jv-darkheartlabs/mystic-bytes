#!/usr/bin/env bash
# Tetrate vision: catalog sources → reconcile manifest → sync assets
set -euo pipefail
cd "$(dirname "$0")"

echo "=== 1/3 vision catalog (Tetrate) ==="
node vision-catalog-sources.mjs --resume --parallel "${PARALLEL:-8}"

echo "=== 2/3 reconcile manifest ==="
node reconcile-covers-from-catalog.mjs --resync

echo "=== 3/3 sync any remaining ==="
node sync-reading-covers.mjs --force

echo "=== done ==="
node -e "const r=require('./reconcile-covers-report.json'); console.log('fixed', r.fixed.length, 'no_match', r.no_match.length)"
