import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('2 - Crie um formulário para identificação', () => {
  it('Teste pagina Login', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const btnEntrar = screen.getByTestId('login-submit-btn');
    expect(btnEntrar).toBeInTheDocument();
    expect(btnEntrar).toBeDisabled();

    act(() => {
      userEvent.type(inputEmail, 'alguem@gmail.com');
      userEvent.type(inputPassword, '1234567');
    });

    expect(btnEntrar).toBeEnabled();

    act(() => {
      userEvent.click(btnEntrar);
    });

    expect(history.location.pathname).toBe('/meals');
  });
});
