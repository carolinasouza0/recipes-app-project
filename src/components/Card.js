import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Card({ item, index, route }) {
  const mealOrDrink = route === 'meals' ? 'Meal' : 'Drink';

  const idRoute = `id${mealOrDrink}`;

  // console.log(`${index}-recipe-card`);
  return (
    <section
      className="flex m-4 border-solid border-2 border-lightGray rounded-lg shadow-xl max-w-[40%] h-[40%] m-auto"
    >
      <Link
        // href={ `/${route}/${item[idRoute]}` }
        to={ `/${route}/${item[idRoute]}` }
        data-testid={ `${index}-recipe-card` }
      >
        <div
          // data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <img
            className="max-w-[95%] rounded-lg m-auto hover:max-w-[98%] hover:p-0"
            data-testid={ `${index}-card-img` }
            src={ item[`str${mealOrDrink}Thumb`] }
            alt={ item[`str${mealOrDrink}Thumb`] }
            // width="100%"
            // height="315px"
          />
          <p
            className="text-center text-darkBlue no-underline "
            data-testid={ `${index}-card-name` }
          >
            { item[`str${mealOrDrink}`]}
          </p>
        </div>
      </Link>
    </section>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.arrayOf(PropTypes.string).isRequired,
  route: PropTypes.string.isRequired,
};

export default Card;
