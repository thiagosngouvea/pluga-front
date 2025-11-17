'use client';

import { useRef, useEffect } from 'react';
import { AppCard } from '../AppCard';
import { App } from '../../types/app.types';

interface AppModalProps {
  selectedApp: App | null;
  lastSelectedApps: App[];
  onAppSelect: (app: App) => void;
  onClose: () => void;
}

export function AppModal({
  selectedApp,
  lastSelectedApps,
  onAppSelect,
  onClose,
}: AppModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selectedApp && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedApp]);

  return (
    <dialog className="modal" ref={modalRef}>
      {selectedApp && (
        <div className="modal-box flex flex-col gap-6">
          <div className="mx-auto">
            <div className="flex gap-6">
              <figure
                style={{ backgroundColor: selectedApp.color }}
                className="rounded-full p-10"
              >
                <img
                  src={selectedApp.icon}
                  alt={selectedApp.name}
                  width="64"
                  height="64"
                />
              </figure>
              <div className="py-6">
                <h2 className="mb-4 text-lg">{selectedApp.name}</h2>
                <a
                  href={selectedApp.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Acessar
                </a>
              </div>
            </div>
          </div>
          <h2 className="text-center">Últimas ferramentas visualizadas</h2>
          <div className="grid grid-cols-3 gap-6">
            {[...lastSelectedApps].reverse().map((app) => (
              <AppCard key={app.app_id} app={app} onClick={() => onAppSelect(app)} />
            ))}
          </div>
        </div>
      )}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
