# Commit Message Guide

This project uses **Conventional Commits** with automated validation via **Lefthook** and **Commitlint**.

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
Required. Must be one of:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change without fixing a bug or adding a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **chore**: Build process, dependencies, tooling changes
- **ci**: CI/CD configuration changes
- **revert**: Revert a previous commit

### Scope
Optional. The area of the codebase affected (e.g., `frontend`, `backend`, `tauri`, `parser`).

### Subject
- Mandatory
- Imperative mood ("add" not "adds" or "added")
- Lowercase first letter
- No period at the end
- Max 100 characters total

### Body
Optional but recommended for non-trivial changes. Explain **why** not **what**.

### Footer
Optional. Reference issues: `Closes #123`, `Fixes #456`

## Examples

### ✅ Valid commits

```
feat(frontend): add user authentication modal

Implement JWT-based authentication with login and logout flows.
Support email/password and OAuth providers.

Closes #42
```

```
fix(parser): resolve memory leak in token processing
```

```
docs: update README with setup instructions
```

```
chore(deps): upgrade Rust toolchain to 1.75
```

### ❌ Invalid commits

```
Updated stuff              # Missing type
feat: Added feature        # Not imperative mood
FEAT(API): Something       # Wrong case
fix: fixed a bug.          # Period at end
```

## Automated Validation

When you commit, **Lefthook** automatically runs **Commitlint** to validate your message format.

### If validation fails:
```
✖   type may not be empty [type-empty]
✖   subject may not be empty [subject-empty]
```

Fix your message and try again:
```bash
git commit --amend
```

### Pre-push checks
Before pushing, **Lefthook** also runs:
- `cargo check --all`
- `cargo test --all`

## Manual Verification

Check all commits in your branch:
```bash
npm run commitlint-verify
```

Check from `main` to current HEAD:
```bash
npm run commitlint
```

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [Lefthook Documentation](https://lefthook.dev/)
