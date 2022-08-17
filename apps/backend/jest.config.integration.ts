import baseConfig from './jest.config';

module.exports = {
  ...baseConfig,
  testEnvironment: './test/environments/prisma.ts',
  testMatch: ['**/?(*.)+(spec).ts'],
};
