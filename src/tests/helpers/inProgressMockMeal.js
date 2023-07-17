const mockMealStorage = () => global.localStorage.setItem('doneRecipes', JSON.stringify([
  {
    id: '52771',
    type: 'meal',
    category: 'Vegetarian',
    nationality: 'Italian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
]));

export default mockMealStorage;
