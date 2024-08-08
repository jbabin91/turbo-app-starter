import { Icons, Sidebar, type SideLink, useIsCollapsed } from '@repo/ui';
import { Outlet, type ParseRoute } from '@tanstack/react-router';

import { type routeTree } from '@/routeTree.gen';

type ValidRoutes = ParseRoute<typeof routeTree>['fullPath'];

const sideLinks = [
  {
    href: '/dashboard',
    icon: <Icons.LayoutDashboard />,
    label: '',
    title: 'Dashboard',
  },
  {
    href: '/',
    icon: <Icons.ListTodo />,
    label: '3',
    title: 'Tasks',
  },
] as SideLink<ValidRoutes>[];

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