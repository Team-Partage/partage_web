'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

import Chat from './Chat';

const Chatting = () => {
  return (
    <section className="h-full">
      <div className="">
        <Chat nickname="Lorem" message="hello world" color="asd" />
      </div>

      <div className="flex items-center gap-3">
        <Textarea variant="chat" />
        <Button variant="active" size="icon">
          <Send />
        </Button>
      </div>
    </section>
  );
};

export default Chatting;
