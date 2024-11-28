import React, { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContext'; // Importe o UserContext

export const ChavesTimesContext = createContext();

export const ChavesTimesProvider = ({ children }) => {
  const { user } = useContext(UserContext); 
  const [nomeCampeonato, setNomeCampeonato] = useState('');
  const [dataCampeonato, setDataCampeonato] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('08:00'); 
  const [tempoMedio, setTempoMedio] = useState(30);
  const [chaves, setChaves] = useState([]);
  const [times, setTimes] = useState([]);
  const [organizadorId, setOrganizadorId] = useState(user?.id || ''); 

  return (
    <ChavesTimesContext.Provider value={{
      nomeCampeonato, setNomeCampeonato,
      dataCampeonato, setDataCampeonato,
      horarioInicio, setHorarioInicio,
      tempoMedio, setTempoMedio,
      chaves, setChaves,
      times, setTimes,
      organizadorId, setOrganizadorId 
    }}>
      {children}
    </ChavesTimesContext.Provider>
  );
};