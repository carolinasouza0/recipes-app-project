import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function BtnFavoritePage({ id, type, index, receiveRecipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { favoriteRenderRecipes, setFavoriteRenderRecipes } = useContext(RecipesContext);
  const favoriteType = type === 'meal' ? 'Meal' : 'Drink';

  const listOfFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

  const favoriteCondition = () => {
    const condition = listOfFavoriteRecipes.some((recipe) => recipe.id === id);
    setIsFavorite(condition);
  };

  useEffect(() => {
    favoriteCondition();
    setFavoriteRenderRecipes(true);
  }, []);

  const setFavoriteStorage = () => {
    if (isFavorite === false) {
      const newFavorite = [...listOfFavoriteRecipes,
        {
          id: receiveRecipe[0][`id${favoriteType}`],
          type: favoriteType.toLowerCase(),
          nationality: type === 'meal' ? receiveRecipe[0].strArea : '',
          category: receiveRecipe[0].strCategory,
          alcoholicOrNot: type === 'drink' ? receiveRecipe[0].strAlcoholic : '',
          name: receiveRecipe[0][`str${favoriteType}`],
          image: receiveRecipe[0][`str${favoriteType}Thumb`],
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    } else {
      const newList = listOfFavoriteRecipes.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
    }
  };

  const handleFavorite = () => {
    setFavoriteStorage();
    setIsFavorite(!isFavorite);
    setFavoriteRenderRecipes(!favoriteRenderRecipes);
    // setFavoriteRenderRecipes(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          src={ blackHeartIcon }
          alt="favorite"
          data-testid={ `${index}-horizontal-favorite-btn` }
          className="w-6 h-6"
        />
      </button>
    </div>
  );
}

BtnFavoritePage.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  receiveRecipe: PropTypes.arrayOf().isRequired,
};

export default BtnFavoritePage;
