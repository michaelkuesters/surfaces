module.exports = {
  rootDir: '.',
  testMatch: ['**/*.test.js'],
  testEnvironment: 'jsdom',
  transform: {},
  transformIgnorePatterns: [],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
  moduleNameMapper: {},
};

