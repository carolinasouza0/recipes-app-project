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