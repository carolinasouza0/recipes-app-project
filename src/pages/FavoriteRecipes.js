import { useContext, useEffect, useState } from 'react';
import BtnDrinks from '../components/BtnDrinks';
import BtnFilterAll from '../components/BtnFilterAll';
import BtnMeals from '../components/BtnMeals';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import CardFavoriteRecipes from '../components/CardFavoriteRecipes';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { favoriteRenderRecipes } = useContext(RecipesContext);

  const getFavoriteRecipes = () => {
    if (localStorage.getItem('favoriteRecipes')) {
      return JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    return [];
  };

  useEffect(() => {
    setFavoriteRecipes(getFavoriteRecipes());
  }, [favoriteRenderRecipes]);

  const handleAllFilter = () => {
    setFavoriteRecipes(getFavoriteRecipes());
  };

  const handleFilterFavoriteMeal = () => {
    const filteredMeals = getFavoriteRecipes().filter((recipe) => recipe.type === 'meal');
    setFavoriteRecipes(filteredMeals);
  };

  const handleFilterFavoriteDrink = () => {
    const filteredDrink = getFavoriteRecipes()
      .filter((recipe) => recipe.type === 'drink');
    setFavoriteRecipes(filteredDrink);
  };

  return (
    <div>
      <Header title="FAVORITE RECIPES" />
      <div>
        <BtnFilterAll handleFilter={ handleAllFilter } />
        <BtnMeals handleFilter={ handleFilterFavoriteMeal } />
        <BtnDrinks handleFilter={ handleFilterFavoriteDrink } />
      </div>
      <CardFavoriteRecipes listOfRecipes={ favoriteRecipes } />
    </div>

  );
}

export default FavoriteRecipes;
