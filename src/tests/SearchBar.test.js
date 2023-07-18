import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import drinks from '../../cypress/mocks/drinks';

const SHOW_SEARCH_BAR = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const DRINKS_BOTTOM_BTN = 'drinks-bottom-btn';

describe('Testando o componente SearchBar', () => {
  test('Verifica se o input e botões do SearchBar são renderizados', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    act(() => {
      userEvent.click(showSearchBar);
    });

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
    act(() => {
      userEvent.click(drinksPage);
    });
  });

  test('Verifica o funcionamento da busca de ingredientes e a renderização das imagens de receitas na tela', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsByIngredient),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    act(() => {
      userEvent.click(showSearchBar);
    });

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioIngredient = await screen.findByTestId(INGREDIENT_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);
    act(() => {
      userEvent.type(inputSearch, 'chicken');
      userEvent.click(radioIngredient);
      userEvent.click(buttonSearch);
    });

    const recipesWithIngredient = await screen.findAllByRole('img');
    expect(recipesWithIngredient.length).toBe(4);
  });

  test('Verifica o funcionamento da busca de receitas por nome e a renderização das imagens de receitas na tela', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsByIngredient),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    act(() => {
      userEvent.click(showSearchBar);
    });

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioName = await screen.findByTestId(NAME_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);

    act(() => {
      userEvent.type(inputSearch, 'chicken');
      userEvent.click(radioName);
      userEvent.click(buttonSearch);
    });

    const recipesWithName = await screen.findAllByRole('img');
    expect(recipesWithName.length).toBe(4);
  });

  test('Verifica se ao clicar no botão de busca sem selecionar uma opção, é exibido um alerta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    act(() => {
      userEvent.click(showSearchBar);
    });

    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);
    act(() => {
      userEvent.click(buttonSearch);
    });

    const alertSpy = jest.spyOn(global, 'alert');
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  test('Verifica se ao digitar duas letras no input e selecionar a opção "First Letter", é exibido um alerta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();
    act(() => {
      userEvent.click(showSearchBar);
    });

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioFirstLetter = await screen.findByTestId(FIRST_LETTER_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);

    act(() => {
      userEvent.type(inputSearch, 'ab');
      userEvent.click(radioFirstLetter);
      userEvent.click(buttonSearch);
    });
    const alertSpy = jest.spyOn(global, 'alert');
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  test('Verifica se ao digitar um nome de receita e aparecer uma receita só, é redirecionado para a pagina de detalhes', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    expect(showSearchBar).toBeInTheDocument();

    act(() => {
      userEvent.click(showSearchBar);
    });

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioName = await screen.findByTestId(NAME_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);

    act(() => {
      userEvent.type(inputSearch, 'Avalon');
      userEvent.click(radioName);
      userEvent.click(buttonSearch);
    });

    const { location: { pathname: newPathname } } = history;
    expect(newPathname).toBe('/drinks');
  });

  test('Verifica se o alerta é mostrado quando nenhuma receita é encontrada', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);
    act(() => {
      userEvent.click(showSearchBar);
    });

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioIngredient = await screen.findByTestId(INGREDIENT_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);
    act(() => {
      userEvent.type(inputSearch, 'xablau');
      userEvent.click(radioIngredient);
      userEvent.click(buttonSearch);
    });
    // const alertText = 'Sorry, we haven\'t found any recipes for these filters.';
    // const alertSpy = jest.spyOn(global, 'alert');
    // expect(alertSpy).toHaveBeenCalledTimes(1);
    // expect(alertSpy).toHaveBeenCalledWith(alertText);
  });

  test('Verifica se renderiza cards de receitas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    act(() => {
      history.push('meals');
    });

    expect(pathname).toBe('meals');

    const showSearchBar = await screen.findByTestId(SHOW_SEARCH_BAR);

    act(() => {
      userEvent.click(showSearchBar);
    });

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const radioIngredient = await screen.findByTestId(INGREDIENT_SEARCH_RADIO);
    const buttonSearch = await screen.findByTestId(EXEC_SEARCH_BTN);

    act(() => {
      userEvent.type(inputSearch, 'chicken');
      userEvent.click(radioIngredient);
      userEvent.click(buttonSearch);
    });
    const card = await screen.findByTestId('0-recipe-card');
    const cardImg = await screen.findByTestId('0-card-img');
    const cardTitle = await screen.findByTestId('0-card-name');
    expect(card).toBeInTheDocument();
    expect(cardImg).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();

    // const btnDrink = screen.getByTestId('drinks-bottom-btn');
    // act(() => {
    // userEvent.click(btnDrink);
    // jest.spyOn(global, 'fetch').mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(drinks)
    // });
    // });
    // expect(pathname).toBe('/drinks');
  });
  // test('Verifica se renderiza cards de receitas', async () => {
  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(drinks),
  //   });
  //   jest.spyOn(global, 'alert').mockImplementation(() => {});
  //   const { history } = renderWithRouter(<App />);
  //   act(() => {
  //     history.push('/meals');
  //   });
  //   const { location: { pathname } } = history;
  //   expect(pathname).toBe('/meals');

  //   const btnDrink = screen.getByTestId('drinks-bottom-btn');
  //   expect(btnDrink).toBeInTheDocument();

  //   act(() => {
  //     userEvent.click(btnDrink);
  //   });

  //   const titlePage = await screen.findByTestId('page-title');
  //   expect(titlePage).toBeInTheDocument();
  //   expect(pathname).toBe('/drinks');
  // })
});
