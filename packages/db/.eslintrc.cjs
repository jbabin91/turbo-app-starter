/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/base.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'barrel-files/avoid-barrel-files': 'off',
    'barrel-files/avoid-namespace-import': 'off',
  },
  overrides: [
    {
      files: ['./src/schema/**/*.ts', './src/scripts/**/*.ts'],
      rules: {
        'sort-keys-fix/sort-keys-fix': 'off',
      },
    },
    {
      files: ['./src/scripts/**/*.ts'],
      rules: {
        'unicorn/no-process-exit': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/no-process-exit': 'off',
      },
    },
  ],
};
