import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getDetailsRecipe } from '../utils/FetchAPI';

function RecipeDetails({ type }) {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();

  const recipeType = type === 'meals' ? 'meals' : 'drinks';

  const getRecipe = async () => {
    const newRecipe = await getDetailsRecipe(recipeType, id);
    setRecipe(newRecipe);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div>
      <p>{ console.log(recipe) }</p>
    </div>
  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeDetails;
