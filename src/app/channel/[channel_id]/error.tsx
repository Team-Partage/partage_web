'use client';

import { PAGE_ROUTE } from '@/utils/route';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  return (
    <div className="mx-auto mt-10 flex h-[350px] w-[280px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-main-skyblue tablet:h-[350px] tablet:w-[532px] tablet:base-medium desktop:h-[400px] desktop:w-[800px]">
      <p className="small-medium ">존재하지 않는 채널입니다.</p>
      <Link
        href={PAGE_ROUTE.HOME}
        className="flex h-[48px] w-[159px] items-center justify-center rounded-lg text-neutral-200 base-medium hover:bg-neutral-500 tablet:h-[54px] tablet:w-[220px] desktop:h-[58px] desktop:w-[240px]"
      >
        다른 채널 구경가기
      </Link>
    </div>
  );
};

export default Error;
