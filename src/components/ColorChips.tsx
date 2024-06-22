'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

import config from '../../tailwind.config';

type Size = 'size-[60px]' | 'size-[70px]' | 'size-[80px]' | 'size-[84px]' | string;

const colorType = { ...config.theme.extend.colors.main, ...config.theme.extend.colors.sub };

type ColorType = keyof typeof colorType;

interface Props {
  className?: string;
  onChange?: (color: string) => void;
  children?: React.ReactNode;
  colors: ColorType[];
}

const ColorChips = ({ onChange, className, colors }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

  const handleClick = (color: string) => {
    setSelectedColor(color);
    onChange && onChange(color);
  };
  return (
    <div className="flex w-full items-center gap-5">
      {colors.map((color, index) => {
        const colorID = color + index;

        return (
          <div
            key={colorID}
            onClick={() => handleClick(color)}
            className={cn(
              'rounded-lg flex items-center justify-center cursor-pointer size-[60px] transition-transform',
              selectedColor + index === colorID ? 'scale-110' : '',
              className,
            )}
            style={{ backgroundColor: colorType[color] }}
          >
            {selectedColor + index === colorID && <Check />}
          </div>
        );
      })}
    </div>
  );
};

export default ColorChips;
