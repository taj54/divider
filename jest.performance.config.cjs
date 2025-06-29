/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/tests/performance/**/*.performance.test.ts'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/tests/integration/'
  ],
}; 
