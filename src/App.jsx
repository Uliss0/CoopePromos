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
import { CommerceProvider } from './context/CommercesContext';




function App() {
  //celeste #a6c1ee // blanco #f8f9fc // rosa #fbc2eb // bg-gradient-to-t from-[#f8f9fc] to-[#a6c1ee] h-screen[100%]
  return (
    <div className="App  bg-[#e1e4e7] ">
    
     <Header/>
     <Slider/>
     <CommerceProvider>
     <UbicacionProvider>
     <CheckboxProvider>
     <Maps/>
     <Commerce/>
     </CheckboxProvider>
     </UbicacionProvider>
     </CommerceProvider>
    </div>
  );
}

export default App;
