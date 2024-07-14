import ChannelCreatorBox from '@/components/ChannelCreatorBox';
import SearchBar from '@/components/SearchBar';
import { MainStoreProvider } from '@/providers/main-store-provider';
import { getSearchChannelList } from '@/services/channel';
import { PLACEHOLDER } from '@/utils/constants';

import ChannelList from './(main)/_components/ChannelList';
import GetUserInfo from './(main)/_components/GetUserInfo';

const MainPage = async () => {
  const channelsData = await getSearchChannelList({});

  const noChannel = channelsData?.page.total_count === 0;

  return (
    <MainStoreProvider>
      <main className="flex flex-col items-center gap-[40px] p-[40px]">
        <GetUserInfo />
        {noChannel ? (
          <ChannelCreatorBox />
        ) : (
          <>
            <SearchBar placeholder={PLACEHOLDER.CHANNEL_SEARCHBAR} />
            <ChannelList channelsData={channelsData} />
          </>
        )}
      </main>
    </MainStoreProvider>
  );
};

export default MainPage;
