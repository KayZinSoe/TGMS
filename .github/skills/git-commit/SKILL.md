---
name: git-commit
description: 'Execute git commit with conventional commit message analysis, intelligent staging, and message generation. Use when user asks to commit changes, create a git commit, or mentions "/commit". Supports: (1) Auto-detecting type and scope from changes, (2) Generating conventional commit messages from diff, (3) Interactive commit with optional type/scope/description overrides, (4) Intelligent file staging for logical grouping'
license: MIT
allowed-tools: Bash
---

# Git Commit with Conventional Commits

## Overview

Create standardized, semantic git commits using the Conventional Commits specification. Analyze the actual diff to determine appropriate type, scope, and message.


## Conventional Commit Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Commit Types

| Type       | Purpose                        |
| ---------- | ------------------------------ |
| `feat`     | New feature                    |
| `fix`      | Bug fix                        |
| `style`    | Formatting/style (no logic)    |
| `chore`    | For maintenance activities such as adding documentation, code refactoring (no additional logic introduced), introduce performance improvements, add CI/config related changes, add / update tests, add / update build system |
| `revert`   | Revert commit                  |
| `delete` | Removal of obsolete, unused, deprecated, or unnecessary files/components |

## Breaking Changes

```
# Exclamation mark after type/scope
feat!: remove deprecated endpoint

# BREAKING CHANGE footer
feat: allow config to extend other configs

BREAKING CHANGE: `extends` key behavior changed
```

## Workflow

### 1. Analyze Diff

```bash
# If files are staged, use staged diff
git diff --staged

# If nothing staged, use working tree diff
git diff

# Also check status
git status --porcelain
```

### 2. Stage Files (if needed)

If nothing is staged or you want to group changes differently:

```bash
# Inspect the repo first when the request is vague
git status --porcelain

# Stage specific files
git add path/to/file1 path/to/file2

# Stage by pattern
git add *.test.*
git add src/components/*

# Stage one commit for deleted files only
git add -u

# Stage all current changes, including untracked, modified, and deleted files
git add -A

# Interactive staging
git add -p
```

Default behavior for an ambiguous request like "commit":

```bash
# First inspect what changed
git status --porcelain

# Then choose the narrowest safe stage set
git add -A
# or git add -u
# or git add path/to/files
```

Common commit patterns:

```bash
# New or modified files only
git add .
git commit -m "feat: add vessel stepper"

# Specific files only
git add frontend/src/pages/home/component/VesselList.tsx
git commit -m "feat(ui): add vessel stepper"

# All changes including new, modified, and deleted files
git add -A
git commit -m "fix: update auth and cleanup removed files"
```

Important: `git commit` only records files that are already staged. To cover all current repo changes, use `git add -A`; this includes untracked, modified, and deleted files. Deleted tracked files are not included unless they are explicitly staged with `git add -A`, `git add -u`, or `git rm`.

**Never commit secrets** (.env, credentials.json, private keys).

### 3. Generate Commit Message

Analyze the diff to determine:

- **Type**: What kind of change is this?
- **Scope**: What area/module is affected?
- **Description**: One-line summary of what changed (present tense, imperative mood, <72 chars)

### 4. Execute Commit

```bash
# Single line
git commit -m "<type>[scope]: <description>"

# Subject plus body paragraphs in one commit
git commit -m "<type>[scope]: <description>" -m "<body paragraph>" -m "<footer>"

# Multi-line with body/footer
git commit -m "$(cat <<'EOF'
<type>[scope]: <description>

<optional body>

<optional footer>
EOF
)"
```

## Best Practices

- One logical change per commit
- Present tense: "add" not "added"
- Imperative mood: "fix bug" not "fixes bug"
- Stage deletions before commit using `git add -A` or `git rm`
- Reference issues: `Closes #123`, `Refs #456`
- Keep description under 72 characters

## Git Safety Protocol

- NEVER update git config
- NEVER run destructive commands (--force, hard reset) without explicit request
- NEVER skip hooks (--no-verify) unless user asks
- NEVER force push to main/master
- If commit fails due to hooks, fix and create NEW commit (don't amend)