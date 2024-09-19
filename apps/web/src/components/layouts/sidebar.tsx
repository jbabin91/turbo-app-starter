import { config } from '@repo/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Nav, type SideLink } from './nav';
import { Button, cn, Icons, Layout } from '@repo/ui';

export type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  sideLinks: SideLink[];
} & React.HTMLAttributes<HTMLElement>;

export function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
  sideLinks,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);
  const { t } = useTranslation();

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
      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/** Header */}
        <Layout.Header
          sticky
          className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4"
        >
          <div className={`flex items-center ${isCollapsed ? '' : 'gap-2'}`}>
            <Icons.Logo className={isCollapsed ? 'size-6' : 'size-8'} />
            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              <span className="font-medium">{config.name}</span>
              <span className="text-xs">{t('common:app_description')}</span>
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
