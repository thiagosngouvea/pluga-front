import React from 'react';
import { render } from '@testing-library/react';
import { AppModal } from './AppModal';
import { App } from '../../types/app.types';

const mockApp: App = {
  app_id: '1',
  name: 'Test App',
  icon: 'https://example.com/icon.png',
  color: '#FF0000',
  link: 'https://example.com/app',
};

const mockLastSelectedApps: App[] = [
  mockApp,
  {
    app_id: '2',
    name: 'Test App 2',
    icon: 'https://example.com/icon2.png',
    color: '#00FF00',
    link: 'https://example.com/app2',
  },
];

const mockOnAppSelect = jest.fn();
const mockOnClose = jest.fn();

describe('AppModal', () => {
  beforeEach(() => {
    mockOnAppSelect.mockClear();
    mockOnClose.mockClear();
  });

  it('deve renderizar modal quando selectedApp é fornecido', () => {
    const { getByText } = render(
      <AppModal
        selectedApp={mockApp}
        lastSelectedApps={mockLastSelectedApps}
        onAppSelect={mockOnAppSelect}
        onClose={mockOnClose}
      />
    );

    expect(getByText('Test App')).toBeInTheDocument();
    expect(getByText('Acessar')).toBeInTheDocument();
  });

  it('não deve renderizar conteúdo do modal quando selectedApp é null', () => {
    const { queryByText } = render(
      <AppModal
        selectedApp={null}
        lastSelectedApps={mockLastSelectedApps}
        onAppSelect={mockOnAppSelect}
        onClose={mockOnClose}
      />
    );

    expect(queryByText('Test App')).not.toBeInTheDocument();
  });

  it('deve exibir últimas ferramentas selecionadas', () => {
    const { getByText } = render(
      <AppModal
        selectedApp={mockApp}
        lastSelectedApps={mockLastSelectedApps}
        onAppSelect={mockOnAppSelect}
        onClose={mockOnClose}
      />
    );

    expect(getByText('Últimas ferramentas visualizadas')).toBeInTheDocument();
    expect(getByText('Test App 2')).toBeInTheDocument();
  });

  it('deve chamar onClose quando botão fechar é clicado', () => {
    const { getByText } = render(
      <AppModal
        selectedApp={mockApp}
        lastSelectedApps={mockLastSelectedApps}
        onAppSelect={mockOnAppSelect}
        onClose={mockOnClose}
      />
    );

    const closeButton = getByText('close');
    closeButton.click();

    expect(mockOnClose).toHaveBeenCalled();
  });
});
