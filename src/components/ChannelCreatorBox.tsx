'use client';

import { useUserStore } from '@/stores/User';
import { getNoChannelText } from '@/utils/getNoChannelText';
import { PAGE_ROUTE } from '@/utils/route';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import ModalRenderer from './ModalRenderer';
import { Button } from './ui/button';

interface ChannelCreatorBoxProps {
  query?: string | undefined;
}

const ChannelCreatorBox = ({ query }: ChannelCreatorBoxProps) => {
  const username = useUserStore((state) => state.nickname);

  const content = getNoChannelText(query, username);

  return (
    <div className="flex h-[350px] w-[280px] flex-col items-center justify-center gap-48 rounded-lg border border-dashed border-main-skyblue small-medium tablet:h-[350px] tablet:w-[532px] tablet:base-medium desktop:h-[400px] desktop:w-[800px]">
      <div className="flex flex-col items-center gap-12 text-center">
        {content && content.text1}
        <br />
        {content && content.text2}
        <div className="flex w-full flex-col items-center gap-4">
          <ModalRenderer type="CreateChannelModal">
            <Button
              variant="active"
              font="medium"
              className="h-[48px] w-[159px] px-4 base-bold tablet:h-[54px] tablet:w-[220px] desktop:h-[58px] desktop:w-[240px] desktop:medium-bold"
            >
              <Plus width={20} height={20} strokeWidth={2} />
              채널 생성
            </Button>
          </ModalRenderer>
          {query && (
            <Link
              href={PAGE_ROUTE.HOME}
              className="flex h-[48px] w-[159px] items-center justify-center rounded-lg text-neutral-200 base-medium hover:bg-neutral-500 tablet:h-[54px] tablet:w-[220px] desktop:h-[58px] desktop:w-[240px]"
            >
              다른 채널 구경가기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelCreatorBox;
