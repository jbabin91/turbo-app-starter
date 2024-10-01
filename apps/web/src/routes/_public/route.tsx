import { Icons, LocaleSwitcher, ModeToggle } from '@repo/ui';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <>
      <header className="flex justify-between gap-2 border-b border-gray-400 p-2">
        <nav className="flex items-center gap-2">
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
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
          <ModeToggle />
          <LocaleSwitcher />
        </div>
      </header>
      <div className="flex flex-col text-center">
        <Outlet />
      </div>
    </>
  );
}
