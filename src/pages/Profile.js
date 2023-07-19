import BtnDoneRecipes from '../components/BtnDoneRecipes';
import BtnFavoriteRecipes from '../components/BtnFavoriteRecipes';
import BtnLogout from '../components/BtnLogout';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const emailUserstorage = JSON.parse(localStorage.getItem('user'));
  // const emailUser = emailUserstorage.email; (o teste da erro quando colocamos o .email, porque eu não sei)

  return (
    <div
      className="flex flex-column items-center"
    >
      <Header title="Profile" />
      <p
        className="text-darkBlue text-xl m-16"
        data-testid="profile-email"
      >
        { emailUserstorage.email }
      </p>
      <div className="flex flex-column items-center">
        <BtnDoneRecipes />
        <BtnFavoriteRecipes />
        <BtnLogout />
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
