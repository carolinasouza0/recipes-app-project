import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ id, type, recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const typeOfRecipe = type === 'meals' ? 'Meal' : 'Drink';
  const favoriteType = type === 'meals' ? 'meal' : 'drink';

  const listOfFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'))
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

  const favoriteCondition = () => {
    const condition = listOfFavorites.some((element) => element.id === id);
    setIsFavorite(condition);
  };

  const setFavoriteStorage = () => {
    if (isFavorite === false) {
      const newFavorite = [...listOfFavorites,
        {
          id: recipe[0][`id${typeOfRecipe}`],
          type: favoriteType,
          nationality: favoriteType === 'meal' ? recipe[0]?.strArea : '',
          category: recipe[0] ? recipe[0]?.strCategory : '',
          alcoholicOrNot: favoriteType === 'drink' ? recipe[0]?.strAlcoholic : '',
          name: recipe[0][`str${typeOfRecipe}`],
          image: recipe[0][`str${typeOfRecipe}Thumb`],
        }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    } else {
      const newFavorite = listOfFavorites.filter((element) => element.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    }
  };

  const handleClick = () => {
    setFavoriteStorage();
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    favoriteCondition();
  }, []);

  return (
    <button
      type="button"
      //   data-testid="favorite-btn"
      onClick={ handleClick }
    >
      {isFavorite
        ? (
          <img
            src={ blackHeartIcon }
            alt="favorite"
            data-testid="favorite-btn"
          />)
        : (
          <img
            src={ whiteHeartIcon }
            alt="favorite"
            data-testid="favorite-btn"
          />)}
    </button>
  );
}

FavoriteBtn.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  recipe: PropTypes.arrayOf().isRequired,
};

export default FavoriteBtn;
