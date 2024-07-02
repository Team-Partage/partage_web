import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import type { IFrame, IMessage, IStompSocket } from '@stomp/stompjs';

const createStompClient = () => {
  const client = new Client();
  const BASE_URL = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL;

  /** 소켓 연결 */
  const connect = (channelID: string, onMessageCallback: (message: IMessage) => void) => {
    const url = new URL(`/ws?channel=${channelID}`, BASE_URL).toString();
    client.webSocketFactory = () => new SockJS(url) as IStompSocket;

    client.onConnect = () => {
      client.subscribe(`/channel/${channelID}`, onMessageCallback);
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
  };

  const send = (endpoint: string, message: object) => {
    client.publish({ destination: endpoint, body: JSON.stringify(message) });
  };
  return { connect, disconnect, send };
};

export const stomp = createStompClient();
