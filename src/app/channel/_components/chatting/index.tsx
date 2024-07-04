'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useSocket from '@/hooks/useSocket';
import { useSocketStore } from '@/stores/useSocketStore';
import { MessagesSquare, Send, UsersRound } from 'lucide-react';

import Chat from './Chat';

interface Props {
  channelId: string;
}

const Chatting = ({ channelId }: Props) => {
  const [text, setText] = useState('');
  const { send } = useSocket(channelId);

  const chatting = useSocketStore((state) => state.chatting);

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (text.trim() !== '' && e.key === 'Enter') {
      send('USER_CHAT', { nickname: 'ase', profile: '', message: text });
      setText('');
    }
  };

  return (
    <section className="flex w-full flex-col py-5 desktop:order-3 desktop:max-w-[440px] desktop:pl-8">
      {/** 헤더 */}
      <header className="flex h-[4.1875rem] items-center shadow-xl">
        <MessagesSquare />
        <h2 className="ml-2 text-nowrap medium-bold desktop:large-bold">채팅</h2>
        <div className="ml-4 flex items-center gap-1 text-neutral-200">
          <UsersRound size={14} />
          <p className="small-regular">{1}</p>
        </div>
      </header>

      {/** 채팅 */}
      <div className="grow overflow-y-auto">
        {chatting.map((chat) => {
          return <Chat key={chat.user_id + chat.sendTime} color="red" {...chat} />;
        })}
      </div>

      {/** 채팅 입력 */}
      <div className="mt-3 flex items-center gap-3">
        <Textarea
          value={text}
          variant="chat"
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
          onKeyDown={handleEnter}
        />
        <Button variant="active" size="icon">
          <Send />
        </Button>
      </div>
    </section>
  );
};

export default Chatting;
