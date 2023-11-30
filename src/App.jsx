import React from 'react';
import './App.css';
import './index.css'
import Slider from './components/Slider';
import Header from './components/Header';
import Commerce from './components/Commerce';
import Maps from './components/Maps';
import { CheckboxProvider } from './context/CheckContext';
import { UbicacionProvider } from './context/UbicacionContext';
//import Dropdown from './components/Dropdown';




function App() {
  return (
    <div className="App  bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen[100%]">
    
     <Header/>
     <Slider/>
     <UbicacionProvider>
     <CheckboxProvider>
     <Maps/>
     <Commerce/>
     </CheckboxProvider>
     </UbicacionProvider>
    </div>
  );
}

export default App;
