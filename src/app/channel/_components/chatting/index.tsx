'use client';

import { useLayoutEffect, useRef, useEffect } from 'react';

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { Button } from '@/components/ui/button';
import { getChannelList } from '@/services/channel';

import Chat from './Chat';

const Chatting = () => {
  const client = useRef<Client | null>(null);

  getChannelList().then((res) => {
    console.log(res);
  });

  useLayoutEffect(() => {
    const socket = new SockJS('http://localhost:9090/ws?channel=C-d0253549b5cb40449d683b6072f33f');
    client.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.current.onConnect = () => {
      console.log('WS: onConnect');
    };
  }, []);

  useEffect(() => {
    client.current?.activate();

    return () => {
      client.current?.deactivate();
    };
  }, []);

  return (
    <section className="h-full">
      <Chat nickname="Lorem" message="hello world" color="asd" />
      <Button variant="active">Connect</Button>
    </section>
  );
};

export default Chatting;
