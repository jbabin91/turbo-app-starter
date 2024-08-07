import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/dashboard')({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
