import React from 'react';

export const UbicacionContext = React.createContext();

export const UbicacionProvider = ({ children }) => {
  const [ubicacion, setUbicacion] = React.useState({ lat: -38.71757, lng: -62.26565,zoom:15 });//-38.71757, -62.26565

  return (
    <UbicacionContext.Provider value={{ ubicacion, setUbicacion }}>
      {children}
    </UbicacionContext.Provider>
  );
};