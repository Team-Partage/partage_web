import { useEffect, useRef } from 'react';

import send from '@/services/websocket/send';
import { UserJoinReq } from '@/services/websocket/type';
import { useUserStore } from '@/stores/User';
import { useSocketStore } from '@/stores/useSocketStore';
import { SEVER_NICKNAME } from '@/utils/constants';

import Message from './Message';
import ServerMessage from './ServerMessage';

interface ChatListProps {
  channelId: string;
  isFold: boolean;
}

export function ChatList({ channelId, isFold }: ChatListProps) {
  const chatListRef = useRef<HTMLDivElement>(null);

  const { user_id, nickname } = useUserStore((state) => ({
    user_id: state.user_id,
    nickname: state.nickname,
  }));

  const { chatting, isConnected } = useSocketStore((state) => ({
    chatting: state.chatting,
    isConnected: state.isConnected,
  }));

  const sendJoinMessage = () => {
    const joinReqForm: UserJoinReq = {
      channel_id: channelId,
      sender: user_id,
      content: `${user_id} joined the channel`,
      type: 'USER_JOIN',
    };

    send('USER_JOIN', joinReqForm);
  };

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatting]);

  useEffect(() => {
    if (user_id && isConnected) {
      sendJoinMessage();
    }
  }, [user_id, channelId, isConnected]);

  return (
    <div
      ref={chatListRef}
      className={`h-[254px] w-full grow overflow-y-auto px-0 no-scrollbar desktop:h-screen-chatList desktop:w-[440px] desktop:px-8 ${isFold && 'hidden'}`}
    >
      <div className="flex-col items-end gap-0.5">
        {chatting.map((chat, index) => {
          if (chat.user_id === SEVER_NICKNAME)
            return <ServerMessage key={chat?.user_id + chat?.sendTime + index} {...chat} />;
          return (
            <Message key={chat?.user_id + chat?.sendTime + index} myNickname={nickname} {...chat} />
          );
        })}
      </div>
    </div>
  );
}
