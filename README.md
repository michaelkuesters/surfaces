# Surfaces CSS Component System

Surfaces is a class-based design system with semantic mappings. This README focuses on creating and using custom mappings with `js/surfaces-mapper.js`. Class composition details live in `docs/Using Classes.md`.

Navigation:
- Overview: `docs/Overview.md`
- User Manual: `docs/User Manual.md`
- Using Classes (class reference): `docs/Using Classes.md`
- Developer Guide: `docs/Developer Guide.md`
- Architecture: `docs/Architecture.md`
- Agent Instructions: `docs/Agent Instructions.md`
- Requirements: `docs/Requirements.md`

Demo and reference pages:
- `showcase.html` – UI Kit with copyable “Current menu class stack”
- `index.html` – Mapper demo using `data-surface`
- `include-hook.html` – minimal include example

License: **CC BY – Intelygence GmbH**

---

## How Semantic Mappings Work
- `js/mappings.js` defines `surfacesMappings`: semantic keys > class stacks.
- API:
  - `getMapping(key)` > class string or `null`
  - `hasMapping(key)` > boolean
  - `getAllMappings()` > shallow copy of the table
- Multiple semantic keys on one element merge into a **deduplicated union**. When formatted for copy (as in `showcase.html`), classes are ordered: **[finish] > [density] > [bloom] > [material] > [shape] > [other]**.

---

## Create Custom Mappings
1. Edit `js/mappings.js` (or your own mappings file):
   ```js
   export const surfacesMappings = {
     ...,
     "cta-button": "default-primary polished pill button hoverable",
     "danger-ghost": "ruby transparent pill button hoverable",
     "glass-panel": "diamond transparent window surface card overlay",
   };
   ```
2. Keep values in the canonical stack pattern: `[component] [finish] [density] [bloom] [material] [shape] [modifiers]`.
3. Avoid duplicates across merged keys; the mapper dedupes combined stacks.
4. Focus on the "What," not the "How" when creating surfaces.

---

## Use with `surfaces-mapper.js`
Include CSS + JS (module example):
```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/materials.css">
<link rel="stylesheet" href="css/finishes.css">
<link rel="stylesheet" href="css/shapes.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/layout.css">

<script type="module">
  import { init } from './js/surfaces-mapper.js';      // or .min.js
  import { surfacesMappings } from './js/mappings.js'; // or your custom file

  init({
    preserveExisting: true,  // keep existing classes (default)
    removeAttribute: false,  // keep data-surface (default)
    autoProcess: true        // observe new nodes (default)
  });
</script>
```

Markup examples:
```html
<button data-surface="ok-button"><span>OK</span></button>
<div data-surface="card"><h3>Title</h3></div>
<button data-surface="ok-button primary-button"><span>Primary OK</span></button>
```

Options (for `processElement`, `processAll`, `init`):
- `preserveExisting` (default `true`): keep existing classes.
- `removeAttribute` (default `false`): strip `data-surface` after mapping.
- `autoProcess` (default `true`): observe DOM mutations for new nodes.
- `root`: limit processing to a subtree.

Behavior:
- Unknown semantic keys are ignored; known keys still apply.
- Idempotent: re-running does not append duplicates.

---

## Using Classes (Reference)
For materials, finishes, shapes, layout helpers, and common class combinations, see `docs/Using Classes.md`. For end-user usage patterns, see `docs/User Manual.md`.

---

## Testing References
- Mapping expectations and invariants: `docs/Test Scenarios.md`.
- The copy helper in `showcase.html` strips internal glue classes and orders classes as: finish > density > bloom > material > shape > other.
# Surfaces CSS Component System

The Surfaces CSS component system offers a comprehensive design language for creating visually rich, glassmorphic UI components. It separates concerns into three distinct layers: **Materials** (color), **Finishes** (optics/surface treatment), and **Shapes** (geometry), allowing you to mix and match to create unique visual effects.

