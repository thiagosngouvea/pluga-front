'use client';

import { AppCard } from '../AppCard';
import { Pagination } from '../Pagination';
import { EmptyState } from '@/src/shared/components/ui/EmptyState';
import { useAppGrid } from '../../hooks/useAppGrid';
import { App } from '../../types/app.types';

interface AppGridProps {
  apps: App[];
  search: string;
  onAppSelect: (app: App) => void;
}

export function AppGrid({ apps, search, onAppSelect }: AppGridProps) {
  const {
    paginatedApps,
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  } = useAppGrid(apps, search);

  if (paginatedApps.length === 0) {
    return (
      <EmptyState
        message={search ? `Nenhum app encontrado para "${search}".` : 'Nenhum app encontrado.'}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {paginatedApps.map((app) => (
          <AppCard key={app.app_id} app={app} onClick={() => onAppSelect(app)} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
        />
      )}
    </>
  );
}
