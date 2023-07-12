import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

const SHOW_SEARCH_BAR = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const DRINKS_BOTTOM_BTN = 'drinks-bottom-btn';

describe('Testando o componente SearchBar', () => {
  test('Verifica se o input e botões do SearchBar são renderizados', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    userEvent.click(showSearchBar);

    const searchInput = await screen.findByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    const radioIngredient = await screen.findByTestId(INGREDIENT_SEARCH_RADIO);
    expect(radioIngredient).toBeInTheDocument();

    const radioName = await screen.findByTestId(NAME_SEARCH_RADIO);
    expect(radioName).toBeInTheDocument();

    const radioFirstLetter = await screen.findByTestId(FIRST_LETTER_SEARCH_RADIO);
    expect(radioFirstLetter).toBeInTheDocument();

    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);
    expect(buttonSearch).toBeInTheDocument();

    const drinksPage = await screen.findByTestId(DRINKS_BOTTOM_BTN);
    expect(drinksPage).toBeInTheDocument();
    userEvent.click(drinksPage);
  });

  test('Verifica o funcionamento da busca de ingredientes e a renderização das imagens de receitas na tela', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsByIngredient),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    userEvent.click(showSearchBar);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioIngredient = await screen.findByTestId(INGREDIENT_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioIngredient);
    userEvent.click(buttonSearch);

    const recipesWithIngredient = await screen.findAllByRole('img');
    expect(recipesWithIngredient.length).toBe(4);
  });

  test('Verifica o funcionamento da busca de receitas por nome e a renderização das imagens de receitas na tela', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsByIngredient),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    userEvent.click(showSearchBar);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioName = await screen.findByTestId(NAME_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    const recipesWithName = await screen.findAllByRole('img');
    expect(recipesWithName.length).toBe(4);
  });

  test('Verifica se ao clicar no botão de busca sem selecionar uma opção, é exibido um alerta', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    userEvent.click(showSearchBar);

    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);

    userEvent.click(buttonSearch);

    const alertSpy = jest.spyOn(global, 'alert');
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  test('Verifica se ao digitar duas letras no input e selecionar a opção "First Letter", é exibido um alerta', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    userEvent.click(showSearchBar);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioFirstLetter = await screen.findByTestId(FIRST_LETTER_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'ab');
    userEvent.click(radioFirstLetter);
    userEvent.click(buttonSearch);
    const alertSpy = jest.spyOn(global, 'alert');
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  test('Verifica se ao digitar um nome de receita e aparecer uma receita só, é redirecionado para a pagina de detalhes', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push('/drinks');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    userEvent.click(showSearchBar);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioName = await screen.findByTestId(NAME_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);

    userEvent.type(inputSearch, 'Avalon');

    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    const { location: { pathname: newPathname } } = history;
    expect(newPathname).toBe('/drinks');
  });

  test('Verifica se o alerta é mostrado quando nenhuma receita é encontrada', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    userEvent.click(showSearchBar);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioIngredient = await screen.findByTestId(INGREDIENT_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);
    act(() => {
      userEvent.type(inputSearch, 'xablau');
      userEvent.click(radioIngredient);
      userEvent.click(buttonSearch);
    });
    const alertText = 'Sorry, we haven\'t found any recipes for these filters.';
    const alertSpy = jest.spyOn(global, 'alert');
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith(alertText);
  });

  test('Verifica se renderiza cards de receitas', async () => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    userEvent.click(showSearchBar);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioIngredient = await screen.findByTestId(INGREDIENT_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);
    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioIngredient);
    userEvent.click(buttonSearch);
    const card = await screen.findByTestId('0-recipe-card');
    const cardImg = await screen.findByTestId('0-card-img');
    const cardTitle = await screen.findByTestId('0-card-name');
    expect(card).toBeInTheDocument();
    expect(cardImg).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
  });
});
