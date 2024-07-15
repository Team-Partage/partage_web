import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { getSession } from 'next-auth/react';

import type { IFrame, IMessage, IStompSocket } from '@stomp/stompjs';

const createStompClient = () => {
  const client = new Client();
  const BASE_URL = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL;

  /** 소켓 연결 */
  const connect = async (channelId: string, onMessageCallback: (message: IMessage) => void) => {
    const session = await getSession();

    const url = await new URL(
      `/ws?channel=${channelId}${session?.user.accessToken ? `&token=${session.user.accessToken}` : ''}`,
      BASE_URL,
    ).toString();
    client.webSocketFactory = () => new SockJS(url) as IStompSocket;

    client.onConnect = () => {
      client.subscribe(`/channel/${channelId}`, onMessageCallback);
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

//

// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// import { getSession } from 'next-auth/react';

// import type { IFrame, IMessage, IStompSocket } from '@stomp/stompjs';

// const createStompClient = () => {
//   const client = new Client();
//   const BASE_URL = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL;
//   let isConnected = false;

//   /** 소켓 연결 */
//   const connect = async (
//     channelId: string,
//     onMessageCallback: (message: IMessage) => void,
//     onConnect?: () => void,
//     onDisconnect?: () => void,
//   ) => {
//     const session = await getSession();

//     const url = await new URL(
//       `/ws?channel=${channelId}${session?.user.accessToken ? `&token=${session.user.accessToken}` : ''}`,
//       BASE_URL,
//     ).toString();
//     client.webSocketFactory = () => new SockJS(url) as IStompSocket;

//     client.onConnect = () => {
//       isConnected = true;
//       client.subscribe(`/channel/${channelId}`, onMessageCallback);
//     };

//     client.onDisconnect = () => {
//       isConnected = false;
//     };

//     client.onStompError = (frame: IFrame) => {
//       console.error('STOMP 오류', frame.headers['message']);
//       console.error(frame.body);
//     };

//     client.activate();
//   };

//   /** 소캣 연결 해제 */
//   const disconnect = () => {
//     client.deactivate();
//   };

//   const send = (endpoint: string, message: object) => {
//     if (client.connected) {
//       client.publish({ destination: endpoint, body: JSON.stringify(message) });
//     } else {
//       console.error('웹소켓 연결이 활성화되지 않았습니다.');
//     }
//   };
//   return { connect, disconnect, send, isConnected };
// };

// export const stomp = createStompClient();
