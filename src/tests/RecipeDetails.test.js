import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import oneMeal from '../../cypress/mocks/oneMeal';

const ROUTE_MEALS_ID = '/meals/52771';
const WHITE_HEART = 'whiteHeartIcon.svg';
const START_RECIPE_ID = 'start-recipe-btn';

describe('Testando a página de detalhes de receita', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
  });
  afterEach(() => jest.clearAllMocks());

  test('Testa se as informações da receita de comida são renderizadas na tela', async () => {
    const ingredients = [
      'penne rigate',
      'olive oil',
      'garlic',
      'chopped tomatoes',
      'red chile flakes',
      'italian seasoning',
      'basil',
      'Parmigiano-Reggiano',
    ];

    const measures = [
      '1 pound',
      '1/4 cup',
      '3 cloves',
      '1 tin ',
      '1/2 teaspoon',
      '1/2 teaspoon',
      '6 leaves',
      'spinkling',
    ];

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push(ROUTE_MEALS_ID);

    const imageMeal = await screen.findByTestId('recipe-photo');
    expect(imageMeal).toBeInTheDocument();
    expect(imageMeal.src).toBe(oneMeal.meals[0].strMealThumb);

    const titleMeal = await screen.findByTestId('recipe-title');
    expect(titleMeal).toBeInTheDocument();
    expect(titleMeal.innerHTML).toBe(oneMeal.meals[0].strMeal);

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();

    const category = await screen.findByTestId('recipe-category');
    expect(category).toBeInTheDocument();
    expect(category.innerHTML).toBe(oneMeal.meals[0].strCategory);

    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    expect(instructions.innerHTML).toBe(oneMeal.meals[0].strInstructions);

    const ingredientsList = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredientsList).toBeInTheDocument();

    ingredients.forEach((ingredient, index) => {
      const ingredientName = screen.getByTestId(`${index}-ingredient-name-and-measure`);
      expect(ingredientName.innerHTML).toBe(`${ingredient} - ${measures[index]}`);
    });

    const video = await screen.findByTestId('video');
    expect(video).toBeInTheDocument();
    expect(video.src).toBe('https://www.youtube.com/embed/1IszT_guI08');
    const startRecipeButton = await screen.findByTestId(START_RECIPE_ID);
    expect(startRecipeButton).toBeInTheDocument();
  });

  test('Testa se os botões de compartilhar e favoritar funcionam', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push(ROUTE_MEALS_ID);

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    act(() => {
      userEvent.click(shareButton);
    });

    const alert = await screen.findByText('Link copied!');
    expect(alert).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton.getAttribute('src')).toBe(WHITE_HEART);
    act(() => {
      userEvent.click(favoriteButton);
    });

    expect(favoriteButton.getAttribute('src')).not.toBe(WHITE_HEART);

    act(() => {
      userEvent.click(favoriteButton);
    });

    expect(favoriteButton.getAttribute('src')).toBe(WHITE_HEART);
  });

  test('Testa se o botão de iniciar receita redireciona para a tela de receita em processo', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push(ROUTE_MEALS_ID);

    const startRecipeButton = await screen.findByTestId(START_RECIPE_ID);
    expect(startRecipeButton).toBeInTheDocument();

    act(() => {
      userEvent.click(startRecipeButton);
    });

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals/52771/in-progress');
  });

  test('Testa se o nome do botão muda de Start Recipe para Continue Recipe', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_MEALS_ID);
    });
    const startRecipeButton = await screen.findByTestId(START_RECIPE_ID);
    expect(startRecipeButton).toBeInTheDocument();

    act(() => {
      userEvent.click(startRecipeButton);
    });

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals/52771/in-progress');

    const checkboxIngredient = await screen.findByTestId('0-ingredient-step');
    expect(checkboxIngredient).toBeInTheDocument();

    act(() => {
      userEvent.click(checkboxIngredient);
      history.push(ROUTE_MEALS_ID);
    });

    const continueRecipeButton = await screen.findByTestId(START_RECIPE_ID);
    expect(continueRecipeButton).toBeInTheDocument();
    expect(continueRecipeButton.innerHTML).toBe('Continue Recipe');
  });

  //  FALTAM OS TESTES DA FUNÇÃO btnCondition, estes só podem ser feitos quando
  //  o estado do botão mudar, após ter a página DoneRecipes funcionando.
});
