import React from 'react';
import './App.css';
import './index.css'
import Slider from './components/Slider';
import Header from './components/Header';
import Commerce from './components/Commerce';
import Maps from './components/Maps';
import Nav from './components/Nav';






function App() {
  return (
    <div className="App font-[Poppins] bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen">
    
     <Header/>
     <Slider/>
     <Maps/>
     <Commerce/>
    
    </div>
  );
}

export default App;
