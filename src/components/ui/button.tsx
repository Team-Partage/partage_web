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
        active: 'bg-main-skyblue text-neutral-600 medium-bold',
        withDraw: 'border border-solid border-sub-red bg-neutral-600 text-sub-red',
      },
      size: {
        default: 'h-12 w-fit px-8',
        sm: 'h-[42px] px-8',
        lg: 'h-16 px-8 mobile:h-[50px] tablet:h-14',
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
