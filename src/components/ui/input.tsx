import { ReactNode, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errorText?: string | ReactNode;
  startAdornment?: React.ReactElement;
  endAdornment?: React.ReactElement;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, errorText, startAdornment, endAdornment, ...props }, ref) => {
    const renderErrorMessage = (errorText: string | ReactNode) => {
      if (typeof errorText === 'string') {
        return <p className="mt-2 text-sub-red micro-regular tablet:small-regular">{errorText}</p>;
      } else {
        return errorText;
      }
    };

    return (
      <>
        <div className="relative flex items-center">
          {startAdornment && <div className="absolute left-0 pl-3">{startAdornment}</div>}
          <input
            type={type}
            className={cn(
              'flex desktop:h-[70px] h-14 w-full bg-neutral-400 rounded-lg px-6 py-6 desktop:base-regular small-regular border border-solid transition-colors focus:border-main-skyblue text-foreground-high file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-200 focus-visible:outline-none focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50',
              isError ? 'border-sub-red focus:border-sub-red' : 'border-transparent',
              className,
              startAdornment ? 'pl-10' : '',
              endAdornment ? 'pr-10' : '',
            )}
            ref={ref}
            {...props}
          />
          {endAdornment && <div className="absolute right-0 pr-3">{endAdornment}</div>}
        </div>
        {isError && renderErrorMessage(errorText)}
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
