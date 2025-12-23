/**
 * Surfaces Mapper
 * 
 * Processes elements with `data-surface` attribute and applies class mappings.
 * 
 * Usage:
 *   <div data-surface="ok-button"> becomes <div class="default-primary polished pill button hoverable">
 * 
 * Supports:
 *   - Single mapping: data-surface="ok-button"
 *   - Multiple mappings: data-surface="ok-button primary-button"
 *   - Preserves existing classes
 *   - Can remove data-surface attribute after processing (optional)
 */

import { getMapping, hasMapping } from './mappings.js';

/**
 * Process a single element with data-surface attribute
 * @param {HTMLElement} element - Element to process
 * @param {Object} options - Processing options
 * @param {boolean} options.removeAttribute - Remove data-surface attribute after processing (default: false)
 * @param {boolean} options.preserveExisting - Preserve existing classes (default: true)
 */
export function processElement(element, options = {}) {
  const {
    removeAttribute = false,
    preserveExisting = true
  } = options;

  const surfacesAttr = element.getAttribute('data-surface');
  if (!surfacesAttr) {
    return;
  }

  // Split by spaces to support multiple mappings
  const semanticNames = surfacesAttr.trim().split(/\s+/).filter(Boolean);
  
  // Collect all classes from mappings
  const mappedClasses = new Set();
  
  for (const semanticName of semanticNames) {
    const mapping = getMapping(semanticName);
    if (mapping) {
      // Add all classes from this mapping
      mapping.split(/\s+/).forEach(cls => {
        if (cls) mappedClasses.add(cls);
      });
    } else {
      console.warn(`[Surfaces Mapper] Unknown mapping: "${semanticName}"`);
    }
  }

  // Get existing classes if preserving
  const existingClasses = preserveExisting 
    ? (element.className || '').split(/\s+/).filter(Boolean)
    : [];

  // Combine existing and mapped classes, deduplicating
  const allClassesSet = new Set([...existingClasses, ...mappedClasses]);
  
  // Update element classes
  element.className = Array.from(allClassesSet).join(' ');

  // Remove data-surface attribute if requested
  if (removeAttribute) {
    element.removeAttribute('data-surface');
  }
}

/**
 * Process all elements with data-surface attribute in the document
 * @param {Object} options - Processing options
 * @param {boolean} options.removeAttribute - Remove data-surface attribute after processing
 * @param {boolean} options.preserveExisting - Preserve existing classes
 * @param {HTMLElement|Document} options.root - Root element to search (default: document)
 * @returns {HTMLElement[]} - Array of processed elements
 */
export function processAll(options = {}) {
  const {
    removeAttribute = false,
    preserveExisting = true,
    root = document
  } = options;

  const elements = root.querySelectorAll('[data-surface]');
  const processed = [];

  elements.forEach(element => {
    processElement(element, { removeAttribute, preserveExisting });
    processed.push(element);
  });

  return processed;
}

/**
 * Initialize the mapper - processes all elements and sets up MutationObserver
 * @param {Object} options - Processing options
 * @param {boolean} options.autoProcess - Automatically process new elements (default: true)
 * @param {boolean} options.removeAttribute - Remove data-surface attribute after processing
 * @param {boolean} options.preserveExisting - Preserve existing classes
 */
export function init(options = {}) {
  const {
    autoProcess = true,
    removeAttribute = false,
    preserveExisting = true
  } = options;

  // Process existing elements
  processAll({ removeAttribute, preserveExisting });

  // Set up MutationObserver to process dynamically added elements
  if (autoProcess && typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Process the node itself if it has data-surface attribute
            if (node.hasAttribute && node.hasAttribute('data-surface')) {
              processElement(node, { removeAttribute, preserveExisting });
            }
            // Process children
            const children = node.querySelectorAll && node.querySelectorAll('[data-surface]');
            if (children) {
              children.forEach(child => {
                processElement(child, { removeAttribute, preserveExisting });
              });
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Return cleanup function
    return () => observer.disconnect();
  }
}

// Auto-initialize if in browser environment and DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }
}

