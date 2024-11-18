import React, { useContext } from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import BotaoVoltar from "../components/BotaoVoltar";
import BotaoProximoPasso from "../components/BotaoProximoPasso";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { ChavesTimesContext } from '../ChavesTimesContext';

export default function GameScreen1() {
  const { horarioInicio, setHorarioInicio, tempoMedio, setTempoMedio } = useContext(ChavesTimesContext);

  const handleClockClick = () => {
    document.getElementById('time').focus();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <BotaoVoltar />
      <div className="flex justify-center mt-4 space-x-1">
        <div className="w-3 h-3 bg-custom-green-1 rounded-full"></div>
        <div className="w-3 h-3 bg-custom-green-2 rounded-full"></div>
        <div className="w-3 h-3 bg-custom-green-2 rounded-full"></div>
        <div className="w-3 h-3 bg-custom-green-2 rounded-full"></div>
        <div className="w-3 h-3 bg-custom-green-2 rounded-full"></div>
      </div>

      <div className="flex flex-col items-start mt-6">
        <label htmlFor="nomeCampeonato" className="ml-6 text-2xl font-bold mb-2 text-custom-green-2 font-inter">
          Nome do Campeonato:
        </label>
        <div className="flex justify-center w-full">
          <input
            id="nomeCampeonato"
            type="text"
            placeholder="Escreva Aqui!"
            className="w-5/6 p-2 border-2 border-custom-green-2 rounded-xl focus:outline-none focus:border-custom-green-1"
          />
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="flex flex-col items-center bg-custom-green-2 rounded-xl w-11/12 max-w-sm p-3 shadow-md">
          <p className="text-2xl font-semibold text-custom-green-3 mb-2">
            Data do Campeonato:
          </p>
          <div className="flex items-center bg-custom-green-3 rounded-md w-60 px-2 py-1 mt-2 border border-custom-green-2">
            <input
              type="date"
              id="date"
              className="w-full focus:outline-none text-center placeholder:text-custom-green-2 bg-custom-green-3"
              placeholder="Digite a data (ex: 01/01/2023)"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="flex flex-col items-center bg-custom-green-2 rounded-xl w-11/12 max-w-sm p-3 shadow-md">
          <p className="text-2xl font-semibold text-custom-green-3 mb-2">
            Horário de Início:
          </p>
          <div className="flex items-center bg-custom-green-3 rounded-md w-60 px-2 py-1 mt-2 border border-custom-green-2">
            <input
              type="time"
              id="time"
              value={horarioInicio}
              onChange={(e) => setHorarioInicio(e.target.value)}
              className="w-full focus:outline-none text-center placeholder:text-custom-green-2 bg-custom-green-3"
              placeholder="Selecione o horário"
            />
            <span className="text-custom-green-2 ml-2 cursor-pointer" onClick={handleClockClick}>
              <FontAwesomeIcon icon={faClock} />
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="flex flex-col items-center bg-custom-green-2 rounded-xl w-11/12 max-w-sm p-3 shadow-md">
          <p className="text-2xl font-semibold text-custom-green-3 mb-2">
            Duração de Partida:
          </p>
          <div className="flex items-center bg-custom-green-3 rounded-md w-60 px-2 py-1 mt-2 border border-custom-green-2">
            <span className="text-custom-green-2 mr-2">
              <i className="fas fa-hourglass-half"></i>
            </span>
            <input
              type="text"
              value={tempoMedio}
              onChange={(e) => setTempoMedio(e.target.value)}
              placeholder="(Padrão - 30min)"
              className="w-full focus:outline-none bg-custom-green-3 placeholder:text-custom-green-2 text-center"
              inputMode="numeric"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
              }}
            />
          </div>
        </div>
      </div>

      <BotaoProximoPasso nextPage="/gamescreen2" />
      <Footer />
    </div>
  );
}
