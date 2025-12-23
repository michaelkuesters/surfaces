# Surfaces CSS – Product Requirements

This document captures the functional and non-functional requirements for Surfaces.
It is written to be **technology-agnostic** so the system can be rebuilt from scratch
even if underlying tools or frameworks change. Treat each requirement as a contract
that any future implementation must satisfy.

## 1. Functional Requirements

1. **Visual Language**
   - Provide a consistent, premium visual language across products (glassmorphic + layered).
   - Support primary, secondary, destructive, and premium-styled actions.

2. **Component Coverage**
   - Buttons and chips for actions and tags.
   - Surfaces (cards, sheets, dialogs, frames) for containers.
   - Basic layout helpers for grids, stacks, and clusters.

3. **Semantic Usage**
   - Allow UIs to refer to visual recipes via semantic names (`ok-button`, `card`, `dialog`, …) using mappings.
   - Keep templates mostly free from hardcoded Surfaces class stacks where possible.

4. **Class Stack Composition**
   - Visual recipes are expressed as **ordered class stacks**. The canonical order is:
     - **Component/role** (e.g., `button`, `chip`, `surface card|sheet|dialog|frame`)
     - **Material** (e.g., `default-primary`, `onyx`, `gold`)
     - **Finish** (e.g., `polished`, `transparent`, `flat`)
     - **Shape** (e.g., `pill`, `round`, `window`, `gem`, `plaque`)
     - **Modifiers** (e.g., `hoverable`, `selected`, `disabled`, `bloom-*`, `overlay`, density classes)
   - Stacks must avoid duplication when merged (idempotent union).

5. **Semantic Mapping Behavior**
   - A mapping table from semantic keys to class stacks must exist.
   - API surface (or equivalent behavior) must include:
     - `getMapping(key)` → class stack or null if unknown.
     - `hasMapping(key)` → boolean.
     - `getAllMappings()` → shallow copy of all mappings.
   - Multiple semantic keys on one element combine into a deduplicated class stack (order preserved per canonical ordering above).
   - Unknown keys in inputs are ignored; known keys must still apply.

6. **Copy/Export Helper (if present)**
   - When exposing a computed class stack (e.g., for copy/paste), internal/glue classes are omitted (e.g., container-only markers).
   - Exported string uses deterministic ordering: **finish → density → bloom → material → shape → other** (aligns with showcase reference).

7. **Dark/Light Mode**
   - Work correctly in both light and dark app themes.
   - Maintain sufficient text contrast automatically.

## 2. Non-Functional Requirements

1. **Performance**
   - CSS should remain lean enough to load quickly in typical web apps.
   - JS mapping helper (`mappings.js`) must remain small and synchronous (no runtime network calls).

2. **Maintainability**
   - Clear separation into tokens, components, layout, and mappings.
   - Minimal API surface; changes should be evolutionary, not breaking.

3. **Accessibility**
   - Text contrast must respect WCAG principles as far as feasible with automatic contrast logic.
   - Components should be keyboard-focusable and compatible with existing app focus styles.
   - On transparent and dynamically colored surfaces, ensure contrast is satisfied

4. **Portability**
   - System must be usable both in standalone demos (plain HTML) and embedded into larger applications.
   - No framework-specific assumptions (e.g. React/Vue) inside the CSS or JS core.

## 3. Integration Requirements

1. **File Layout**
   - Surfaces lives under `src/vxs/css/surfaces/`.
   - Core framework CSS lives in `src/vxs/css/surfaces/css/`.
   - Products include:
     - CSS: `css/tokens.css`, `css/materials.css`, `css/finishes.css`, `css/shapes.css`, `css/components.css`, `css/layout.css`
     - Optional JS: `js/mappings.js`

2. **Usage Contracts**
   - Products may:
     - Use base classes directly in markup.
     - Use semantic mappings via JS.
   - Products must:
     - Avoid redefining core Surfaces class names in their own CSS.
     - Respect the documented customization hooks via CSS variables.


## Style requirements

### Materials

Materials provide color palettes. Each material defines a top and bottom color that create a gradient, plus lightness values for automatic text contrast calculation.

#### Default Materials

- **`default-primary`** - Primary brand color (purple to teal gradient, ~80% lightness)
- **`default-secondary`** - Secondary accent color (blue gradient, ~78% lightness)  
- **`default-contrast`** - High contrast neutral (gray gradient, ~85% lightness)

#### Base Materials

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

### Finishes

Finishes define optical properties and surface treatments. They operate on materials to create different visual effects. Each finish has a perceptual invariant—a consistent visual characteristic.

