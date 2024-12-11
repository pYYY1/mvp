import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../components/Jogos.css'; 

const Jogos = () => {
  const { linkAcesso } = useParams();
  const [jogos, setJogos] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

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
        console.error('Erro ao buscar jogos:', error);
      }
    };

    fetchJogos();
  }, [linkAcesso]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen font-inter">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        {jogos.map((jogo, index) => {
          const horarioInicio = new Date(jogo.horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div key={index} className="max-w-sm mx-auto shadow-md shadow-custom-green-2 border border-gray-300 overflow-hidden bg-white mb-4 rounded-2xl">
              <div className="flex justify-between items-center p-6 bg-white">
                <span className="text-xl font-semibold text-custom-green-2 flex-1 text-center">{jogo.timeCasaNome}</span>
                <span className="text-3xl font-semibold text-custom-green-2 flex-none mx-4">0 x 0</span>
                <span className="text-xl font-semibold text-custom-green-2 flex-1 text-center">{jogo.timeVisitanteNome}</span>
                <FontAwesomeIcon
                  icon={expandedIndex === index ? faChevronUp : faChevronDown}
                  className="cursor-pointer text-custom-green-2"
                  onClick={() => toggleExpand(index)}
                />
              </div>
              <CSSTransition
                in={expandedIndex === index}
                timeout={300}
                classNames="expand"
                unmountOnExit
              >
                <div className="p-4 bg-custom-green-1 rounded-b-2xl">
                  <div className="flex justify-center">
                    <span className="text-xl font-semibold text-white">Previsão de Início</span>
                  </div>
                  <div className="flex justify-center items-center my-1">
                    <span className="text-2xl font-bold text-white">{horarioInicio}</span>
                  </div>
                  <div className="mt-4">
                    {[1, 2, 3].map((set) => (
                      <div
                        key={set}
                        className="flex justify-between text-white text-xl font-normal mb-1"
                      >
                        <span>{set} Set</span>
                        <span>0 x 0</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CSSTransition>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Jogos;