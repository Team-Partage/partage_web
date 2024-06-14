'use client';

import { useEffect, useState } from 'react';

import ChannelCreatorBox from '@/components/ChannelCreatorBox';
import SearchBar from '@/components/SearchBar';
import { getChannelList } from '@/services/channel';

const MainPage = () => {
  const [channels, setChannels] = useState<any>(null);

  const noChannel = channels.page.total_count === 0;

  const handleSearch = (searchQuery: string) => {
    console.log(searchQuery);
  };

  useEffect(() => {
    const fetchChannels = async () => {
      const channelData = await getChannelList();
      setChannels(channelData);
    };

    fetchChannels();
  }, []);

  return (
    <div className="flex flex-col items-center gap-[40px] p-[40px]">
      {noChannel ? (
        <ChannelCreatorBox>
          생성된 채널이 없어서 조용하네요!
          <br />
          폭탄뉴진세님의 채널을 기다릴지도!
        </ChannelCreatorBox>
      ) : (
        <>
          <SearchBar handleSearch={handleSearch} />
          <section className="flex flex-col gap-24">
            <h2>당신을 기다리는 채널</h2>
          </section>
        </>
      )}
    </div>
  );
};

export default MainPage;
