import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('deve renderizar o campo de busca', () => {
    const { getByPlaceholderText } = render(<SearchBar value="" onChange={mockOnChange} />);
    const input = getByPlaceholderText('Buscar ferramenta');
    expect(input).toBeInTheDocument();
  });

  it('deve atualizar o valor da busca quando o usuário digita', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText } = render(<SearchBar value="" onChange={mockOnChange} />);
    const input = getByPlaceholderText('Buscar ferramenta') as HTMLInputElement;

    await user.type(input, 'test search');

    expect(mockOnChange).toHaveBeenCalledWith('test search');
  });

  it('deve exibir o valor atual', () => {
    const { getByPlaceholderText } = render(<SearchBar value="current value" onChange={mockOnChange} />);
    const input = getByPlaceholderText('Buscar ferramenta') as HTMLInputElement;
    expect(input.value).toBe('current value');
  });
});
