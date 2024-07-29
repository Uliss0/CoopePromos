import React, { createContext, useState, useContext } from 'react';

const UbicacionContext = createContext();

export const UbicacionProvider = ({ children }) => {
  const [ubicacion, setUbicacion] = React.useState({ lat: -38.71757, lng: -62.26565,zoom:15 });//-38.71757, -62.26565
  const [openMarkers, setOpenMarkers] = useState({});

  const toggleInfoWindow = (key) => {
    setOpenMarkers(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <UbicacionContext.Provider value={{ ubicacion, setUbicacion, openMarkers, toggleInfoWindow }}>
      {children}
    </UbicacionContext.Provider>
  );
};

export const useUbicacion = () => useContext(UbicacionContext);
export { UbicacionContext }; 