import { patchChannelRole } from '@/services/channel';
import { RoleIdType } from '@/services/channel/type';
import { usePermissionStore } from '@/stores/usePermissionStore';
import { useUserStore } from '@/stores/User';
import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';

interface UserSettingModalProps {
  userId: string;
  userRole: string;
  channelId: string;
  onClose: () => void;
}

export default function UserSettingModal({
  userId,
  userRole,
  channelId,
  onClose,
}: UserSettingModalProps) {
  const { roleId, permission } = usePermissionStore(
    useShallow((state) => ({ roleId: state.roleId, permission: state.permission })),
  );

  const { user_id } = useUserStore((state) => ({
    user_id: state.user_id,
  }));

  const isMe = userId === user_id;

  const handleChangeRole = async (newRoleId: string) => {
    const params = {
      role_id: newRoleId as RoleIdType,
      user_id: userId,
    };
    try {
      if (roleId) {
        const res = await patchChannelRole(channelId, params);
        alert(newRoleId === 'C0100' ? '관리자로 지정되었어요.' : '관리자가 취소되었어요.');
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute -right-1 -top-2 z-50 flex w-[160px] flex-col rounded-[8px] border border-neutral-400 bg-neutral-600 py-[10px]">
      {roleId === 'C0000' && userRole === 'C0100' && !isMe && (
        <button
          onClick={() => handleChangeRole('C0200')}
          className="flex w-full items-center justify-center py-[13px] text-neutral-100 base-regular hover:bg-neutral-500"
        >
          관리자 취소하기
        </button>
      )}
      {roleId === 'C0000' && userRole === 'C0200' && !isMe && (
        <button
          onClick={() => handleChangeRole('C0100')}
          className="flex w-full items-center justify-center py-[13px] text-neutral-100 base-regular hover:bg-neutral-500"
        >
          관리자 지정하기
        </button>
      )}
      {/* 내보내기 api 없음
       {permission.ban && !isMe && (
        <button className="flex items-center justify-center py-[13px] text-neutral-100 base-regular hover:bg-neutral-500">
          내보내기
        </button>
      )} */}
      {isMe && (
        <Link
          href="/mypage"
          className="flex items-center justify-center py-[13px] text-neutral-100 base-regular hover:bg-neutral-500"
        >
          내 정보 변경하기
        </Link>
      )}
    </div>
  );
}
