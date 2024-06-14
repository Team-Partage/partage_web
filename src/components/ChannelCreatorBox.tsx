import { ReactNode } from 'react';

import { Plus } from 'lucide-react';

import { Button } from './ui/button';

interface ChannelCreatorBoxProps {
  children: ReactNode;
}

const ChannelCreatorBox = ({ children }: ChannelCreatorBoxProps) => {
  return (
    <div className="flex h-[400px] min-h-[350px] w-full min-w-[280px] max-w-[800px] flex-col items-center justify-center rounded-lg border border-dashed border-[#43B0FF] base-medium mobile:max-w-[280px] mobile:small-medium tablet:h-[350px] tablet:max-w-[532px]">
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
