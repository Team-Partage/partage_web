import { ChannelPermission, RoleIdType } from '@/services/channel/type';
import { create } from 'zustand';

interface PermissionStore {
  roleId: RoleIdType | null;
  channelPermission: ChannelPermission;

  setRoleId: (roleId: RoleIdType) => void;
  setChannelPermission: (channelPermission: ChannelPermission) => void;
  reset: () => void;
}

const INITIAL_DATA: Omit<PermissionStore, 'setRoleId' | 'setChannelPermission' | 'reset'> = {
  roleId: null,
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
  channelPermission: INITIAL_DATA.channelPermission,

  setRoleId: (roleId) => set({ roleId }),
  setChannelPermission: (channelPermission) => set({ channelPermission }),
  reset: () => {
    console.log('rest');
    set(INITIAL_DATA);
  },
}));
