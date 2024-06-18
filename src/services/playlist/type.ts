/** 플레이리스트 */
export type Playlist = {
  playlist_no: number;
  channel_id: string;
  sequence: number;
  title: string;
  url: string;
  thumbnail: string;
  create_at: string;
};

/** 플레이리스트 조회 */
export type GetPlaylistResponse = {
  playlist: Playlist[];
  total_contents: number;
  page_size: number;
  page: number;
};
