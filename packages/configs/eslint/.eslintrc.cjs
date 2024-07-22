/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['./base.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'unicorn/prefer-module': 'off',
    'sort-keys-fix/sort-keys-fix': 'off',
  },
};
