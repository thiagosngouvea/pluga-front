import React from 'react';
import { render } from '@testing-library/react';
import { AppGridContainer } from './AppGridContainer';
import { AppProvider } from '../../context';
import { App } from '../../types/app.types';

const mockApps: App[] = Array.from({ length: 15 }, (_, i) => ({
  app_id: `${i + 1}`,
  name: `App ${i + 1}`,
  icon: `https://example.com/icon${i + 1}.png`,
  color: '#FF0000',
  link: `https://example.com/app${i + 1}`,
}));

// Mock fetch
global.fetch = jest.fn().mockResolvedValue({
  json: async () => mockApps,
});

const renderWithProvider = (component: React.ReactElement) => {
  return render(<AppProvider>{component}</AppProvider>);
};

describe('AppGridContainer', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('deve renderizar AppGrid com aplicativos do contexto', async () => {
    const { getByText } = renderWithProvider(<AppGridContainer search="" />);

    // Aguarda o carregamento dos apps
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(getByText('App 1')).toBeInTheDocument();
  });

  it('deve passar a propriedade search para AppGrid', async () => {
    const { getByText, queryByText } = renderWithProvider(<AppGridContainer search="App 1" />);

    // Aguarda o carregamento dos apps
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(getByText('App 1')).toBeInTheDocument();
    expect(queryByText('App 2')).not.toBeInTheDocument();
  });
});
