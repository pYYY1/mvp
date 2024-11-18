import React, { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BotaoVoltar from "../components/BotaoVoltar";
import BotaoProximoPasso from "../components/BotaoProximoPasso";
import { ChavesTimesContext } from "../ChavesTimesContext";

export default function GameScreen4() {
  const { chaves, times, setTimes } = useContext(ChavesTimesContext);

  const dividirTimes = (times, numChaves) => {
    const result = [];
    for (let i = 0; i < numChaves; i++) {
      result.push([]);
    }
    for (let i = 0; i < times.length; i++) {
      result[i % numChaves].push(times[i]);
    }
    return result;
  };

  const timesDivididos = dividirTimes(times, chaves.length);

  const handleAleatorizar = () => {
    const shuffledTimes = [...times].sort(() => Math.random() - 0.5);
    setTimes(shuffledTimes);
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
          <h1 className="text-3xl font-bold text-custom-green-2">
            Chaveamento:
          </h1>
        </div>

        <div className="flex flex-col items-center mt-10 w-5/6 mx-auto">
          {chaves.map((chave, index) => (
            <div key={index} className="w-full mb-6">
              <h2 className="text-2xl font-bold text-custom-green-2 mb-4">
                {chave}
              </h2>
              <ul className="w-full">
                {timesDivididos[index].map((time, timeIndex) => (
                  <li
                    key={timeIndex}
                    className="flex items-center justify-between p-4 mb-4 bg-custom-green-1 text-white text-lg rounded-xl"
                  >
                    <span className="flex-grow text-left font-bold">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="text-custom-green-1 bg-white border-2 border-custom-green-1 hover:bg-custom-green-2 focus:outline-none font-bold rounded-3xl text-lg px-6 py-3 transition-transform duration-200 hover:scale-105 active:scale-95"
            onClick={handleAleatorizar}
          >
            Aleatorizar Chaves
          </button>
        </div>
      </div>
      <BotaoProximoPasso nextPage="/gamescreen5" />
      <Footer />
    </div>
  );
}