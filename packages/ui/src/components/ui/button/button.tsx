import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../../libs/utils';
import { Icons } from '../../icons';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 px-4 py-2',
        icon: 'size-10',
        lg: 'h-11 rounded-md px-8',
        sm: 'h-9 rounded-md px-3',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
);

export type ButtonProps = {
  asChild?: boolean;
  loading?: boolean;
  leftSection?: JSX.Element;
  rightSection?: JSX.Element;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      disabled,
      loading = false,
      leftSection,
      rightSection,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ className, size, variant }))}
        disabled={disabled ?? loading}
        {...props}
      >
        {((leftSection && loading) ??
        (!leftSection && !rightSection && loading)) ? (
          <Icons.Loader className="mr-2 size-4 animate-spin" />
        ) : null}
        {!loading && leftSection ? (
          <div className="mr-2">{leftSection}</div>
        ) : null}
        {children}
        {!loading && rightSection ? (
          <div className="ml-2">{rightSection}</div>
        ) : null}
        {rightSection && loading ? (
          <Icons.Loader className="ml-2 size-4 animate-spin" />
        ) : null}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
