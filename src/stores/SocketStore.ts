import { MessageType } from '@/services/websocket/type';
import { create } from 'zustand';

type ChattingType = MessageType['USER_CHAT'] & { key: string };
type PlaylistType = MessageType['PLAYLIST_ADD'] & { key: string };
type VideoType = MessageType['VIDEO_PLAY'] & MessageType['VIDEO_MOVE'];

interface SocketStore {
  chatting: ChattingType[];
  playlist: PlaylistType[];
  video: VideoType;
  setSocketStore: (type: keyof MessageType, data: unknown) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  chatting: [],
  playlist: [],
  video: { playlist_no: -1, playing: false, playtime: 0 },
  setSocketStore: (type, data) => {
    switch (type) {
      case 'USER_CHAT': {
        const { ...rest } = data as ChattingType;
        set((state) => ({ chatting: [...state.chatting, { ...rest }] }));
        break;
      }
      case 'PLAYLIST_ADD':
        break;
      case 'VIDEO_PLAY':
        break;
      default:
        break;
    }
  },
}));
