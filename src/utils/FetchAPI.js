export const fetchApiMeals = async (searchInput, searchType) => {
  if (searchType === 'ingredient') {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`,
    );
    const data = await response.json();
    return data.meals;
  }
  if (searchType === 'name') {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
    );
    const data = await response.json();
    return data.meals;
  }
  if (searchType === 'first-letter') {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`,
    );
    const data = await response.json();
    return data.meals;
  }
};

export const fetchApiDrinks = async (searchInput, searchType) => {
  if (searchType === 'ingredient') {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`,
    );
    const data = await response.json();
    return data.drinks;
  }
  if (searchType === 'name') {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`,
    );
    const data = await response.json();
    return data.drinks;
  }
  if (searchType === 'first-letter') {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`,
    );
    const data = await response.json();
    return data.drinks;
  }
};

export const decideFatch = (searchInput, searchType, routes) => {
  if (routes === 'meals') {
    return fetchApiMeals(searchInput, searchType);
  }
  return fetchApiDrinks(searchInput, searchType);
};

export const getDetailsRecipe = async (type, id) => {
  const url = type === 'meals'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const recipe = type === 'meals'
    ? data.meals
    : data.drinks;
  return recipe;
};
