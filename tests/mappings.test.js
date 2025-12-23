/**
 * Tests for Surfaces mapping table semantics.
 * Uses dynamic import to keep compatibility with ESM modules.
 */

import { describe, test, expect, beforeAll } from '@jest/globals';

const finishSet = new Set([
  'transparent', 'tinted', 'liquid', 'water', 'milky',
  'metallic', 'polished', 'frosted', 'glossy',
  'anodized', 'etched', 'trimmed', 'banded', 'flat'
]);

const materialSet = new Set([
  'default-primary', 'default-secondary', 'default-contrast',
  'onyx', 'jade', 'emerald', 'sapphire', 'ruby', 'gold', 'topaz',
  'diamond', 'copper', 'silver', 'carbon', 'glass',
  'amber', 'amethyst', 'matrix', 'black-hole', 'tron', 'scifi'
]);

const componentTokens = ['button', 'chip', 'surface'];

describe('mappings.js semantics', () => {
  let getMapping;
  let hasMapping;
  let getAllMappings;

  beforeAll(async () => {
    const mod = await import('../js/mappings.js');
    getMapping = mod.getMapping;
    hasMapping = mod.hasMapping;
    getAllMappings = mod.getAllMappings;
  });

  test('known key resolution', () => {
    expect(hasMapping('ok-button')).toBe(true);
    expect(getMapping('ok-button')).toContain('button');
  });

  test('unknown key behavior', () => {
    expect(hasMapping('does-not-exist')).toBe(false);
    expect(getMapping('does-not-exist')).toBeNull();
  });

  test('getAllMappings returns shallow copy', () => {
    const all = getAllMappings();
    all['ok-button'] = 'tampered';
    expect(getMapping('ok-button')).not.toBe('tampered');
  });

  test('value invariants: contains finish + material + component', () => {
    const all = getAllMappings();
    Object.entries(all).forEach(([key, value]) => {
      // Skip special mappings that don't follow the normal pattern
      if (key === 'code') return;
      
      const tokens = value.split(/\s+/).filter(Boolean);
      expect(tokens.some(t => finishSet.has(t))).toBeTruthy();
      expect(tokens.some(t => materialSet.has(t))).toBeTruthy();
      expect(tokens.some(t => componentTokens.includes(t))).toBeTruthy();
    });
  });
});

