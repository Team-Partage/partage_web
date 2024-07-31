import { ChannelPermission, RoleIdType } from '@/services/channel/type';
import checkPermission from '@/utils/CheckPermission';
import { create } from 'zustand';

type Permission = {
  [key in keyof ChannelPermission]: boolean;
};
interface PermissionStore {
  roleId: RoleIdType | null;

  /** 기능에 대한 사용가능 여부 */
  permission: Permission;

  /** 채널 권한 */
  channelPermission: ChannelPermission;

  setRoleId: (roleId: RoleIdType) => void;
  setChannelPermission: (channelPermission: ChannelPermission) => void;
  reset: () => void;
}

const INITIAL_DATA: Omit<PermissionStore, 'setRoleId' | 'setChannelPermission' | 'reset'> = {
  roleId: null,
  permission: {
    playlist_add: false,
    playlist_remove: false,
    playlist_move: false,
    video_play: false,
    video_seek: false,
    video_skip: false,
    chat_send: false,
    chat_delete: false,
    ban: false,
  },
  channelPermission: {
    playlist_add: 'C0000',
    playlist_remove: 'C0000',
    playlist_move: 'C0000',
    video_play: 'C0000',
    video_seek: 'C0000',
    video_skip: 'C0000',
    chat_send: 'C0000',
    chat_delete: 'C0000',
    ban: 'C0000',
  },
};

export const usePermissionStore = create<PermissionStore>((set) => ({
  roleId: INITIAL_DATA.roleId,
  permission: INITIAL_DATA.permission,
  channelPermission: INITIAL_DATA.channelPermission,

  setRoleId: (roleId) => set({ roleId }),
  setChannelPermission: (channelPermission) => {
    set({ channelPermission });
    set((state) => {
      const newPermission: Permission = state.permission;

      for (const key in state.channelPermission) {
        newPermission[key as keyof ChannelPermission] = checkPermission(
          key as keyof ChannelPermission,
        );
      }
      return { permission: newPermission };
    });
  },
  reset: () => {
    set(INITIAL_DATA);
  },
}));
