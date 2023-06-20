module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: '.*\\.(test|spec)\\.ts$',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/setup.ts'],
  moduleNameMapper: {
    '\\.(png|webp|woff2|mp3)$': '<rootDir>/tests/mocks/assets.ts',
    '\\.(css)$': '<rootDir>/tests/mocks/styles.ts',
    '/loaders': '<rootDir>/tests/mocks/loaders.ts',
    '^@/(.*)': '<rootDir>/src/$1',
  },
};
