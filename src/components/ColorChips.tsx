import { ReactNode, useState } from 'react';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type Props = {
  size: number;
  count: number;
  children: ReactNode;
};

const colors = [
  'bg-main-skyblue',
  'bg-sub-lightGreen',
  'bg-sub-green',
  'bg-sub-blue',
  'bg-sub-violet',
  'bg-sub-pink',
  'bg-sub-yellow',
  'bg-sub-orange',
  'bg-sub-peach',
];

const ColorChips = ({ size, count, children }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string | null>('bg-main-skyblue');
  const chips = colors.slice(0, count);

  const handleClick = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className="mb-[10px] mt-[32px] text-neutral-100 base-regular">{children}</div>
      <div className="flex w-full items-center justify-between">
        {chips.map((color, index) => (
          <div
            key={index}
            onClick={() => handleClick(color)}
            className={cn(
              color,
              'rounded-lg flex items-center justify-center cursor-pointer',
              selectedColor === color ? 'w-[70px] h-[70px]' : `w-[${size}px] h-[${size}px]`,
            )}
          >
            {selectedColor === color && <Check />}
          </div>
        ))}
      </div>
    </>
  );
};

export default ColorChips;
