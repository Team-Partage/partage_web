'use client';

import { useState } from 'react';

import ConfirmModal from '@/components/modal/ConfirmModal';
import { PAGE_ROUTE } from '@/utils/route';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import ChatHeader from './ChatHeader';
import { ChatList } from './ChatList';
import TextareaField from './TextareaField';

interface ChattingProps {
  channelId: string;
}

const Chatting = ({ channelId }: ChattingProps) => {
  const [isFold, setIsFold] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const { data: session } = useSession();

  const router = useRouter();

  const handleClickChat = () => {
    if (!session) {
      setShowLoginModal(true);
    }
  };

  return (
    <section
      className={`mt-4 flex min-h-[385px] w-full flex-col overflow-hidden desktop:order-3 desktop:mt-0 desktop:max-h-screen desktop:max-w-[440px] ${isFold && 'min-h-[67px] desktop:max-w-[88px]'}`}
    >
      <ChatHeader isFold={isFold} setIsFold={setIsFold} />
      {!isFold && <ChatList channelId={channelId} />}
      {!isFold && <TextareaField disabled={false} onClick={handleClickChat} />}
      {showLoginModal && (
        <ConfirmModal
          leftButtonText="취소"
          defaultButtonText="로그인"
          defaultClick={() => router.push(PAGE_ROUTE.LOGIN)}
          onClose={() => setShowLoginModal(false)}
        >
          로그인이 필요한 서비스예요.
          <br />
          로그인 할까요?
        </ConfirmModal>
      )}
    </section>
  );
};

export default Chatting;
