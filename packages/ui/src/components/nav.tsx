import { Link } from '@tanstack/react-router';

import { useCheckActiveNav } from '../hooks/use-check-active-nav';
import { cn } from '../libs/utils';
import { Icons } from './icons';
import {
  Button,
  buttonVariants,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui';

export type NavLink<T extends string | undefined> = {
  title: string;
  label?: string;
  href: T;
  icon: JSX.Element;
};

export type SideLink<T extends string | undefined> = {
  sub?: NavLink<T>[];
} & NavLink<T>;

export type NavProps<T extends string | undefined> = {
  isCollapsed: boolean;
  links: SideLink<T>[];
  closeNav: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export type NavLinkProps<T extends string | undefined> = {
  subLink?: boolean;
  closeNav: () => void;
} & SideLink<T>;

export function Nav<T extends string | undefined>({
  links,
  isCollapsed,
  className,
  closeNav,
}: NavProps<T>) {
  return (
    <div
      className={cn(
        'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
        className,
      )}
      data-collapsed={isCollapsed}
    >
      <TooltipProvider delayDuration={0}>
        <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map(({ sub, ...rest }: SideLink<T>) => {
            const key = `${rest.title}-${rest.href}`;
            if (isCollapsed && sub) {
              return (
                <NavLinkIconDropdown
                  {...rest}
                  key={key}
                  closeNav={closeNav}
                  sub={sub}
                />
              );
            }

            if (isCollapsed) {
              return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;
            }

            if (sub) {
              return (
                <NavLinkDropdown
                  {...rest}
                  key={key}
                  closeNav={closeNav}
                  sub={sub}
                />
              );
            }

            return <NavLink {...rest} key={key} closeNav={closeNav} />;
          })}
        </nav>
      </TooltipProvider>
    </div>
  );
}

function NavLink<T extends string | undefined>({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps<T>) {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Link
      aria-current={checkActiveNav(href) ? 'page' : undefined}
      className={cn(
        buttonVariants({
          size: 'sm',
          variant: checkActiveNav(href) ? 'secondary' : 'ghost',
        }),
        'h-12 justify-start text-wrap rounded-none px-6',
        subLink ? 'h-10 w-full border-l border-l-slate-500 px-2' : '',
      )}
      to={href}
      onClick={closeNav}
    >
      <div className="mr-2">{icon}</div>
      {title}
      {label ? (
        <div className="ml-2 rounded-lg bg-primary px-1.5 text-[0.625rem] text-primary-foreground">
          {label}
        </div>
      ) : null}
    </Link>
  );
}

function NavLinkDropdown<T extends string | undefined>({
  title,
  icon,
  label,
  sub,
  closeNav,
}: NavLinkProps<T>) {
  const { checkActiveNav } = useCheckActiveNav();

  /**
   * Open collapsible by default
   * if one of child element is active
   */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ size: 'sm', variant: 'ghost' }),
          'group h-12 w-full justify-start rounded-none px-6',
        )}
      >
        <div className="mr-2">{icon}</div>
        {title}
        {label ? (
          <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
            {label}
          </div>
        ) : null}
        <span className='ml-auto transition-all group-data-[state="open"]:-rotate-180'>
          <Icons.ChevronDown stroke="1" />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent asChild className="collapsibleDropdown">
        <ul>
          {sub!.map((sublink) => (
            <li key={sublink.title} className="my-1 ml-8">
              <NavLink {...sublink} subLink closeNav={closeNav} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function NavLinkIcon<T extends string | undefined>({
  title,
  icon,
  label,
  href,
}: NavLinkProps<T>) {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: checkActiveNav(href) ? 'secondary' : 'ghost',
            }),
            'size-12',
          )}
          to={href}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent className="flex items-center gap-4" side="right">
        {title}
        {label ? (
          <span className="ml-auto text-muted-foreground">{label}</span>
        ) : null}
      </TooltipContent>
    </Tooltip>
  );
}

function NavLinkIconDropdown<T extends string | undefined>({
  title,
  icon,
  label,
  sub,
}: NavLinkProps<T>) {
  const { checkActiveNav } = useCheckActiveNav();

  /**
   * Open collapsible by default
   * if one of child element is active
   */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              className="size-12"
              size="icon"
              variant={isChildActive ? 'secondary' : 'ghost'}
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-2" side="right">
          {title}{' '}
          {label ? (
            <span className="ml-auto text-muted-foreground">{label}</span>
          ) : null}
          <Icons.ChevronDown
            className="-rotate-90 text-muted-foreground"
            size={18}
          />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="start" side="right" sideOffset={4}>
        <DropdownMenuLabel>
          {title} {label ? `(${label})` : ''}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map(({ title, icon, label, href }) => (
          <DropdownMenuItem key={`${title}-${href}`} asChild>
            <Link
              className={`${checkActiveNav(href) ? 'bg-secondary' : ''}`}
              to={href}
            >
              {icon} <span className="ml-2 max-w-52 text-wrap">{title}</span>
              {label ? <span className="ml-auto text-xs">{label}</span> : null}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
