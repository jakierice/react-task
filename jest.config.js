module.export = {
  roots: ['<rootDir>/pages'],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/**/>(*.)test.{js, jsx}'], // finds test
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: [
    'jest-dom/extend-expect',
    '@testing-library/react/cleanup-after-each'
  ] // setupFiles before the tests are ran
};