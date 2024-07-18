'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Lottie from 'react-lottie-player';

import Error404Json from '../../../../public/error404.json';

const ErrorContent = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="h-[352px] pb-56 tablet:h-[472px]">
      <div className="h-[224px] w-[360px] tablet:h-[262px] tablet:w-[420px]">
        <Lottie loop animationData={Error404Json} play className="size-full" />
      </div>
      <p className="mb-12 text-center text-white small-medium tablet:base-medium">
        앗, 시스템 오류가 발생했어요!
        <br />
        잠시 후 다시 시도해주세요.
      </p>
      <div className="flex flex-col items-center gap-4">
        <Button
          variant="active"
          font="medium"
          className="h-[48px] w-[159px] px-4 base-bold tablet:h-[54px] tablet:w-[220px] desktop:h-[58px] desktop:w-[240px] desktop:medium-bold"
          onClick={goBack}
        >
          뒤로가기
        </Button>
      </div>
    </div>
  );
};

export default ErrorContent;
