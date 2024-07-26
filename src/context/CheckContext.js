
import React, { createContext, useContext, useState } from 'react';

const CheckboxContext = createContext();

export const CheckboxProvider = ({ children }) => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleCheckbox = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <CheckboxContext.Provider value={{ isChecked, toggleCheckbox }}>
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckbox = () => {
  return useContext(CheckboxContext);
};