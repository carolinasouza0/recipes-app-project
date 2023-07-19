import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { useEffect, useState } from 'react';
import { getDetailsRecipe } from '../utils/FetchAPI';
import CardRecomend from '../components/CardRecomend';
import FavoriteBtnDetails from '../components/FavoriteBtnDetails';
import shareImage from '../images/Share.png';
import '../styles/RecipeDetails.css';

function RecipeDetails({ type }) {
  const [recipe, setRecipe] = useState([]);
  const [nameBtn, setNameBtn] = useState('START RECIPE');
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
    // console.log(doneRecipes);
    if (doneRecipes) {
      const doneRecipesArray = JSON.parse(doneRecipes);
      console.log(doneRecipesArray);
      const condition = doneRecipesArray.some((element) => element.id === id);
      setShowBtn(!condition);
    }
  };

  const btnNameCondition = () => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes) {
      const inProgress = JSON.parse(inProgressRecipes);
      if (inProgress && inProgress[recipeType]) {
        const check = Object.keys(inProgress[recipeType])
          .some((element) => element === id);
        if (check) {
          setNameBtn('CONTINUE RECIPE');
        }
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

  const handleClick = () => {
    const url = `/${recipeType}/${id}/in-progress`;
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
  }, []);

  return (
    <div>
      { recipe.length !== 0 && (
        <div className="w-360">
          <div>
            <img
              className="w-full h-56 object-cover brightness-50"
              src={ recipe[0][`str${typeOfRecipe}Thumb`] }
              alt={ recipe[0][`str${typeOfRecipe}`] }
              data-testid="recipe-photo"
            />
          </div>
          <div
            className="h-0"
          >
            <h3
              data-testid="recipe-title"
              className="text-center text-2xl relative font-black
              uppercase -top-32 text-white tracking-widest"
            >
              { recipe[0][`str${typeOfRecipe}`] }
            </h3>
            <h4
              className="text-center text-xl relative font-black
              uppercase -top-32 text-white tracking-widest"
              data-testid="recipe-category"
            >
              { recipe[0].strCategory }
            </h4>
          </div>
          <div
            className="relative -top-52 left-72"
          >
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleShareClick }
              className="mr-3"
            >
              <img
                src={ shareImage }
                alt="share"
                className="w-6 h-6"
              />

            </button>
            <FavoriteBtnDetails
              id={ id }
              type={ type }
              recipe={ recipe }
            />
          </div>
          {
            type === 'drinks' && (
              <h4 data-testid="recipe-category">
                { recipe[0].strAlcoholic }
              </h4>
            )
          }
          {
            copyLink
          && (
            <p
              className="text-white text-sm font-bold relative -top-52 left-60
              rounded-md p-2 bg-darkYellow w-28 h-10 text-center mt-1"
            >
              Link copied!

            </p>
          )
          }
          <h3
            className="text-typeBlack text-xl font-bold ml-6"
          >
            Ingredients:

          </h3>
          <div
            className="flex justify-center"
          >
            <div
              className="w-80 border rounded-md flex items-center"
            >
              <ul
                className="list-disc px-8 py-2"
              >
                { listIngredients.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    className="text-typeBlack text-sm font-normal leading-loose"
                  >
                    {
                      `${recipe[0][ingredient]} - ${recipe[0][`strMeasure${index + 1}`]}`
                    }
                  </li>
                )) }
              </ul>
            </div>
          </div>
          <h3
            className="text-typeBlack text-xl font-bold ml-6 mt-8"
          >
            Instructions:

          </h3>
          <div className="flex justify-center">
            <p
              className="w-80 border rounded-md p-4 text-sm"
              data-testid="instructions"
            >
              { recipe[0].strInstructions }

            </p>
          </div>
          <div
            className="flex justify-center"
          >
            {
              type === 'meals' && (
                <div>
                  <h3 className="text-typeBlack text-xl font-bold mt-6">Video</h3>
                  <iframe
                    data-testid="video"
                    title="video"
                    width="100%"
                    height="315px"
                    src={ video() }
                    className="w-80 h-56 object-cover brightness-50"
                  />
                </div>
              )
            }
          </div>
          <h3 className="text-typeBlack text-xl font-bold ml-6 mt-8">Recommended</h3>
          <section
            className="flex justify-center"
          >
            <CardRecomend type={ recipeType } />
          </section>
          <div
            className="flex justify-center mt-8 mb-4"
          >
            { showBtn && (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="w-80 h-10 bg-darkYellow
              text-white font-bold text-base rounded-md text-center"
                onClick={ handleClick }
              >
                { nameBtn }
              </button>
            ) }
          </div>
        </div>
      )}
    </div>

  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeDetails;
