#!/usr/bin/env bash
set -euo pipefail

show_record() {
  local field
  for field in "${record[@]}"; do
    printf '[%s] ' "$field"
  done
  printf '\n'
}

parse_records() {
  local line
  for line in "$@"; do
    IFS='|' read -r -a record <<<"$line"
    show_record
  done
}

mapfile -t rows <<'EOF'
Ada|Math|42
Grace|Science|37
Linus|History|29
EOF

parse_records "${rows[@]}"
