import { useEffect, useState } from 'react';

import { cn } from '../libs/utils';
import { Icons } from './icons';
import { Nav, type SideLink } from './nav';
import { Button, Layout } from './ui';

export type SidebarProps<T extends string | undefined> = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  sideLinks: SideLink<T>[];
} & React.HTMLAttributes<HTMLElement>;

export function Sidebar<T extends string | undefined>({
  className,
  isCollapsed,
  setIsCollapsed,
  sideLinks,
}: SidebarProps<T>) {
  const [navOpened, setNavOpened] = useState(false);

  /** Make body not scrollable when navbar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className,
      )}
    >
      {/** Overlay in mobile */}
      {/* <div
        className={`absolute inset-0 transition-opacity delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
        onClick={() => setNavOpened(false)}
      ></div> */}

      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/** Header */}
        <Layout.Header
          sticky
          className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4"
        >
          <div className={`flex items-center ${isCollapsed ? '' : 'gap-2'}`}>
            <svg
              className={`transition-all ${isCollapsed ? 'size-6' : 'size-8'}`}
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="none" height="256" width="256"></rect>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                x1="208"
                x2="128"
                y1="128"
                y2="208"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                x1="192"
                x2="40"
                y1="40"
                y2="192"
              ></line>
              <span className="sr-only">Website Name</span>
            </svg>
            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              <span className="font-medium">Shadcn Admin</span>
              <span className="text-xs">Vite + ShadcnUI</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            aria-label="Toggle Navigation"
            className="md:hidden"
            size="icon"
            variant="ghost"
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <Icons.X /> : <Icons.Menu />}
          </Button>
        </Layout.Header>

        {/** Navigation Links */}
        <Nav
          className={`z-40 h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          id="sidebar-menu"
          isCollapsed={isCollapsed}
          links={sideLinks}
        />

        {/** Scrollbar width toggle button */}
        <Button
          className="absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex"
          size="icon"
          variant="outline"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          <Icons.ChevronLeft
            className={`size-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  );
}