#### Transparent Finishes

**Glass-like finishes that preserve background detail:**

- **`transparent`** - 95% transparent, minimal fill, no blur. Preserves background detail perfectly. Best for overlays that need to show content behind.
- **`tinted`** - 98% transparent, very minimal fill, light blur. Visible hue bias with caustic sheen effect. Adds subtle color while maintaining transparency.
- **`liquid`** - 95% transparent, minimal fill, strong blur. Creates depth with pooled highlights. Neutral white tint reduces hue bias.
- **`water`** - Similar to transparent but with 1px blur. Clear-to-deep gradient effect. Slightly more diffusion than transparent.

#### Diffused Finishes

**Finishes that add visual diffusion:**

- **`milky`** - 80% transparent, low fill, weak blur. Neutral diffusion that brightens the background. Multi-lobe highlight pools create depth.
- **`frosted`** - Medium transparency, strong blur (20px), white/neutral tint. Classic frosted glass effect. Significantly brightens background.

#### Opaque Finishes

**Fully opaque finishes with different surface treatments:**

- **`metallic`** - Fully opaque with strong specular highlights. Bright mirror-like reflections. Best for premium, high-tech aesthetics.
- **`polished`** - Fully opaque diagonal gradient, no specular. Clean, professional look without shine.
- **`glossy`** - Fully opaque with multiple bright specular highlights. Mirror-like reflections for high-shine effects.
- **`trimmed`** - Duochrome gradient rim with flat inner fill. Frame-like appearance, good for cards and panels.
- **`banded`** - Gradient rim with flat darker inner fill. Creates visual separation between rim and content area.
- **`flat`** - Single flat color, no gradients or effects. Minimal, stable contrast. Best for accessibility and simplicity.

#### Textures

**Textures add surface patterns and work on top of finishes:**

- **`anodized`** - Fine parallel lines creating a brushed metal texture. Adds subtle lightening (+30 lightness mod).
- **`etched`** - Random dot pattern creating frosted/etched glass texture. White overlay dots add significant lightening (+30 lightness mod).

---

### Shapes

Shapes define the geometry of components. They can use border-radius for rounded shapes or clip-path for custom polygons.

#### Rounded Shapes

- **`pill`** - Fully rounded ends (pill-shaped). Best for buttons and chips.
- **`round`** - Medium rounded corners. Versatile for buttons and cards.
- **`window`** - Large rounded corners. Good for cards and dialogs.
- **`tile`** - Small rounded corners. Subtle rounding for tiles and badges.

#### Faceted Shapes

- **`gem`** - 8-pointed faceted gem shape with cut corners. Creates a jewel-like appearance. Best for premium buttons and badges.
- **`plaque`** - Sharp rectangular corners, no rounding. Minimal, geometric.

#### Custom Shapes

- **`chevron-start`** - Straight left edge, chevron pointing right `[=>`. Good for navigation and sequential UI.
- **`chevron-middle`** - Chevrons on both sides pointing inward `>=>`. For middle items in sequences.

### Bloom

Bloom effects provide outer glow that escapes clip paths for emphasis.

- Supported intensities: `bloom-weak`, `bloom-mild`, `bloom-strong` (default is no bloom).
- Implemented with drop shadows so the glow renders outside rounded or faceted shapes.
- Works atop transparent and opaque finishes; must maintain readable text and avoid clipping.
- Ordered after density modifiers and before materials when exporting class stacks.

### style class: ".code"

**`<code>`** styling provides standard L&F for code blocks.

- `.code` and native `<code>` share the same styling (monospace font, small size, padded pill container with subtle border).
- The `.code` class exists mainly for application inside mappings.
- Background/foreground auto-derive app to stay readable in light and dark themes.
- Supports `.code.block` to render as a full-width block for multi-line snippets.
- Ensure code word-wraps to be fully legible.


## 5. Reimplementation Guidance (Tech-Agnostic)

Any reimplementation (even without CSS/JS) must satisfy:
- **Declarative recipes**: A structured mapping from semantic intent to visual recipe, supporting lookup, existence check, and full-table retrieval.
- **Composable stacks**: Ability to merge multiple recipes on one element with deduplication and stable ordering.
- **Separation of concerns**: Distinct layers for tokens (design primitives), materials (color schemes), finishes (optics), shapes (geometry), components (assembly), and layout (structure).
- **Export/inspection**: A deterministic, human-readable representation of the computed recipe that omits internal plumbing classes.
- **Framework independence**: No reliance on a specific frontend framework; must function in a minimal host with only the declared artifacts.


