import { stomp } from './stompClient';
import {
  UserChatReq,
  VideoPlayReq,
  VideoMoveReq,
  PlaylistAddReq,
  PlaylistMoveReq,
  PlaylistRemoveReq,
  ChannelInfoReq,
} from './type';

const ENDPOINT = {
  USER_JOIN: '/stomp/user.join',
  USER_LEAVE: '/stomp/user.leave',
  USER_CHAT: '/stomp/user.chat',
  VIDEO_PLAY: '/stomp/video.play',
  VIDEO_MOVE: '/stomp/video.move',
  PLAYLIST_ADD: '/stomp/playlist.add',
  PLAYLIST_MOVE: '/stomp/playlist.move',
  PLAYLIST_REMOVE: '/stomp/playlist.remove',
  CHANNEL_INFO: '/stomp/channel.info',
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
  CHANNEL_INFO: ChannelInfoReq;
};

const send = <T extends keyof typeof ENDPOINT>(type: T, message: SendMessageType[T]) => {
  if (!stomp) return;
  stomp.send(ENDPOINT[type], message);
};

export default send;