This file is the **entry point and navigation hub** for the Surfaces documentation:

- Overview: `docs/Overview.md`
- User Manual (how to use base classes and mappings): `docs/User Manual.md`
- Developer Guide (how to extend/modify): `docs/Developer Guide.md`
- Requirements: `docs/Requirements.md`
- Architecture: `docs/Architecture.md`

Demo and reference pages in this folder:

- `showcase.html` – UI Kit for exploring materials, finishes, shapes, density, and bloom, including a copyable “Current menu class stack”.
- `index.html` – Surfaces mapper sample using `data-surface` and `mappings.js`.
- `include-hook.html` – minimal include example showing the smallest viable setup to consume `mappings.js`.

---

## Artifact Overview

- **Intent / Demand** > `docs/Overview.md` (Intent / Motivation) and `docs/Requirements.md`  
  Why Surfaces exists and what problems it is meant to solve.
- **User-Facing Behavior (User Guide)** > `docs/User Manual.md`  
  What consumers of Surfaces experience: components, layout helpers, mappings.
- **Feature Description (Implementation Manual)** > `docs/Developer Guide.md`  
  How Surfaces is structured internally, extension rules, and constraints on changes.
- **Executable Truth (Test Scenarios)** > `docs/Test Scenarios.md`  
  Scenarios that must always hold, anchored in `showcase.html`, `index.html`, and `include-hook.html`.
- **Implementation (Code)** > CSS/JS and demo pages in this folder  
  `css/*`, `js/*`, `showcase.html`, `index.html`, `include-hook.html`.
- **Product & System Requirements** > `docs/Requirements.md`  
  Functional, non-functional, integration, style, and mapping contracts the system must satisfy.
- **System Constraints (Architecture Overview)** > `docs/Architecture.md` and `docs/Requirements.md`  
  Global invariants that all features and changes must respect.

License: **CC BY – Intelygence GmbH**

---

## Core Philosophy

- **Materials** define color palettes (hue, saturation, lightness)
- **Finishes** define optical properties (transparency, blur, diffusion, specular highlights)
- **Shapes** define geometry (rounded corners, faceted edges, custom polygons)
- **Components** consume these layers to create buttons, chips, cards, dialogs, and more

Text color automatically adapts based on background lightness and dark/light mode for optimal contrast.

---

## Materials

Materials provide color palettes. Each material defines a top and bottom color that create a gradient, plus lightness values for automatic text contrast calculation.

### Default Materials

- **`default-primary`** - Primary brand color (purple to teal gradient, ~80% lightness)
- **`default-secondary`** - Secondary accent color (blue gradient, ~78% lightness)  
- **`default-contrast`** - High contrast neutral (gray gradient, ~85% lightness)

### Gem Materials

- **`onyx`** - Deep dark gray/black (28% lightness) - Elegant, sophisticated
- **`jade`** - Green gemstone (70% lightness) - Natural, calming
- **`emerald`** - Rich green (68% lightness) - Vibrant, luxurious
- **`sapphire`** - Light blue gemstone (72% lightness) - Cool, professional
- **`ruby`** - Deep red (70% lightness) - Bold, passionate
- **`gold`** - Metallic gold (72% lightness) - Premium, warm
- **`topaz`** - Yellow-orange (74% lightness) - Energetic, friendly
- **`diamond`** - Near-white (98% lightness) - Pure, minimal
- **`copper`** - Warm metallic (55% lightness) - Earthy, industrial
- **`silver`** - Cool metallic (88% lightness) - Modern, sleek
- **`carbon`** - Deep black (18% lightness) - Dark, powerful
- **`glass`** - Near-transparent white (97% lightness) - Clean, minimal
- **`amber`** - Orange-brown (48% lightness) - Warm, organic
- **`amethyst`** - Purple gemstone (70% lightness) - Mystical, creative
- **`matrix`** - Green digital (46% lightness) - Tech, cyberpunk
- **`black-hole`** - Deepest black (4% lightness) - Extreme contrast
- **`tron`** - Cyan digital (50% lightness) - Retro-futuristic
- **`scifi`** - Purple-cyan gradient (60% lightness) - Futuristic, vibrant

