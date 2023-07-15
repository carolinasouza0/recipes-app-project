// import { useContext } from 'react';
// import RecipesContext from '../context/RecipesContext';
import PropTypes from 'prop-types';

function BtnDrinks({ handleFilter }) {
  // const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  // const {
  //   setDoneRecipes,
  // } = useContext(RecipesContext);

  // const filteredDrink = doneRecipesStorage.filter((recipe) => recipe.type === 'drink');

  // const handleFilterDoneDrink = () => {
  //   setDoneRecipes(filteredDrink);
  // };
  return (
    <button
      data-testid="filter-by-drink-btn"
      onClick={ handleFilter }
    >
      Drinks
    </button>
  );
}

BtnDrinks.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default BtnDrinks;
