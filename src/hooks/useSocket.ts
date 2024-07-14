import { useEffect } from 'react';

import { stomp } from '@/services/websocket';
import {
  MessageBody,
  PlaylistAddReq,
  PlaylistMoveReq,
  PlaylistRemoveReq,
  UserChatReq,
  VideoMoveReq,
  VideoPlayReq,
} from '@/services/websocket/type';
import { useSocketStore } from '@/stores/useSocketStore';
import { useShallow } from 'zustand/react/shallow';

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
  const { reset, setStore } = useSocketStore(
    useShallow((state) => ({
      reset: state.resetStore,
      setStore: state.setSocketStore,
    })),
  );

  /** 웹소캣 연결 */
  useEffect(() => {
    const onMessage = (message: IMessage) => {
      const body: MessageBody = JSON.parse(message.body);
      const data = JSON.parse(body.data);

      switch (body.type) {
        case 'CHANNEL_VIEWER':
          setStore({ type: 'SET_VIEWER', payload: data });
          break;
        case 'USER_CHAT': {
          setStore({ type: 'SET_CHATTING', payload: data });
          break;
        }
        case 'PLAYLIST_ADD': {
          setStore({ type: 'SET_PLAYLIST', payload: data });
          break;
        }
        case 'PLAYLIST_REMOVE': {
          setStore({ type: 'PLAYLIST_REMOVE', payload: data });
          break;
        }
        default:
          break;
      }
    };

    stomp.connect(channelId, onMessage);

    return () => {
      stomp.disconnect();
      reset();
    };
  }, [channelId, reset, setStore]);

  /** 메시지 전송 */
  const sendMessage = <T extends keyof typeof ENDPOINT>(type: T, message: SendMessageType[T]) => {
    stomp.send(ENDPOINT[type], message);
  };

  return { send: sendMessage };
};

export default useSocket;
