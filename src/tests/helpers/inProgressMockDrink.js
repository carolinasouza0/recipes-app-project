const mockDrinkStorage = () => global.localStorage.setItem('doneRecipes', JSON.stringify([
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '29/09/2022',
    tags: [],
  },
]));

export default mockDrinkStorage;
