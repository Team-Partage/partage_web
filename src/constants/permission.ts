export const PERMISSION = {
  /** 채널 주인 */
  C0000: 0,

  /** 관리자 */
  C0100: 1,

  /** 일반 사용자 */
  C0200: 2,
};

export const PERMISSIONLIST = [
  {
    id: 'video_play',
    label: '재생 / 정지',
  },
  {
    id: 'video_seek',
    label: '재생시간 이동',
  },
  {
    id: 'chat_delete',
    label: '채팅 삭제',
  },
  {
    id: 'ban',
    label: '멤버 내보내기',
  },
  {
    id: 'playlist_add',
    label: '플레이리스트 추가',
  },
  {
    id: 'playlist_move',
    label: '플레이리스트 순서 이동',
  },
  {
    id: 'playlist_remove',
    label: '플레이리스트 제거',
  },
] as const;
