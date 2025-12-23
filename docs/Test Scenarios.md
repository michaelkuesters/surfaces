# Surfaces CSS – Test Scenarios (Executable Truth)

This document lists key test scenarios that make the **mappings.js + mapper behavior** falsifiable.
The demo pages (`showcase.html`, `index.html`, `include-hook.html`) are examples of harnesses, not subjects of testing themselves.

## 1. Mapping Table Semantics (`js/mappings.js`)

1. **Known key resolution**
   - `getMapping(semanticName)` returns the exact class string defined in `surfacesMappings` for keys like `"ok-button"`, `"card"`, `"dialog"`, etc.
   - `hasMapping(semanticName)` returns `true` for all keys present in the table and `false` for unknown keys.

2. **Unknown key behavior**
   - `getMapping("non-existent-key")` returns `null` (or equivalent “no mapping” value).
   - `hasMapping("non-existent-key")` is `false`.

3. **All mappings snapshot**
   - `getAllMappings()` returns a shallow copy:
     - Contains all keys from `surfacesMappings`.
     - Mutating the returned object does not affect the original table.

4. **Value invariants**
   - Every mapping value is a space-separated class stack that starts with a valid material/finish/shape/component combination (e.g. `"default-primary polished pill button ..."`, `"default-secondary transparent window surface card"`).

## 2. Mapper Behavior (data-surface → classes)

These scenarios apply to any mapper using `surfacesMappings` plus `data-surface` attributes (e.g. `surfaces-mapper.js` / `.min.js`).

1. **Single semantic key**
   - Given `<button data-surface="ok-button">`, the mapper:
     - Resolves `"ok-button"` via `getMapping`.
     - Applies the mapped class stack to the element.

2. **Multiple semantic keys**
   - Given `data-surface="ok-button primary-button"`:
     - The mapper resolves both keys.
     - The resulting class list is the **merged union** of both stacks with duplicates removed.

3. **Preserving existing classes**
   - Given `<button class="custom" data-surface="ok-button">`:
     - After mapping, the element still has `custom` in its class list in addition to the mapped stack.

4. **Unknown keys in attributes**
   - Given `data-surface="unknown-key ok-button"`:
     - The unknown key is ignored.
     - The known key still maps correctly.

5. **Idempotency**
   - Running the mapper multiple times over the same DOM does not continuously append duplicate classes.

## 3. Copy Helper Ordering (Showcase Harness)

When a harness exposes the current mapped class stack (e.g. the “Current menu class stack” box in `showcase.html`), the following invariants hold for the **formatted string**:

1. **Internal classes stripped**
   - Internal glue classes such as `menu`, `surface`, and `overlay` are omitted from the exported string.

2. **Deterministic ordering**
   - The string is ordered as:
     - **Finish** (e.g. `transparent`, `polished`, `flat`, …)
     - **Density** (`dense`, `packed`)
     - **Bloom** (`bloom-weak`, `bloom-mild`, `bloom-strong`)
     - **Material** (e.g. `onyx`, `gold`, `default-primary`, …)
     - **Shape** (`pill`, `round`, `window`, `gem`, …)
     - **Other** (any remaining classes)

3. **Clipboard behavior**
   - Clicking the copy helper’s action copies exactly this formatted string to the clipboard.

## 4. Minimal Wiring (include-hook.html harness)

1. **CSS + JS sufficiency**
   - Including `css/*`, `js/mappings.min.js`, and `js/surfaces-mapper.min.js` as shown is sufficient to:
     - Apply Surfaces visual styling.
     - Resolve `data-surface` attributes into classes on first load.

2. **Framework independence**
   - The mapper and mappings work in a plain HTML/JS environment without any framework-specific assumptions.

