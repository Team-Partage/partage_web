'use client';

import { memo } from 'react';

import { usePermissionStore } from '@/stores/usePermissionStore';
import Image from 'next/image';

interface MessageProps {
  myNickname: string;
  nickname: string;
  profile_color: string;
  profile_image?: string | null;
  message: string;
}

const Message = ({
  myNickname,
  nickname,
  profile_color,
  profile_image = null,
  message,
}: MessageProps) => {
  const isMe = myNickname === nickname;
  const image = profile_image ?? '/default-profile-image.png';
  const nicknameColor = profile_color ?? '#00FFFF';

  const permission = usePermissionStore((state) => state.permission);

  return (
    <div className="group relative flex cursor-pointer items-start gap-2 rounded-[15px] p-1 transition-colors hover:bg-neutral-500">
      <div className="flex min-w-fit items-center gap-2">
        <Image
          src={image}
          alt="profile"
          width={22}
          height={22}
          sizes="30vw"
          style={{ borderColor: nicknameColor }}
          className={`aspect-square rounded-full object-cover ${isMe && 'border-1'}`}
        />
        <span style={{ color: nicknameColor }} className="micro-semiBold">
          {nickname}
        </span>
      </div>
      <span className="mt-px text-wrap text-neutral-100 tiny-regular">{message}</span>
      {/* 채널 삭제 api 없음
      {permission.chat_delete && (
        <Image
          src="/delete-chat.svg"
          alt="채팅 지우기"
          sizes="30vw"
          width={20}
          height={20}
          className="absolute right-[4px] top-1/2 -translate-y-1/2 opacity-0 drop-shadow-xl duration-300 ease-in-out group-hover:opacity-100"
          onClick={handleDelete}
        />
      )} */}
    </div>
  );
};

export default memo(Message);
