'use client';

import { useState } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

import config from '../../tailwind.config';

const sizeVariants = cva('', {
  variants: {
    size: {
      channel: 'size-[52px] tablet:size-[76px] desktop:size-[80px]',
      user: 'size-[56px] tablet:size-[60px] desktop:size-[60px]',
    },
  },
  defaultVariants: {
    size: 'channel',
  },
});

const colorCode = { ...config.theme.extend.colors.main, ...config.theme.extend.colors.sub };

type ColorName = keyof typeof colorCode;

interface Props extends VariantProps<typeof sizeVariants> {
  colors: ColorName[];
  className?: string;
  onChange?: (hex: string) => void;
  selected?: ColorName;
}

/**
 *
 * @param colors 화면에 보여줄 컬러칩 색상명 배열
 * @param selected 기본 색상을 선택합니다. hex코드로 기본 색상을 지정해야 한다면 hexToColorName 함수를 사용해주세요. colors 배열 내에 색상명이 없는 경우 런타임 시 타입 에러가 발생합니다.
 */
const ColorChips = ({ onChange, className, colors, size, selected = colors[0] }: Props) => {
  if (process.env.NODE_ENV === 'development' && !colors.includes(selected)) {
    throw new TypeError(`Selected color '${selected}' is not in the list of colors.`);
  }

  const [selectedIndex, setSelectedIndex] = useState<number>(colors.indexOf(selected));

  const handleClick = (index: number) => {
    onChange && onChange(colorNameToHex(colors[index]));
    setSelectedIndex(index);
  };

  const colorNameToHex = (colorName: ColorName) => {
    return colorCode[colorName];
  };

  return (
    <>
      {colors.map((color, index) => {
        return (
          <div
            key={color + index}
            onClick={() => {
              handleClick(index);
            }}
            className={cn(
              'rounded-lg flex items-center justify-center cursor-pointer tablet:size-[70px] transition-transform',
              sizeVariants({ size }),
              selectedIndex === index ? 'scale-105' : '',
              className,
            )}
            style={{ backgroundColor: colorCode[color] }}
          >
            {selectedIndex === index && <Check color="#000000" />}
          </div>
        );
      })}
    </>
  );
};

export default ColorChips;
