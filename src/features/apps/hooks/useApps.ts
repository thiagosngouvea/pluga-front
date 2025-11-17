import { useState, useEffect } from 'react';
import { AppService } from '../services/appService';
import { AppStorage } from '../services/appStorage';
import { App } from '../types/app.types';

interface UseAppsReturn {
  apps: App[];
  isLoading: boolean;
  error: Error | null;
}

export function useApps(): UseAppsReturn {
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchApps() {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedApps = await AppService.fetchApps();

        if (isMounted) {
          setApps(fetchedApps);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch apps'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchApps();

    return () => {
      isMounted = false;
    };
  }, []);

  return { apps, isLoading, error };
}

export function useLastSelectedApps(allApps: App[]) {
  const [lastSelectedApps, setLastSelectedApps] = useState<App[]>([]);

  useEffect(() => {
    if (allApps.length > 0) {
      const stored = AppStorage.getLastSelectedApps(allApps);
      setLastSelectedApps(stored);
    }
  }, [allApps]);

  const addLastSelectedApp = (app: App) => {
    setLastSelectedApps((current) => AppStorage.updateLastSelectedApps(current, app));
  };

  return { lastSelectedApps, addLastSelectedApp };
}

