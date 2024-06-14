'use client';

import { useEffect } from 'react';

import ChannelCreatorBox from '@/components/ChannelCreatorBox';
import SearchBar from '@/components/SearchBar';
import { useChannelStore } from '@/stores/useChannelStore';

const MainPage = () => {
  const { channels, fetchChannels } = useChannelStore();

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const handleSearch = (searchQuery: string) => {
    fetchChannels({ cursor: 1, perPage: 12, keyword: searchQuery });
  };

  const noChannel = channels?.page.total_count === 0;

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
