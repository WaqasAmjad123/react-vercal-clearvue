import { useState, useEffect, useMemo } from 'react';

export const useSearch = (items, searchKeys, initialSearch = '') => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;

    return items.filter(item =>
      searchKeys.some(key =>
        item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchKeys, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems
  };
}; 