import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './Components/Pages/Home';
import WatchList from './Components/Pages/WatchList';
import Movies from './Components/Pages/Movies';


function App() {
  return (
    <>
    <BrowserRouter>
     <Navbar />
     
       <Route exact path='/' componenet={Home}/>
       <Route exact path='/movies' component={Movies}/>
       <Route exact path='/watchlist' component={WatchList}/>
     

     
    </BrowserRouter>
    </>
  );
}

export default App;
