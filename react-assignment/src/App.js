import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Pages/Home';
import WatchList from './Components/Pages/WatchList';
import Movies from './Components/Pages/Movies';

function App() {
  return (
    <>
    <BrowserRouter>
     <Navbar />
     <Switch>
       <Route path='/home' componenet={Home}></Route>
       <Route path='/movies' component={Movies}></Route>
       <Route path='/watchlist' component={WatchList}></Route>
     </Switch>

     
    </BrowserRouter>
    </>
  );
}

export default App;
