import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import doneRecipesMock from './helpers/doneRecipesMock';
import renderWithRouter from './renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import DoneRecipes from '../pages/DoneRecipes';

const ZERO_NAME_TEST_ID = '0-horizontal-name';
const ZERO_IMAGE_TEST_ID = '0-horizontal-image';
const ZERO_CATEGORY_TEST_ID = '0-horizontal-top-text';
const ONE_NAME_TEST_ID = '1-horizontal-name';
const ONE_IMAGE_TEST_ID = '1-horizontal-image';

describe('Testa a página de receitas feitas', () => {
  beforeEach(() => {
    doneRecipesMock();
  });

  it('Testa se existe uma comida na tela de receitas feitas', () => {
    renderWithRouter(
      <RecipesProvider><DoneRecipes /></RecipesProvider>,
    );

    const meal = JSON.parse(localStorage.getItem('doneRecipes'))[0];
    const mealName = meal.name;
    const mealImg = meal.image;
    const mealCategory = meal.category;

    const mealNameElement = screen.getByTestId(ZERO_NAME_TEST_ID);
    const mealImgElement = screen.getByTestId(ZERO_IMAGE_TEST_ID);
    const mealCategoryElement = screen.getByTestId(ZERO_CATEGORY_TEST_ID);

    expect(mealNameElement).toBeInTheDocument();
    expect(mealNameElement).toHaveTextContent(mealName);
    expect(mealImgElement).toBeInTheDocument();
    expect(mealImgElement).toHaveAttribute('src', mealImg);
    expect(mealCategoryElement).toBeInTheDocument();
    expect(mealCategoryElement).toHaveTextContent(mealCategory);
  });

  it('Testa se existe uma bebida na tela de receitas feitas', () => {
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

    const drink = JSON.parse(localStorage.getItem('doneRecipes'))[1];
    const drinkName = drink.name;
    const drinkImg = drink.image;
    const drinkAlcoholic = drink.alcoholicOrNot;

    const drinkNameElement = screen.getByTestId(ONE_NAME_TEST_ID);
    const drinkImgElement = screen.getByTestId(ONE_IMAGE_TEST_ID);
    const drinkAlcoholicElement = screen.getByTestId('1-horizontal-top-text');

    expect(drinkNameElement).toBeInTheDocument();
    expect(drinkNameElement).toHaveTextContent(drinkName);
    expect(drinkImgElement).toBeInTheDocument();
    expect(drinkImgElement).toHaveAttribute('src', drinkImg);
    expect(drinkAlcoholicElement).toBeInTheDocument();
    expect(drinkAlcoholicElement).toHaveTextContent(drinkAlcoholic);
  });

  it('Testa se existe um botão de compartilhar para a comida e se ao clicar, um link é copiado', () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

    const meal = JSON.parse(localStorage.getItem('doneRecipes'))[0];
    const mealId = meal.id;

    const mealShareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(mealShareBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(mealShareBtn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`http://localhost:3000/meals/${mealId}`);
  });

  it('Testa se existe um botão de compartilhar para a bebida e se ao clicar, um link é copiado', () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

    const drink = JSON.parse(localStorage.getItem('doneRecipes'))[1];
    const drinkId = drink.id;

    const drinkShareBtn = screen.getByTestId('1-horizontal-share-btn');
    expect(drinkShareBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(drinkShareBtn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`http://localhost:3000/drinks/${drinkId}`);
  });

  it('Testa se os 3 botões de filtro estão na tela', () => {
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const foodBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');

    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de comida, apenas as comidas são exibidas', () => {
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

    const foodBtn = screen.getByTestId('filter-by-meal-btn');

    act(() => {
      userEvent.click(foodBtn);
    });

    const meal = JSON.parse(localStorage.getItem('doneRecipes'))[0];
    const mealName = meal.name;
    const mealImg = meal.image;
    const mealCategory = meal.category;

    const mealNameElement = screen.getByTestId(ZERO_NAME_TEST_ID);
    const mealImgElement = screen.getByTestId(ZERO_IMAGE_TEST_ID);
    const mealCategoryElement = screen.getByTestId(ZERO_CATEGORY_TEST_ID);

    expect(mealNameElement).toBeInTheDocument();
    expect(mealNameElement).toHaveTextContent(mealName);
    expect(mealImgElement).toBeInTheDocument();
    expect(mealImgElement).toHaveAttribute('src', mealImg);
    expect(mealCategoryElement).toBeInTheDocument();
    expect(mealCategoryElement).toHaveTextContent(mealCategory);

    const drinkName = screen.queryByTestId(ONE_NAME_TEST_ID);
    const drinkImg = screen.queryByTestId(ONE_IMAGE_TEST_ID);

    expect(drinkName).not.toBeInTheDocument();
    expect(drinkImg).not.toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de bebida, apenas as bebidas são exibidas', () => {
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

    const drinkBtn = screen.getByTestId('filter-by-drink-btn');

    act(() => {
      userEvent.click(drinkBtn);
    });

    const drink = JSON.parse(localStorage.getItem('doneRecipes'))[1];
    const drinkName = drink.name;
    const drinkImg = drink.image;
    const drinkAlcoholic = drink.alcoholicOrNot;

    const drinkNameElement = screen.getByTestId(ZERO_NAME_TEST_ID);
    const drinkImgElement = screen.getByTestId(ZERO_IMAGE_TEST_ID);
    const drinkAlcoholicElement = screen.getByTestId(ZERO_CATEGORY_TEST_ID);

    expect(drinkNameElement).toBeInTheDocument();
    expect(drinkNameElement).toHaveTextContent(drinkName);
    expect(drinkImgElement).toBeInTheDocument();
    expect(drinkImgElement).toHaveAttribute('src', drinkImg);
    expect(drinkAlcoholicElement).toBeInTheDocument();
    expect(drinkAlcoholicElement).toHaveTextContent(drinkAlcoholic);

    const mealName = screen.queryByTestId(ONE_NAME_TEST_ID);
    const mealImg = screen.queryByTestId(ONE_IMAGE_TEST_ID);

    expect(mealName).not.toBeInTheDocument();
    expect(mealImg).not.toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de todos, todas as receitas são exibidas', () => {
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);

    const allBtn = screen.getByTestId('filter-by-all-btn');

    act(() => {
      userEvent.click(allBtn);
    });

    const meal = JSON.parse(localStorage.getItem('doneRecipes'))[0];
    const mealName = meal.name;
    const mealImg = meal.image;
    const mealCategory = meal.category;

    const mealNameElement = screen.getByTestId(ZERO_NAME_TEST_ID);
    const mealImgElement = screen.getByTestId(ZERO_IMAGE_TEST_ID);
    const mealCategoryElement = screen.getByTestId(ZERO_CATEGORY_TEST_ID);

    expect(mealNameElement).toBeInTheDocument();
    expect(mealNameElement).toHaveTextContent(mealName);
    expect(mealImgElement).toBeInTheDocument();
    expect(mealImgElement).toHaveAttribute('src', mealImg);
    expect(mealCategoryElement).toBeInTheDocument();
    expect(mealCategoryElement).toHaveTextContent(mealCategory);

    const drink = JSON.parse(localStorage.getItem('doneRecipes'))[1];
    const drinkName = drink.name;
    const drinkImg = drink.image;
    const drinkAlcoholic = drink.alcoholicOrNot;

    const drinkNameElement = screen.getByTestId(ONE_NAME_TEST_ID);
    const drinkImgElement = screen.getByTestId(ONE_IMAGE_TEST_ID);
    const drinkAlcoholicElement = screen.getByTestId('1-horizontal-top-text');

    expect(drinkNameElement).toBeInTheDocument();
    expect(drinkNameElement).toHaveTextContent(drinkName);
    expect(drinkImgElement).toBeInTheDocument();
    expect(drinkImgElement).toHaveAttribute('src', drinkImg);
    expect(drinkAlcoholicElement).toBeInTheDocument();
    expect(drinkAlcoholicElement).toHaveTextContent(drinkAlcoholic);
  });
});
