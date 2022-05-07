export default {
  displayName: {
    name: '@core',
    color: 'blue'
  },
  clearMocks: true,
  rootDir: 'src',
  testRegex: ['.*\\..*spec\\.ts$', '.*\\..*test\\.ts$'],
  transform: {
    '^.+\\.ts?$': ['@swc/jest']
  },
  setupFilesAfterEnv: ['./@seedwork/domain/tests/validations.extend.ts'],
  moduleNameMapper: {
    '#seedwork/(.*)': '<rootDir>/@seedwork/$1',
    '#category/(.*)': '<rootDir>/category/$1'
  },
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/../__coverage__',
  coverageReporters: ['json', 'html'],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95
    }
  }
}
