import path from 'node:path';

import { type StorybookConfig } from '@storybook/react-vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  // eslint-disable-next-line unicorn/prefer-module
  return path.dirname(require.resolve(path.join(value, 'package.json')));
}

const config = {
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-themes'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen',
  },
} satisfies StorybookConfig;

export default config;
