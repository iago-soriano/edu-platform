const { pathsToModuleNameMapper } = require('ts-jest');
const tsconfig = JSON.parse(
  require('fs').readFileSync(__dirname + '/tsconfig.json', 'utf8'),
);

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  setupFilesAfterEnv: ['<rootDir>/src/test/jest/matchers/setup.ts'],
};

module.exports = config;
