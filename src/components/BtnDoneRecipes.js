import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import iconDoneRecipes from '../images/iconDoneRecipes.svg';

function BtnDoneRecipes() {
  const history = useHistory();

  async function reaload(e) {
    e.preventDefault();
    history.push('/done-recipes');
  }
  return (
    <button
      className="rounded-lg flex
      items-center justify-items-center
      w-72 ml-4 mx-2.5 text-xs
      text-[20px] my-5 border-b-4
      text-lightPurple hover:text-darkBlue "
      data-testid="profile-done-btn"
      onClick={ (e) => reaload(e) }
    >
      <img
        className="mr-14"
        data-testid="meals-bottom-btn"
        src={ iconDoneRecipes }
        alt="iconDoneRecipes"
      />
      Done Recipes
    </button>
  );
}

export default BtnDoneRecipes;
