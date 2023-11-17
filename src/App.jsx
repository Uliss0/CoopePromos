import React from 'react';
import './App.css';
import './index.css'
import Slider from './components/Slider';
import Header from './components/Header';
import Commerce from './components/Commerce';
import Maps from './components/Maps';




function App() {
  return (
    <div className="App">
     <Header/>
     <Slider/>
     <Maps/>
     <Commerce/>
    </div>
  );
}

export default App;
