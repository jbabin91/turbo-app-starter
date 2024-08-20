import base from '@repo/eslint-config/base.js';

export default [
  ...base,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.lint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'barrel-files/avoid-barrel-files': 'off',
      'barrel-files/avoid-namespace-import': 'off',
      'react/no-unknown-property': 'off',
    },
  },
];
