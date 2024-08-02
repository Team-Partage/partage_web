'use client';

import { useEffect } from 'react';

import { GetChannelDetailResponse } from '@/services/channel/type';
import { send, stomp } from '@/services/websocket';
import { MessageBody, MessageType } from '@/services/websocket/type';
import { usePermissionStore } from '@/stores/usePermissionStore';
import { useUserStore } from '@/stores/User';
import { useSocketStore } from '@/stores/useSocketStore';
import { useShallow } from 'zustand/react/shallow';

import type { IMessage } from '@stomp/stompjs';

interface Props extends GetChannelDetailResponse {}

const SocketConnector = ({ channel, user, channel_permissions }: Props) => {
  const { channel_id } = channel;

  const { isConnected, reset, setStore } = useSocketStore(
    useShallow((state) => ({
      isConnected: state.isConnected,
      reset: state.resetStore,
      setStore: state.setSocketStore,
    })),
  );

  const { setRoleId, setChannelPermission, resetPermission } = usePermissionStore((state) => ({
    setRoleId: state.setRoleId,
    setChannelPermission: state.setChannelPermission,
    resetPermission: state.reset,
  }));

  /** 채널 권한정보 초기화 */
  useEffect(() => {
    setRoleId(user.role_id);
    setChannelPermission(channel_permissions);
  }, []);

  useEffect(() => {
    if (isConnected) {
      send('CHANNEL_INFO', {
        channel_id,
      });
    }
  }, [channel_id, isConnected]);

  /** 웹소캣 연결 */
  useEffect(() => {
    const nickname = useUserStore.getState().nickname;

    const sendUserLeaveMessage = () => {
      const leaveReqForm = {
        channel_id,
        sender: nickname,
        content: `${nickname} left the channel`,
        type: 'USER_LEAVE',
      };

      stomp.send('/stomp/user.leave', leaveReqForm);
    };

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
          setStore({ type: 'ADD_PLAYLIST', payload: JSON.parse(body.data) });
          break;
        case 'PLAYLIST_MOVE':
          setStore({ type: 'PLAYLIST_MOVE', payload: body.data });
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
        case 'VIDEO_PLAY':
          setStore({ type: 'SET_VIDEO', payload: body.data });
          break;

        case 'CHANNEL_PERMISSION_CHANGE':
          setChannelPermission(body.data);
          break;

        case 'CHANNEL_USER_ROLE_CHANGE': {
          const { user_id, role_id } = body.data as MessageType['CHANNEL_USER_ROLE_CHANGE'];
          if (user_id === user.user_id) setRoleId(role_id);
          break;
        }

        case 'CHANNEL_INFO':
          setStore({ type: 'CHANNEL_INFO', payload: body.data });
          break;
        default:
          break;
      }
    };

    stomp.connect(channel_id, onMessage);

    return () => {
      if (nickname) sendUserLeaveMessage();
      stomp.disconnect();
      reset();
      resetPermission();
    };
  }, [channel_id, reset, resetPermission, setChannelPermission, setRoleId, setStore, user.user_id]);

  return <></>;
};

export default SocketConnector;
