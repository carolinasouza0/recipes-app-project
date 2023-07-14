import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function BtnFilterAll() {
  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  const {
    setDoneRecipes,
  } = useContext(RecipesContext);

  const handleCleanFilter = () => {
    setDoneRecipes(doneRecipesStorage);
  };

  return (
    <button
      data-testid="filter-by-all-btn"
      onClick={ () => handleCleanFilter() }
    >
      All
    </button>
  );
}

export default BtnFilterAll;
