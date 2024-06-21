import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errorText?: string;
  startAdornment?: React.ReactElement;
  endAdornment?: React.ReactElement;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, errorText, startAdornment, endAdornment, ...props }, ref) => {
    const renderErrorText = (text: string | undefined) => {
      if (!text) return null;
      if (text?.includes('비밀번호 찾기')) {
        return (
          <>
            <p className="mt-2 text-sub-red small-regular">
              이미 사용 중인 이메일이에요. 비밀번호가 기억나지 않는다면?{' '}
              <Link href="/auth/password-recovery" className="underline small-bold">
                비밀번호 찾기
              </Link>
            </p>
          </>
        );
      }
      return <p className="mt-2 text-sub-red small-regular">{text}</p>;
    };

    return (
      <>
        <div className="relative flex items-center">
          {startAdornment && <div className="absolute left-0 pl-3">{startAdornment}</div>}
          <input
            type={type}
            className={cn(
              'flex desktop:h-[70px] tablet:h-14 h-14 w-full bg-neutral-400 rounded-lg px-6 py-6 base-regular border border-solid transition-colors focus:border-main-skyblue text-foreground-high file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-200 focus-visible:outline-none focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50',
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
        {isError && renderErrorText(errorText)}
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
