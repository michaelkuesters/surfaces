# Surfaces CSS – Overview

The Surfaces CSS system is a lightweight design language for building glassmorphic, layered UI components.
It separates **what things look like** (materials, finishes, shapes) from **how they are laid out** (layout helpers) and **how they are referenced** (semantic mappings).

## Scope

- Core token system (`css/tokens.css`, `css/materials.css`, `css/finishes.css`, `css/shapes.css`, `css/components.css`)
- Layout helpers (`css/layout.css`) – `grid`, `stack`, `cluster`, `cluster-row`
- Demo and reference pages:
  - `showcase.html` – UI Kit with interactive material/finish/shape picker and a “Current menu class stack” copy helper
  - `index.html` – Surfaces mapper demo using `data-surface` and mappings
  - `include-hook.html` – minimal wiring example to include Surfaces CSS and `mappings.js`
- Semantic mappings (`js/mappings.js`) for mapping product semantics to visual recipes

## Intent / Motivation

- Provide a single, well-documented **visual language** (Surfaces) that product teams can share across modules and services.
- Provide a standard ontology for defining visual components before aggregating them into surface mappings
- Allow products to **describe intent semantically** (`start-process`, `delete-object`, `inconsistent-data`) and keep the Surfaces system responsible for the visual recipe.
- Make visual trade-offs and constraints **explicit and persistent** so agents and humans can evolve the implementation without drifting from the original design intent.

## Design Goals

- Provide **rich, premium visuals** with minimal markup.
- Keep CSS **composable and declarative** via class stacks.
- Maintain a **small, stable API surface** suitable for long-lived products.
- Support **semantic usage** through mappings so products are not coupled to visual class names.

