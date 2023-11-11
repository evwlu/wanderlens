import './styles/App.css';
import flaynLogo from './assets/flayn_logo.png';

import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'

import PageNotFound from './pages/PageNotFound';
import ProfilePage from './pages/ProfilePage';


const App = () => {
  
  // const [gifts, setGifts] = useState([]);


  // useEffect(() => {
  //   const fetchGifts = async () => {
  //     const response = await fetch('http://localhost:3001/gifts')
  //     const data = await response.json()
  //     setGifts(data)
  //   }
  //   fetchGifts()
  // }, []);


  // Sets up routes

  let element = useRoutes([
    {
      path: "/",
      element:<ProfilePage/>
    },
    {
      path:"/*",
      element: <PageNotFound />
    }
  ]);

  
  return ( 
    <div className="App">
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src={flaynLogo} alt="Flayn Logo"/>
            <h1>WanderLens</h1>
          </div>
          <div className="header-right">
            <Link to="/"><button className="homeBtn"> Home </button></Link>
            <Link to='/new'><button className='addBtn'> See More </button></Link>
          </div>
        </div>
      </header>
      

      {element}

    </div>
  );
}

export default App;