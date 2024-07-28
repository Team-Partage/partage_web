import { Playlist } from '../playlist/type';
import { User } from '../user/type';

/** 채널 공개 타입 */
export type ChannelType = 'PUBLIC' | 'PRIVATE';

/** 권한 타입 */
export type RoleIdType = 'C0000' | 'C0100' | 'C0200' | 'C0300';

/** 채널 유저 타입 */
export type ChannelUserType = {
  role_id: RoleIdType;
  user_id: string;
  email: string;
  nickname: string;
  profile_color: null | string;
  profile_image: string | null;
};

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
  viewer_count: number;
  current_playlist_no: number | null;
};

/** 검색된 채널 */
export type SearchedChannel = {
  channel: Channel;
  playlist: Playlist | null;
  owner: Owner;
  user_count: number;
};

export type Owner = {
  user_id: string;
  email: string;
  username: string;
  nickname: string;
  profile_color: string | null;
  profile_image: string | null;
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
  channel_permissions: ChannelPermission;
  owner: Owner;
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

/** 채널 검색 - 채널명, 해시태그 Res */
export type GetChannelSearchResponse = {
  page: { cursor: number; per_page: number; total_page: number; total_count: number };
  channels: SearchedChannel[];
};

/** 채널 상세 조회 Res */
export type GetChannelDetailResponse = {
  channel: Channel;
  owner: Owner;
  playlists: Playlist[];
  channel_permissions: ChannelPermission;
};

/** 채널 접속 유저 검색 Res */
export type GetSearchChannelUserResponse = {
  page: { cursor: number; per_page: number; total_page: number; total_count: number };
  users: ChannelUserType[];
};

/** 채널 생성 Req */
export type CreateChannelReq = {
  type: 'PUBLIC' | 'PRIVATE';
  channel_color: string;
  hashtag: string;
  name: string;
};

/** 채널 접속 유저 목록 조회 Res */
export type GetChannelUsersResponse = {
  page: { cursor: number; per_page: number; total_page: number; total_count: number };
  users: ChannelUserType[];
};
