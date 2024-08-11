import { Icons, ModeToggle } from '@repo/ui';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <>
      <div className="flex justify-between gap-2 border-b border-gray-400 p-2">
        <div className="flex items-center gap-2 p-2">
          <Icons.Logo />
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
        <div>
          <ModeToggle />
        </div>
      </div>
      <div className="flex flex-col text-center">
        <Outlet />
      </div>
    </>
  );
}
