import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AppProvider, useApp } from './AppContext';
import { App } from '../types/app.types';

global.fetch = jest.fn();

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('AppContext', () => {
  const mockApps: App[] = [
    {
      app_id: '1',
      name: 'Test App 1',
      icon: 'https://example.com/icon1.png',
      color: '#FF0000',
      link: 'https://example.com/app1',
    },
    {
      app_id: '2',
      name: 'Test App 2',
      icon: 'https://example.com/icon2.png',
      color: '#00FF00',
      link: 'https://example.com/app2',
    },
  ];

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    localStorageMock.clear();
  });

  it('deve buscar apps ao montar', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApps,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useApp(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalled();
    expect(result.current.apps).toEqual(mockApps);
  });

  it('deve carregar últimos apps selecionados do localStorage', async () => {
    localStorageMock.setItem('lastSelectedApps', JSON.stringify(['1']));

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApps,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useApp(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.lastSelectedApps).toHaveLength(1);
    expect(result.current.lastSelectedApps[0].app_id).toBe('1');
  });

  it('deve lidar com app selecionado e atualizar localStorage', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApps,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useApp(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.handleSelectedApp(mockApps[0]);
    });

    expect(result.current.selectedApp).toEqual(mockApps[0]);
    expect(result.current.lastSelectedApps).toContainEqual(mockApps[0]);
    expect(localStorageMock.getItem('lastSelectedApps')).toBe(JSON.stringify(['1']));
  });

  it('deve limitar últimos apps selecionados a 3', async () => {
    const manyApps: App[] = Array.from({ length: 5 }, (_, i) => ({
      app_id: `${i + 1}`,
      name: `App ${i + 1}`,
      icon: `https://example.com/icon${i + 1}.png`,
      color: '#000000',
      link: `https://example.com/app${i + 1}`,
    }));

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => manyApps,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useApp(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.handleSelectedApp(manyApps[0]);
      result.current.handleSelectedApp(manyApps[1]);
      result.current.handleSelectedApp(manyApps[2]);
      result.current.handleSelectedApp(manyApps[3]);
    });

    expect(result.current.lastSelectedApps).toHaveLength(3);
    expect(result.current.lastSelectedApps).not.toContainEqual(manyApps[0]);
  });
});

