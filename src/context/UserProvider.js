import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [objInicial, setObjInicial] = useState({
    dataMeals: [],
    dataDrinks: [],
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const store = useMemo(() => ({
    objInicial,
    setObjInicial,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
  }), [email, loading, objInicial, password]);
  return (
    <UserContext.Provider value={ store }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
