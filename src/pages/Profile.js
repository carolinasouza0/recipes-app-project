import BtnDoneRecipes from '../components/BtnDoneRecipes';
import BtnFavoriteRecipes from '../components/BtnFavoriteRecipes';
import BtnLogout from '../components/BtnLogout';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const emailUserstorage = localStorage.getItem('user');
  // const emailUser = emailUserstorage.email; (o teste da erro quando colocamos o .email, porque eu não sei)

  return (
    <div>
      <Header title="PROFILE" />
      <p data-testid="profile-email">{ emailUserstorage }</p>
      <Footer />
      <BtnDoneRecipes />
      <BtnFavoriteRecipes />
      <BtnLogout />
    </div>
  );
}

export default Profile;
