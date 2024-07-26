import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { useSocketStore } from '@/stores/useSocketStore';
import { getSession } from 'next-auth/react';

import type { IFrame, IMessage, IStompSocket } from '@stomp/stompjs';

const createStompClient = () => {
  const client = new Client();
  const BASE_URL = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL;

  const { isConnected, setIsConnected } = useSocketStore.getState();

  /** 소켓 연결 */
  const connect = async (channelId: string, onMessageCallback: (message: IMessage) => void) => {
    const session = await getSession();

    client.webSocketFactory = () =>
      new SockJS(
        `/ws/ws?channel=${channelId}${session?.user.accessToken ? `&token=${session.user.accessToken}` : ''}`,
      ) as IStompSocket;

    client.onConnect = () => {
      client.subscribe(`/channel/${channelId}`, onMessageCallback);
      setIsConnected(true);
    };

    client.onStompError = (frame: IFrame) => {
      console.error(frame.headers['message']);
      console.error(frame.body);
    };

    client.activate();
  };

  /** 소캣 연결 해제 */
  const disconnect = () => {
    client.deactivate();
    setIsConnected(false);
  };

  const send = (endpoint: string, message: object) => {
    client.publish({ destination: endpoint, body: JSON.stringify(message) });
  };
  return { connect, disconnect, send, isConnected };
};

export const stomp = createStompClient();
