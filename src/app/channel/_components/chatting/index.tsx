'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useSocket from '@/hooks/useSocket';
import { useSocketStore } from '@/stores/SocketStore';
import { Send } from 'lucide-react';

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
    <section className="h-full">
      <div className="">
        {chatting.map((chat) => {
          const { key, ...rest } = chat;
          return <Chat key={key} color="red" {...rest} />;
        })}
      </div>

      <div className="flex items-center gap-3">
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
