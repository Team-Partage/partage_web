import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import send from '@/services/websocket/send';
import { UserChatReq, UserJoinReq } from '@/services/websocket/type';
import { useUserStore } from '@/stores/User';
import { useSocketStore } from '@/stores/useSocketStore';
import { Send } from 'lucide-react';

interface TextareaFieldProps {
  disabled?: boolean;
  channelId: string;
  onClick?: () => void;
}

export default function TextareaField({
  channelId,
  disabled = false,
  onClick,
}: TextareaFieldProps) {
  const [message, setMessage] = useState('');

  const { user_id, nickname, profile_color, profile_image } = useUserStore((state) => ({
    user_id: state.user_id,
    nickname: state.nickname,
    profile_color: state.profile_color,
    profile_image: state.profile_image,
  }));

  const sendChatMessage = () => {
    const chatReqForm: UserChatReq = {
      nickname: nickname,
      profile_image: profile_image,
      profile_color: profile_color,
      message: message,
    };

    send('USER_CHAT', chatReqForm);

    sendJoinMessage(); // 여기에 넣어서 테스트해봐도 안되네요ㅜ
    setMessage('');
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  const sendJoinMessage = () => {
    const joinReqForm: UserJoinReq = {
      channel_id: channelId,
      sender: user_id,
      content: `${user_id} joined the channel`,
      type: 'USER_JOIN',
    };

    send('USER_JOIN', joinReqForm);
  };

  const { chatting, userJoin } = useSocketStore((state) => ({
    chatting: state.chatting,
    userJoin: state.userJoin,
  }));

  useEffect(() => {
    if (user_id) {
      sendJoinMessage(); // 여기에 넣으면 웹소켓 연결이 활성화 안되었다는 에러가 납니다.
    }
  }, [user_id, channelId]);

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
      <Button variant="active" size="icon" onClick={sendChatMessage}>
        <Send />
      </Button>
    </div>
  );
}
