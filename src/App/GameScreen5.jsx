import React, { useContext, useState, useEffect, useCallback } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BotaoVoltar from "../components/BotaoVoltar";
import { ChavesTimesContext } from "../CampeonatoContext";
import { dividirTimes } from "../components/utils";

export default function GameScreen5() {
  const { chaves, times, tempoMedio, dataCampeonato, horarioInicio, saveCampeonato } = useContext(ChavesTimesContext);
  const [jogos, setJogos] = useState([]);

  const gerarJogos = useCallback(() => {
    const jogosGerados = [];
    const timesDivididos = dividirTimes(times, chaves.length);
    let horarioAtual = new Date(`${dataCampeonato}T${horarioInicio}:00`);

    for (let i = 0; i < timesDivididos.length; i++) {
      for (let j = 0; j < timesDivididos[i].length; j++) {
        for (let k = j + 1; k < timesDivididos[i].length; k++) {
          jogosGerados.push({
            horario: new Date(horarioAtual),
            time1: timesDivididos[i][j],
            time2: timesDivididos[i][k],
          });
          horarioAtual.setMinutes(horarioAtual.getMinutes() + tempoMedio);
        }
      }
    }

    jogosGerados.push({
      horario: new Date(horarioAtual),
      time1: `Vencedor da ${chaves[0]}`,
      time2: `Segundo da ${chaves[1]}`,
    });
    horarioAtual.setMinutes(horarioAtual.getMinutes() + tempoMedio);

    jogosGerados.push({
      horario: new Date(horarioAtual),
      time1: `Vencedor da ${chaves[1]}`,
      time2: `Segundo da ${chaves[0]}`,
    });
    horarioAtual.setMinutes(horarioAtual.getMinutes() + tempoMedio);

    jogosGerados.push({
      horario: new Date(horarioAtual),
      time1: "Perdedor da Semifinal 1",
      time2: "Perdedor da Semifinal 2",
    });
    horarioAtual.setMinutes(horarioAtual.getMinutes() + tempoMedio);

    jogosGerados.push({
      horario: new Date(horarioAtual),
      time1: "Vencedor da Semifinal 1",
      time2: "Vencedor da Semifinal 2",
    });

    setJogos(jogosGerados);
  }, [chaves, dataCampeonato, horarioInicio, tempoMedio, times]);

  useEffect(() => {
    gerarJogos();
  }, [gerarJogos]);

  const handleAdicionarJogo = (index) => {
    const novoJogo = {
      horario: new Date(),
      time1: "",
      time2: "",
    };
    const novosJogos = [...jogos];
    novosJogos.splice(index, 0, novoJogo);
    setJogos(novosJogos);
  };

  const handleRemoverJogo = (index) => {
    const novosJogos = jogos.filter((_, i) => i !== index);
    setJogos(novosJogos);
  };

  const handleFinalizarCampeonato = async () => {
    try {
      await saveCampeonato(jogos);
      console.log("Campeonato e jogos salvos com sucesso!");
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
          <div className="w-3 h-3 bg-custom-green-2 rounded-full"></div>
        </div>

        <div className="flex justify-center mt-10">
          <h1 className="text-3xl font-bold text-custom-green-2">Tabela de Jogos</h1>
        </div>

        <div className="flex flex-col items-center mt-10 w-5/6 mx-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Horário Previsto</th>
                <th className="px-4 py-2">Time 1</th>
                <th className="px-4 py-2">Time 2</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {jogos.map((jogo, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{jogo.horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="border px-4 py-2">{jogo.time1}</td>
                  <td className="border px-4 py-2">{jogo.time2}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleRemoverJogo(index)} className="text-red-500">Remover</button>
                    <button onClick={() => handleAdicionarJogo(index)} className="text-blue-500 ml-2">Adicionar</button>
                  </td>
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