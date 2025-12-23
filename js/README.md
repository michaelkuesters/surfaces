# Surfaces Mapper

A JavaScript mapping system that converts semantic `data-surface` attributes to class combinations.

## Quick Start

```html
<!-- Instead of writing this: -->
<button class="default-primary polished pill button hoverable">
  <span>OK</span>
</button>

<!-- Just write this: -->
<button data-surface="ok-button">
  <span>OK</span>
</button>
```

## Installation

### Development (non-minified)

Include both the mapper and mappings:

```html
<script type="module">
  import { init } from './js/surfaces-mapper.js';
  import { surfacesMappings } from './js/mappings.js';
  init(surfacesMappings);
</script>
```

### Production (minified)

Use the minified versions - mapper requires mappings as parameter:

```html
<script type="module">
  import { init } from './js/surfaces-mapper.min.js';
  import { surfacesMappings } from './js/mappings.min.js';
  init(surfacesMappings);
</script>
```

**Important:** The minified mapper requires mappings to be passed as the first parameter. The mapping file contains only the hash/object, making it easy to customize.

## Usage

### Basic Usage

```html
<button data-surface="ok-button">OK</button>
```

Automatically becomes:

```html
<button class="default-primary polished pill button hoverable">OK</button>
```

### Multiple Mappings

You can combine multiple semantic names:

```html
<button data-surface="ok-button primary-button">Submit</button>
```

Classes from both mappings are combined (duplicates are removed).

### Preserve Existing Classes

Existing classes are preserved:

```html
<button class="my-custom-class" data-surface="ok-button">OK</button>
```

Becomes:

```html
<button class="my-custom-class default-primary polished pill button hoverable">OK</button>
```

### Programmatic Usage

```javascript
import { processElement, processAll, init } from './js/surfaces-mapper.min.js';
import { surfacesMappings } from './js/mappings.min.js';

// Process a single element (requires mappings parameter)
const button = document.querySelector('button');
processElement(button, surfacesMappings);

// Process all elements in document (requires mappings parameter)
processAll(surfacesMappings);

// Initialize with mappings and options
init(surfacesMappings, {
  removeAttribute: false,  // Keep data-surface attribute after processing
  preserveExisting: true,   // Preserve existing classes
  autoProcess: true         // Auto-process dynamically added elements
});
```

**Note:** All functions now require the mappings object as the first parameter.

## Available Mappings

See `mappings.js` for the complete list. Common mappings include:

- `ok-button` - Primary action button
- `cancel-button` - Secondary/cancel button
- `delete-button` - Destructive action button
- `upgrade-button` - Premium feature button
- `tag` - Standard tag/chip
- `badge` - Badge chip
- `card` - Standard card
- `glass-card` - Transparent glass card
- `dialog` - Modal dialog
- `popover` - Popover menu

## Adding Custom Mappings

Edit `mappings.min.js` (or `mappings.js` for development) to add your own mappings. The mapping file contains only the hash:

```javascript
export const surfacesMappings = {
  "ok-button": "default-primary polished pill button hoverable",
  // ... existing mappings
  "my-custom-button": "ruby glossy pill button hoverable bloom-strong",
  "my-custom-card": "onyx metallic window surface card",
};
```

Since the mapping file is just a hash, you can easily:
- Create multiple mapping files for different themes
- Swap mappings at runtime
- Customize mappings without touching the mapper code

## Options

### `init(mappings, options)`

- `mappings` (Object, **required**) - The mappings hash object
- `options.autoProcess` (boolean, default: `true`) - Automatically process new elements via MutationObserver
- `options.removeAttribute` (boolean, default: `false`) - Remove `data-surface` attribute after processing
- `options.preserveExisting` (boolean, default: `true`) - Preserve existing classes

### `processElement(element, mappings, options)`

- `element` (HTMLElement) - Element to process
- `mappings` (Object, **required**) - The mappings hash object
- `options.removeAttribute` (boolean, default: `false`)
- `options.preserveExisting` (boolean, default: `true`)

### `processAll(mappings, options)`

- `mappings` (Object, **required**) - The mappings hash object
- `options.removeAttribute` (boolean, default: `false`)
- `options.preserveExisting` (boolean, default: `true`)
- `options.root` (HTMLElement|Document, default: `document`) - Root element to search

## Dynamic Content

The mapper automatically processes dynamically added elements when `autoProcess: true` (default). No manual intervention needed:

```javascript
// This will be automatically processed
const button = document.createElement('button');
button.setAttribute('data-surface', 'ok-button');
document.body.appendChild(button);
```

## API Reference

### Direct Access to Mappings

Since the mapping file only exports the hash, you can access it directly:

```javascript
import { surfacesMappings } from './mappings.min.js';

// Get a mapping
const classes = surfacesMappings['ok-button'];
// Returns: "default-primary polished pill button hoverable"

// Check if mapping exists
if ('ok-button' in surfacesMappings) {
  // Mapping exists
}

// Get all mappings
const all = surfacesMappings;
// Returns: { "ok-button": "...", "cancel-button": "...", ... }
```

## Browser Support

- Modern browsers with ES6 module support
- Requires `MutationObserver` for auto-processing (all modern browsers)
- Falls back gracefully if MutationObserver is not available

## Performance

- Processing is done once on page load
- Dynamic elements are processed as they're added (via MutationObserver)
- Minimal overhead - only processes elements with `data-surface` attribute

