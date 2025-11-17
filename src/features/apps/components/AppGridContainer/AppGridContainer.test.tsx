import React from 'react';
import { render, waitFor } from '@testing-library/react';
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

global.fetch = jest.fn();

const renderWithProvider = (component: React.ReactElement) => {
  return render(<AppProvider>{component}</AppProvider>);
};

describe('AppGridContainer', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApps,
    });
  });

  it('deve renderizar AppGrid com aplicativos do contexto', async () => {
    const { getByText } = renderWithProvider(<AppGridContainer search="" />);

    await waitFor(() => {
      expect(getByText('App 1')).toBeInTheDocument();
    });
  });

  it('deve passar a propriedade search para AppGrid', async () => {
    const { getByText, queryByText } = renderWithProvider(<AppGridContainer search="App 1" />);

    await waitFor(() => {
      expect(getByText('App 1')).toBeInTheDocument();
    });

    expect(queryByText('App 2')).not.toBeInTheDocument();
  });
});
