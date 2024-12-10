import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Jogos = () => {
  const { linkAcesso } = useParams();
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/campeonatos/public/${linkAcesso}`)
      .then(response => response.json())
      .then(data => {
        if (data.chaveamento) {
          setJogos(data.chaveamento.flatMap(chave => chave.jogos));
        }
      })
      .catch(error => console.error('Erro ao carregar os jogos:', error));
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
            <p>Time Casa: {jogo.timeCasa.nome}</p>
            <p>Time Visitante: {jogo.timeVisitante.nome}</p>
            <p>Horário: {new Date(jogo.horario).toLocaleString()}</p>
            <p>Placar: {jogo.placar.timeCasa} x {jogo.placar.timeVisitante}</p>
            {jogo.sets && jogo.sets.length > 0 && (
              <div>
                <h4>Sets:</h4>
                {jogo.sets.map((set, index) => (
                  <p key={index}>Set {set.set}: {set.placar.timeCasa} x {set.placar.timeVisitante}</p>
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
