import { ReactNode } from 'react';

import { Plus } from 'lucide-react';

import { Button } from './ui/button';

interface ChannelCreatorBoxProps {
  children: ReactNode;
}

const ChannelCreatorBox = ({ children }: ChannelCreatorBoxProps) => {
  return (
    <div className="flex h-[350px] w-[280px] flex-col items-center justify-center gap-48 rounded-lg border border-dashed border-main-skyblue small-medium tablet:h-[350px] tablet:w-[532px] tablet:base-medium desktop:h-[400px] desktop:w-[800px]">
      <div className="flex flex-col items-center gap-12 text-center">
        {children}
        <Button variant="active" className="w-full px-4 base-bold">
          <Plus width={20} height={20} strokeWidth={2} />
          채널 생성
        </Button>
      </div>
    </div>
  );
};

export default ChannelCreatorBox;
