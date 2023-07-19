// import { useContext } from 'react';
// import RecipesContext from '../context/RecipesContext';
import PropTypes from 'prop-types';

function BtnMeals({ handleFilter }) {
  // const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  // const {
  //   setDoneRecipes,
  // } = useContext(RecipesContext);

  // const filteredMeals = doneRecipesStorage.filter((recipe) => recipe.type === 'meal');

  // const handleFilterDoneMeal = () => {
  //   setDoneRecipes(filteredMeals);
  // };

  return (
    <button
      data-testid="filter-by-meal-btn"
      onClick={ handleFilter }
      className="rounded-lg bg-lightYellow w-16
      mx-0.5 text-xs hover:bg-darkYellow text-lightPurple p-1"
    >
      Meals
    </button>
  );
}

BtnMeals.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default BtnMeals;
