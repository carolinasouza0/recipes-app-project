import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
      onClick={ (e) => reaload(e) }
    >
      Logout
    </button>
  );
}

export default BtnLogout;
