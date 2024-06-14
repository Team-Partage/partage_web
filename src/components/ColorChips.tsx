import { ReactNode, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { colors, customColors } from '@/utils/colors';
import { Check } from 'lucide-react';

type Size =
  | 'h-[60px] w-[60px]'
  | 'h-[70px] w-[70px]'
  | 'h-[80px] w-[80px]'
  | 'h-[84px] w-[84px]'
  | string;

type Props = {
  size: Size;
  selectedSize: Size;
  count: number;
  children: ReactNode;
};

const ColorChips = ({ size, selectedSize, count, children }: Props) => {
  const myColor = '#00FFFF';

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const chips = Object.keys(colors).slice(0, count);

  useEffect(() => {
    const initialColorMain = Object.keys(customColors.main).find(
      (key) => customColors.main[key] === myColor,
    );
    const initialColorSub = Object.keys(customColors.sub).find(
      (key) => customColors.sub[key] === myColor,
    );
    const initialColorKey = initialColorMain || initialColorSub;

    if (initialColorKey) {
      setSelectedColor(initialColorKey);
    }
  }, [myColor]);

  const handleClick = (color: string) => {
    setSelectedColor(color);
    console.log('헥스코드', customColors.main[color] || customColors.sub[color]);
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
              colors[color],
              'rounded-lg flex items-center justify-center cursor-pointer',
              selectedColor === color ? selectedSize : size,
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
