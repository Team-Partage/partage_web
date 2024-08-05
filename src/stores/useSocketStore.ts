import { Playlist } from '@/services/playlist/type';
import { MessageType } from '@/services/websocket/type';
import { SEVER_CHAT_MESSAGE, SEVER_NICKNAME, ServerChatForm } from '@/utils/constants';
import { create } from 'zustand';

type VideoType = MessageType['VIDEO_PLAY'] & MessageType['VIDEO_MOVE'] & { url: string };
interface SocketStore {
  chatting: MessageType['USER_CHAT'][];
  userJoin: MessageType['USER_JOIN'];
  userLeave: MessageType['USER_LEAVE'];
  playlist: Playlist[];
  video: VideoType;
  viewer: MessageType['CHANNEL_VIEWER'];
  isConnected: boolean;

  setIsConnected: (flag: boolean) => void;

  /** 스토어 초기화 */
  resetStore: () => void;

  setSocketStore: (action: Action) => void;
}

/** 초기값 */
const initialData: Omit<SocketStore, 'setIsConnected' | 'resetStore' | 'setSocketStore'> = {
  chatting: [],
  userJoin: { user_id: '', nickname: '' },
  userLeave: { user_id: '', nickname: '' },
  playlist: [],
  viewer: { anonymous_users: 0, login_users: 0, total_users: 0 },
  video: { playlist_no: -1, playing: true, playtime: 0, url: '' },
  isConnected: false,
};

type Action =
  | { type: 'SET_VIEWER'; payload: MessageType['CHANNEL_VIEWER'] }
  | { type: 'SET_CHATTING'; payload: MessageType['USER_CHAT'] }
  | { type: 'SET_JOIN'; payload: MessageType['USER_JOIN'] }
  | { type: 'SET_LEAVE'; payload: MessageType['USER_LEAVE'] }
  | { type: 'ADD_PLAYLIST'; payload: Playlist[] | Playlist }
  | { type: 'SET_PLAYLIST_CURSOR'; payload: number }
  | { type: 'PLAYLIST_REMOVE'; payload: number }
  | { type: 'SET_PLAYLIST'; payload: Playlist[] }
  | { type: 'PLAYLIST_MOVE'; payload: MessageType['PLAYLIST_MOVE'] }
  | { type: 'SET_VIDEO'; payload: Partial<VideoType> }
  | { type: 'SET_VIDEO_TIME'; payload: number }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'CHANNEL_INFO'; payload: MessageType['CHANNEL_INFO'] }
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
              nickname: action.payload.nickname,
              message: SEVER_CHAT_MESSAGE.USER_LEAVE,
            },
          ],
          userLeave: action.payload,
        }));
        break;

      case 'ADD_PLAYLIST':
        if (Array.isArray(action.payload)) {
          const payload = action.payload;
          set((state) => ({ playlist: [...state.playlist, ...payload] }));
        } else {
          const { ...rest } = action.payload;
          set((state) => ({
            playlist: [...state.playlist, rest],
          }));
        }
        break;

      case 'PLAYLIST_REMOVE':
        set((state) => {
          const newPlaylistData = state.playlist.filter(
            (video) => video.playlist_no !== action.payload,
          );

          return { playlist: newPlaylistData };
        });
        break;

      case 'PLAYLIST_MOVE':
        set((state) => {
          const { playlist_no, sequence } = action.payload;

          const currentIndex = state.playlist.findIndex(
            (video) => video.playlist_no === playlist_no,
          );
          if (currentIndex === -1 || currentIndex === sequence) return state;

          const items = Array.from(state.playlist);
          const [reorderedItem] = items.splice(currentIndex, 1);
          items.splice(sequence, 0, reorderedItem);

          return {
            playlist: items,
          };
        });
        break;

      case 'SET_PLAYLIST':
        set({ playlist: action.payload });
        break;

      case 'SET_VIDEO': {
        const { ...rest } = action.payload;
        set((state) => ({ video: { ...state.video, ...rest } }));
        break;
      }

      case 'SET_VIDEO_TIME':
        set((state) => ({
          video: { ...state.video, playtime: action.payload },
        }));
        break;

      case 'SET_VIEWER':
        set({ viewer: action.payload });
        break;

      case 'CHANNEL_INFO': {
        const { playlist_no, is_playing, playtime } = action.payload as MessageType['CHANNEL_INFO'];

        set((state) => {
          const target = state.playlist.find((video) => video.playlist_no === playlist_no);

          if (!target) return { video: state.video };
          return {
            video: { playlist_no, playing: is_playing, playtime: playtime, url: target.url },
          };
        });
        break;
      }

      case 'SET_CONNECTED':
        set({ isConnected: action.payload });
        break;

      default:
        break;
    }
  },
}));
