// src/components/IncomeContext.jsx
import React, { createContext, useState } from 'react';

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
  const [income, setIncome] = useState(0);

  return (
    <IncomeContext.Provider value={{ income, setIncome }}>
      {children}
    </IncomeContext.Provider>
  );
};

export default IncomeContext;
