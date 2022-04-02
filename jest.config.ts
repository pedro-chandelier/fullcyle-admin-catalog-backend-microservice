export default {
  clearMocks: true,
  coverageProvider: 'v8',
  rootDir: 'src',
  testRegex: ['.*\\..*spec\\.ts$', '.*\\..*test\\.ts$'],
  transform: {
    '^.+\\.ts?$': ['@swc/jest']
  },
  setupFilesAfterEnv: ['./@seedwork/domain/tests/validations.extend.ts']
}
