import { Playlist } from '../playlist/type';
import { User } from '../user/type';

/** 채널 공개 타입 */
export type ChannelType = 'PUBLIC' | 'PRIVATE';

/** 채널 유저 역할 */
export type ChannelUser = {
  role_id: string;
} & Omit<User, 'username'>;

/** 채널 */
export type Channel = {
  channel_id: string;
  name: string;
  type: string;
  hashtag: string;
  channel_url: string;
  channel_color: string | null;
  create_at: string;
};

export type Owner = {
  user_id: string;
  email: string;
  username: string;
  nickname: string;
  profile_color: string | null;
  profile_image: string | null;
};

export type ChannelWithPlaylist = {
  channel: Channel;
  playlist: Playlist | null;
  owner: Owner;
  user_count: number;
};

/** 채널 권한 */
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

/** 채널 생성 Req */
export type CreateChannelRequest = Pick<Channel, 'name' | 'type' | 'hashtag' | 'channel_color'>;

/** 채널 생성 Res */
export type CreateChannelResponse = {
  channel: Channel;
  channel_users: ChannelUser[];
  channel_permissions: ChannelPermission;
};

/** 채널 수정 Req */
export type ModifyChannelRequest = Pick<Channel, 'name' | 'type' | 'hashtag' | 'channel_color'>;

/** 채널 수정 Res */
export type ModifyChannelResponse = {
  channel: Channel;
};

/** 채널 삭제 Res */
export type DeleteChannelResponse = {
  code: string;
  message: string;
  status: boolean;
};

/** 채널 목록 조회 Res */
export type GetChannelListResponse = {
  page: { cursor: number; per_page: number; total_page: number; total_count: number };
  channels: ChannelWithPlaylist[];
};

/** 채널 상세 조회 Res */
export type GetChannelDetailResponse = {
  channel: Channel;
  user: ChannelUser;
  channel_users: ChannelUser[];
  playlist: Playlist[];
  channel_permissions: ChannelPermission;
};
