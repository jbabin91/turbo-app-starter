import js from '@eslint/js';
import pluginRouter from '@tanstack/eslint-plugin-router';
import eslintConfigPrettier from 'eslint-config-prettier';
// @ts-ignore
import barrelFiles from 'eslint-plugin-barrel-files';
import depend from 'eslint-plugin-depend';
import importX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
// @ts-ignore
// eslint-disable-next-line depend/ban-dependencies
import react from 'eslint-plugin-react';
// @ts-ignore
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
// @ts-ignore
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
// @ts-ignore
import storybook from 'eslint-plugin-storybook';
import tailwindcss from 'eslint-plugin-tailwindcss';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules', '**/dist', '.turbo', '*.gen.ts'] },
  depend.configs['flat/recommended'],
  ...pluginRouter.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: 'detect' } },
  },
  {
    plugins: {
      'barrel-files': barrelFiles,
      'import-x': importX,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      unicorn,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...unicorn.configs.recommended.rules,
      'barrel-files/avoid-barrel-files': [
        'error',
        {
          amountOfExportsToConsiderModuleAsBarrel: 5,
        },
      ],
      'barrel-files/avoid-namespace-import': 'error',
      'barrel-files/avoid-re-export-all': 'error',
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-keys-fix/sort-keys-fix': 'error',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  {
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports', prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
  {
    files: ['*.{jsx,tsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
      tailwindcss,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...tailwindcss.configs.recommended.rules,
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true,
          shorthandFirst: true,
          shorthandLast: false,
        },
      ],
      'react/no-unknown-property': 'off',
      'react/prop-types': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  {
    files: ['*.stories.{jsx,tsx}'],
    plugins: {
      storybook,
    },
    rules: {
      ...storybook.configs.recommended.rules,
    },
  },
  eslintConfigPrettier,
);
