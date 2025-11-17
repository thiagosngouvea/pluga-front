import { useState, useMemo, useEffect } from 'react';
import { PAGINATION } from '@/src/shared/constants/pagination';

interface UseAppPaginationReturn {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  paginatedItems: any[];
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export function useAppPagination<T>(
  items: T[],
  itemsPerPage: number = PAGINATION.ITEMS_PER_PAGE
): UseAppPaginationReturn {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage) || 1;
  }, [items.length, itemsPerPage]);

  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, page, itemsPerPage]);

  const goToNextPage = () => {
    setPage((current) => Math.min(current + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setPage((current) => Math.max(current - 1, 1));
  };

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [totalPages]);

  return {
    page,
    setPage,
    totalPages,
    paginatedItems,
    goToNextPage,
    goToPreviousPage,
  };
}

