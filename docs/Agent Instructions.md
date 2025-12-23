# Surfaces CSS – Agent Instructions

Practical steps for an agent to work on the Surfaces CSS library quickly and safely. This file summarizes the workflow and points to the detailed docs.

## 1. Orientation
- Read `docs/Overview.md` for intent and `docs/Requirements.md` for the contracts (functional + non-functional + style).
- Use `docs/User Manual.md` and `docs/Using Classes.md` to understand class stacks and mappings usage.
- See `docs/Developer Guide.md` for extension rules and `docs/Architecture.md` for system constraints.
- Check `docs/Test Scenarios.md` to know what must never break.

## 2. Ground rules
- Use Git Bash; do not touch `dist/` (never edit inside; build via `make build` if needed).
- Tests run via `make test` only.
- Keep CSS token-driven; avoid inline/injected styles.
- Maintain semantic mappings in `js/mappings.js`; preserve compatibility unless adding new keys.
- Respect ordering conventions for class stacks and exports (finish → density → bloom → material → shape → other).
- Follow responsive, dark/light compatibility, and contrast requirements (see `docs/Requirements.md`).

## 3. Typical tasks
- **Add/adjust mapping:** edit `js/mappings.js`, keep semantic keys, avoid duplicates; verify with `index.html` demo.
- **Tweak visuals:** change the appropriate CSS layer (`css/materials.css`, `css/finishes.css`, `css/shapes.css`, `css/components.css`, `css/layout.css`); prefer CSS variables.
- **Docs change:** mirror updates in the relevant doc and link from `README.md` navigation if new.

## 3.a. Coding guidelines
- Vanilla CSS and JS only; no framework assumptions.
- Apply the Law of Parsimony: prefer the smallest change that solves the problem.
- Actively refactor and simplify when touching code: dedupe class stacks, collapse repeated rules into tokens/variables, and remove dead code.
- Keep class names semantic and composable; avoid inline styles and JS-injected CSS.
- Maintain SOLID-friendly JS helpers and keep them small and synchronous.
- Respect existing ordering and idempotency rules for class stack composition.

## 4. Testing & verification
- Visual sanity: open `showcase.html` (UI kit + copy helper) and `index.html` (mapping demo).
- Check light/dark, hover/selected, density, bloom, borders and contrast.

## 5. Ready-to-ship checklist
- Requirements still satisfied (`docs/Requirements.md`).
- No regressions in scenarios (`docs/Test Scenarios.md`).
- All documents are correct and up to date.
- Mappings remain semantic and deduped; exports ordered correctly.
- Styling remains responsive, theme-compatible, and contrast-safe.

## 6. Fast references
- Class stack pattern: component/role → material → finish → shape → modifiers.
- Bloom options: `bloom-weak`, `bloom-mild`, `bloom-strong`; ordered after density and before materials.
- Code styling utility: `.code` / `<code>` share styles; `.code.block` for full-width snippets (see `docs/Requirements.md`).

If in doubt, default to preserving existing contracts and additive changes; do not remove keys or rename classes without coordination.

