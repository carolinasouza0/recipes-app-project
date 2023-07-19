import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import mealIcon from '../images/icone-prato.svg';
import drinkIcon from '../images/icone-bebida.svg';

function Footer() {
  return (
    <div
      data-testid="footer"
      className="fixed bottom-0 flex justify-center w-360 h-12  bg-darkBlue
      space-x-[250px] "
    >
      <button>
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            // src="../images/drinkIcon.svg"
            alt="drinkIcon"
          />
        </Link>
      </button>
      <button>
        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="mealIcon"
          />
        </Link>
      </button>
    </div>
  );
}

export default Footer;
