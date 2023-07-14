import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function BtnMeals() {
  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  const {
    setDoneRecipes,
  } = useContext(RecipesContext);

  const filteredMeals = doneRecipesStorage.filter((recipe) => recipe.type === 'meal');

  const handleFilterDoneMeal = () => {
    setDoneRecipes(filteredMeals);
  };

  return (
    <button
      data-testid="filter-by-meal-btn"
      onClick={ handleFilterDoneMeal }
    >
      Meals
    </button>
  );
}

export default BtnMeals;
