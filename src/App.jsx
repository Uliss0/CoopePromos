import React from 'react';
import './App.css';
import './index.css'
import Slider from './components/Slider';
import Header from './components/Header';
import Commerce from './components/Commerce';
import Maps from './components/Maps';
import Footer from './components/Footer';
//import Dropdown from './components/Dropdown';
import Card from './components/Card';



function App() {
  return (
    <div className="App  bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen[100%]">
    
     <Header/>
     <Slider/>
     <Commerce/>
     <Maps/>
     <Card/>
     <Footer/>
    
    </div>
  );
}

export default App;
