import { useContext,
} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { validacaoEmail } from '../utils/validacaoEmail';
import UserContext from '../context/UserContext';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
  } = useContext(UserContext);

  const minCharacter = 7;

  const history = useHistory();

  async function saveReaload(e) {
    e.preventDefault();
    window.localStorage.setItem('user', JSON.stringify({ email }));
    // const iniObjApiii = await fetchApiInicial();
    // setObjInicial(iniObjApiii);

    history.push('/meals');
  }

  return (
    <div>
      {
        loading ? <p>Carregando...</p> : (

          <form>
            <label>
              Digite seu email
              <input
                type="email"
                data-testid="email-input"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
              />
            </label>
            <label>
              Digite sua senha
              <input
                type="password"
                data-testid="password-input"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-btn"
              onClick={ (e) => saveReaload(e) }
              disabled={
                (password.length < minCharacter || !validacaoEmail(email))
              }
            >
              Entrar
            </button>
          </form>
        )
      }
    </div>
  );
}

export default Login;
