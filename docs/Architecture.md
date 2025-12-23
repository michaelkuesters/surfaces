# Surfaces CSS – Architecture

This document describes the architecture and constraints of the Surfaces system.

## 1. High-Level Structure

Surfaces is split into the following layers:

1. **Tokens / Materials / Finishes / Shapes**
   - Define base colors, optical properties, and geometry.
   - Implemented via CSS custom properties.
2. **Components**
   - `button`, `chip`, `surface` and related variants.
   - Consume tokens via CSS variables and relative color syntax.
3. **Layout Helpers**
   - `grid`, `stack`, `cluster`, `cluster-row` in `layout.css`.
   - Responsible only for positioning, not visuals.
4. **Semantic Mappings**
   - `js/mappings.js` table mapping semantic names → class combinations.
   - Optional but recommended for product integration.

## 2. Architectural Constraints

- **No framework coupling**
  - Pure CSS + vanilla JS. No dependencies on frameworks.
- **Stable public API**
  - Class names and mapping keys are considered public API.
  - Changes must be backwards compatible or explicitly versioned.
- **Token-first**
  - Prefer adjusting tokens (CSS variables) to changing multiple component rules.
- **Separation of layout and visuals**
  - Layout helpers must not encode product-specific visual rules.
  - Components must not assume specific layout containers.

## 3. Project Integration

- Surfaces is designed to fit into a **decentralized monolith** architecture[[memory:4519566]]:
  - Core visual system lives centrally.
  - Individual modules/spokes consume the same CSS and JS mappings.
  - No cross-module visual dependencies; only the shared Surfaces layer.

## 4. Usage Constraints

- Products should:
  - Use Surfaces classes and mappings as-is, without redefining them.
  - Customize via CSS variables, not by overriding entire rule blocks.
- Products must not:
  - Change the meaning of existing materials, finishes, or shapes.
  - Rely on undocumented internals (e.g. specific gradient angles) for logic.

## 5. Extensibility

- New materials, finishes, shapes, and mappings can be added incrementally.
- New components or layout helpers should:
  - Live alongside existing ones in the same files.
  - Follow the same naming and composition patterns.
  - Be documented in the main `README.md` and/or the docs in this folder.


