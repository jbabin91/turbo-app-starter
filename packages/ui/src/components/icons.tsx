import { config } from '@repo/core';
import {
  ActivityIcon,
  ArchiveXIcon,
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleIcon,
  CircleUserIcon,
  CircleXIcon,
  CreditCardIcon,
  DollarSignIcon,
  EllipsisIcon,
  EyeIcon,
  EyeOffIcon,
  FolderIcon,
  GripVerticalIcon,
  HomeIcon,
  InfoIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  LoaderCircleIcon,
  MenuIcon,
  MoonIcon,
  MoreHorizontalIcon,
  Package2Icon,
  PanelLeftIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  SunIcon,
  TrashIcon,
  User2Icon,
  UsersIcon,
  XIcon,
} from 'lucide-react';

import { cn } from '../libs/utils';

export { type LucideIcon } from 'lucide-react';

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  Activity: ActivityIcon,
  ArchiveX: ArchiveXIcon,
  ArrowDown: ArrowDownIcon,
  ArrowUp: ArrowUpIcon,
  ArrowUpDown: ArrowUpDownIcon,
  Check: CheckIcon,
  ChevronDown: ChevronDownIcon,
  ChevronLeft: ChevronLeftIcon,
  ChevronRight: ChevronRightIcon,
  ChevronUp: ChevronUpIcon,
  ChevronsLeft: ChevronsLeftIcon,
  ChevronsRight: ChevronsRightIcon,
  ChevronsUpDown: ChevronsUpDownIcon,
  Circle: CircleIcon,
  CircleAlert: CircleAlertIcon,
  CircleCheck: CircleCheckIcon,
  CircleUser: CircleUserIcon,
  CircleX: CircleXIcon,
  CreditCard: CreditCardIcon,
  DollarSign: DollarSignIcon,
  Ellipsis: EllipsisIcon,
  Eye: EyeIcon,
  EyeOff: EyeOffIcon,
  Folder: FolderIcon,
  GripVertical: GripVerticalIcon,
  Home: HomeIcon,
  Info: InfoIcon,
  LayoutDashboard: LayoutDashboardIcon,
  ListTodo: ListTodoIcon,
  Loader: LoaderCircleIcon,
  Logo: ({ className, ...props }: IconProps) => (
    <svg
      className={cn('size-8 transition-all', className)}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
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
      <span className="sr-only">{config.name}</span>
    </svg>
  ),
  Menu: MenuIcon,
  Moon: MoonIcon,
  MoreHorizontal: MoreHorizontalIcon,
  Package2: Package2Icon,
  PanelLeft: PanelLeftIcon,
  Search: SearchIcon,
  SlidersHorizontal: SlidersHorizontalIcon,
  Sun: SunIcon,
  Trash: TrashIcon,
  User2: User2Icon,
  Users: UsersIcon,
  X: XIcon,
};
