import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BotaoVoltar from "../components/BotaoVoltar";
import { ChavesTimesContext } from "../CampeonatoContext";
import { dividirTimes } from "../components/utils";

export default function GameScreen5() {
  const { chaves, times, tempoMedio, dataCampeonato, horarioInicio, saveCampeonato } = useContext(ChavesTimesContext);
  const [jogos, setJogos] = useState([]);
  const navigate = useNavigate();

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const evitarConfrontosConsecutivos = (jogos) => {
    for (let i = 1; i < jogos.length; i++) {
      if (jogos[i].time1 === jogos[i - 1].time1 || jogos[i].time1 === jogos[i - 1].time2 || jogos[i].time2 === jogos[i - 1].time1 || jogos[i].time2 === jogos[i - 1].time2) {
        if (i + 1 < jogos.length) {
          [jogos[i], jogos[i + 1]] = [jogos[i + 1], jogos[i]];
        }
      }
    }
  };

  const gerarJogos = useCallback(() => {
    const jogosGerados = [];
    const timesDivididos = dividirTimes(times, chaves.length);

    for (let i = 0; i < timesDivididos.length; i++) {
      for (let j = 0; j < timesDivididos[i].length; j++) {
        for (let k = j + 1; k < timesDivididos[i].length; k++) {
          jogosGerados.push({
            time1: timesDivididos[i][j],
            time2: timesDivididos[i][k],
          });
        }
      }
    }

    shuffleArray(jogosGerados);

    evitarConfrontosConsecutivos(jogosGerados);

    const jogosEspeciais = [
      {
        time1: `Vencedor da ${chaves[0]}`,
        time2: `Segundo da ${chaves[1]}`,
      },
      {
        time1: `Vencedor da ${chaves[1]}`,
        time2: `Segundo da ${chaves[0]}`,
      },
      {
        time1: "Perdedor da Semifinal 1",
        time2: "Perdedor da Semifinal 2",
      },
      {
        time1: "Vencedor da Semifinal 1",
        time2: "Vencedor da Semifinal 2",
      },
    ];

    const todosJogos = [...jogosGerados, ...jogosEspeciais];

    let horarioAtual = new Date(`${dataCampeonato}T${horarioInicio}:00`);
    const jogosComHorarios = todosJogos.map((jogo) => {
      const jogoComHorario = {
        ...jogo,
        horario: new Date(horarioAtual),
      };

      horarioAtual.setMinutes(horarioAtual.getMinutes() + Number(tempoMedio));
      if (horarioAtual.getHours() >= 24) {
        horarioAtual.setDate(horarioAtual.getDate() + 1);
        horarioAtual.setHours(0);
        horarioAtual.setMinutes(0);
      }
      return jogoComHorario;
    });

    jogosComHorarios.sort((a, b) => a.horario - b.horario);

    setJogos(jogosComHorarios);
  }, [chaves, dataCampeonato, horarioInicio, tempoMedio, times]);

  useEffect(() => {
    gerarJogos();
  }, [gerarJogos]);

  const handleFinalizarCampeonato = async () => {
    try {
      await saveCampeonato(jogos);
      console.log("Campeonato e jogos salvos com sucesso!");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Erro ao finalizar campeonato:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-inter">
      <Header />
      <div className="flex-grow">
        <BotaoVoltar />
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-3 h-3 bg-custom-green-1 rounded-full"></div>
          <div className="w-3 h-3 bg-custom-green-1 rounded-full"></div>
          <div className="w-3 h-3 bg-custom-green-1 rounded-full"></div>
          <div className="w-3 h-3 bg-custom-green-1 rounded-full"></div>
          <div className="w-3 h-3 bg-custom-green-1 rounded-full"></div>
        </div>

        <div className="flex justify-center mt-10">
          <h1 className="text-3xl font-bold text-custom-green-2">Tabela de Jogos:</h1>
        </div>

        <div className="flex flex-col items-center mt-10 w-5/6 mx-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Horário Previsto</th>
                <th className="px-4 py-2">Time 1</th>
                <th className="px-4 py-2">Time 2</th>
              </tr>
            </thead>
            <tbody>
              {jogos.map((jogo, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{jogo.horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="border px-4 py-2">{jogo.time1}</td>
                  <td className="border px-4 py-2">{jogo.time2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="text-custom-green-1 bg-white border-2 border-custom-green-1 hover:bg-custom-green-2 focus:outline-none font-bold rounded-3xl text-lg px-6 py-3 transition-transform duration-200 hover:scale-105 active:scale-95"
            onClick={handleFinalizarCampeonato}
          >
            Finalizar Campeonato
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
