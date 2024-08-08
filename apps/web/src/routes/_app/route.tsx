import { createFileRoute } from '@tanstack/react-router';

import { AppShell } from '@/components/layouts/app-shell';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

function AppLayout() {
  return <AppShell />;
}
