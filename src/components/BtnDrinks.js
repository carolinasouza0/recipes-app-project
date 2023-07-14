import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function BtnDrinks() {
  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));

  const {
    setDoneRecipes,
  } = useContext(RecipesContext);

  const filteredDrink = doneRecipesStorage.filter((recipe) => recipe.type === 'drink');

  const handleFilterDoneDrink = () => {
    setDoneRecipes(filteredDrink);
  };
  return (
    <button
      data-testid="filter-by-drink-btn"
      onClick={ handleFilterDoneDrink }
    >
      Drinks
    </button>
  );
}

export default BtnDrinks;
