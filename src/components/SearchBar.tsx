'use client';

import { useState } from 'react';

import Image from 'next/image';

interface SearchBarProps {
  handleSearch: (searchQuery: string) => void;
  placeholder?: string;
}

const SearchBar = ({ handleSearch, placeholder }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="text"
        required
        onChange={handleChange}
        placeholder={placeholder ? placeholder : '검색어를 입력해 주세요.'}
        className=""
      />
      <button className="">
        <Image fill src="/images/search-sb.svg" alt="돋보기 모양의 검색 버튼" />
      </button>
    </form>
  );
};

export default SearchBar;
