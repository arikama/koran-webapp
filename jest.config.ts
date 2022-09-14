import nextJest from 'next/jest'

// https://jestjs.io/docs/configuration
const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/pages/_document.tsx',
    '!src/pages/_app.tsx',
  ],
}

module.exports = createJestConfig(customJestConfig)
