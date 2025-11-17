import React from 'react';
import { render } from '@testing-library/react';
import { AppGrid } from './AppGrid';
import { App } from '../../types/app.types';

const mockApps: App[] = Array.from({ length: 15 }, (_, i) => ({
  app_id: `${i + 1}`,
  name: `App ${i + 1}`,
  icon: `https://example.com/icon${i + 1}.png`,
  color: '#FF0000',
  link: `https://example.com/app${i + 1}`,
}));

const mockOnAppSelect = jest.fn();

describe('AppGrid', () => {
  beforeEach(() => {
    mockOnAppSelect.mockClear();
  });

  it('deve renderizar a grade de aplicativos', () => {
    const { getByText } = render(<AppGrid apps={mockApps} search="" onAppSelect={mockOnAppSelect} />);
    expect(getByText('App 1')).toBeInTheDocument();
    expect(getByText('App 12')).toBeInTheDocument();
  });

  it('deve mostrar botões de paginação quando há múltiplas páginas', () => {
    const { getByText } = render(<AppGrid apps={mockApps} search="" onAppSelect={mockOnAppSelect} />);
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
  });

  it('deve filtrar aplicativos por busca', () => {
    const { getByText, queryByText } = render(<AppGrid apps={mockApps} search="App 1" onAppSelect={mockOnAppSelect} />);
    expect(getByText('App 1')).toBeInTheDocument();
    expect(queryByText('App 2')).not.toBeInTheDocument();
  });

  it('deve mostrar estado vazio quando nenhum aplicativo corresponde à busca', () => {
    const { getByText } = render(<AppGrid apps={mockApps} search="NonExistentApp" onAppSelect={mockOnAppSelect} />);
    expect(getByText(/Nenhum app encontrado/i)).toBeInTheDocument();
  });

  it('deve chamar onAppSelect quando um aplicativo é clicado', () => {
    const { getByText } = render(<AppGrid apps={mockApps} search="" onAppSelect={mockOnAppSelect} />);
    const appCard = getByText('App 1').closest('a');
    if (appCard) {
      appCard.click();
      expect(mockOnAppSelect).toHaveBeenCalledWith(mockApps[0]);
    }
  });
});