---

## Finishes

Finishes define optical properties and surface treatments. They operate on materials to create different visual effects. Each finish has a perceptual invariant—a consistent visual characteristic.

### Transparent Finishes

**Glass-like finishes that preserve background detail:**

- **`transparent`** - 95% transparent, minimal fill, no blur. Preserves background detail perfectly. Best for overlays that need to show content behind.
- **`tinted`** - 98% transparent, very minimal fill, light blur. Visible hue bias with caustic sheen effect. Adds subtle color while maintaining transparency.
- **`liquid`** - 95% transparent, minimal fill, strong blur. Creates depth with pooled highlights. Neutral white tint reduces hue bias.
- **`water`** - Similar to transparent but with 1px blur. Clear-to-deep gradient effect. Slightly more diffusion than transparent.

### Diffused Finishes

**Finishes that add visual diffusion:**

- **`milky`** - 80% transparent, low fill, weak blur. Neutral diffusion that brightens the background. Multi-lobe highlight pools create depth.
- **`frosted`** - Medium transparency, strong blur (20px), white/neutral tint. Classic frosted glass effect. Significantly brightens background.

### Opaque Finishes

**Fully opaque finishes with different surface treatments:**

- **`metallic`** - Fully opaque with strong specular highlights. Bright mirror-like reflections. Best for premium, high-tech aesthetics.
- **`polished`** - Fully opaque diagonal gradient, no specular. Clean, professional look without shine.
- **`glossy`** - Fully opaque with multiple bright specular highlights. Mirror-like reflections for high-shine effects.
- **`trimmed`** - Duochrome gradient rim with flat inner fill. Frame-like appearance, good for cards and panels.
- **`banded`** - Gradient rim with flat darker inner fill. Creates visual separation between rim and content area.
- **`flat`** - Single flat color, no gradients or effects. Minimal, stable contrast. Best for accessibility and simplicity.

### Textures

**Textures add surface patterns and work on top of finishes:**

- **`anodized`** - Fine parallel lines creating a brushed metal texture. Adds subtle lightening (+30 lightness mod).
- **`etched`** - Random dot pattern creating frosted/etched glass texture. White overlay dots add significant lightening (+30 lightness mod).

---

## Shapes

Shapes define the geometry of components. They can use border-radius for rounded shapes or clip-path for custom polygons.

### Rounded Shapes

- **`pill`** - Fully rounded ends (pill-shaped). Best for buttons and chips.
- **`round`** - Medium rounded corners. Versatile for buttons and cards.
- **`window`** - Large rounded corners. Good for cards and dialogs.
- **`tile`** - Small rounded corners. Subtle rounding for tiles and badges.

### Faceted Shapes

- **`gem`** - 8-pointed faceted gem shape with cut corners. Creates a jewel-like appearance. Best for premium buttons and badges.
- **`plaque`** - Sharp rectangular corners, no rounding. Minimal, geometric.

### Custom Shapes

- **`chevron-start`** - Straight left edge, chevron pointing right `[=>`. Good for navigation and sequential UI.
- **`chevron-middle`** - Chevrons on both sides pointing inward `>=>`. For middle items in sequences.

---

## Components

Components are the building blocks that consume materials, finishes, and shapes.

### Buttons

```html
<button class="button [finish] [density] [bloom] [material] [shape] hoverable">
  <span>Button Text</span>
</button>
```

- Uses primary material colors by default
- Supports hover and active states with `hoverable` class
- Can be `selected` or `disabled`
- Text color automatically adapts for contrast

### Chips

```html
<button class="chip [finish] [density] [bloom] [material] [shape] hoverable">
  <span>Chip Text</span>
</button>
```

