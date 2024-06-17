import ChannelCreatorBox from '@/components/ChannelCreatorBox';
import SearchBar from '@/components/SearchBar';
import { getChannelList } from '@/services/channel';
import { PLACEHOLDER } from '@/utils/constants';

import ChannelList from './(main)/_components/ChannelList';

const MainPage = async () => {
  const channelsData = await getChannelList({});

  const noChannel = channelsData?.page.total_count === 0;

  return (
    <main className="flex flex-col items-center gap-[40px] p-[40px]">
      {noChannel ? (
        <ChannelCreatorBox>
          생성된 채널이 없어서 조용하네요!
          <br />
          폭탄뉴진세님의 채널을 기다릴지도!
        </ChannelCreatorBox>
      ) : (
        <>
          <SearchBar placeholder={PLACEHOLDER.CHANNEL_SEARCHBAR} />
          <ChannelList channelsData={channelsData} />
        </>
      )}
    </main>
  );
};

export default MainPage;
