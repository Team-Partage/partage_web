import { ChannelPermission, RoleIdType } from '../channel/type';
import { Playlist } from '../playlist/type';

/** 채팅 입력 */
export type UserChatReq = {
  nickname: string;
  profile_color: string | null;
  profile_image: string | null;
  message: string;
};

/** 채널 입장 */
export type UserJoinReq = {
  channel_id: string;
  sender: string;
  content: string;
  type: 'USER_JOIN';
};

/** 채널 퇴장 */
export type UserLeaveReq = {
  channel_id: string;
  sender: string;
  content: string;
  type: 'USER_LEAVE';
};

/** 영상 재생/일시정지 */
export type VideoPlayReq = {
  playlist_no: number;
  playtime: number;
  playing: boolean;
};

/** 영상 이동 */
export type VideoMoveReq = {
  playlist_no: number;
  playtime: number;
};

/** 플레이리스트 추가 */
export type PlaylistAddReq = {
  url: string;
};

/** 플레이리스트 이동 */
export type PlaylistMoveReq = {
  playlist_no: number;
  sequence: number;
};

/** 플레이리스트 삭제 */
export type PlaylistRemoveReq = {
  playlist_no: number;
};

/** 채널정보 요청 */
export type ChannelInfoReq = {
  channel_id: string;
};

/** 메시지 타입 */
export type MessageType = {
  /** 채널 시청자 수 */
  CHANNEL_VIEWER: {
    anonymous_users: number;
    login_users: number;
    total_users: number;
  };

  /** 채팅 메시지 */
  USER_CHAT: {
    message: string;
    nickname: string;
    profile_color: string;
    profile_image: string;
    sendTime: string;
    user_id: string | 'NONE';
  };

  /** 사용자 입장 알림 */
  USER_JOIN: {
    user_id: string | 'NONE';
    nickname: string;
  };

  /** 사용자 퇴장 알림 */
  USER_LEAVE: {
    user_id: string;
    nickname: string;
  };

  /** 플레이리스트 추가 */
  PLAYLIST_ADD: Playlist;

  /** 플레이리스트 삭제 */
  PLAYLIST_REMOVE: {
    playlist_no: number;
  };

  /** 플레이리스트 이동 */
  PLAYLIST_MOVE: {
    playlist_no: number;
    sequence: number;
  };

  /** 비디오 재생 및 일시정지 */
  VIDEO_PLAY: {
    playlist_no: number;
    url: string;
    playing: boolean;
    playtime: number;
  };

  /** 비디오 이동(시간) */
  VIDEO_MOVE: {
    playlist_no: number;
    playtime: number;
  };

  /** 재생시간 */
  VIDEO_TIME: number;

  /** 채널 권한 변경 */
  CHANNEL_PERMISSION_CHANGE: { channel_permissions: ChannelPermission };

  /** 채널 유저역할 변경 */
  CHANNEL_USER_ROLE_CHANGE: {
    user_id: string;
    role_id: RoleIdType;
  };

  /** 채널 정보 */
  CHANNEL_INFO: {
    playlist_no: number;
    playtime: number;
    playing: boolean;
  };
};

export interface MessageBody<T extends keyof MessageType = never> {
  type: keyof MessageType;
  data: MessageType[T];
}
