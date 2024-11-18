import React, { createContext, useState } from 'react';

export const ChavesTimesContext = createContext();

export const ChavesTimesProvider = ({ children }) => {
  const [chaves, setChaves] = useState([]);
  const [times, setTimes] = useState([]);
  const [horarioInicio, setHorarioInicio] = useState('08:00'); // Exemplo de horário de início
  const [tempoMedio, setTempoMedio] = useState(30); // Exemplo de tempo médio em minutos

  return (
    <ChavesTimesContext.Provider value={{ chaves, setChaves, times, setTimes, horarioInicio, setHorarioInicio, tempoMedio, setTempoMedio }}>
      {children}
    </ChavesTimesContext.Provider>
  );
};