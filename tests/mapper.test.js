/**
 * Tests for surfaces-mapper behavior (data-surface -> class application).
 * Jest runs in jsdom, so DOM APIs are available.
 */

import { describe, test, expect, beforeAll } from '@jest/globals';

describe('surfaces-mapper', () => {
  let processElement;
  let processAll;
  let getMapping;

  beforeAll(async () => {
    const mapper = await import('../js/surfaces-mapper.js');
    const mappings = await import('../js/mappings.js');
    processElement = mapper.processElement;
    processAll = mapper.processAll;
    getMapping = mappings.getMapping;
  });

  test('single semantic key applies mapped classes', () => {
    const el = document.createElement('button');
    el.setAttribute('data-surface', 'ok-button');

    processElement(el);

    const tokens = el.className.split(/\s+/);
    const expected = getMapping('ok-button').split(/\s+/);
    expected.forEach(token => expect(tokens).toContain(token));
  });

  test('multiple semantic keys merge without duplicates', () => {
    const el = document.createElement('button');
    el.setAttribute('data-surface', 'ok-button primary-button');

    processElement(el);

    const tokens = el.className.split(/\s+/);
    const expected = new Set([
      ...getMapping('ok-button').split(/\s+/),
      ...getMapping('primary-button').split(/\s+/),
    ]);

    expect(new Set(tokens)).toEqual(expected);
  });

  test('preserves existing classes', () => {
    const el = document.createElement('button');
    el.className = 'custom';
    el.setAttribute('data-surface', 'ok-button');

    processElement(el, { preserveExisting: true });

    const tokens = el.className.split(/\s+/);
    expect(tokens).toContain('custom');
  });

  test('ignores unknown keys but applies known ones', () => {
    const el = document.createElement('button');
    el.setAttribute('data-surface', 'unknown-key ok-button');

    processElement(el);

    const tokens = el.className.split(/\s+/);
    const expected = getMapping('ok-button').split(/\s+/);
    expected.forEach(token => expect(tokens).toContain(token));
  });

  test('idempotent when run multiple times', () => {
    const el = document.createElement('button');
    el.setAttribute('data-surface', 'ok-button');

    processElement(el);
    const once = el.className;
    processElement(el);
    const twice = el.className;

    expect(once).toBe(twice);
    const tokens = twice.split(/\s+/);
    expect(tokens.length).toBe(new Set(tokens).size);
  });

  test('processAll maps nodes under a root', () => {
    const root = document.createElement('div');
    const child = document.createElement('button');
    child.setAttribute('data-surface', 'ok-button');
    root.appendChild(child);

    processAll({ root });

    const tokens = child.className.split(/\s+/);
    const expected = getMapping('ok-button').split(/\s+/);
    expected.forEach(token => expect(tokens).toContain(token));
  });
});

