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
    >
      Meals
    </button>
  );
}

BtnMeals.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default BtnMeals;
