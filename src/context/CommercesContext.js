import React from 'react';

export const CommercesContext = React.createContext();

export const CommerceProvider = ({ children }) => {
  const [comercios, setComercios] = React.useState({ id: "",
    nomComercio: "",
    localidad: "",
    rubro: "",
    direccion: "",
    dto: "",
    provincia: "",
    latitud: "",
    longitud: "",
    telefono: "",
    prefijo: "", });

  return (
    <CommercesContext.Provider value={{ comercios, setComercios }}>
      {children}
    </CommercesContext.Provider>
  );
};