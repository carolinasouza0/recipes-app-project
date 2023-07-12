import React from 'react';
import PropTypes from 'prop-types';

function RecipeInProgress(type) {
  const recipeType = type === 'meals' ? 'meals ' : 'drinks';
  return (
    <div>
      <img
        src="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg"
        alt="recipe"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        Recipe Name
        {' '}
        { recipeType }

      </h1>
      <button
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        data-testid="favorite-btn"
      >
        Favoritar
      </button>

      <p data-testid="recipe-category">
        Categoria:
      </p>
      <p data-testid="instructions">recipe.instructions</p>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeInProgress;
