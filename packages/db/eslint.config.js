import base from '@repo/eslint-config/base.js';

export default [
  ...base,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
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
    },
  },
];
