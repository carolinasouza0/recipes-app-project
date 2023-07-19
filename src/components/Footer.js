import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/footer.css';

function Footer() {
  return (
    <div
      data-testid="footer"
      className="footerPosition
      rounded-t-lg w-[400px] h-16 m-auto rounded-b-lg bg-lightYellow
      space-x-[300px] m-auto p-2"
    >
      <button
        className="hover:bg-darkYellow rounded-full min-w-max"
      >
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            // src="../images/drinkIcon.svg"
            alt="drinkIcon"
          />
        </Link>
      </button>
      <button
        className="hover:bg-darkYellow rounded-full min-w-max"
      >
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
