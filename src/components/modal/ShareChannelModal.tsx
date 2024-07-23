import { Link, X } from 'lucide-react';
import Image from 'next/image';

import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const ShareChannelModal = () => {
  return (
    <DialogContent className="top-[85%] h-[228px] w-[335px] tablet:top-[50%] tablet:h-[277px] tablet:w-[400px]">
      <X className="absolute right-[16px] top-[16px] size-[25px] text-right tablet:right-[20px] tablet:top-[20px] tablet:size-[32px]" />
      <DialogHeader className="mt-4 tablet:mt-8">
        <DialogTitle>채널 공유</DialogTitle>
      </DialogHeader>
      <div className="flex items-center justify-center gap-14 tablet:gap-16">
        <div className="flex flex-col items-center justify-center gap-3 small-regular">
          <div className="flex size-[60px] items-center justify-center rounded-full bg-sub-yellow tablet:size-[80px]">
            <Image
              src="/kakaotalk.svg"
              alt="kakaotalk"
              width={36}
              height={36}
              className="tablet:size-[48px]"
            />
          </div>
          카카오톡
        </div>
        <div className="flex flex-col items-center justify-center gap-3 small-regular">
          <div className="flex size-[60px] items-center justify-center rounded-full bg-main-skyblue tablet:size-[80px]">
            <Link className="size-[36px] text-black tablet:size-[48px]" />
          </div>
          링크 복사
        </div>
      </div>
    </DialogContent>
  );
};

export default ShareChannelModal;
