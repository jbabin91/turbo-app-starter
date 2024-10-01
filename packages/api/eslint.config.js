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
    rules: {
      'sort-keys-fix/sort-keys-fix': 'off',
      'barrel-files/avoid-barrel-files': 'off',
    },
  },
];
