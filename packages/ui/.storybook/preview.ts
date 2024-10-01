import '../src/styles/globals.css';

import { withThemeByClassName } from '@storybook/addon-themes';
import { type Preview } from '@storybook/react';

export const decorators = [
  withThemeByClassName({
    defaultTheme: 'light',
    themes: {
      dark: 'dark',
      light: 'light',
    },
  }),
];

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
} satisfies Preview;

export default preview;
