'use client';

import Image from 'next/image';

interface Props {
  nickname: string;
  color: string;
  message: string;
}

const Chat = ({ nickname, message }: Props) => {
  return (
    <div className="flex h-[1.875rem] items-center rounded-[15px] px-1.5 py-[.3125rem] transition-colors hover:bg-neutral-500">
      <Image
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTBfMzQg%2FMDAxNjc1OTg5MzYzOTY3.sUmaxn6bVa8X_0QHwzAHDaldIaKKBaHKoE-IBhIQDUkg.uBDE8aubc6n9qpguDSWJBVfOso_x8n8vj3t3z0qSps8g.PNG.thomasgrangera%2Fddd.PNG&type=sc960_832"
        alt="profile"
        width={22}
        height={22}
        className="h-[1.375rem] rounded-full object-cover"
      />
      <p className="ml-2 small-bold">{nickname}</p>
      <p className="ml-2 small-regular">{message}</p>
    </div>
  );
};

export default Chat;
