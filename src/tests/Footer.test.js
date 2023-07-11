import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Footer', () => {
  it('Verifica se o componente é renderizado na tela', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('Verifica se o componente possui 2 ícones', () => {
    renderWithRouter(<Footer />);
    const icons = screen.getAllByRole('img');
    expect(icons.length).toBe(2);
  });

  it('Verifica se ao clicar no ícone de bebidas, a rota muda para /drinks', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('Verifica se ao clicar no ícone de comidas, a rota muda para /meals', () => {
    const { history } = renderWithRouter(<Footer />);
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
