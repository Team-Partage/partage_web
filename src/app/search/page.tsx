import ChannelCreatorBox from '@/components/ChannelCreatorBox';
import SearchBar from '@/components/SearchBar';
import { MainStoreProvider } from '@/providers/main-store-provider';
import { getSearchChannelList } from '@/services/channel';
import { PLACEHOLDER } from '@/utils/constants';

import ChannelList from '../(main)/_components/ChannelList';

interface SearchPageProps {
  searchParams: Record<string, string | string[]>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';

  const channelsData = query && (await getSearchChannelList({ cursor: 1, keyword: query }));

  const noChannel = channelsData && channelsData?.page.total_count === 0;

  return (
    <MainStoreProvider>
      {noChannel ? (
        <ChannelCreatorBox query={query} />
      ) : (
        <>
          <SearchBar initialQuery={query} placeholder={PLACEHOLDER.CHANNEL_SEARCHBAR} />
          {channelsData && <ChannelList channelsData={channelsData} query={query} />}
        </>
      )}
    </MainStoreProvider>
  );
};

export default SearchPage;