- Smaller than buttons, typically for tags and labels
- Uses primary material colors by default
- Lighter visual weight than buttons

### Surfaces

Surfaces are container components for content:

- **`card`** - Standard card container (medium padding)
- **`sheet`** - Large surface for content areas (more padding)
- **`dialog`** - Modal/dialog container (medium padding)
- **`frame`** - Minimal frame container (less padding)

```html
<div class="surface card [finish] [density] [bloom] [material] [shape]">
  <!-- Content goes here -->
</div>
```

- Uses secondary material colors by default
- Content automatically renders above glass layers
- Supports `overlay` class for popovers/menus (adds scrim and blur)

### Other Components

- **`segmented`** - Segmented control for toggles
- **`slider`** - Range input slider
- **`dropdown`** - Pure CSS dropdown using `<details>` element

---

## Layout Helpers

The layout helpers in `layout.css` keep page structure simple and composable:

- **`.grid`** – CSS Grid wrapper for two- and three-column layouts  
  - Use `.grid cols-2` or `.grid cols-3` for responsive columns (collapse to one column below 900px).
- **`.stack`** – Vertical flex stack with consistent spacing between children.
- **`.cluster`** – Horizontal flex row that wraps; ideal for small groups of actions (for example, header button clusters).
- **`.cluster-row`** – Equal-height responsive row using CSS Grid  
  - Uses `repeat(auto-fill, minmax(var(--cluster-min, 6rem), 1fr))` so items share a consistent footprint and the last row does not stretch a single item to full width.

These helpers are intentionally minimal to cover common layout needs without introducing a large utility class surface.

---

## How to Use These in Combination

The system is designed for composition. Combine materials, finishes, and shapes to create unique visual effects.

### Basic Pattern

```
[component] [finish] [density] [bloom] [material] [shape] [modifiers]
```

### Material + Finish Combinations

**Transparent finishes** work best with lighter materials to maintain visibility:
- `transparent diamond` - Pure glass effect
- `tinted sapphire` - Colored glass with blue tint
- `water glass` - Ultra-clear water effect

**Opaque finishes** work with any material:
- `metallic ruby` - Shiny red metal
- `polished onyx` - Dark polished surface
- `glossy gold` - Premium gold with mirror shine

**Dark materials** with transparent finishes create dramatic effects:
- `transparent carbon` - Dark glass
- `tinted black-hole` - Deep space effect

**Light materials** with opaque finishes are clean and minimal:
- `flat diamond` - Pure white minimal
- `polished silver` - Clean metallic

### Shape Considerations

- **`pill`** - Best for buttons and chips, creates friendly, approachable feel
- **`gem`** - Premium feel, works well with metallic/glossy finishes
- **`window`** - Good for cards and dialogs, soft and modern
- **`plaque`** - Minimal, geometric, works with flat finishes

### Modifiers

- **`hoverable`** - Adds hover and active state animations
- **`selected`** - Highlights selected state
- **`disabled`** - Reduces opacity and disables interaction
- **`bloom-weak`** / **`bloom-mild`** / **`bloom-strong`** - Adds glow/emission effect
- **`overlay`** - For surfaces used as popovers/menus (adds scrim)

---

## Common Examples

### Primary Action Button

```html
<button class="button polished default-primary pill hoverable">
  <span>Get Started</span>
</button>
```

Clean, professional primary button with rounded ends.

### Premium Feature Button

```html
<button class="button metallic bloom-mild gold gem hoverable">
  <span>Upgrade</span>
</button>
```

Premium gold button with metallic finish, faceted gem shape, and subtle glow.

### Glass Card

```html
<div class="surface card transparent diamond window">
  <h3>Glass Card</h3>
  <p>Content with glass effect</p>
</div>
```

Transparent card that shows background through glass effect.

### Dark Glass Overlay

