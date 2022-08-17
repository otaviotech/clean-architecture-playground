import baseConfig from './jest.config';

module.exports = {
  ...baseConfig,
  testMatch: ['**/?(*.)+(test).ts'],
};
