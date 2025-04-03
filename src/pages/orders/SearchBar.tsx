import React, { useState } from 'react';
import { Input } from 'antd';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Tìm kiếm...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Input
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearch}
      allowClear
      style={{ width: 300, marginBottom: 16 }}
    />
  );
};

export default SearchBar;
