import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Jogos = () => {
  const { linkAcesso } = useParams();
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const fetchJogos = async () => {
      try {
        console.log('Iniciando fetch com linkAcesso:', linkAcesso);

        const response = await axios.get(`http://localhost:3000/campeonatos/public/${linkAcesso}`);
        const data = response.data;
        console.log('Dados recebidos da API:', data);

        if (Array.isArray(data.jogos)) {
          setJogos(data.jogos);
        } else {
          console.log('Nenhum jogo encontrado na resposta.');
          setJogos([]);
        }
      } catch (error) {
        console.error('Erro ao carregar os jogos:', error);
      }
    };

    fetchJogos();
  }, [linkAcesso]);


  return (
    <div>
      <h2>Jogos do Campeonato</h2>
      {jogos.length === 0 ? (
        <p>Não há jogos agendados para este campeonato.</p>
      ) : (
        jogos.map(jogo => (
          <div key={jogo.id}>
            <h3>Jogo {jogo.id}</h3>
            <p>Time Casa: {jogo.timeCasaNome}</p>
            <p>Time Visitante: {jogo.timeVisitanteNome}</p>
            <p>Horário: {new Date(jogo.horario).toLocaleString()}</p>
            {jogo.placar ? (
              <p>Placar: {jogo.placar.timeCasa || 0} x {jogo.placar.timeVisitante || 0}</p>
            ) : (
              <p>Placar: Não disponível</p>
            )}
            {jogo.sets && jogo.sets.length > 0 && (
              <div>
                <h4>Sets:</h4>
                {jogo.sets.map((set, index) => (
                  <p key={index}>
                    Set {set.set}: {set.placar.timeCasa} x {set.placar.timeVisitante}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Jogos;
