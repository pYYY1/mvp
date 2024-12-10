import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { dividirTimes } from './components/utils'; 

export const ChavesTimesContext = createContext();

export const ChavesTimesProvider = ({ children }) => {
  const { user } = useContext(UserContext); 
  const [nomeCampeonato, setNomeCampeonato] = useState('');
  const [dataCampeonato, setDataCampeonato] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('08:00'); 
  const [tempoMedio, setTempoMedio] = useState(30);
  const [chaves, setChaves] = useState([]);
  const [times, setTimes] = useState([]);
  const [organizadorId, setOrganizadorId] = useState('');

  useEffect(() => {
    if (user && user.id) {
      setOrganizadorId(user.id);
    }
  }, [user]);

  console.log('User:', user);
  console.log('Organizador ID:', organizadorId);

  const saveCampeonato = async (jogos) => {
    try {
      const timesDivididos = dividirTimes(times, chaves.length);
      const data = {
        nome: nomeCampeonato,
        dataCampeonato,
        horarioInicio: new Date(`${dataCampeonato}T${horarioInicio}:00`), 
        duracaoPartida: Number(tempoMedio), 
        organizadorId,
        chaveamentos: chaves,
        times: timesDivididos,
        jogos
      };
      console.log('Dados enviados:', data);
      await axios.post('http://localhost:3000/campeonatos', data);
      console.log('Campeonato salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados do campeonato:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return (
    <ChavesTimesContext.Provider value={{
      nomeCampeonato, setNomeCampeonato,
      dataCampeonato, setDataCampeonato,
      horarioInicio, setHorarioInicio,
      tempoMedio, setTempoMedio,
      chaves, setChaves,
      times, setTimes,
      organizadorId, setOrganizadorId,
      saveCampeonato
    }}>
      {children}
    </ChavesTimesContext.Provider>
  );
};