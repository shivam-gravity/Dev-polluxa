"use client";
import { useState, useMemo, useCallback } from "react";

const useFilter = (items, filters) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterButtonClick = useCallback((selectedCategory) => {
    setSelectedFilter((prevFilter) =>
      prevFilter === selectedCategory ? null : selectedCategory
    );
  }, []);

  const handleShowAllButtonClick = useCallback(() => {
    setSelectedFilter(null);
  }, []);
  const filteredItems = useMemo(() => {
    if (selectedFilter) {
      return items.filter((item) => item.brandCategory === selectedFilter);
    }
    return items;
  }, [items, selectedFilter]);

  return {
    selectedFilter,
    handleFilterButtonClick,
    handleShowAllButtonClick,
    filteredItems,
    filters,
  };
};

export default useFilter;
