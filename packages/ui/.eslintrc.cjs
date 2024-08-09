/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/base.js', '@repo/eslint-config/storybook.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.lint.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/no-unknown-property': 'off',
    'barrel-files/avoid-barrel-files': 'off',
    'barrel-files/avoid-namespace-import': 'off',
  },
};
