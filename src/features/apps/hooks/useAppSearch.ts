import { useMemo } from 'react';
import { App } from '../types/app.types';
import { includesIgnoreCase } from '@/src/shared/utils/stringUtils';

export function useAppSearch(apps: App[], search: string): App[] {
  const filteredApps = useMemo(() => {
    if (!search.trim()) {
      return apps;
    }

    return apps.filter((app) => includesIgnoreCase(app.name, search));
  }, [apps, search]);

  return filteredApps;
}

