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
      <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
        <h1 className="text-3xl text-center">Pluga Challenge Front</h1>
        <SearchBar value={search} onChange={setSearch} />
        {isLoading ? <LoadingSpinner /> : <AppGridContainer search={search} />}
      </div>
      <AppModalContainer />
    </>
  );
}
