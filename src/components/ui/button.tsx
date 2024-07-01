import { forwardRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-colors disabled:pointer-events-none disabled:bg-neutral-300 disabled:text-neutral-200',
  {
    variants: {
      variant: {
        default: '',
        active: 'bg-main-skyblue text-neutral-600 base-bold desktop:medium-bold',
        withDraw: 'border border-solid border-sub-red bg-neutral-600 text-sub-red',
      },
      size: {
        default: 'h-[2.625rem] w-fit px-8 tablet:h-12',
        sm: 'h-[42px] px-8',
        lg: 'h-[50px] px-8 tablet:h-14 desktop:h-16',
        icon: 'size-10 px-2',
      },
      font: {
        medium: 'medium-bold',
        base: 'base-bold',
        small: 'small-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      font: 'base',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
