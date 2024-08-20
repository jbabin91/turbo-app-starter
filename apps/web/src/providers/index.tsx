import { TailwindIndicator, ThemeProvider, Toaster } from '@repo/ui';
import { HelmetProvider } from 'react-helmet-async';

import { TanstackQueryProvider } from './TanstackQueryProvider.tsx';
import { TanstackRouterProvider } from './TanstackRouterProvider.tsx';

export function Providers() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <TanstackQueryProvider>
          <TanstackRouterProvider />
          <Toaster closeButton richColors />
          <TailwindIndicator />
        </TanstackQueryProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}
