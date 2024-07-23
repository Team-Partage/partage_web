'use client';

import { useEffect, useState } from 'react';

import { getChannelDetail } from '@/services/channel';
import { useSocketStore } from '@/stores/useSocketStore';
import { Link, X } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const ShareChannelModal = () => {
  const params = useParams() as { channel_id: string };
  const { playlist, video } = useSocketStore((state) => ({
    playlist: state.playlist.data,
    video: state.video,
  }));
  const [channelTitle, setChannelTitle] = useState('');

  useEffect(() => {
    const getData = async () => {
      const data = await getChannelDetail(params.channel_id);
      setChannelTitle(data?.channel.name);
    };
    getData();
  }, [params.channel_id]);

  const handleCopyClick = () => {
    const textToCopy = `${process.env.NEXT_PUBLIC_BASE_URL}/channel/${params.channel_id}`;
    const copyToClipboard = async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        alert('클립보드에 복사되었습니다.');
      } catch (error) {
        console.error(error);
      }
    };
    copyToClipboard(textToCopy);
  };

  const handleKakaoShare = () => {
    const { Kakao, location } = window;
    const nowPlaying = playlist.find((item) => item.url === video.url);
    const imgUrl = nowPlaying?.thumbnail;
    const title = channelTitle;
    const description = nowPlaying?.title;
    Kakao.Share.sendScrap({
      requestUrl: location.href,
      templateId: 110342,
      templateArgs: {
        title,
        description,
        img: imgUrl,
        pagePathname: location.pathname,
      },
    });
  };

  return (
    <DialogContent className="top-[85%] h-[228px] w-[335px] tablet:top-[50%] tablet:h-[277px] tablet:w-[400px]">
      <X className="absolute right-[16px] top-[16px] size-[25px] text-right tablet:right-[20px] tablet:top-[20px] tablet:size-[32px]" />
      <DialogHeader className="mt-4 tablet:mt-8">
        <DialogTitle>채널 공유</DialogTitle>
      </DialogHeader>
      <div className="flex items-center justify-center gap-14 tablet:gap-16">
        <button
          className="flex flex-col items-center justify-center gap-3 small-regular"
          onClick={handleKakaoShare}
        >
          <div className="flex size-[60px] items-center justify-center rounded-full bg-sub-yellow tablet:size-[80px]">
            <Image
              src="/kakaotalk.svg"
              alt="kakaotalk"
              width={36}
              height={36}
              className="tablet:size-[48px]"
            />
          </div>
          카카오톡
        </button>
        <button
          className="flex flex-col items-center justify-center gap-3 small-regular"
          onClick={handleCopyClick}
        >
          <div className="flex size-[60px] items-center justify-center rounded-full bg-main-skyblue tablet:size-[80px]">
            <Link className="size-[36px] text-black tablet:size-[48px]" />
          </div>
          링크 복사
        </button>
      </div>
    </DialogContent>
  );
};

export default ShareChannelModal;
