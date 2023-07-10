import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const store = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
  }), [email, password]);
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
