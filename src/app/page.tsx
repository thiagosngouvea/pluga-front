'use client';

import { useState } from 'react';
import { useApp } from '@/src/features/apps/context';
import { SearchBar } from '@/src/features/apps/components/SearchBar';
import { AppGridContainer } from '@/src/features/apps/components/AppGridContainer';
import { AppModalContainer } from '@/src/features/apps/components/AppModalContainer';
import { LoadingSpinner } from '@/src/shared/components/ui/LoadingSpinner';

export default function Home() {
  const { isLoading } = useApp();
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-base-300">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-2">
                <span className="text-2xl font-semibold text-primary">Pluga Challenge</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Conecte suas ferramentas
              </h1>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Explore e integre mais de 100 aplicativos para automatizar seus processos
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto space-y-8">
            <SearchBar value={search} onChange={setSearch} />
            {isLoading ? <LoadingSpinner /> : <AppGridContainer search={search} />}
          </div>
        </div>
      </div>
      <AppModalContainer />
    </>
  );
}
