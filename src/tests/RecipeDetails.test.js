import React from 'react';
import { screen } from '@testing-library/react';
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
  });
});
