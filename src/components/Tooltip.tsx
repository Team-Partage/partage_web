import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  style?: string;
}

export default function Tooltip({ children, style }: TooltipProps) {
  return (
    <span
      className={`absolute z-30 flex h-[30px] items-center text-nowrap rounded bg-neutral-300 px-2 text-neutral-100 micro-semiBold ${style}`}
    >
      {children}
    </span>
  );
}
