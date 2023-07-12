const fetchCategoryMeals = async (categorySelect) => {
  const responseCategoryMeals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorySelect}`,
  );
  const dataFilteredCategoryMeals = await responseCategoryMeals.json();

  return dataFilteredCategoryMeals;
};

const fetchCategoryDrinks = async (categorySelect) => {
  const responseCategoryDrinks = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorySelect}`,
  );
  const dataFilteredCategoryDrinks = await responseCategoryDrinks.json();

  return dataFilteredCategoryDrinks;
};

export const fetchCategoryDecide = (categorySelect, routes) => {
  if (routes === 'meals') {
    // console.log('to no meals');
    return fetchCategoryMeals(categorySelect);
  }
  // console.log('to no drinks');
  return fetchCategoryDrinks(categorySelect);
};
