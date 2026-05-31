// @NOTE: This is a workaround to fix the issue with the os module in jest
// error: TypeError: os.availableParallelism is not a function
// https://github.com/expo/expo/issues/34946
// Nodejs version 18 or higher will solve this issue
const os = require('os');
if (typeof os.availableParallelism !== 'function') {
  os.availableParallelism = () => os.cpus().length;
}


module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.test.js'],
    moduleFileExtensions: ['js'],
    transform: {
      '^.+\\.(js)$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css)$': '<rootDir>/test/styleMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  };