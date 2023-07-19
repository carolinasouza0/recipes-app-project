import { useContext,
} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { validacaoEmail } from '../utils/validacaoEmail';
import UserContext from '../context/UserContext';
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
    <div className="bg-darkBlue h-96">
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
          className="btn-login"
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
