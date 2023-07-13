import BtnDoneRecipes from '../components/BtnDoneRecipes';
import BtnFavoriteRecipes from '../components/BtnFavoriteRecipes';
import BtnLogout from '../components/BtnLogout';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const emailUserstorage = window.localStorage.getItem('user');
  const emailUser = JSON.parse(emailUserstorage);
  // console.log('email', emailUser.email);
  return (
    <div>
      Profile
      <Header title="Profile" />
      <p data-testid="profile-email">{ emailUser.email }</p>
      <Footer />
      <BtnDoneRecipes />
      <BtnFavoriteRecipes />
      <BtnLogout />
    </div>
  );
}

export default Profile;
