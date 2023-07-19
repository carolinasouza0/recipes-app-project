import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import BtnCompartilhar from './BtnCompartilha';

function CardDoneDrinks({ item, index }) {
  const limiteTag = 2;
  // console.log(tags(item));
  return (

    <div
      key={ index }
      className="flex justify-center w-11/12 h-44 mb-14
    border-typeGray2 border-2 rounded-lg"
    >
      <Link
        to={ `/drinks/${item.id}` }
        className="w-80 h-44"
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ item.image }
          alt={ item.image }
          className="w-72 h-[172px] rounded-l-lg"
        />
      </Link>
      <div
        className="flex flex-col w-80 h-44 ml-1 p-2"
      >
        <Link
          to={ `/drinks/${item.id}` }
          className="text-typeBlack text-base font-bold no-underline"
        >
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { item.name }
          </p>
        </Link>
        <p
          data-testid={ `${index}-horizontal-top-text` }
          className="text-typeGray text-xs"
        >
          {` ${item.alcoholicOrNot}`}
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
          className="text-typeBlack text-sm"
        >
          {`Done in: ${item.doneDate}`}
        </p>
        <div
          className="flex space-x-2 justify-center items-center"
        >
          {
            item.tags.slice(0, limiteTag).map((tag, indexTag) => (
              <p
                key={ indexTag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
                className="text-typeGray text-xs  bg-typeGray2 rounded-lg px-2"
              >
                { tag }
              </p>
            ))
          }
        </div>
        <div
          className="relative left-28 -top-1"
        >
          <BtnCompartilhar index={ index } type="drinks" idReference={ item.id } />
        </div>
      </div>

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
