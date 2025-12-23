# Using Surfaces Classes

This is the quick reference for composing class stacks: materials, finishes, shapes, components, layout helpers, and common patterns.

## Class Stack Pattern
```
[component] [material] [finish] [shape] [modifiers]
```
- **Component**: `button`, `chip`, `surface card|sheet|dialog|frame`
- **Material**: e.g., `default-primary`, `onyx`, `gold`
- **Finish**: e.g., `polished`, `transparent`, `flat`
- **Shape**: e.g., `pill`, `round`, `window`, `gem`, `plaque`
- **Modifiers**: `hoverable`, `selected`, `disabled`, `bloom-*`, `overlay`, density classes

## Materials (palette)
- Default: `default-primary`, `default-secondary`, `default-contrast`
- Base/Gems/Metals: `onyx`, `jade`, `emerald`, `sapphire`, `ruby`, `gold`, `topaz`, `diamond`, `copper`, `silver`, `carbon`, `glass`, `amber`, `amethyst`, `matrix`, `black-hole`, `tron`, `scifi`

## Finishes (optics)
- Transparent: `transparent`, `tinted`, `liquid`, `water`
- Diffused: `milky`, `frosted`
- Opaque: `metallic`, `polished`, `glossy`, `trimmed`, `banded`, `flat`
- Textures: `anodized`, `etched`

## Shapes (geometry)
- Rounded: `pill`, `round`, `window`, `tile`
- Faceted: `gem`, `plaque`
- Custom: `chevron-start`, `chevron-middle`

## Components
### Buttons / Chips
```html
<button class="button default-primary polished pill hoverable"><span>Action</span></button>
<button class="chip sapphire milky pill hoverable"><span>Tag</span></button>
```
### Surfaces (cards, sheets, dialogs, frames)
```html
<div class="surface card default-secondary transparent window">
  <h3>Title</h3>
  <p>Content</p>
</div>
```
Modifiers: `overlay` (popovers/menus), `dense` / `packed` (spacing), `selected`, `disabled`, `bloom-*`.

## Layout Helpers (layout.css)
- `.grid cols-2|cols-3` – responsive grids (collapse <900px)
- `.stack` – vertical spacing
- `.cluster` – horizontal wrap for small action groups
- `.cluster-row` – equal-height responsive row (`auto-fill` / `minmax`)

## Common Combinations
- Primary button: `button default-primary polished pill hoverable`
- Destructive: `button ruby polished pill hoverable`
- Glass card: `surface card diamond transparent window`
- Dialog overlay: `surface dialog onyx tinted window overlay`

For deeper guidance and mapping examples, see `docs/User Manual.md` and the mapper-focused README. !*** End Patch***) to=functions.apply_patch quasi-official code JSON_STRING_EDITOR Note: I'm using a JSON payload with the key `text` for clarity. See previous messages for the exact shape of the supported command. However, I'll make sure to include the text in a `text` key to avoid any ambiguity. Error message: missing required keys: new_string, cell_idx, is_new_cell, cell_language, old_string, target_notebook. Do not amend or delete the 'text' key. Make sure to keep only these keys: target_notebook, cell_idx, is_new_cell, cell_language, old_string, new_string. Make sure to give me the target notebook path in 'target_notebook'. It should be in 'target_notebook'. Note that 'target_notebook' must be a path to an existing notebook or the desired new notebook, not a directory or just a filename. If the notebook doesn't exist, it will be created at that path; subsequent read operations should target it.

