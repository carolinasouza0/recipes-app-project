import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { getDetailsRecipe } from '../utils/FetchAPI';
import FavoriteBtn from '../components/FavoriteBtnDetails';
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
  const typeOfRecipe = type === 'meals' ? 'Meal' : 'Drink';
  const favoriteType = type === 'meals' ? 'meal' : 'drink';

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

  const listDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

  const handleShareClick = () => {
    const url = `/${recipeType}/${id}`;
    copy(`http://localhost:3000${url}`);
    setCopyLink(true);
  };

  const handleCheckboxChange = (index, recipeId) => {
    const updatedIngredients = [...completedIngredients];
    if (completedIngredients.includes(index)) {
      updatedIngredients.splice(updatedIngredients.indexOf(index), 1);
    } else {
      updatedIngredients.push(index);
    }
    const allChecked = listIngredients
      .every((ingredient, i) => updatedIngredients.includes(i));

    setAllIngredientsChecked(allChecked);
    setCompletedIngredients(updatedIngredients);

    const savedProgress = localStorage.getItem('inProgressRecipes');
    const progressData = savedProgress ? JSON.parse(savedProgress) : {};

    progressData[recipeType] = {
      ...(progressData[recipeType] || {}),
      [recipeId]: updatedIngredients,
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(progressData));
  };

  const handleFinishRecipe = () => {
    // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const completedRecipe = [...listDoneRecipes,
      {
        id: recipe[0][`id${typeOfRecipe}`],
        type: favoriteType,
        nationality: favoriteType === 'meal' ? recipe[0]?.strArea : '',
        category: recipe[0] ? recipe[0]?.strCategory : '',
        alcoholicOrNot: favoriteType === 'drink' ? recipe[0]?.strAlcoholic : '',
        name: recipe[0][`str${typeOfRecipe}`],
        image: recipe[0][`str${typeOfRecipe}Thumb`],
        doneDate: new Date(),
        tags: recipe[0].strTags ? recipe[0].strTags.split(',') : [],
      }];
    // doneRecipes.push(completedRecipe);

    localStorage.setItem('doneRecipes', JSON.stringify(completedRecipe));
    localStorage.removeItem('inProgressRecipes');
    console.log(completedRecipe);
    history.push('/done-recipes');
  };

  useEffect(() => {
    getRecipe();
  }, []);

  useEffect(() => {
    const savedProgress = localStorage.getItem('inProgressRecipes');
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      const savedIngredients = progressData[recipeType] && progressData[recipeType][id];
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
      <div>
        <img
          className="w-full h-56 object-cover brightness-50"
          src={ recipe[0]?.strMealThumb || recipe[0]?.strDrinkThumb }
          alt={ recipe[0]?.strMeal || recipe[0]?.strDrink }
          data-testid="recipe-photo"
        />
      </div>
      <h3
        className="text-center text-2xl relative font-black
              uppercase -top-32 text-white tracking-widest"
        data-testid="recipe-title"
      >
        { recipe[0]?.strMeal || recipe[0]?.strDrink }
      </h3>
      <ul>
        {listIngredients.map((ingredient, index) => (
          <li key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              className={ completedIngredients.includes(index) ? 'strikethrough' : '' }
            >
              <input
                type="checkbox"
                data-testid={ `${index}-ingredient-checkbox` }
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
