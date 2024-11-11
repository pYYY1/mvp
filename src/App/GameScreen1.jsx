import React from 'react';
import Footer from "../components/Footer"; 
import Header from "../components/Header";
import BotaoVoltar from "../components/BotaoVoltar";
import BotaoProximoPasso from "../components/BotaoProximoPasso";

export default function GameScreen1() {
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
        <label
          htmlFor="nomeCampeonato"
          className="ml-6 text-2xl font-bold mb-2 text-custom-green-2 font-inter"
        >
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
            <span className="text-custom-green-2 mr-2">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              type="date"
              className="w-full focus:outline-none text-center bg-custom-green-3"
              placeholder="Selecione a data"
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
            <span className="text-custom-green-2 mr-2">
              <i className="fas fa-clock"></i>
            </span>
            <input
              type="time"
              className="w-full focus:outline-none text-center bg-custom-green-3"
              placeholder="Selecione o horário"
            />
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
              placeholder="Digite a duração (ex: 30min)"
              className="w-full focus:outline-none bg-custom-green-3 placeholder:text-black"
            />
          </div>
        </div>
      </div>

      <BotaoProximoPasso nextPage="/gamescreen2" />
      <Footer />
    </div>
  );
}
