import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';

const ROUTE_MEALS_ID = '/meals/52771/in-progress';
// const TEST_ID_CHECKBOX = '0-ingredient-checkbox';
const recipeType = 'meals';
const id = '52771';

const ROUTE_DRINKS_ID = '/drinks/178319/in-progress';
const recipeDrinkType = 'drinks';
const drinkId = '178319';

describe('RecipeInProgress', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
  });
  afterEach(() => jest.clearAllMocks());

  test('copia o URL de compartilhamento para a área de transferência e define o estado copyLink como verdadeiro quando o botão de compartilhamento é clicado', async () => {
    const mockCopy = jest.fn();
    global.navigator.clipboard = { writeText: mockCopy };
    act(() => {
      const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
      history.push(ROUTE_MEALS_ID);
    });

    act(() => {
      const shareButton = screen.getByTestId('share-btn');
      userEvent.click(shareButton);
    });

    const url = `/${recipeType}/${id}`;
    expect(mockCopy).toHaveBeenCalledWith(`http://localhost:3000${url}`);

    const copyLinkMessage = screen.getByText('Link copied!');
    expect(copyLinkMessage).toBeInTheDocument();
  });

  test('atualiza o inProgressRecipes no localStorage quando a caixa de seleção é alternada', async () => {
    const savedProgress = {
      meals: {
        [id]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedProgress));

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_MEALS_ID);
    });
    const ingredientCheckbox = await screen.findByRole('checkbox', { name: /penne rigate/i });
    act(() => {
      userEvent.click(ingredientCheckbox);
    });
    expect(ingredientCheckbox).toBeChecked();

    const ingredient = await screen.findByTestId('0-ingredient-step');
    expect(ingredient).toBeInTheDocument();
    expect(ingredient).toHaveClass('strikethrough');

    const updatedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(updatedProgress.meals[id]).toEqual([0]);

    act(() => {
      userEvent.click(ingredientCheckbox);
    });

    expect(ingredientCheckbox).not.toBeChecked();
    expect(updatedProgress.meals[id]).toEqual([0]);

    localStorage.removeItem('inProgressRecipes');
  });

  test('atualiza o estado allIngredientsChecked quando a caixa de seleção é alternada', async () => {
    const savedProgress = {
      meals: {
        52771: [],
      },
    };
    act(() => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(savedProgress));
    });

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_MEALS_ID);
    });
    const ingredientCheckbox = await screen.findByRole('checkbox', { name: /penne rigate/i });
    act(() => {
      userEvent.click(ingredientCheckbox);
    });

    expect(ingredientCheckbox).toBeChecked();
    // expect(ingredientCheckbox.classList.contains('strikethrough')).toBe(false);

    const updatedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(updatedProgress.meals[id]).toEqual([0]);

    act(() => {
      userEvent.click(ingredientCheckbox);
    });

    expect(ingredientCheckbox).not.toBeChecked();
    expect(ingredientCheckbox.classList.contains('strikethrough')).toBe(false);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual(savedProgress);
  });
});

describe('RecipeInProgress', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
  });
  afterEach(() => jest.clearAllMocks());

  test('copia o URL de compartilhamento para a área de transferência e define o estado copyLink como verdadeiro quando o botão de compartilhamento é clicado(drinks)', async () => {
    const mockCopy = jest.fn();
    global.navigator.clipboard = { writeText: mockCopy };
    act(() => {
      const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
      history.push(ROUTE_DRINKS_ID);
    });

    act(() => {
      const shareButton = screen.getByTestId('share-btn');
      userEvent.click(shareButton);
    });

    const url = `/${recipeDrinkType}/${drinkId}`;
    expect(mockCopy).toHaveBeenCalledWith(`http://localhost:3000${url}`);

    const copyLinkMessage = screen.getByText('Link copied!');
    expect(copyLinkMessage).toBeInTheDocument();
  });

  test('atualiza o inProgressRecipes no localStorage quando a caixa de seleção é alternada(drinks)', async () => {
    const savedProgress = {
      drinks: {
        [drinkId]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedProgress));

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_DRINKS_ID);
    });
    const ingredientCheckbox = await screen.findByRole('checkbox', { name: /Hpnotiq/i });
    act(() => {
      userEvent.click(ingredientCheckbox);
    });
    expect(ingredientCheckbox).toBeChecked();

    const ingredient = await screen.findByTestId('0-ingredient-step');
    expect(ingredient).toBeInTheDocument();
    expect(ingredient).toHaveClass('strikethrough');

    const updatedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(updatedProgress.drinks[drinkId]).toEqual([0]);

    act(() => {
      userEvent.click(ingredientCheckbox);
    });

    expect(ingredientCheckbox).not.toBeChecked();
    expect(updatedProgress.drinks[drinkId]).toEqual([0]);

    localStorage.removeItem('inProgressRecipes');
  });
  test('atualiza o estado allIngredientsChecked quando a caixa de seleção é alternada(drinks)', async () => {
    const savedProgress = {
      drinks: {
        178319: [],
      },
    };
    act(() => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(savedProgress));
    });

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_DRINKS_ID);
    });
    const ingredientCheckbox = await screen.findByRole('checkbox', { name: /Hpnotiq/i });
    act(() => {
      userEvent.click(ingredientCheckbox);
    });

    expect(ingredientCheckbox).toBeChecked();
    // expect(ingredientCheckbox.classList.contains('strikethrough')).toBe(false);

    const updatedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(updatedProgress.drinks[drinkId]).toEqual([0]);

    act(() => {
      userEvent.click(ingredientCheckbox);
    });

    expect(ingredientCheckbox).not.toBeChecked();
    expect(ingredientCheckbox.classList.contains('strikethrough')).toBe(false);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toEqual(savedProgress);
  });

  test('Verifica se botão Finish habilita ao clicar em todos checkBox', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    act(() => {
      history.push(ROUTE_DRINKS_ID);
    });

    const ingredientCheckbox1 = await screen.findByRole('checkbox', { name: /Hpnotiq/i });
    const ingredientCheckbox2 = await screen.findByRole('checkbox', { name: /Pineapple Juice/i });
    const ingredientCheckbox3 = await screen.findByRole('checkbox', { name: /Banana Liqueur pwwww/i });

    act(() => {
      userEvent.click(ingredientCheckbox1);
      userEvent.click(ingredientCheckbox2);
      userEvent.click(ingredientCheckbox3);
    });
    expect(screen.getByTestId('finish-recipe-btn')).toBeEnabled();
  });
});
