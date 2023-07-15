import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import BtnCompartilhar from './BtnCompartilha';

function CardDoneDrinks({ item, index }) {
  const limiteTag = 2;
  // console.log(tags(item));
  return (

    <div key={ index }>
      {
        ` é comida ${item.name}`
      }
      <Link to={ `/drinks/${item.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ item.image }
          alt={ item.image }
          width={ 250 }
        />
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { item.name }
        </p>
      </Link>

      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {` ${item.alcoholicOrNot}`}
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {/* aqui é a data que foi feita */}
        { item.doneDate }
      </p>
      <BtnCompartilhar index={ index } type="drinks" idReference={ item.id } />
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

CardDoneDrinks.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default CardDoneDrinks;
