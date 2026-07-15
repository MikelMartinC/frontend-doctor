# Contributing to frontend-doctor

Thanks for your interest in improving this skill! Contributions of all kinds are welcome.

## What makes a good contribution

The most valuable contributions are **real-world cases the checklists miss**:

- A frontend failure mode (visual, a11y, responsive, performance) you hit in practice that the skill didn't catch or fixed wrong.
- A checklist item that produced a false positive or bad advice in a real project.
- Framework-specific guidance gaps (e.g. Svelte, Angular, Astro patterns).

## How to contribute

1. **Open an issue** describing the case: what you asked Claude, what the skill did, what it should have done.
2. **Or send a PR directly** — for small fixes (typos, broken advice, outdated APIs) a PR without a prior issue is fine.

## PR guidelines

- Keep `SKILL.md` short. It is the always-loaded entry point — detailed guidance belongs in `references/*.md`, loaded on demand. If your change grows `SKILL.md` significantly, it probably belongs in a reference file.
- One topic per PR.
- Checklist items must be **actionable**: every "don't do X" needs the "do Y instead". Findings-without-fixes are what this skill exists to avoid.
- Match the existing tone: imperative, concrete, no filler.
- Cite WCAG criteria numbers for accessibility items.

## Testing your changes

Install your fork locally and try it on a real project:

```bash
git clone https://github.com/<you>/frontend-doctor ~/.claude/skills/frontend-doctor
```

Then ask Claude Code for frontend work that should trigger your change and verify it behaves as intended.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
