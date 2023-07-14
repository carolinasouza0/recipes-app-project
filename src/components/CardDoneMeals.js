import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import BtnCompartilhar from './BtnCompartilha';

function CardDoneMeals({ item, index }) {
  const limiteTag = 2;
  // const { push } = useHistory();
  const history = useHistory();

  return (
    <div key={ index }>
      {
        ` é comida ${item.name}`
      }
      {/* <Link to={ `/meals/${item.id}` }> */}
      <button
        type="button"
        onClick={ () => history.push(`/meals/${item.id}`) }
        // data-testid={ `${index}-horizontal-image` }

      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ item.image }
          alt={ item.image }
        />
      </button>
      {/* </Link> */}
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {` ${item.nationality} - ${item.category}`}
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { item.name }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { item.doneDate }
      </p>
      <BtnCompartilhar index={ index } type="meals" idReference={ item.id } />
      {
        item.tags.slice(0, limiteTag).map((tag, indexTag) => (
          <p
            key={ indexTag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>
        ))
      }
    </div>
  );
}

CardDoneMeals.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    doneDate: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    doneData: PropTypes.string,
    tags: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default CardDoneMeals;
