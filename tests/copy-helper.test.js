/**
 * Tests the class ordering logic used by the copy/export helper
 * (finish → density → bloom → material → shape → other) with internal classes removed.
 * This mirrors the invariants documented in docs/Test Scenarios.md.
 */

import { describe, test, expect } from '@jest/globals';

const finishesOrder = [
  'transparent', 'milky', 'tinted', 'liquid', 'water',
  'metallic', 'polished', 'frosted', 'glossy',
  'anodized', 'etched', 'trimmed', 'banded', 'flat'
];
const densityOrder = ['dense', 'packed'];
const bloomOrder = ['bloom-weak', 'bloom-mild', 'bloom-strong'];
const materialsOrder = [
  'default-primary', 'default-secondary', 'default-contrast',
  'onyx', 'jade', 'emerald', 'sapphire', 'ruby', 'gold', 'topaz',
  'diamond', 'copper', 'silver', 'carbon', 'glass',
  'amber', 'amethyst', 'matrix', 'black-hole', 'tron', 'scifi'
];
const shapesOrder = [
  'pill', 'round', 'window', 'tile', 'gem',
  'plaque', 'chevron-start', 'chevron-middle'
];

function formatClassStack(input) {
  const classes = Array.isArray(input) ? input : input.split(/\s+/).filter(Boolean);
  const exclude = new Set(['menu', 'surface', 'overlay']);
  const filtered = classes.filter(c => !exclude.has(c));

  const pick = (order) => filtered.filter(c => order.includes(c));

  const finish = pick(finishesOrder);
  const density = pick(densityOrder);
  const bloom = pick(bloomOrder);
  const material = pick(materialsOrder);
  const shape = pick(shapesOrder);

  const used = new Set([...finish, ...density, ...bloom, ...material, ...shape]);
  const rest = filtered.filter(c => !used.has(c));

  return [...finish, ...density, ...bloom, ...material, ...shape, ...rest].join(' ').trim();
}

describe('copy helper ordering', () => {
  test('orders finish → density → bloom → material → shape → other and strips internals', () => {
    const input = [
      'menu', 'surface', 'overlay',
      'bloom-weak', 'default-primary', 'transparent', 'window',
      'custom-class', 'dense'
    ];

    const formatted = formatClassStack(input);
    expect(formatted).toBe('transparent dense bloom-weak default-primary window custom-class');
  });
});

