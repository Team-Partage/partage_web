import { useEffect, useRef } from 'react';

import { useSocketStore } from '@/stores/useSocketStore';
import { useSession } from 'next-auth/react';

import Message from './Message';
import ServerMessage from './ServerMessage';

export function ChatList() {
  const chatListRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const nickname = session && session.user?.name;

  const chatting = useSocketStore((state) => state.chatting);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatting]);

  return (
    <div
      ref={chatListRef}
      className={`h-[254px] w-full grow overflow-y-auto px-0 no-scrollbar desktop:h-screen-chatList desktop:w-[440px] desktop:px-8`}
    >
      <div className="flex-col items-end gap-0.5">
        {session && <ServerMessage>{nickname}님, 채팅이 시작되었어요!</ServerMessage>}
        {chatting.map((chat) => {
          return <Message key={chat?.user_id + chat?.sendTime} {...chat} />;
        })}
      </div>
    </div>
  );
}
