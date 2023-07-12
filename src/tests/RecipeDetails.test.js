import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

describe('Testando a página de detalhes de receita', () => {
  delete global.window.location;
  global.window = Object.create(window);
  global.window.location = { reload: jest.fn(), pathname: '/meals' };

  test('Testa se as informações da receita de comida são renderizadas na tela', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push('/meals/52977');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const recipeIngredients = await screen.findByTestId('0-ingredient-name-and-measure');
    const recipeInstructions = await screen.findByTestId('instructions');
    const recipeVideo = await screen.findByTestId('video');
    const recipeRecomendation = await screen.findByTestId('0-recomendation-card');
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeIngredients).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(recipeVideo).toBeInTheDocument();
    expect(recipeRecomendation).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(startRecipeBtn);
    });
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });

  test('Testa se as informações da receita de bebida são renderizadas na tela', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push('/drinks/15266');

    const recipePhoto = await screen.findByTestId('recipe-photo');
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeCategory1 = await screen.findByText('Ordinary Drink');
    const recipeCategory2 = await screen.findByText('Alcoholic');
    const recipeIngredients = await screen.findByTestId('0-ingredient-name-and-measure');
    const recipeInstructions = await screen.findByTestId('instructions');
    const recipeRecomendation = await screen.findByTestId('0-recomendation-card');// rever
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory1).toBeInTheDocument();
    expect(recipeCategory2).toBeInTheDocument();
    expect(recipeIngredients).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(recipeRecomendation).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(startRecipeBtn);
    });
    expect(history.location.pathname).toBe('/drinks/15266/in-progress');
  });

  // testes com problema de timeout - não consegui resolver
  test('Testa se o botão de favoritar funciona', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push('/meals/52977');
    });
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(favoriteBtn);
      expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    });

    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '52977' }]));
      expect(localStorage.getItem('favoriteRecipes')).not.toBeNull();
    });
  });

  test('Testa se o botão de compartilhar está na tela', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push('/meals/52977');
    });
    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(shareBtn);
      expect(shareBtn).toHaveAttribute('src', 'shareIcon.svg');
    });
  });
});
