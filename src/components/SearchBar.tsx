'use client';

import { useState } from 'react';

import { PAGE_ROUTE } from '@/utils/route';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  type?: 'modal' | 'page';
  initialQuery?: string;
  handleSearch?: (searchQuery: string) => void;
  resetSearch?: () => void;
  placeholder?: string;
}

const SearchBar = ({
  type = 'page',
  initialQuery = '',
  handleSearch,
  resetSearch,
  placeholder,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const router = useRouter();

  const isPage = type === 'page';
  const isModal = type === 'modal';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = () => {
    setSearchQuery('');

    if (isModal && resetSearch) {
      resetSearch();
    } else if (isPage) router.push(PAGE_ROUTE.HOME);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault();

    if (!searchQuery) {
      if (type === 'page') {
        router.push(PAGE_ROUTE.HOME);
      }
      return;
    }

    if (handleSearch) {
      handleSearch(searchQuery);
    } else if (type === 'page') {
      router.push(PAGE_ROUTE.SEARCH(searchQuery));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        required
        value={searchQuery}
        onChange={handleChange}
        placeholder={placeholder ? placeholder : '검색어를 입력해 주세요.'}
        className={`h-[48px] w-full min-w-[295px] rounded-full border border-DEFAULT border-main-skyblue bg-neutral-500 px-[24px] text-neutral-100 small-regular placeholder:text-neutral-200 tablet:w-[420px] tablet:base-regular ${isPage ? 'tablet:h-[52px] desktop:h-[56px] desktop:w-[640px]' : 'tablet:h-[56px]'}`}
      />
      <button
        onClick={handleSubmit}
        className="absolute right-[24px] top-[14px] size-[28px] mobile:right-[22px] mobile:top-[12px] mobile:size-[24px] tablet:top-[13px] tablet:size-[26px]"
      >
        <Image fill src="/search-sb.svg" alt="돋보기 모양의 검색 버튼" />
      </button>
      {searchQuery && (
        <button
          onClick={handleDelete}
          className="absolute right-[58px] top-[15px] size-[18px] tablet:right-[62px] tablet:top-[16px] desktop:right-[64px] desktop:top-[18px] desktop:size-[20px]"
        >
          <Image fill src="/Close.svg" alt="입력된 검색어 삭제하는 버튼" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
