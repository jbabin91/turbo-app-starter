import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <>
      <div className="flex gap-2 p-2">
        <Link className="[&.active]:font-bold" to="/">
          Home
        </Link>
        <Link className="[&.active]:font-bold" to="/about">
          About
        </Link>
        <Link className="[&.active]:font-bold" to="/dashboard">
          Dashboard
        </Link>
      </div>
      <div className="flex flex-col text-center">
        <Outlet />
      </div>
    </>
  );
}
