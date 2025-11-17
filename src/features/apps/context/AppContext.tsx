'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { App } from '../types/app.types';
import { useApps, useLastSelectedApps } from '../hooks/useApps';

interface AppContextType {
  apps: App[];
  selectedApp: App | null;
  lastSelectedApps: App[];
  setSelectedApp: (app: App | null) => void;
  handleSelectedApp: (app: App) => void;
  isLoading: boolean;
  error: Error | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { apps, isLoading, error } = useApps();
  const { lastSelectedApps, addLastSelectedApp } = useLastSelectedApps(apps);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  function handleSelectedApp(app: App) {
    setSelectedApp(app);
    addLastSelectedApp(app);
  }

  return (
    <AppContext.Provider
      value={{
        apps,
        selectedApp,
        lastSelectedApps,
        setSelectedApp,
        handleSelectedApp,
        isLoading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

