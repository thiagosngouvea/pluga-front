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
        <div className="modal-box max-w-4xl flex flex-col gap-8 p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            aria-label="Fechar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* App Details */}
          <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-base-300">
            <figure
              style={{ backgroundColor: selectedApp.color }}
              className="rounded-3xl p-10 shadow-xl"
            >
              <img
                src={selectedApp.icon}
                alt={selectedApp.name}
                width="80"
                height="80"
                className="drop-shadow-lg"
              />
            </figure>
            <div className="flex-1 text-center md:text-left space-y-4">
              <h2 className="text-3xl font-bold">{selectedApp.name}</h2>
              <p className="text-base-content/60">
                Integre {selectedApp.name} com suas ferramentas favoritas
              </p>
              <a
                href={selectedApp.link}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-lg gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Acessar {selectedApp.name}
              </a>
            </div>
          </div>

          {/* Recent Apps */}
          {lastSelectedApps.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="text-xl font-semibold">Visualizadas recentemente</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...lastSelectedApps].reverse().map((app) => (
                  <AppCard key={app.app_id} app={app} onClick={() => onAppSelect(app)} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose} aria-label="Fechar">close</button>
      </form>
    </dialog>
  );
}
