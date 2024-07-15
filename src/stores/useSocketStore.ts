import { Playlist } from '@/services/playlist/type';
import { MessageType } from '@/services/websocket/type';
import { ServerChattingForm } from '@/utils/constants';
import { create } from 'zustand';

type ChattingType = MessageType['USER_CHAT'];
type UserJoinType = MessageType['USER_JOIN'];
type UserLeaveType = MessageType['USER_LEAVE'];
type VideoType = MessageType['VIDEO_PLAY'] & MessageType['VIDEO_MOVE'] & { url: string };

interface SocketStore {
  chatting: ChattingType[];
  userJoin: UserJoinType;
  userLeave: UserLeaveType;
  playlist: Playlist[];
  video: VideoType;
  viewer: MessageType['CHANNEL_VIEWER'];
  isConnected: boolean;
  setIsConnected: (flag: boolean) => void;

  /** 스토어 초기화 */
  resetStore: () => void;

  setSocketStore: (action: Action) => void;
}

const initialData: Pick<
  SocketStore,
  'chatting' | 'userJoin' | 'userLeave' | 'playlist' | 'video' | 'viewer' | 'isConnected'
> = {
  chatting: [],
  userJoin: { user_id: '', nickname: '' },
  userLeave: { user_id: '' },
  playlist: [],
  viewer: { anonymous_users: 0, login_users: 0, total_users: 0 },
  video: { playlist_no: -1, playing: false, playtime: 0, url: '' },
  isConnected: false,
};

type Action =
  | { type: 'SET_VIEWER'; payload: MessageType['CHANNEL_VIEWER'] }
  | { type: 'SET_CHATTING'; payload: ChattingType }
  | { type: 'SET_JOIN'; payload: MessageType['USER_JOIN'] }
  | { type: 'SET_LEAVE'; payload: MessageType['USER_LEAVE'] }
  | { type: 'SET_PLAYLIST'; payload: Playlist[] | Playlist }
  | { type: 'PLAYLIST_REMOVE'; payload: number }
  | { type: 'SET_VIDEO'; payload: VideoType }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'RESET_STORE' };

export const useSocketStore = create<SocketStore>((set) => ({
  chatting: initialData.chatting,
  userJoin: initialData.userJoin,
  userLeave: initialData.userLeave,
  playlist: initialData.playlist,
  video: initialData.video,
  viewer: initialData.viewer,
  isConnected: initialData.isConnected,
  setIsConnected: (flag) => set({ isConnected: flag }),

  resetStore: () => set(initialData),
  setSocketStore: (action: Action) => {
    switch (action.type) {
      case 'SET_CHATTING':
        set((state) => ({ chatting: [...state.chatting, action.payload] }));
        break;
      case 'SET_JOIN':
        // set({ userJoin: action.payload });
        set((state) => ({
          chatting: [...state.chatting, { ...ServerChattingForm, message: action.payload.user_id }],
          userJoin: action.payload,
        }));
        break;
      case 'SET_LEAVE':
        set({ userLeave: action.payload });
        break;
      case 'SET_PLAYLIST':
        if (Array.isArray(action.payload)) {
          set({ playlist: action.payload });
        } else {
          const { ...rest } = action.payload;
          set((state) => ({ playlist: [...state.playlist, rest] }));
        }
        break;
      case 'PLAYLIST_REMOVE':
        set((state) => ({
          playlist: state.playlist.filter((video) => video.playlist_no !== action.payload),
        }));
        break;
      case 'SET_VIDEO':
        set({ video: action.payload });
        break;
      case 'SET_VIEWER':
        set({ viewer: action.payload });
        break;
      case 'SET_CONNECTED':
        set({ isConnected: action.payload });
        break;
      default:
        break;
    }
  },
}));
