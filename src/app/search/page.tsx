import ChannelCreatorBox from '@/components/ChannelCreatorBox';
import SearchBar from '@/components/SearchBar';
import { getChannelList } from '@/services/channel';
import { PLACEHOLDER } from '@/utils/constants';

import ChannelList from '../(main)/_components/ChannelList';

interface SearchPageProps {
  searchParams: Record<string, string | string[]>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';

  const channelsData = await getChannelList({ cursor: 1, keyword: query });

  const noChannel = channelsData?.page.total_count === 0;

  return (
    <>
      {noChannel ? (
        <ChannelCreatorBox>
          &apos;검색어&apos;로 검색된 채널이 없어요.
          <br />
          폭탄뉴진세님이 먼저 만들어보는 건 어떠세요?
        </ChannelCreatorBox>
      ) : (
        <>
          <SearchBar initialQuery={query} placeholder={PLACEHOLDER.CHANNEL_SEARCHBAR} />
          <ChannelList channelsData={channelsData} query={query} />
        </>
      )}
    </>
  );
};

export default SearchPage;
