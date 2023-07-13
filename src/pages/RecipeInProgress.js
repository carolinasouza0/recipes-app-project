import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { getDetailsRecipe } from '../utils/FetchAPI';
import FavoriteBtn from '../components/FavoriteBtn';
import shareImage from '../images/shareIcon.svg';
import '../styles/RecipeInProgress.css';

function RecipeInProgress({ type }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [completedIngredients, setCompletedIngredients] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const copy = clipboardCopy;
  const history = useHistory();

  const recipeType = type === 'drinks' ? 'drinks' : 'meals';

  const getRecipe = async () => {
    const newRecipe = await getDetailsRecipe(recipeType, id);
    setRecipe(newRecipe);
  };

  const ingredients = recipe.length !== 0 ? Object.keys(recipe[0])
    .filter((key) => key.includes('strIngredient'))
    : [];

  const listIngredients = ingredients
    .filter((e) => recipe[0][e] !== null)
    .filter((ele) => recipe[0][ele].length !== 0);

  const handleShareClick = () => {
    const url = `/${recipeType}/${id}`;
    copy(`http://localhost:3000${url}`);
    setCopyLink(true);
  };

  const handleCheckboxChange = (index) => {
    const updatedIngredients = [...completedIngredients];
    if (completedIngredients.includes(index)) {
      updatedIngredients.splice(updatedIngredients.indexOf(index), 1);
    } else {
      updatedIngredients.push(index);
    }
    setCompletedIngredients(updatedIngredients);

    const allChecked = listIngredients
      .every((ingredient, i) => updatedIngredients.includes(i));
    setAllIngredientsChecked(allChecked);
  };

  const handleFinishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const completedRecipe = { ...recipe[0] };
    doneRecipes.push(completedRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    localStorage.removeItem('inProgressRecipes');

    history.push('/done-recipes');
  };

  useEffect(() => {
    getRecipe();
  }, []);

  useEffect(() => {
    const savedProgress = localStorage.getItem('inProgressRecipes');
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      const savedIngredients = progressData[recipeType][id];
      if (savedIngredients) {
        setCompletedIngredients(savedIngredients);
      }
    }
  }, [recipeType, id]);

  useEffect(() => {
    const progressData = {
      [recipeType]: {
        [id]: completedIngredients,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressData));
  }, [recipeType, id, completedIngredients]);

  return (
    <div>
      <img
        src={ recipe[0]?.strMealThumb || recipe[0]?.strDrinkThumb }
        alt={ recipe[0]?.strMeal || recipe[0]?.strDrink }
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { recipeType }
      </h1>
      <ul>
        {listIngredients.map((ingredient, index) => (
          <li key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              className={ completedIngredients.includes(index) ? 'strikethrough' : '' }
            >
              <input
                type="checkbox"
                onChange={ () => handleCheckboxChange(index) }
                checked={ completedIngredients.includes(index) }
              />
              {`${recipe[0][ingredient]} - ${recipe[0][`strMeasure${index + 1}`]}`}
            </label>
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p data-testid="instructions">{recipe.length !== 0 && recipe[0].strInstructions}</p>
      <div>
        { copyLink && <p>Link copied!</p> }
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShareClick }
        >
          <img
            src={ shareImage }
            alt="share"
          />

        </button>
        <FavoriteBtn
          id={ id }
          type={ type }
          recipe={ recipe }
        />
      </div>

      <h3 data-testid="recipe-category">
        Categoria:
      </h3>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ handleFinishRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeInProgress;
