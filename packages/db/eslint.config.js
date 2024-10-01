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
    files: ['**/schema/**/*.ts', '**/scripts/**/*.ts'],
    rules: {
      'sort-keys-fix/sort-keys-fix': 'off',
    },
  },
  {
    files: ['**/scripts/**/*.ts'],
    rules: {
      'unicorn/no-process-exit': 'off',
      'unicorn/prefer-top-level-await': 'off',
    },
  },
  {
    rules: {
      'barrel-files/avoid-barrel-files': 'off',
      'barrel-files/avoid-namespace-import': 'off',
    },
  },
];
