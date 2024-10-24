import { Icons, useIsCollapsed } from '@repo/ui';
import { Outlet } from '@tanstack/react-router';

import { type SideLink } from './nav';
import { Sidebar } from './sidebar';

const sideLinks = [
  {
    icon: <Icons.LayoutDashboard />,
    label: '',
    title: 'Dashboard',
    to: '/dashboard',
  },
  {
    icon: <Icons.ListTodo />,
    label: '3',
    title: 'Tasks',
    to: '/',
  },
] as SideLink[];

export function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div>
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        sideLinks={sideLinks}
      />
      <main
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
        id="content"
      >
        <Outlet />
      </main>
    </div>
  );
}
