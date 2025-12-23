import { beforeAll, afterAll } from '@jest/globals';

// Ensure console noise from mapper warnings doesn't fail tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => originalWarn.apply(console, args);
});

afterAll(() => {
  console.warn = originalWarn;
});

