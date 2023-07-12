import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getDetailsRecipe } from '../utils/FetchAPI';
import CardRecomend from '../components/CardRecomend';

function RecipeDetails({ type }) {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();

  const recipeType = type === 'meals' ? 'meals' : 'drinks';
  const typeOfRecipe = type === 'meals' ? 'Meal' : 'Drink';

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

  const video = () => {
    const url = recipe[0].strYoutube;
    const index = url.indexOf('=');
    const newUrl = url.slice(index + 1);
    return `https://www.youtube.com/embed/${newUrl}`;
  };

  useEffect(() => {
    getRecipe();
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
          <section>
            <CardRecomend type={ recipeType } />
          </section>
        </div>
      )}
    </div>

  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeDetails;
