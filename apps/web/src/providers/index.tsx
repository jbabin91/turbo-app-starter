import { TailwindIndicator, ThemeProvider } from '@repo/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <TailwindIndicator />
    </ThemeProvider>
  );
}
