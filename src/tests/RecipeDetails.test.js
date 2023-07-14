import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

const ROUTE_MEALS_ID = '/meals/52771';
const ROUTE_DRINKS_ID = '/drinks/178319';
const ROUTE_MEALS_IN_PROGRESS = '/meals/52771/in-progress';
const ROUTE_DRINKS_IN_PROGRESS = '/drinks/178319/in-progress';
const FAVORITE_BTN = 'favorite-btn';
const WHITE_HEART = 'whiteHeartIcon.svg';
const START_RECIPE_ID = 'start-recipe-btn';

describe('Testando a página de detalhes de receita de comida', () => {
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

    const favoriteButton = await screen.findByTestId(FAVORITE_BTN);
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

    const favoriteButton = await screen.findByTestId(FAVORITE_BTN);
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
    expect(pathname).toBe(ROUTE_MEALS_IN_PROGRESS);
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
    expect(pathname).toBe(ROUTE_MEALS_IN_PROGRESS);

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

  test('Testa se quando doneRecipe é true, o botão de iniciar receita não é renderizado', async () => {
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
    expect(pathname).toBe(ROUTE_MEALS_IN_PROGRESS);

    const checkboxIngredient0 = await screen.findByTestId('0-ingredient-checkbox');
    const checkboxIngredient1 = await screen.findByTestId('1-ingredient-checkbox');
    const checkboxIngredient2 = await screen.findByTestId('2-ingredient-checkbox');
    const checkboxIngredient3 = await screen.findByTestId('3-ingredient-checkbox');
    const checkboxIngredient4 = await screen.findByTestId('4-ingredient-checkbox');
    const checkboxIngredient5 = await screen.findByTestId('5-ingredient-checkbox');
    const checkboxIngredient6 = await screen.findByTestId('6-ingredient-checkbox');
    const checkboxIngredient7 = await screen.findByTestId('7-ingredient-checkbox');

    expect(checkboxIngredient0).toBeInTheDocument();
    expect(checkboxIngredient1).toBeInTheDocument();
    expect(checkboxIngredient2).toBeInTheDocument();
    expect(checkboxIngredient3).toBeInTheDocument();
    expect(checkboxIngredient4).toBeInTheDocument();
    expect(checkboxIngredient5).toBeInTheDocument();
    expect(checkboxIngredient6).toBeInTheDocument();
    expect(checkboxIngredient7).toBeInTheDocument();

    act(() => {
      // userEvent.click(checkboxIngredient0);
      userEvent.click(checkboxIngredient1);
      userEvent.click(checkboxIngredient2);
      userEvent.click(checkboxIngredient3);
      userEvent.click(checkboxIngredient4);
      userEvent.click(checkboxIngredient5);
      userEvent.click(checkboxIngredient6);
      userEvent.click(checkboxIngredient7);
    });

    expect(checkboxIngredient0.checked).toBe(true);

    const finishRecipeButton = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipeButton).toBeInTheDocument();

    act(() => {
      userEvent.click(finishRecipeButton);
    });

    const { location: { pathname: newPathname } } = history;
    expect(newPathname).toBe('/done-recipes');

    act(() => {
      history.push(ROUTE_MEALS_ID);
    });

    const startRecipeButtonAfterDone = screen.queryByTestId(START_RECIPE_ID);
    expect(startRecipeButtonAfterDone).not.toBeInTheDocument();
  });
});

describe('Testando a página de detalhes de receita de bebidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
  });
  afterEach(() => jest.clearAllMocks());

  test('Testa se as informações da receita de bebida são renderizadas na tela', async () => {
    const ingredients = [
      'Hpnotiq',
      'Pineapple Juice',
      'Banana Liqueur',
    ];

    const measures = [
      '2 oz',
      '1 oz',
      '1 oz',
    ];

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push(ROUTE_DRINKS_ID);

    const imageDrink = await screen.findByTestId('recipe-photo');
    expect(imageDrink).toBeInTheDocument();
    expect(imageDrink.src).toBe(oneDrink.drinks[0].strDrinkThumb);

    const titleDrink = await screen.findByTestId('recipe-title');
    expect(titleDrink).toBeInTheDocument();
    expect(titleDrink.innerHTML).toBe(oneDrink.drinks[0].strDrink);

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId(FAVORITE_BTN);
    expect(favoriteButton).toBeInTheDocument();

    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const ingredientsList = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredientsList).toBeInTheDocument();

    ingredients.forEach((ingredient, index) => {
      const ingredientName = screen.getByTestId(`${index}-ingredient-name-and-measure`);
      expect(ingredientName.innerHTML).toBe(`${ingredient} - ${measures[index]}`);
    });

    const startRecipeButton = await screen.findByTestId(START_RECIPE_ID);
    expect(startRecipeButton).toBeInTheDocument();
  });

  test('Testa se o botão Start Recipe muda para Continue Recipe', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_DRINKS_ID);
    });
    const startRecipeButton = await screen.findByTestId(START_RECIPE_ID);
    expect(startRecipeButton).toBeInTheDocument();

    act(() => {
      userEvent.click(startRecipeButton);
    });

    const { location: { pathname } } = history;
    expect(pathname).toBe(ROUTE_DRINKS_IN_PROGRESS);

    const checkboxIngredient = await screen.findByTestId('0-ingredient-step');
    expect(checkboxIngredient).toBeInTheDocument();

    act(() => {
      userEvent.click(checkboxIngredient);
      history.push(ROUTE_DRINKS_ID);
    });

    const continueRecipeButton = await screen.findByTestId(START_RECIPE_ID);
    expect(continueRecipeButton).toBeInTheDocument();
    expect(continueRecipeButton.innerHTML).toBe('Continue Recipe');
  });
});
