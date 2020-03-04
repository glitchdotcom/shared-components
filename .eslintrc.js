const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:jsx-a11y/recommended', 'plugin:react/recommended', 'airbnb'],
  parser: 'babel-eslint',
  rules: {
    // Overrides/additions to eslint:recommended:
    'no-else-return': ERROR,
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'no-debugger': WARN,
    'no-console': OFF,
    'no-restricted-syntax': [OFF],
    'arrow-parens': [ERROR, 'always'],
    'operator-linebreak': [ERROR, 'after', { overrides: { '?': 'before', ':': 'before' } }],
    // disabled for prettier compatibility
    'implicit-arrow-linebreak': OFF,
    'object-curly-newline': OFF,
    'no-confusing-arrow': OFF,
    'function-paren-newline': OFF,
    'max-len': [
      'error',
      150,
      2,
      {
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-param-reassign': [OFF],
    'no-mixed-operators': OFF,
  }
};
