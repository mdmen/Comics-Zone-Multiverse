const { paths } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: '.*\\.(test|spec)\\.ts$',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    ...paths,
    '@/test-utils': '<rootDir>/tests/utils.ts',
    '\\.(png|webp|woff2|mp3)$': '<rootDir>/tests/mocks/asset.ts',
    '\\.(css)$': '<rootDir>/tests/mocks/style.ts',
  },
};
