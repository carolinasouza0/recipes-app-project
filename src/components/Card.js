import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Card({ item, index, route }) {
  const mealOrDrink = route === 'meals' ? 'Meal' : 'Drink';
  const idRoute = `id${mealOrDrink}`;

  return (
    <Link
      to={ `/${route}/${item[idRoute]}` }
    >
      <div
        data-testid={ `${index}-recipe-card` }
        key={ index }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ item[`str${mealOrDrink}Thumb`] }
          alt={ item[`str${mealOrDrink}Thumb`] }
        />
        <p data-testid={ `${index}-card-name` }>{ item[`str${mealOrDrink}`]}</p>
      </div>
    </Link>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.arrayOf(PropTypes.string).isRequired,
  route: PropTypes.string.isRequired,
};

export default Card;
