// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// import { useSocketStore } from '@/store/useSocketStore';

// import type { IFrame, IMessage, IStompSocket } from '@stomp/stompjs';

// const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// const TOKEN = '';

// type Message = {
//   channel_id: string;
//   sender: string;
//   content: string;
//   type: string;
// };

// const useSocket = (id: string) => {
//   const { stomp, setStomp } = useSocketStore();
//   const url = new URL(`/ws?channel=${id}`, BASE_URL).toString();

//   const create = () => {
//     const client = new Client({
//       brokerURL: url,
//     });

//     // WebSocket Fallback
//     if (typeof WebSocket !== 'function') {
//       client.webSocketFactory = () => new SockJS(url) as IStompSocket;
//     }

//     setStomp(client);
//   };

//   const connect = () => {
//     if (!stomp) {
//       console.error('stomp ' + stomp);
//       return;
//     }

//     stomp.onConnect = () => {
//       console.log('WS: onConnect');
//       // stomp.subscribe(`/channel/${id}`, (message: IMessage) => {
//       //   console.log(JSON.parse(message.body));
//       // });
//     };

//     stomp.onStompError = (frame: IFrame) => {
//       console.log('Broker reported error: ' + frame.headers['message']);
//       console.log('Additional details: ' + frame.body);
//     };

//     stomp.activate();
//   };

//   const disconnect = () => {
//     if (!stomp) {
//       console.error('stomp ' + stomp);
//       return;
//     }

//     stomp.deactivate();
//   };

//   const send = (message: Message) => {
//     if (!stomp) {
//       console.error('stomp ' + stomp);
//       return;
//     }

//     stomp.publish({
//       destination: `/channel/${id}`,
//       body: JSON.stringify(message),
//     });
//   };

//   return { create, connect, disconnect, send };
// };

// export default useSocket;
