import React from 'react';
import WeatherNavbar from './components/WeatherNavbar.jsx';
import WeatherPage from './pages/WeatherPage.jsx';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <div className="App">
      <WeatherNavbar></WeatherNavbar>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={WeatherPage} />
          <Route path="/weather/" component={WeatherPage} />
          <Route path="/favorites/" component={FavoritesPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

