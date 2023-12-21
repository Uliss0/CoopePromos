import React from 'react';

export const CommercesContext = React.createContext();

export const CommerceProvider = ({ children }) => {
  const [comercios, setComercios] = React.useState([]);

  return (
    <CommercesContext.Provider value={{ comercios, setComercios }}>
      {children}
    </CommercesContext.Provider>
  );
};