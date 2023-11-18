import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import flaynLogo from './assets/flayn_logo.png';
import './styles/App.css';

import PageNotFound from './pages/PageNotFound';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import Login from './pages/Login';

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/profile",
      element: <ProfilePage />
    },
    {
      path: "/profile/:id",
      element: <ProfilePage />
    },
    {
      path: "/*",
      element: <PageNotFound />
    }
  ]);

  return (
    <div className="App">
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src={flaynLogo} alt="Flayn Logo" />
            <h1>WanderLens</h1>
          </div>
          <div className="header-right">
            <Link to="/"><button> Home </button></Link>
            <Link to='/profile'><button> Profile </button></Link>
          </div>
        </div>
      </header>

      {element}

    </div>
  );
}

export default App;
