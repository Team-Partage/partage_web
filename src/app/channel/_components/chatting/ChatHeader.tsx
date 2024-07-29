import { useState } from 'react';

import ChannelUsersModal from '@/components/modal/ChannelUsersModal';
import Tooltip from '@/components/Tooltip';
import { useSocketStore } from '@/stores/useSocketStore';
import Image from 'next/image';

interface ChatHeaderProps {
  isFold: boolean;
  setIsFold: React.Dispatch<React.SetStateAction<boolean>>;
  channelId: string;
}

export default function ChatHeader({ isFold, setIsFold, channelId }: ChatHeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showChannelUsersModal, setShowChannelUsersModal] = useState(false);

  const viewer = useSocketStore((state) => state.viewer);

  return (
    <>
      <header
        className={`flex h-[67px] w-full items-center justify-between bg-neutral-600 px-0 desktop:h-[90px] desktop:px-8 ${isFold && 'desktop:ml-[-10px] desktop:w-[88px]'}`}
      >
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => isFold && setIsFold(false)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`relative ml-[-10px] flex size-[42px] shrink-0 items-center justify-center rounded hover:bg-transparent-white-10 desktop:size-[44px] ${isFold && 'desktop:ml-0'}`}
          >
            <div className="relative size-[22px] desktop:size-[24px]">
              <Image src="/chat-two-bubble.svg" alt="채팅 아이콘" fill sizes="30vw" />
            </div>
            {isFold && showTooltip && (
              <Tooltip style="left-0 -bottom-[32px] desktop:left-0">채팅 열기</Tooltip>
            )}
          </button>
          <h2
            className={`ml-[-10px] medium-bold desktop:large-bold ${isFold && 'desktop:opacity-0'}`}
          >
            채팅
          </h2>
          <div
            className={`-mt-0.5 flex items-center gap-1 rounded-md px-2 py-0.5 text-neutral-200 ${isFold && 'desktop:hidden'}`}
            onClick={() => setShowChannelUsersModal(true)}
          >
            <Image
              src="/users.svg"
              alt="채팅멤버 버튼 아이콘"
              sizes="30vw"
              width={16}
              height={16}
            />
            <p className="small-regular">{viewer.login_users}</p>
          </div>
        </div>
        {!isFold && (
          <button
            onClick={() => setIsFold(true)}
            className="relative size-[22px] desktop:size-[24px]"
          >
            <Image src="/Close.svg" alt="채팅영역 닫기 버튼 아이콘" fill sizes="40vw" />
          </button>
        )}
        <button
          onClick={() => setIsFold(false)}
          className={`flex h-10 w-[173px] items-center rounded-full border-1 border-neutral-400 bg-neutral-500 px-5 text-neutral-200 small-regular tablet:w-[422px] ${isFold ? 'inline-block desktop:hidden' : 'hidden'}`}
        >
          채팅에 참여해보세요.
        </button>
      </header>
      {showChannelUsersModal && (
        <ChannelUsersModal channelId={channelId} onClose={() => setShowChannelUsersModal(false)} />
      )}
    </>
  );
}
