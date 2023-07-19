// import { useContext } from 'react';
// import RecipesContext from '../context/RecipesContext';
import PropTypes from 'prop-types';

function BtnFilterAll({ handleFilter }) {
  // const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  // const {
  //   setDoneRecipes,
  // } = useContext(RecipesContext);

  // const handleCleanFilter = () => {
  //   setDoneRecipes(doneRecipesStorage);
  // };

  return (
    <button
      className="rounded-lg bg-lightYellow w-16
      mx-0.5 text-xs hover:bg-darkYellow text-lightPurple p-1"
      data-testid="filter-by-all-btn"
      onClick={ () => handleFilter() }
    >
      All
    </button>

  );
}

BtnFilterAll.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default BtnFilterAll;
