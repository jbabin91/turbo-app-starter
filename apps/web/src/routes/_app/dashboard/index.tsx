import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/dashboard/')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
    </div>
  );
}
