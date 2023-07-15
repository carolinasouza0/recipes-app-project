import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
// import oneMeal from '../../cypress/mocks/oneMeal';
// import oneDrink from '../../cypress/mocks/oneDrink';
import favoriteRecipesMock from './helpers/favoriteRecipesMock';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

const RECIPE_NAME_TESTID0 = '0-horizontal-name';
const RECIPE_NAME_TESTID1 = '1-horizontal-name';
const RECIPE_IMAGE_TESTID0 = '0-horizontal-image';
const RECIPE_IMAGE_TESTID1 = '1-horizontal-image';
const SHARE_BUTTON_TESTID0 = '0-horizontal-share-btn';
const ROUTE_FAVORITE_RECIPES = '/favorite-recipes';

describe('Testando página de Favorite Recipes', () => {
  beforeEach(() => {
    favoriteRecipesMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Teste se a página é renderizada com a receita de comida favoritada', () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_FAVORITE_RECIPES);
    });

    const meal = JSON.parse(localStorage.getItem('favoriteRecipes'))[0];
    expect(meal).toHaveProperty('id', '52977');

    const recipeName = screen.getByTestId(RECIPE_NAME_TESTID0);
    expect(recipeName).toBeInTheDocument();
    expect(recipeName).toHaveTextContent('Corba');

    const recipeImage = screen.getByTestId(RECIPE_IMAGE_TESTID0);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');

    const recipeCategory = screen.getByTestId('0-horizontal-top-text');
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory).toHaveTextContent('Turkish - Side');

    const shareButton = screen.getByTestId(SHARE_BUTTON_TESTID0);
    expect(shareButton).toBeInTheDocument();

    const favoriteButton2 = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteButton2).toBeInTheDocument();
  });

  it('Testa se a página é renderizada com a receita de bebiba favoritada', () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_FAVORITE_RECIPES);
    });

    const drink = JSON.parse(localStorage.getItem('favoriteRecipes'))[1];
    expect(drink).toHaveProperty('id', '17203');

    const recipeName = screen.getByTestId(RECIPE_NAME_TESTID1);
    expect(recipeName).toBeInTheDocument();
    expect(recipeName).toHaveTextContent('Kir');

    const recipeImage = screen.getByTestId(RECIPE_IMAGE_TESTID1);
    expect(recipeImage).toBeInTheDocument();
    expect(recipeImage).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg');

    const recipeCategory = screen.getByTestId('1-horizontal-top-text');
    expect(recipeCategory).toBeInTheDocument();

    const shareButton = screen.getByTestId('1-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();

    const favoriteButton2 = screen.getByTestId('1-horizontal-favorite-btn');
    expect(favoriteButton2).toBeInTheDocument();
  });

  it('Testa se os 3 botões de filtro estão na tela', () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_FAVORITE_RECIPES);
    });

    const allFilterButton = screen.getByTestId('filter-by-all-btn');
    expect(allFilterButton).toBeInTheDocument();

    const foodFilterButton = screen.getByTestId('filter-by-meal-btn');
    expect(foodFilterButton).toBeInTheDocument();

    const drinkFilterButton = screen.getByTestId('filter-by-drink-btn');
    expect(drinkFilterButton).toBeInTheDocument();

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toHaveLength(2);
  });

  it('Testa se ao clicar no botão de comida, somente as receitas de comida são exibidas', () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_FAVORITE_RECIPES);
    });

    const mealFilterButton = screen.getByTestId('filter-by-meal-btn');

    act(() => {
      userEvent.click(mealFilterButton);
    });

    const meal = JSON.parse(localStorage.getItem('favoriteRecipes'))[0];
    expect(meal).toHaveProperty('id', '52977');
    expect(meal.type).toBe('meal');
    expect(meal.type).not.toBe('drink');

    const recipeName = screen.getByTestId(RECIPE_NAME_TESTID0);
    expect(recipeName).toBeInTheDocument();
    expect(recipeName).toHaveTextContent('Corba');

    const drinkName = screen.queryByTestId(RECIPE_NAME_TESTID1);
    expect(drinkName).not.toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de bebida, somente as receitas de bebida são exibidas', () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_FAVORITE_RECIPES);
    });

    const drinkFilterButton = screen.getByTestId('filter-by-drink-btn');

    act(() => {
      userEvent.click(drinkFilterButton);
    });

    const drink = JSON.parse(localStorage.getItem('favoriteRecipes'))[1];
    expect(drink).toHaveProperty('id', '17203');
    expect(drink.type).toBe('drink');
    expect(drink.type).not.toBe('meal');

    const recipeName = screen.getByTestId(RECIPE_NAME_TESTID0);
    expect(recipeName).toBeInTheDocument();
    expect(recipeName).toHaveTextContent('Kir');

    const mealName = screen.queryByTestId(RECIPE_NAME_TESTID1);
    expect(mealName).not.toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de todos, todas as receitas são exibidas', () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_FAVORITE_RECIPES);
    });

    const allFilterButton = screen.getByTestId('filter-by-all-btn');

    act(() => {
      userEvent.click(allFilterButton);
    });

    const meal = JSON.parse(localStorage.getItem('favoriteRecipes'))[0];
    expect(meal).toHaveProperty('id', '52977');
    expect(meal.type).toBe('meal');

    const drink = JSON.parse(localStorage.getItem('favoriteRecipes'))[1];
    expect(drink).toHaveProperty('id', '17203');
    expect(drink.type).toBe('drink');

    const recipeName = screen.getByTestId(RECIPE_NAME_TESTID0);
    expect(recipeName).toBeInTheDocument();
    expect(recipeName).toHaveTextContent('Corba');

    const recipeName2 = screen.getByTestId(RECIPE_NAME_TESTID1);
    expect(recipeName2).toBeInTheDocument();
    expect(recipeName2).toHaveTextContent('Kir');
  });

  it('Testa se ao clicar no botão de compartilhar, o link da receita é copiado', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_FAVORITE_RECIPES);
    });

    const shareButton = await screen.findByTestId(SHARE_BUTTON_TESTID0);
    expect(shareButton).toBeInTheDocument();

    act(() => {
      userEvent.click(shareButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52977');
  });

  it('Testa se ao clicar no botão de compartilhar, a mensagem "Link copiado!" é exibida', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_FAVORITE_RECIPES);
    });

    const shareButton = await screen.findByTestId(SHARE_BUTTON_TESTID0);
    expect(shareButton).toBeInTheDocument();

    act(() => {
      userEvent.click(shareButton);
    });

    const linkCopied = await screen.findByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
  });

  it('Testa se ao desfavoritar uma receita, ela é removida da tela', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_FAVORITE_RECIPES);
    });

    const favoriteButton = await screen.findByTestId('0-horizontal-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();

    act(() => {
      userEvent.click(favoriteButton);
    });

    const drink = JSON.parse(localStorage.getItem('favoriteRecipes'))[0];
    expect(drink).toHaveProperty('id', '17203');
    expect(drink.type).toBe('drink');

    const recipeName = screen.getByTestId(RECIPE_NAME_TESTID0);
    expect(recipeName).toBeInTheDocument();

    const recipeName2 = screen.queryByTestId(RECIPE_NAME_TESTID1);
    expect(recipeName2).not.toBeInTheDocument();

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toHaveLength(1);

    const favoriteButton2 = screen.queryByTestId('1-horizontal-favorite-btn');
    expect(favoriteButton2).not.toBeInTheDocument();
  });
});
