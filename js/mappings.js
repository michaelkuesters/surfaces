/**
 * Surfaces Mapping Table
 * 
 * Maps semantic names to class combinations.
 * Format: "semantic-name": "component finish [density] [bloom] material shape modifiers"
 * 
 * Order matters: component should come before modifiers
 */

export const surfacesMappings = {
  // Primary Actions
  "ok-button": "button flat sapphire plaque hoverable",
  "primary-button": "button polished default-primary pill hoverable",
  "submit-button": "button polished default-primary pill hoverable",
  "confirm-button": "button polished default-primary pill hoverable",
 
  // Secondary Actions
  "cancel-button": "button flat default-contrast plaque hoverable",
  "secondary-button": "button polished default-secondary round hoverable",
  "back-button": "button flat default-contrast round hoverable",
  
  // Destructive Actions
  "delete-button": "button polished ruby pill hoverable",
  "danger-button": "button polished ruby pill hoverable",
  "remove-button": "button flat ruby pill hoverable",
  
  // Premium/Special Actions
  "upgrade-button": "button metallic bloom-mild gold gem hoverable",
  "premium-button": "button glossy bloom-strong gold gem hoverable",
  "feature-button": "button metallic bloom-weak sapphire round hoverable",
  
  // Navigation
  "next-button": "button polished default-primary chevron-start hoverable",
  "prev-button": "button polished default-primary chevron-start hoverable",
  "nav-button": "button polished default-secondary pill hoverable",
  
  // Tags/Chips
  "tag": "chip milky sapphire pill hoverable",
  "badge": "chip milky emerald pill hoverable",
  "label": "chip transparent default-secondary pill",
  "premium-badge": "chip glossy bloom-strong ruby gem",
  
  // Cards
  "card": "surface card transparent default-secondary window",
  "glass-card": "surface card transparent diamond window",
  "dark-card": "surface card tinted onyx window",
  "premium-card": "surface card metallic gold round",
  "content-card": "surface card milky default-secondary window",
  
  // Dialogs/Modals
  "dialog": "surface dialog liquid diamond window overlay",
  "modal": "surface dialog tinted onyx window overlay",
  "popover": "surface card transparent default-secondary window overlay",
  "menu": "surface card frosted default-secondary round overlay",
  
  // Panels/Sheets
  "panel": "surface sheet milky default-secondary window",
  "sidebar": "surface sheet frosted default-secondary window",
  "content-panel": "surface sheet frosted glass window",
  
  // Frames
  "frame": "surface frame flat default-contrast round",
  "minimal-frame": "surface frame flat default-contrast plaque",
  
  // Special Effects
  "glass-button": "button transparent diamond pill disabled",
  "metallic-button": "button metallic copper round hoverable",
  "glossy-button": "button glossy silver pill hoverable",
  "frosted-button": "button frosted glass pill hoverable",
  
  // Textured
  "brushed-button": "button metallic copper anodized round hoverable",
  "etched-card": "surface card frosted glass etched window",
  
  // Minimal/Flat
  "minimal-button": "button flat default-contrast round",
  
  // Status/State
  "fancy-button": "button polished default-primary pill hoverable",
  "selected-button": "button polished default-primary pill hoverable selected",
  "disabled-button": "button flat default-contrast round disabled",
  "active-button": "button polished emerald pill hoverable selected",
  
  // Code/Display
  "code": "code block",
};

/**
 * Get mapping for a semantic name
 * @param {string} semanticName - The semantic name to look up
 * @returns {string|null} - The class string or null if not found
 */
export function getMapping(semanticName) {
  return surfacesMappings[semanticName] || null;
}

/**
 * Check if a mapping exists
 * @param {string} semanticName - The semantic name to check
 * @returns {boolean} - True if mapping exists
 */
export function hasMapping(semanticName) {
  return semanticName in surfacesMappings;
}

/**
 * Get all available mappings
 * @returns {Object} - All mappings
 */
export function getAllMappings() {
  return { ...surfacesMappings };
}

