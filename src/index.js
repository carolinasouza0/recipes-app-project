import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import App from './App';
import UserProvider from './context/UserProvider';
import RecipesProvider from './context/RecipesProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <RecipesProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </RecipesProvider>
    </BrowserRouter>,
  );