```html
<div class="surface dialog tinted onyx window overlay">
  <h3>Modal Dialog</h3>
  <p>Dark glass overlay with scrim</p>
</div>
```

Dark modal dialog with glass effect and background scrim for readability.

### Tag/Chip

```html
<button class="chip milky sapphire pill hoverable">
  <span>Tag</span>
</button>
```

Light blue tag with milky glass finish.

### Navigation Button

```html
<button class="button polished default-primary chevron-start hoverable">
  <span>Next</span>
</button>
```

Navigation button with chevron shape indicating direction.

### Minimal Flat Button

```html
<button class="button flat default-contrast plaque">
  <span>Cancel</span>
</button>
```

Minimal button with no effects, sharp corners, good for secondary actions.

### Textured Surface

```html
<div class="surface card metallic copper anodized round">
  <h3>Brushed Metal</h3>
  <p>Copper with anodized texture</p>
</div>
```

Copper surface with liquid glass finish and anodized brushed texture.

### Premium Badge

```html
<button class="chip liquid bloom-strong ruby gem">
  <span>Premium</span>
</button>
```

High-shine red badge with faceted gem shape and strong glow.

### Frosted Glass Panel

```html
<div class="surface sheet frosted glass window">
  <h2>Content Area</h2>
  <p>Frosted glass creates privacy while maintaining light feel</p>
</div>
```

Large content area with frosted glass effect.

---

## Best Practices

1. **Contrast First** - Always ensure text is readable. The system calculates this automatically, but test in both light and dark modes.

2. **Material + Finish Harmony** - Transparent finishes work best with lighter materials. Dark materials with transparent finishes can be dramatic but may need careful consideration.

3. **Shape Context** - Use `pill` for friendly, approachable UI. Use `gem` for premium features. Use `plaque` for minimal, geometric designs.

4. **Overlay Surfaces** - Always use `overlay` class on surfaces used as popovers, menus, or dialogs to ensure readability over busy backgrounds.

5. **Bloom Sparingly** - Bloom effects add visual weight. Use `bloom-weak` for subtle emphasis, `bloom-strong` only for important highlights.

6. **Texture Layering** - Textures (anodized, etched) work on top of finishes. Combine with opaque finishes for best results.

7. **Accessibility** - The system automatically handles text contrast, but always test with actual content. Use `flat` finish when maximum contrast is needed.

---

## Technical Notes

-- Text color automatically adapts using `color-mix()` in OKLab color space
-- Glass finishes use `backdrop-filter` for blur effects
-- Bloom effects use `filter: drop-shadow()` to escape clip-path bounds
-- All components support CSS custom properties for fine-tuning
-- The system is designed to work in both light and dark modes
-- Components use CSS relative color syntax (`hsl(from ...)`) to derive color variations from base material colors
-- Layout helpers (`.grid`, `.stack`, `.cluster`, `.cluster-row`) are defined in `layout.css` and are safe to reuse across pages

---

## Semantic Mappings (JS)

The Surfaces system includes a small JS helper in `js/mappings.js` that maps semantic names to class combinations:

```js
export const surfacesMappings = {
  "ok-button": "sapphire flat plaque button hoverable",
  "card": "default-secondary transparent window surface card",
  // ...
};
```

- **`getMapping(name)`** – returns the class string for a semantic name or `null` if not found.  
- **`hasMapping(name)`** – returns a boolean indicating whether a mapping exists.  
- **`getAllMappings()`** – returns a shallow copy of the mapping table.

This lets you keep markup semantic (e.g. via data attributes or configuration) while centralizing the visual contract for buttons, cards, dialogs, and other Surfaces components.

---

## Customization

You can override any CSS custom property for fine control:

```css
.my-button {
  --mat-top: 200 80% 60%;
  --mat-bottom: 180 70% 40%;
  --blur-inner: 20px;
  --shadow-a: var(--shadow-3);
}
```

This allows unlimited customization while maintaining the system's structure.

