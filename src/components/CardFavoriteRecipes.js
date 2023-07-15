import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import BtnCompartilhar from './BtnCompartilha';
import BtnFavoritePage from './BtnFavoritePage';

function CardFavoriteRecipes({ listOfRecipes }) {
  return (
    <div>
      {
        listOfRecipes.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                width={ 250 }
              />
            </Link>
            <div>
              {
                recipe.type === 'meal' ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${recipe.nationality} - ${recipe.category}` }
                  </p>
                ) : (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.alcoholicOrNot }
                  </p>
                )
              }
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
              </Link>
            </div>
            <div>
              <BtnCompartilhar
                index={ index }
                type={ recipe.type === 'meal' ? 'meals' : 'drinks' }
                idReference={ recipe.id }
              />
              <BtnFavoritePage
                index={ index }
                type={ recipe.type === 'meal' ? 'meals' : 'drinks' }
                id={ recipe.id }
                receiveRecipe={ [recipe] }
              />
            </div>
          </div>
        ))
      }
    </div>
  );
}

CardFavoriteRecipes.propTypes = {
  listOfRecipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};

export default CardFavoriteRecipes;
