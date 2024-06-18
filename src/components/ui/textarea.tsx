import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const textareaVariants = cva(
  'whitespace-nowrap outline-none transition-colors disabled:pointer-events-none disabled:bg-neutral-300 disabled:text-neutral-200',
  {
    variants: {
      variant: {
        default: '',
        chat: 'h-10 resize-none text-wrap rounded-[20px] border border-neutral-400 bg-neutral-500 px-5 py-2 text-neutral-100 small-regular',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea className={cn(textareaVariants({ variant }), className)} ref={ref} {...props} />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
