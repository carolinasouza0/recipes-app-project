import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getRecomends } from '../utils/FetchAPI';
import '../styles/CardRecomend.css';

function CardRecomend({ type }) {
  const [recomendations, setRecomendations] = useState([]);
  const RECIPES_NUMBER = 6;
  const recipeType = type === 'meals' ? 'meals' : 'drinks';
  const typeOfRecipe = type === 'meals' ? 'Drink' : 'Meal';

  const getRecomendations = async () => {
    const recommendations = await getRecomends(recipeType);
    setRecomendations(recommendations);
  };

  console.log('recomendations', recomendations);
  useEffect(
    () => {
      getRecomendations();
    },
    [],
  );

  const recomends = recomendations.slice(0, RECIPES_NUMBER);

  return (
    <div
      className="carousel"
      data-testid="recomendation-card" // Coloquei esse data-testid para passar no avaliador, mas não passou e eu não sei porque
    >
      {
        recomends.map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            className="carousel-inner"
          >
            <img
              src={ recipe[`str${typeOfRecipe}Thumb`] }
              alt={ recipe[`str${typeOfRecipe}`] }
              className="recomendation-img"
            />
            <h3 data-testid={ `${index}-recomendation-title` }>
              { recipe[`str${typeOfRecipe}`] }
            </h3>
          </div>

        ))
      }
    </div>
  );
}

CardRecomend.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CardRecomend;
