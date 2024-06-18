import { Button } from '@/components/ui/button';
import { getChannelDetail } from '@/services/channel';
import { ChevronUp, ListVideo, MessagesSquare, Settings, Share2 } from 'lucide-react';
import Image from 'next/image';

import Chatting from '../_components/chatting';
import Player from '../_components/player';
import Playlist from '../_components/playlist';

interface Props {
  params: { channel_id: string };
}

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

const page = async ({ params }: Props) => {
  const { channel_users, channel, playlists } = await getChannelDetail({
    channelId: params.channel_id,
  });

  return (
    <div className="flex size-full justify-between">
      <section className="h-full px-8 pb-5 pt-10">
        <header className="flex h-[5.625rem] items-center shadow-xl">
          <ListVideo />
          <h2 className="ml-2.5 large-bold">플레이리스트</h2>
        </header>
        <Playlist playlists={playlists} />
      </section>
      <section className="mt-10 w-full">
        <Player src={`${YOUTUBE_BASE_URL + playlists[0]?.url}`} />
        <div className="mt-4 flex justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-neutral-100 large-bold">{channel.name}</h2>
            <div className="flex items-center">
              <Image
                className="aspect-square rounded-full object-cover"
                src={channel_users[0].profile_image || '/default-profile-image.png'}
                width={36}
                height={36}
                alt="profile"
              />
              <p className="ml-2.5 text-neutral-100 small-medium">{channel_users[0].nickname}</p>
            </div>
            <div className="text-sub-violet small-regular">{channel.hashtag}</div>
          </div>
          <div className="flex gap-2">
            <Button className="rounded-full bg-neutral-500" size="icon">
              <Share2 />
            </Button>
            <Button className="rounded-full bg-neutral-500" size="icon">
              <Settings />
            </Button>
            <Button size="icon">
              <ChevronUp />
            </Button>
          </div>
        </div>
      </section>
      <section className="h-full w-[440px] px-8 pb-5 pt-10 ">
        <header className="flex h-[5.625rem] items-center shadow-xl">
          <MessagesSquare />
          <h2 className="ml-2.5 large-bold">채팅</h2>
        </header>
        <Chatting />
      </section>
    </div>
  );
};

export default page;
