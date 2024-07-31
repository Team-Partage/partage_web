import { PERMISSION } from '@/constants/permission';
import { ChannelPermission } from '@/services/channel/type';
import { usePermissionStore } from '@/stores/usePermissionStore';

type PermissionType = keyof ChannelPermission;

const checkPermission = (type: PermissionType): boolean => {
  const { roleId, channelPermission } = usePermissionStore.getState();

  if (!roleId) return false;

  const userLevel = PERMISSION[roleId]; // 유저 권한
  const targetLevel = PERMISSION[channelPermission[type]]; // 기능 권한

  return userLevel < targetLevel;
};

export default checkPermission;
