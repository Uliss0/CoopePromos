import React from 'react';

export const UbicacionContext = React.createContext();

export const UbicacionProvider = ({ children }) => {
  const [ubicacion, setUbicacion] = React.useState({ lat: 43.64, lng: -79.41,zoom:15 });

  return (
    <UbicacionContext.Provider value={{ ubicacion, setUbicacion }}>
      {children}
    </UbicacionContext.Provider>
  );
};