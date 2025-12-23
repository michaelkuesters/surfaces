# Surfaces CSS – Developer Guide

This guide is for developers extending or modifying the Surfaces system (CSS and mappings).

## 1. Principles

- **Backwards compatibility first** – avoid breaking existing class stacks and mappings.
- **Token-driven** – prefer introducing/adjusting CSS variables over hardcoding values.
- **Separation of concerns** – keep materials, finishes, shapes, components, layout, and mappings in their respective files.

## 2. Adding or Modifying Materials

Materials live in the tokens/materials layer (see `materials.css`).

- Define:
  - `--mat-top` / `--mat-bottom` (HSL triples)
  - `--mat-top-l` / `--mat-bottom-l` (lightness for contrast logic)
- Choose a clear, semantic name (e.g. `emerald`, `onyx`, `default-primary`).

When adding:

1. Add the material variables.
2. Optionally document the new material in the main `README.md`.
3. Avoid changing existing material semantics (e.g. don’t make `default-primary` suddenly dark).

## 3. Adding or Modifying Finishes

Finishes define optical behavior (glass, metallic, flat, etc.).

- Use CSS variables for:
  - Transparency and blur (`--blur-inner`, `--transparency-factor`, etc.).
  - Rim/fill/bloom parameters (`--rim-a`, `--fill-a`, `--bloom-intensity`, …).
- Ensure new finishes work with both light and dark materials.

When modifying:

- Verify text contrast via the automatic text color logic.
- Test in both light and dark app themes.

## 4. Shapes and Geometry

Shapes are controlled via:

- `border-radius` (simple rounding)
- `clip-path` (faceted / custom shapes)

Guidelines:

- Don’t break existing shapes (`pill`, `gem`, `window`, etc.).
- If you add new shapes, keep them optional and additive.

## 5. Components Layer

`components.css` consumes materials, finishes, and shapes:

- `.button`, `.chip`, `.surface` share base logic (text color, gradients, bloom).
- Avoid hardcoding colors; derive from material variables using relative color syntax.
- For new components, follow the pattern:
  - Base element defines radius/clip-path and layout.
  - Inner `span` or content container applies gradient, blur, and shadows.

## 6. Layout Helpers

Layout helpers live in `layout.css`:

- `grid`, `stack` for general page structure.
- `cluster`, `cluster-row` for horizontal groupings.

When changing them:

- Keep APIs stable (class names should not change).
- Maintain responsive behavior (especially breakpoints and `auto-fill`/`minmax` behavior).
- Avoid introducing product-specific assumptions.

## 7. Semantic Mappings

`js/mappings.js` maps semantic names → class stacks.

### 7.1 Adding a Mapping

```js
export const surfacesMappings = {
  // ...
  "my-new-button": "emerald polished pill button hoverable",
};
```

Rules:

- Keys should be **semantic** (`ok-button`, `upgrade-button`, `card`, `dialog`).
- Values should be valid, composable Surfaces class stacks.
- Don’t remove or rename keys that might be used in templates.

### 7.2 Versioning and Migration

- When you must break an existing mapping, add a **new** key and deprecate the old one in code comments.
- Coordinate changes with product templates that use `data-surface` or direct mapping lookups.

## 8. Testing Changes

Use the demo pages:

- `showcase.html` – visual gallery of components and states plus interactive class picker + copy helper.
- `index.html` – mapping behavior demo using `data-surface` and the mappings table.
- `include-hook.html` – minimal include page for wiring Surfaces CSS and `mappings.js` into a host app.

Checklist:

- Verify text contrast and readability.
- Check hover/active/selected states.
- Test light and dark modes.
- Resize viewport to verify responsive layout and cluster behavior.

## 9. Coding Style

- Prefer **CSS custom properties** over repeating raw values.
- Keep selectors shallow and class-based; avoid tight coupling to DOM structure.
- Avoid inline JS-generated CSS; rely on stylesheet composition.


