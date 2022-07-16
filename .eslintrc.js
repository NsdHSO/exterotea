module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',

  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    "no-console": "warn",
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    "@typescript-eslint/no-useless-empty-export": "warn",
    "comma-dangle": ["error", "never"],
    indent: [
      'error',
      2,
    ],
    "max-len": [
      "error", {
        "code": 200
      }
    ],
    "object-curly-spacing": [2, "always"],
    "new-cap": 0,

  },
};
