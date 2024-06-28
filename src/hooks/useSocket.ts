import { useEffect } from 'react';

import { stomp } from '@/services/websocket';
import {
  MessageBody,
  // MessageHeaders,
  PlaylistAddReq,
  PlaylistMoveReq,
  PlaylistRemoveReq,
  UserChatReq,
  VideoMoveReq,
  VideoPlayReq,
} from '@/services/websocket/type';
import { useSocketStore } from '@/stores/SocketStore';

import type { IMessage } from '@stomp/stompjs';

const ENDPOINT = {
  USER_JOIN: '/stomp/user.join',
  USER_LEAVE: '/stomp/user.leave',
  USER_CHAT: '/stomp/user.chat',
  VIDEO_PLAY: '/stomp/video.play',
  VIDEO_MOVE: '/stomp/video.move',
  PLAYLIST_ADD: '/stomp/playlist.add',
  PLAYLIST_MOVE: '/stomp/playlist.move',
  PLAYLIST_REMOVE: '/stomp/playlist.remove',
} as const;

type SendMessageType = {
  USER_JOIN: object;
  USER_LEAVE: object;
  USER_CHAT: UserChatReq;
  VIDEO_PLAY: VideoPlayReq;
  VIDEO_MOVE: VideoMoveReq;
  PLAYLIST_ADD: PlaylistAddReq;
  PLAYLIST_MOVE: PlaylistMoveReq;
  PLAYLIST_REMOVE: PlaylistRemoveReq;
};

const useSocket = (channelId: string) => {
  const setSocketStore = useSocketStore((state) => state.setSocketStore);

  useEffect(() => {
    const onMessage = (message: IMessage) => {
      // const headers = message.headers as MessageHeaders;
      const body: MessageBody = JSON.parse(message.body);

      switch (body.type) {
        case 'CHANNEL_VIEWER':
          console.log(body);
          break;
        case 'USER_CHAT': {
          const { type, data } = body as MessageBody<'USER_CHAT'>;
          setSocketStore(type, data);
          break;
        }
        default:
          break;
      }
    };

    stomp.connect(channelId, onMessage);

    return () => {
      stomp.disconnect();
    };
  }, [channelId, setSocketStore]);

  const sendMessage = <T extends keyof typeof ENDPOINT>(type: T, message: SendMessageType[T]) => {
    stomp.send(ENDPOINT[type], message);
  };

  return { send: sendMessage };
};

export default useSocket;
