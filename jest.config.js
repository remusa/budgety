const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|jsx?|ts?|tsx?)$'

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest', // ts-jest
  },
  // setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    // '@testing-library/cleanup-after-each',
  ],
  testRegex: TEST_REGEX,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/public/',
    '<rootDir>/.github/',
    '<rootDir>/.netlify/',
    '<rootDir>/.next/',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules', 'utils', 'src', '__dirname'],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/coverage/',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/index.tsx',
    '!<rootDir>/src/serviceWorker.js',
  ],
  coverageThreshold: {
    global: {
      branches: 98,
      functions: 98,
      lines: 98,
      statements: 98,
    },
  },
}
