import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { useEffect, useState } from 'react';
import { getDetailsRecipe } from '../utils/FetchAPI';
import CardRecomend from '../components/CardRecomend';
import '../styles/RecipeDetails.css';
import FavoriteBtn from '../components/FavoriteBtn';
import shareImage from '../images/shareIcon.svg';

function RecipeDetails({ type }) {
  const [recipe, setRecipe] = useState([]);
  const [nameBtn, setNameBtn] = useState('Start Recipe');
  const [showBtn, setShowBtn] = useState(true);
  const [copyLink, setCopyLink] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const copy = clipboardCopy;

  const recipeType = type === 'meals' ? 'meals' : 'drinks';
  const typeOfRecipe = type === 'meals' ? 'Meal' : 'Drink';

  const getRecipe = async () => {
    const newRecipe = await getDetailsRecipe(recipeType, id);
    setRecipe(newRecipe);
  };

  const btnCondition = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      const condition = doneRecipes.json().some((element) => element.id === id);
      setShowBtn(!condition);
    }
  };

  const btnNameCondition = () => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes) {
      const inProgress = JSON.parse(inProgressRecipes);
      const check = Object.keys(inProgress[recipeType])
        .some((element) => element === id);
      if (check) {
        setNameBtn('Continue Recipe');
      }
    }
  };

  const ingredients = recipe.length !== 0 ? Object.keys(recipe[0])
    .filter((key) => key.includes('strIngredient'))
    : [];

  const listIngredients = ingredients
    .filter((e) => recipe[0][e] !== null)
    .filter((ele) => recipe[0][ele].length !== 0);

  const video = () => {
    const url = recipe[0].strYoutube;
    const index = url.indexOf('=');
    const newUrl = url.slice(index + 1);
    return `https://www.youtube.com/embed/${newUrl}`;
  };
  console.log(recipeType);

  const handleClick = () => {
    const url = `/${recipeType}/${id}/in-progress`;
    console.log(url);
    history.push(url);
  };

  const handleShareClick = () => {
    const url = `/${recipeType}/${id}`;
    copy(`http://localhost:3000${url}`);
    setCopyLink(true);
  };

  useEffect(() => {
    getRecipe();
    btnCondition();
    btnNameCondition();
    console.log(recipe);
  }, []);

  return (
    <div>
      { recipe.length !== 0 && (
        <div>

          <img
            src={ recipe[0][`str${typeOfRecipe}Thumb`] }
            alt={ recipe[0][`str${typeOfRecipe}`] }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{ recipe[0][`str${typeOfRecipe}`] }</h3>
          <h4 data-testid="recipe-category">
            { recipe[0].strCategory }
          </h4>
          {
            type === 'drinks' && (
              <h4 data-testid="recipe-category">
                { recipe[0].strAlcoholic }
              </h4>
            )
          }
          <h3>Ingredients:</h3>
          <ul>
            { listIngredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${recipe[0][ingredient]} - ${recipe[0][`strMeasure${index + 1}`]}` }
              </li>
            )) }
          </ul>
          <h3>Instructions:</h3>
          <p data-testid="instructions">{ recipe[0].strInstructions }</p>
          {
            type === 'meals' && (
              <iframe
                data-testid="video"
                title="video"
                width="100%"
                height="315px"
                src={ video() }
              />
            )
          }
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
          <section>
            <CardRecomend type={ recipeType } />
          </section>
          { showBtn && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ handleClick }
            >
              { nameBtn }
            </button>
          ) }
        </div>
      )}
    </div>

  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeDetails;
