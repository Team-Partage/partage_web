import { useEffect } from 'react';

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import type { IFrame, IMessage, IStompSocket } from '@stomp/stompjs';

const BASE_URL = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL;

type Message = {
  channel_id: string;
  sender: string;
  content: string;
  type: string;
};

const stomp = new Client({
  reconnectDelay: 5000,
  heartbeatIncoming: 10000,
  heartbeatOutgoing: 10000,
});

interface Params {
  channelId: string;
  onMessage: (message: IMessage) => void;
}

const useSocket = ({ channelId, onMessage }: Params) => {
  const url = new URL(`/ws?channel=${channelId}`, BASE_URL).toString();
  stomp.webSocketFactory = () => new SockJS(url) as IStompSocket;

  useEffect(() => {
    const connect = () => {
      stomp.onConnect = () => {
        console.log('WS: onConnect');
        stomp.subscribe(`/channel/${channelId}`, onMessage);
      };

      stomp.onStompError = (frame: IFrame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      };

      stomp.activate();
    };

    connect();

    return () => {
      const disconnect = () => {
        stomp.deactivate();
      };

      disconnect();
    };
  }, [channelId, onMessage]);

  const send = (message: Message) => {
    stomp.publish({
      destination: `/channel/${channelId}`,
      body: JSON.stringify(message),
    });
  };

  return { send };
};

export default useSocket;
