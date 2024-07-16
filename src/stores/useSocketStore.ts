import { Playlist } from '@/services/playlist/type';
import { MessageType } from '@/services/websocket/type';
import { SEVER_CHAT_MESSAGE, SEVER_NICKNAME, ServerChatForm } from '@/utils/constants';
import { create } from 'zustand';

type VideoType = MessageType['VIDEO_PLAY'] & MessageType['VIDEO_MOVE'] & { url: string };
type PlaylistType = { data: Playlist[]; cursor: number; length: number };

interface SocketStore {
  chatting: MessageType['USER_CHAT'][];
  userJoin: MessageType['USER_JOIN'];
  userLeave: MessageType['USER_LEAVE'];
  playlist: PlaylistType;
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
  playlist: { data: [], cursor: 0, length: 0 },
  viewer: { anonymous_users: 0, login_users: 0, total_users: 0 },
  video: { playlist_no: -1, playing: false, playtime: 0, url: '' },
  isConnected: false,
};

type Action =
  | { type: 'SET_VIEWER'; payload: MessageType['CHANNEL_VIEWER'] }
  | { type: 'SET_CHATTING'; payload: MessageType['USER_CHAT'] }
  | { type: 'SET_JOIN'; payload: MessageType['USER_JOIN'] }
  | { type: 'SET_LEAVE'; payload: MessageType['USER_LEAVE'] }
  | { type: 'SET_PLAYLIST'; payload: Playlist[] | Playlist }
  | { type: 'SET_PLAYLIST_CURSOR'; payload: number }
  | { type: 'PLAYLIST_REMOVE'; payload: number }
  | { type: 'SET_VIDEO'; payload: Partial<VideoType> }
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
        set((state) => ({
          chatting: [
            ...state.chatting,
            {
              ...ServerChatForm,
              user_id: SEVER_NICKNAME,
              nickname: action.payload.nickname,
              message: SEVER_CHAT_MESSAGE.USER_JOIN,
            },
          ],
          userJoin: action.payload,
        }));
        break;

      case 'SET_LEAVE':
        set((state) => ({
          chatting: [
            ...state.chatting,
            {
              ...ServerChatForm,
              user_id: SEVER_NICKNAME,
              nickname: action.payload.user_id,
              message: SEVER_CHAT_MESSAGE.USER_LEAVE,
            },
          ],
          userLeave: action.payload,
        }));
        break;

      case 'SET_PLAYLIST':
        if (Array.isArray(action.payload)) {
          const payload = action.payload;
          set((state) => ({
            playlist: { data: payload, cursor: state.playlist.cursor, length: payload.length },
          }));
        } else {
          const { ...rest } = action.payload;
          set((state) => ({
            playlist: {
              data: [...state.playlist.data, rest],
              cursor: state.playlist.cursor,
              length: state.playlist.length + 1,
            },
          }));
        }
        break;

      case 'SET_PLAYLIST_CURSOR':
        set((state) => ({
          playlist: {
            data: state.playlist.data,
            cursor: action.payload,
            length: state.playlist.length,
          },
        }));
        break;

      case 'PLAYLIST_REMOVE':
        set((state) => {
          const newPlaylistData = state.playlist.data.filter(
            (video) => video.playlist_no !== action.payload,
          );
          const newCursor =
            state.playlist.cursor >= state.playlist.data.length - 1
              ? state.playlist.data.length - 2
              : state.playlist.cursor;
          return {
            playlist: {
              data: newPlaylistData,
              cursor: newCursor < 0 ? 0 : newCursor,
              length: newPlaylistData.length,
            },
          };
        });
        break;

      case 'SET_VIDEO': {
        const { ...rest } = action.payload;
        set((state) => ({ video: { ...state.video, ...rest } }));
        break;
      }

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
