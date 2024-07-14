import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useSocket from '@/hooks/useSocket';
import { UserChatReq } from '@/services/websocket/type';
import { useUserStore } from '@/stores/User';
import { Send } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface TextareaFieldProps {
  disabled?: boolean;
  channelId: string;
  onClick?: () => void;
}

export default function TextareaField({
  disabled = false,
  channelId,
  onClick,
}: TextareaFieldProps) {
  const [message, setMessage] = useState('');

  const { send } = useSocket(channelId);

  const { data: session } = useSession();
  const userData = session?.user ?? { name: '', email: '', image: null };

  /** User 상태관리로 교체할때 사용
   const { nickname, profile_color, profile_image } = useUserStore((state) => ({
     nickname: state.nickname,
    profile_color: state.profile_color,
    profile_image: state.profile_image,
  }));

  console.log(nickname, profile_color, profile_image); */

  const sendMessage = () => {
    if (message.trim() !== '') {
      const messageToSend: UserChatReq = {
        nickname: userData.name as string,
        profile_image: userData.image as string,
        profile_color: null,
        message: message,
      };
      /** User 상태관리로 교체할때 사용
      const messageToSend: UserChatReq = {
        nickname: nickname,
        profile_image: profile_image,
        profile_color: profile_color,
        message: message,
      }; */

      send('USER_CHAT', messageToSend);
      setMessage('');
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex w-full items-end gap-3 px-0 py-3 desktop:w-[440px] desktop:px-8">
      <Textarea
        value={message}
        variant="chat"
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
        onClick={onClick}
        onKeyDown={handleEnter}
        placeholder="채팅에 참여해보세요."
        rows={1}
        disabled={disabled}
      />
      <Button variant="active" size="icon" onClick={sendMessage}>
        <Send />
      </Button>
    </div>
  );
}
