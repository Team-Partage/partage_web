import { Playlist } from '../playlist/type';
import { User } from '../user/type';

export type ChannelType = 'PUBLIC' | 'PRIVATE';

export type Channel = {
  channel_id: string;
  name: string;
  type: ChannelType;
  hashtag: string | null;
  channel_url: string;
  channel_color: string | null;
  created_at: string;
};

export type ChannelUser = {
  role_id: string;
} & Omit<User, 'username'>;

export type ChannelPermission = {
  playlist_add: string;
  playlist_remove: string;
  playlist_move: string;
  video_play: string;
  video_seek: string;
  video_skip: string;
  chat_send: string;
  chat_delete: string;
  ban: string;
};

// 채널 생성
export type CreateChannelRequest = Pick<Channel, 'name' | 'type' | 'hashtag' | 'channel_color'>;

export type CreateChannelResponse = {
  channel: Channel;
  channel_users: ChannelUser[];
  channel_permissions: ChannelPermission;
};

// 채널 수정
export type ModifyChannelRequest = Pick<Channel, 'name' | 'type' | 'hashtag' | 'channel_color'>;

export type ModifyChannelResponse = {
  channel: Channel;
};

// 채널 삭제
export type DeleteChannelResponse = {
  code: string;
  message: string;
  status: boolean;
};

// 채널 목록 조회
export type GetChannelListResponse = {
  page: { cursor: number; per_page: number; total_page: number; total_count: number };
  channels: Channel[];
};

// 채널 상세 조회
export type GetChannelDetailResponse = {
  channel: Channel;
  user: ChannelUser;
  channel_users: ChannelUser[];
  playlist: Playlist[];
  channel_permissions: ChannelPermission;
};
