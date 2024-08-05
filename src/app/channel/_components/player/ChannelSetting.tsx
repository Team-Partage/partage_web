'use client';

import ModalRenderer from '@/components/ModalRenderer';
import { Button } from '@/components/ui/button';
import { usePermissionStore } from '@/stores/usePermissionStore';
import { Settings } from 'lucide-react';

const ChannelSetting = () => {
  const roleId = usePermissionStore((state) => state.roleId);

  return (
    <div>
      {(roleId === 'C0000' || roleId === 'C0100') && (
        <ModalRenderer type="EditChannelModal">
          <Button className="rounded-full bg-neutral-500" size="icon">
            <Settings />
          </Button>
        </ModalRenderer>
      )}
    </div>
  );
};

export default ChannelSetting;
