'use client';

import { AppModal } from '../AppModal';
import { useApp } from '../../context/AppContext';

export function AppModalContainer() {
  const { selectedApp, lastSelectedApps, handleSelectedApp, setSelectedApp } = useApp();

  return (
    <AppModal
      selectedApp={selectedApp}
      lastSelectedApps={lastSelectedApps}
      onAppSelect={handleSelectedApp}
      onClose={() => setSelectedApp(null)}
    />
  );
}

