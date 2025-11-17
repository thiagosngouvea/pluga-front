'use client';

import { AppGrid } from '../AppGrid';
import { useApp } from '../../context/AppContext';

interface AppGridContainerProps {
  search: string;
}

/**
 * Container component that connects AppGrid to the AppContext
 * This separates presentation (AppGrid) from state management (Context)
 */
export function AppGridContainer({ search }: AppGridContainerProps) {
  const { apps, handleSelectedApp } = useApp();

  return <AppGrid apps={apps} search={search} onAppSelect={handleSelectedApp} />;
}

