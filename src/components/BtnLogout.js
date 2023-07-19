import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import iconLogout from '../images/iconLogout.svg';

function BtnLogout() {
  const history = useHistory();

  async function reaload(e) {
    e.preventDefault();
    window.localStorage.clear();
    history.push('/');
  }
  return (
    <button
      data-testid="profile-logout-btn"
      className="rounded-lg flex
        items-center justify-items-center
        w-72 ml-4 mx-2.5 text-xs
        text-[20px] my-5 border-b-4
        text-lightPurple hover:text-darkBlue "
      onClick={ (e) => reaload(e) }
    >
      <img
        className="mr-20"
        data-testid="meals-bottom-btn"
        src={ iconLogout }
        alt="iconLogout"
      />
      Logout
    </button>
  );
}

export default BtnLogout;
