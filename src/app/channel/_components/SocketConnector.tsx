'use client';

import { useEffect } from 'react';

import { stomp } from '@/services/websocket';
import { MessageBody, MessageType } from '@/services/websocket/type';
import { useUserStore } from '@/stores/User';
import { useSocketStore } from '@/stores/useSocketStore';
import { useShallow } from 'zustand/react/shallow';

import type { IMessage } from '@stomp/stompjs';

interface Props {
  channelId: string;
}

const SocketConnector = ({ channelId }: Props) => {
  const { reset, setStore } = useSocketStore(
    useShallow((state) => ({
      reset: state.resetStore,
      setStore: state.setSocketStore,
    })),
  );

  const { nickname } = useUserStore((state) => ({
    nickname: state.nickname,
  }));

  const sendUserLeaveMessage = () => {
    const leaveReqForm = {
      channel_id: channelId,
      sender: nickname,
      content: `${nickname} left the channel`,
      type: 'USER_LEAVE',
    };

    stomp.send('/stomp/user.leave', leaveReqForm);
  };

  /** 웹소캣 연결 */
  useEffect(() => {
    const onMessage = (message: IMessage) => {
      const body: MessageBody = JSON.parse(message.body);

      switch (body.type) {
        case 'CHANNEL_VIEWER':
          setStore({ type: 'SET_VIEWER', payload: body.data });
          break;
        case 'USER_CHAT':
          setStore({ type: 'SET_CHATTING', payload: body.data });
          break;
        case 'USER_JOIN':
          setStore({ type: 'SET_JOIN', payload: body.data });
          break;
        case 'USER_LEAVE':
          setStore({ type: 'SET_LEAVE', payload: body.data });
          break;
        case 'PLAYLIST_ADD':
          setStore({ type: 'SET_PLAYLIST', payload: JSON.parse(body.data) });
          break;
        case 'PLAYLIST_REMOVE': {
          const data = body.data as MessageType['PLAYLIST_REMOVE'];
          setStore({
            type: 'PLAYLIST_REMOVE',
            payload: data.playlist_no,
          });
          break;
        }
        case 'VIDEO_TIME': {
          setStore({ type: 'SET_VIDEO_TIME', payload: body.data });
          break;
        }
        default:
          break;
      }
    };

    stomp.connect(channelId, onMessage);

    return () => {
      sendUserLeaveMessage();
      stomp.disconnect();
      reset();
    };
  }, [channelId, nickname, reset, setStore]);

  return <></>;
};

export default SocketConnector;
