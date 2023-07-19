import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import like from '../images/like.png';

function BtnFavoriteRecipes() {
  const history = useHistory();

  async function reaload(e) {
    e.preventDefault();
    history.push('/favorite-recipes');
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
        className="mr-[50px] w-[40px] "
        data-testid="profile-favorite-btn"
        src={ like }
        alt="like"
      />
      Favorite Recipes
    </button>
  );
}

export default BtnFavoriteRecipes;
