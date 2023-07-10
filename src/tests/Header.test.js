import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Header', () => {
  test('Testa a renderização do componente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const pageTitle = await screen.findByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    const profileButton = await screen.findByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    const searchButton = await screen.findByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
  });

  test('Testa se quando clica no botão de profile, a rota muda para /profile', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const profileButton = await screen.findByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);
    const { location: { pathname: newPathname } } = history;
    expect(newPathname).toBe('/profile');
  });

  test('Testa se quando clica no botão de search, a barra de busca aparece', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const searchButton = await screen.findByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const searchBar = await screen.findByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchBar).not.toBeInTheDocument();
  });
});
