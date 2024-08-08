import React, { useState } from 'react';

import { cn } from '../../../libs/utils';
import { Icons } from '../../icons';
import { Button } from '../button';

export type PasswordInputProps = {} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative rounded-md">
        <input
          ref={ref}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          type={showPassword ? 'text' : 'password'}
          {...props}
        />
        <Button
          className="absolute right-1 top-1/2 size-6 -translate-y-1/2 rounded-md text-muted-foreground"
          size="icon"
          type="button"
          variant="ghost"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Icons.Eye className="size-4" />
          ) : (
            <Icons.EyeOff className="size-4" />
          )}
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
