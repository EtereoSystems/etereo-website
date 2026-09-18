#!/usr/bin/env bash
# Refuses git commit/push while HEAD is on main. Work belongs on a branch + PR:
# a push to main triggers the production deploy in .github/workflows/deploy.yml.
set -u

cmd=$(jq -r '.tool_input.command // ""')

# git at a command boundary, with commit/push as its own word in the same segment
printf '%s' "$cmd" | grep -qE '(^|[;&|(]|&&|\|\|)[[:space:]]*git\b[^;&|]*[[:space:]](commit|push)([[:space:]]|$)' || exit 0

branch=$(git symbolic-ref --short HEAD 2>/dev/null) || exit 0
[ "$branch" = "main" ] || exit 0

cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: HEAD is on main. This repo does not take direct commits or pushes to main -- a push to main deploys to production. Branch first (git switch -c <topic>), commit there, then open a PR."}}
JSON
