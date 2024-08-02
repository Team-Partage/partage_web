import ModalRenderer from '@/components/ModalRenderer';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

const ChannelShare = () => {
  return (
    <ModalRenderer type="ShareChannelModal">
      <Button className="rounded-full bg-neutral-500" size="icon">
        <Share2 />
      </Button>
    </ModalRenderer>
  );
};

export default ChannelShare;
