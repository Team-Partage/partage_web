import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import send from '@/services/websocket/send';
import { UserChatReq } from '@/services/websocket/type';
import { useUserStore } from '@/stores/User';
import { Send } from 'lucide-react';

interface TextareaFieldProps {
  disabled?: boolean;
  onClick?: () => void;
}

export default function TextareaField({ disabled = false, onClick }: TextareaFieldProps) {
  const [message, setMessage] = useState('');

  const { nickname, profile_color, profile_image } = useUserStore((state) => ({
    nickname: state.nickname,
    profile_color: state.profile_color,
    profile_image: state.profile_image,
  }));

  const sendChatMessage = () => {
    if (!message) return;

    const chatReqForm: UserChatReq = {
      nickname: nickname,
      profile_image: profile_image,
      profile_color: profile_color,
      message: message,
    };

    send('USER_CHAT', chatReqForm);
    setMessage('');
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return (
    <div className="flex w-full items-end gap-3 px-0 py-3 desktop:w-[440px] desktop:px-8">
      <Textarea
        value={disabled ? '' : message}
        variant="chat"
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
        onClick={onClick}
        onKeyDown={handleEnter}
        placeholder="채팅에 참여해보세요."
        rows={1}
      />
      <Button variant="active" size="icon" onClick={sendChatMessage}>
        <Send />
      </Button>
    </div>
  );
}
