import { Playlist } from '@/services/playlist/type';
import { MessageType } from '@/services/websocket/type';
import { create } from 'zustand';

type ChattingType = MessageType['USER_CHAT'];
type VideoType = MessageType['VIDEO_PLAY'] & MessageType['VIDEO_MOVE'] & { url: string };

interface SocketStore {
  chatting: ChattingType[];
  playlist: Playlist[];
  video: VideoType;
  viewer: MessageType['CHANNEL_VIEWER'];

  /** 스토어 초기화 */
  resetStore: () => void;

  setSocketStore: (action: Action) => void;
}

const initialData: Pick<SocketStore, 'chatting' | 'playlist' | 'video' | 'viewer'> = {
  chatting: [],
  playlist: [],
  viewer: { anonymous_users: 0, login_users: 0, total_users: 0 },
  video: { playlist_no: -1, playing: false, playtime: 0, url: '' },
};

type Action =
  | { type: 'SET_VIEWER'; payload: MessageType['CHANNEL_VIEWER'] }
  | { type: 'SET_CHATTING'; payload: ChattingType }
  | { type: 'SET_PLAYLIST'; payload: Playlist[] | Playlist }
  | { type: 'SET_VIDEO'; payload: VideoType }
  | { type: 'RESET_STORE' };

export const useSocketStore = create<SocketStore>((set) => ({
  chatting: initialData.chatting,
  playlist: initialData.playlist,
  video: initialData.video,
  viewer: initialData.viewer,
  resetStore: () => set(initialData),
  setSocketStore: (action: Action) => {
    switch (action.type) {
      case 'SET_CHATTING':
        set((state) => ({ chatting: [...state.chatting, action.payload] }));
        break;
      case 'SET_PLAYLIST':
        if (Array.isArray(action.payload)) {
          set({ playlist: action.payload });
        } else {
          const { ...rest } = action.payload;
          set((state) => ({ playlist: [...state.playlist, rest] }));
        }
        break;
      case 'SET_VIDEO':
        set({ video: action.payload });
        break;
      case 'SET_VIEWER':
        set({ viewer: action.payload });
        break;
      default:
        break;
    }
  },
}));
