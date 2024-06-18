import { Channel } from '@/services/channel/type';
import { ListVideo, MessagesSquare } from 'lucide-react';

import Chatting from '../_components/chatting';
import Player from '../_components/player';
import Playlist from '../_components/playlist';

interface Props {
  params: Channel;
}

const page = ({ params }: Props) => {
  const { name, hashtag } = params;

  return (
    <div className="flex size-full justify-between">
      <section className="h-full px-8 pb-5 pt-10">
        <header className="flex items-center">
          <ListVideo />
          <h2 className="ml-2.5 large-bold">플레이리스트</h2>
        </header>
        <Playlist />
      </section>
      <section className="mt-10 w-full">
        <Player />
        <div>
          <h2>{name}</h2>
          <div>{hashtag}</div>
        </div>
      </section>
      <section className="h-full w-[440px] px-8 pb-5 pt-10">
        <header className="flex items-center">
          <MessagesSquare />
          <h2 className="ml-2.5 large-bold">채팅</h2>
        </header>
        <Chatting />
      </section>
    </div>
  );
};

export default page;
