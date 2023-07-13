export const fetchApiInicial = async () => {
  const responseMeals = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  );
  const dataMeals = await responseMeals.json();

  const responseCategoryMeals = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  );
  const dataCategoryMeals = await responseCategoryMeals.json();

  const responseDrinks = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  );
  const dataDrinks = await responseDrinks.json();

  const responseCategoryDrinks = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  );
  const dataCategoryDrinks = await responseCategoryDrinks.json();

  // console.count('fiz o fetch inicial');

  // console.log(dataCategoryMeals.meals);

  const iniObjApi = {
    dataMeals: dataMeals.meals,
    dataCategoryMeals: dataCategoryMeals.meals,
    dataDrinks: dataDrinks.drinks,
    dataCategoryDrinks: dataCategoryDrinks.drinks,
  };

  return iniObjApi;
};
