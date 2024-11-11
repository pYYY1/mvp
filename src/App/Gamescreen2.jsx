import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BotaoVoltar from "../components/BotaoVoltar";
import BotaoProximoPasso from "../components/BotaoProximoPasso";
import { ChavesTimesContext } from "../ChavesTimesContext";

export default function GameScreen2() {
  const [nomeChave, setNomeChave] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const { chaves, setChaves } = useContext(ChavesTimesContext);

  const handleEnviarChave = () => {
    if (nomeChave.trim() !== "") {
      if (editIndex !== null) {
        const updatedChaves = chaves.map((chave, index) =>
          index === editIndex ? nomeChave : chave
        );
        setChaves(updatedChaves);
        setEditIndex(null);
      } else {
        setChaves([...chaves, nomeChave]);
      }
      setNomeChave("");
    }
  };

  const handleDeleteChave = (index) => {
    const updatedChaves = chaves.filter((_, i) => i !== index);
    setChaves(updatedChaves);
  };

  const handleEditChave = (index) => {
    setNomeChave(chaves[index]);
    setEditIndex(index);
  };

  return (
    <div className="flex flex-col min-h-screen font-inter">
      <Header />
      <div className="flex-grow">
        <BotaoVoltar />
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-3 h-3 bg-custom-green-1 rounded-full"></div>
          <div className="w-3 h-3 bg-custom-green-1 rounded-full"></div>
          <div className="w-3 h-3 bg-custom-green-2 rounded-full"></div>
          <div className="w-3 h-3 bg-custom-green-2 rounded-full"></div>
          <div className="w-3 h-3 bg-custom-green-2 rounded-full"></div>
        </div>

        <div className="flex justify-center mt-10">
          <h1 className="text-3xl font-bold text-custom-green-2">
            Chaveamento
          </h1>
        </div>

        <div className="flex flex-col items-center mt-10">
          <div className="w-5/6">
            <label
              htmlFor="nomeChave"
              className="text-2xl font-bold mb-2 text-custom-green-2"
            >
              Nome da Chave (ex: Chave A):
            </label>
            <input
              id="nomeChave"
              type="text"
              value={nomeChave}
              onChange={(e) => setNomeChave(e.target.value)}
              placeholder="Escreva Aqui!"
              className="w-full p-3 border-2 mt-3 border-custom-green-1 rounded-3xl focus:outline-none focus:border-custom-green-1 text-lg"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="text-custom-green-1 bg-white focus:outline-none font-extrabold rounded-3xl text-lg px-6 py-3 transition-transform duration-200 hover:scale-105 active:scale-95 hover:text-custom-green-2 hover:border-custom-green-2 border-2 border-custom-green-1 shadow-md"
            onClick={handleEnviarChave}
          >
            {editIndex !== null ? "Editar Chave" : "Enviar Chave"}
          </button>
        </div>

        <div className="flex flex-col items-center mt-10">
          <h2 className="text-3xl font-bold text-custom-green-2">
            Lista de Chaves
          </h2>
          <ul className="w-5/6 mt-4">
            {chaves.map((chave, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 mb-4 bg-custom-green-1 text-white text-lg rounded-xl"
              >
                <span className="flex-grow text-left font-bold">{chave}</span>
                <div className="flex space-x-4">
                  <FontAwesomeIcon
                    icon={faPen}
                    className="cursor-pointer text-blue-500 text-xl"
                    onClick={() => handleEditChave(index)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="cursor-pointer text-red-500 text-xl"
                    onClick={() => handleDeleteChave(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BotaoProximoPasso nextPage="/gamescreen3" />
      <Footer />
    </div>
  );
}
