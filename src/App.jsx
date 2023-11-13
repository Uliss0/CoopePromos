import React from 'react';
import './App.css';
import './index.css'
import Slider from './components/Slider';
import Header from './components/Header';
import Commerce from './components/Commerce';


function App() {
  return (
    <div className="App">
     <Header/>
     <Slider/>
     <Commerce/>
    </div>
  );
}

export default App;
