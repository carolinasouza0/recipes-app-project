import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesProvider from '../context/RecipesProvider';
import UserProvider from '../context/UserProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <RecipesProvider>
          <UserProvider>
            {component}
          </UserProvider>
        </RecipesProvider>

      </Router>,
    ),
    history,
  });
};

export default renderWithRouter;
