import {
  Button,
  buttonVariants,
  cn,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui';
import { useCheckActiveNav } from '@/hooks';
import { Link, LinkProps } from '@tanstack/react-router';

export type NavLink = {
  title: string;
  label?: string;
  icon: JSX.Element;
} & LinkProps &
  React.RefAttributes<HTMLAnchorElement>;

export type SideLink = {
  sub?: NavLink[];
} & NavLink;

export type NavProps = {
  isCollapsed: boolean;
  links: SideLink[];
  closeNav: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export type NavLinkProps = {
  subLink?: boolean;
  closeNav: () => void;
} & SideLink;

export function Nav({ links, isCollapsed, className, closeNav }: NavProps) {
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
          {links.map(({ sub, ...rest }: SideLink) => {
            const key = `${rest.title}-${rest.to}`;
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

function NavLink({
  title,
  icon,
  label,
  to,
  closeNav,
  subLink = false,
  ...props
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();

  return (
    <Link
      aria-current={checkActiveNav(to) ? 'page' : undefined}
      className={cn(
        buttonVariants({
          size: 'sm',
          variant: checkActiveNav(to) ? 'secondary' : 'ghost',
        }),
        'h-12 justify-start text-wrap rounded-none px-6',
        subLink ? 'h-10 w-full border-l border-l-slate-500 px-2' : '',
      )}
      to={to}
      onClick={closeNav}
      {...props}
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

function NavLinkDropdown({ title, icon, label, sub, closeNav }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();

  /**
   * Open collapsible by default
   * if one of child element is active
   */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.to));

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

function NavLinkIcon({ title, icon, label, to, ...props }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: checkActiveNav(to) ? 'secondary' : 'ghost',
            }),
            'size-12',
          )}
          to={to}
          {...props}
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

function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();

  /**
   * Open collapsible by default
   * if one of child element is active
   */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.to));

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
        {sub!.map(({ title, icon, label, to, ...props }) => (
          <DropdownMenuItem key={`${title}-${to}`} asChild>
            <Link
              className={`${checkActiveNav(to) ? 'bg-secondary' : ''}`}
              to={to}
              {...props}
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
