import { useEffect } from 'react';
import { App } from '../types/app.types';
import { useAppSearch } from './useAppSearch';
import { useAppPagination } from './useAppPagination';

interface UseAppGridReturn {
  filteredApps: App[];
  paginatedApps: App[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export function useAppGrid(apps: App[], search: string): UseAppGridReturn {
  const filteredApps = useAppSearch(apps, search);
  const {
    page,
    setPage,
    totalPages,
    paginatedItems,
    goToNextPage,
    goToPreviousPage,
  } = useAppPagination(filteredApps);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return {
    filteredApps,
    paginatedApps: paginatedItems as App[],
    currentPage: page,
    totalPages,
    goToPage: setPage,
    goToNextPage,
    goToPreviousPage,
  };
}

