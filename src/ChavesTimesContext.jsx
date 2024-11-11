import React, { createContext, useState } from 'react';

export const ChavesTimesContext = createContext();

export const ChavesTimesProvider = ({ children }) => {
  const [chaves, setChaves] = useState([]);
  const [times, setTimes] = useState([]);

  return (
    <ChavesTimesContext.Provider value={{ chaves, setChaves, times, setTimes }}>
      {children}
    </ChavesTimesContext.Provider>
  );
};