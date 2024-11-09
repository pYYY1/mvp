import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BotaoVoltar from "../components/BotaoVoltar";
import BotaoProximoPasso from "../components/BotaoProximoPasso";

export default function GameScreem2() {
  const [nomeChave, setNomeChave] = useState("");
  const [listaChaves, setListaChaves] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleEnviarChave = () => {
    if (nomeChave.trim() !== "") {
      if (editIndex !== null) {
        const updatedChaves = listaChaves.map((chave, index) =>
          index === editIndex ? nomeChave : chave
        );
        setListaChaves(updatedChaves);
        setEditIndex(null);
      } else {
        setListaChaves([...listaChaves, nomeChave]);
      }
      setNomeChave("");
    }
  };

  const handleDeleteChave = (index) => {
    const updatedChaves = listaChaves.filter((_, i) => i !== index);
    setListaChaves(updatedChaves);
  };

  const handleEditChave = (index) => {
    setNomeChave(listaChaves[index]);
    setEditIndex(index);
  };

  return (
    <div className="flex flex-col min-h-screen">
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
          <h1 className="text-3xl font-bold text-custom-green-2 font-inter">
            Chaveamento
          </h1>
        </div>

        <div className="flex flex-col items-center mt-10">
          <label
            htmlFor="nomeChave"
            className="text-2xl font-bold mb-4 text-custom-green-2 font-inter"
          >
            Nome da Chave (ex: Chave A):
          </label>
          <div className="flex justify-center w-full">
            <input
              id="nomeChave"
              type="text"
              value={nomeChave}
              onChange={(e) => setNomeChave(e.target.value)}
              placeholder="Escreva Aqui!"
              className="w-5/6 p-3 border-2 border-custom-green-1 rounded-xl focus:outline-none focus:border-custom-green-1 text-lg"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="text-custom-green-1 bg-white focus:outline-none font-bold rounded-[12px] text-lg px-6 py-3 transition-transform duration-200 hover:scale-105 active:scale-95 hover:text-custom-green-2 hover:border-custom-green-2 border-2 border-custom-green-1"
            onClick={handleEnviarChave}
          >
            {editIndex !== null ? "Editar Chave" : "Enviar Chave"}
          </button>
        </div>

        <div className="flex flex-col items-center mt-10">
          <h2 className="text-2xl font-bold text-custom-green-2 font-inter">
            Lista de Chaves
          </h2>
          <ul className="w-5/6 mt-4">
            {listaChaves.map((chave, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 mb-4 bg-custom-green-1 text-white text-lg rounded-xl"
              >
                <span className="flex-grow text-left font-bold">{chave}</span>
                <div className="flex space-x-4">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="cursor-pointer text-blue-500 text-xl"
                    onClick={() => handleEditChave(index)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
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
