import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import BtnCompartilhar from './BtnCompartilha';
import BtnFavoritePage from './BtnFavoritePage';

function CardFavoriteRecipes({ listOfRecipes }) {
  return (
    <div
      className="flex flex-col items-center"
    >
      {
        listOfRecipes.map((recipe, index) => (
          <div
            key={ index }
            className="flex justify-center w-11/12 h-44 mb-14
       border-typeGray2 border-2 rounded-lg"
          >
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              className="w-80 h-44"
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                className="w-72 h-[172px] rounded-l-lg"
              />
            </Link>
            <div
              className="
            flex flex-col w-80 h-44 ml-1 p-2"
            >
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
                className="text-typeBlack text-base font-bold no-underline"
              >
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }

                </p>
              </Link>
              {
                recipe.type === 'meal' ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="text-typeGray text-xs"
                  >
                    { `${recipe.nationality} - ${recipe.category}` }
                  </p>
                ) : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="text-typeGray text-xs"
                  >
                    { recipe.alcoholicOrNot }
                  </p>
                )
              }
              <div
                className="flex"
              >
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
