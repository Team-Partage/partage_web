import { Button } from '@/components/ui/button';
import MainPng from '@public/main.png';
import Image from 'next/image';

const Main = () => {
  return (
    <div>
      <div className="relative h-[368px] w-full">
        <Image src={MainPng} alt="partage-main" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[74px] font-bold">
            Adjust and remix. <br />
            Make it better
          </div>
          <Button
            variant="outline"
            className="absolute bottom-[60px] right-[64px] h-[82px] w-[320px] bg-transparent heading-2"
          >
            내 채널 만들기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
