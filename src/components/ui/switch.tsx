'use client';

import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react';

const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer relative inline-flex h-[41px] w-[174px] desktop:h-[48px] desktop:w-[198px] items-center rounded-[30px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-neutral-500 ',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none absolute h-full w-[50%] rounded-full bg-main-skyblue shadow-md ring-0 transition-transform transform-gpu duration-200 ease-in-out translate-x-0 data-[state=checked]:translate-x-full',
      )}
    />
    <div className="z-10 flex size-full items-center justify-between text-neutral-200 small-medium">
      <div className={`flex items-center gap-1 pl-[14px] ${!props.checked && 'text-neutral-600'}`}>
        <LockKeyholeOpen size={16} className="mr-1" />
        <span>공개</span>
      </div>
      <div className={`flex items-center gap-1 pr-[14px] ${props.checked && 'text-neutral-600'}`}>
        <LockKeyhole size={16} className="mr-1 " />
        <span>비공개</span>
      </div>
    </div>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
