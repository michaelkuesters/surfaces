# Surfaces CSS – User Manual

This guide explains how to **use** the Surfaces system in product code: which classes to apply, how to use layout helpers, and how to work with semantic mappings.

## 1. Using Base Classes

### 1.1 Buttons

Pattern:

```html
<button class="button [material] [finish] [shape] [modifiers]">
  <span>Label</span>
</button>
```

- **`button`** – base component
- **Material** – e.g. `default-primary`, `ruby`, `emerald`
- **Finish** – e.g. `polished`, `flat`, `transparent`
- **Shape** – e.g. `pill`, `round`, `plaque`
- **Modifiers** – e.g. `hoverable`, `selected`, `disabled`, `bloom-weak`

Examples:

```html
<button class="button default-primary polished pill hoverable">
  <span>Primary Action</span>
</button>

<button class="button default-contrast flat plaque">
  <span>Cancel</span>
</button>
```

### 1.2 Chips

Pattern:

```html
<button class="chip [material] [finish] [shape] [modifiers]">
  <span>Chip Text</span>
</button>
```

Use chips for lightweight tags / filters:

```html
<button class="chip sapphire milky pill hoverable">
  <span>Tag</span>
</button>
```

### 1.3 Surfaces (Cards, Sheets, Dialogs)

Pattern:

```html
<div class="surface [variant] [material] [finish] [shape] [modifiers]">
  <!-- Content -->
</div>
```

Common variants:

- `surface card`
- `surface sheet`
- `surface dialog`
- `surface frame`

Example:

```html
<div class="surface card diamond transparent window">
  <h3>Glass Card</h3>
  <p>Content with glass effect</p>
</div>
```

Use the `overlay` modifier for dialogs/popovers:

```html
<div class="surface dialog onyx tinted window overlay">
  <!-- Modal content -->
</div>
```

## 2. Layout Helpers

Use helpers from `layout.css` to structure content around Surfaces components.

### 2.1 Grid

```html
<div class="grid cols-3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

- `cols-2` / `cols-3` control column count.
- Below 900px, both collapse to a single column.

### 2.2 Stack

Vertical spacing:

```html
<div class="stack">
  <h2>Title</h2>
  <p>Body text…</p>
  <button class="button default-primary polished pill hoverable">
    <span>Action</span>
  </button>
</div>
```

### 2.3 Cluster

Small groups of items that can wrap (e.g. header actions):

```html
<div class="cluster">
  <button class="button default-secondary transparent pill hoverable"><span>☀️ Light</span></button>
  <button class="button default-secondary transparent pill hoverable"><span>🌙 Dark</span></button>
  <button class="button default-secondary transparent pill hoverable"><span>💻 Auto</span></button>
</div>
```

### 2.4 Cluster Row

Equal-height, responsive tiles:

```html
<div class="cluster-row">
  <button class="button default-primary polished pill hoverable"><span>A</span></button>
  <button class="button default-primary polished pill hoverable"><span>B</span></button>
  <button class="button default-primary polished pill hoverable"><span>C</span></button>
</div>
```

All items share a consistent footprint; the last row does not stretch a single item to full width.

## 3. UI Kit Helpers (Showcase)

`showcase.html` contains an interactive **UI Kit**:

- You can click shapes, materials, finishes, bloom, and density chips to live-update a demo menu and slider.
- Below the UI Kit, a **“Current menu class stack”** card shows the computed class list for the menu.
- The copy box:
  - Strips internal utility classes like `menu`, `surface`, and `overlay`.
  - Orders classes as: **finish → density → bloom → material → shape → other** so the stack is easy to reuse in product markup.
  - Supports one-click copy via the “Copy classes” button.

Use this page to discover visually pleasing combinations and then paste the resulting class stack into your own components.

## 4. Using Semantic Mappings

The JS helper `js/mappings.js` lets you refer to visual recipes by **semantic name** instead of hardcoding class lists.

### 3.1 Basic Usage

```js
import { getMapping } from "./js/mappings.js";

const cls = getMapping("primary-button"); // e.g. "default-primary polished pill button hoverable"
buttonElement.className = cls;
```

### 3.2 Integrating with `data-surface`

In markup:

```html
<button data-surface="ok-button">
  <span>OK</span>
</button>
```

In JS:

```js
import { getMapping, hasMapping } from "./js/mappings.js";

document.querySelectorAll("[data-surface]").forEach((el) => {
  const key = el.getAttribute("data-surface");
  if (!hasMapping(key)) return;

  const cls = getMapping(key);
  el.className = cls;
});
```

This keeps templates semantic while centralizing the visual contract in one mapping file.


