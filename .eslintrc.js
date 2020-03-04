const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:jsx-a11y/recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  ignorePatterns: ['node_modules/', 'server/', 'test/', 'sh/', 'test/', 'build/', 'rollup.config.js'],
  rules: {
    'react/no-unescaped-entities': OFF,
    'react/prop-types': OFF /* TODO this would be nice */,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
