export const fetchApiInicial = async () => {
  const responseMeals = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  );
  const dataMeals = await responseMeals.json();

  const responseDrinks = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  );
  const dataDrinks = await responseDrinks.json();

  console.count('fiz o fetch inicial');

  console.log(dataMeals);

  const iniObjApi = {
    dataMeals: dataMeals.meals,
    // dataMeals: responseMeals.meals,
    dataDrinks: dataDrinks.drinks,
    // dataDrinks: responseDrinks.drinks,
  };

  return iniObjApi;
};
