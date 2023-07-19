import { useContext,
} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { validacaoEmail } from '../utils/validacaoEmail';
import UserContext from '../context/UserContext';
import logo from '../images/logoRecipesApp.png';
import tomate from '../images/tomate.png';
import '../styles/Login.css';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(UserContext);

  const minCharacter = 7;

  const history = useHistory();

  async function saveReaload(e) {
    e.preventDefault();
    window.localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/meals');
    // console.log(email);
  }

  return (
    <div className="bg-darkBlue h-96 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center mt-52">
        <img src={ logo } alt="logo" className="h-32 w-auto object-contain" />
        <img src={ tomate } alt="tomate" />
      </div>
      <form>
        <h1 className="title-login">LOGIN</h1>
        <input
          className="input-email"
          type="email"
          placeholder="Email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          className="input-password"
          placeholder="Password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          className={ `btn-login ${password.length < minCharacter
            || !validacaoEmail(email) ? 'bg-lightGray' : 'bg-darkYellow'}` }
          type="submit"
          data-testid="login-submit-btn"
          onClick={ (e) => saveReaload(e) }
          disabled={
            (password.length < minCharacter || !validacaoEmail(email))
          }
        >
          ENTER
        </button>
      </form>

    </div>
  );
}

export default Login;
