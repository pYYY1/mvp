import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPen } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import Header from "../components/Header";
import Footer from "../components/Footer";
import BotaoVoltar from "../components/BotaoVoltar";
import ModalConfirmacao from '../components/ModalConfirmacao';
import { UserContext } from '../UserContext';
import '../components/Jogos.css';

const Jogos = () => {
  const { linkAcesso } = useParams();
  const { user } = useContext(UserContext);
  const [jogos, setJogos] = useState([]);
  const [campeonato, setCampeonato] = useState({});
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [jogoToEdit, setJogoToEdit] = useState(null);
  const [placar, setPlacar] = useState({
    pontosCasa: 0,
    pontosVisitante: 0,
    sets: [
      { pontosCasa: 0, pontosVisitante: 0 },
      { pontosCasa: 0, pontosVisitante: 0 },
      { pontosCasa: 0, pontosVisitante: 0 },
    ],
  });

  useEffect(() => {
    const fetchCampeonato = async () => {
      try {
        console.log('Iniciando fetch com linkAcesso:', linkAcesso);

        const response = await axios.get(`http://localhost:3000/campeonatos/public/${linkAcesso}`);
        const data = response.data;
        console.log('Dados recebidos da API:', data);

        if (data) {
          setCampeonato(data);
          if (Array.isArray(data.jogos)) {
            setJogos(data.jogos);
          } else {
            console.log('Nenhum jogo encontrado na resposta.');
            setJogos([]);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar jogos:', error);
      }
    };

    fetchCampeonato();
  }, [linkAcesso]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleEditClick = (jogo) => {
    setJogoToEdit(jogo);
    setPlacar({
      pontosCasa: jogo.placar?.setsTimeCasa || 0,
      pontosVisitante: jogo.placar?.setsTimeVisitante || 0,
      sets: jogo.sets || [
        { pontosCasa: 0, pontosVisitante: 0 },
        { pontosCasa: 0, pontosVisitante: 0 },
        { pontosCasa: 0, pontosVisitante: 0 },
      ],
    });
    setModalOpen(true);
  };

  const enviarPlacar = async () => {
    try {
      const setsTimeCasa = placar.sets.filter(set => set.pontosCasa > set.pontosVisitante).length;
      const setsTimeVisitante = placar.sets.filter(set => set.pontosVisitante > set.pontosCasa).length;

      await axios.post('http://localhost:3000/placares', {
        jogoId: jogoToEdit.id,
        setsTimeCasa,
        setsTimeVisitante,
      });
    } catch (error) {
      console.error('Erro ao enviar o placar:', error);
    }
  };

  const enviarSets = async () => {
    try {
      const setsPromises = placar.sets.map(async (set, i) => {
        const setData = {
          jogoId: jogoToEdit.id,
          numero: i + 1,
          pontosCasa: Number(set.pontosCasa),
          pontosVisitante: Number(set.pontosVisitante),
        };
        console.log('Enviando set:', setData);

        const response = await axios.get(`http://localhost:3000/sets`, {
          params: {
            jogoId: setData.jogoId,
            numero: setData.numero,
          },
        });

        if (response.data.length > 0) {
          await axios.put(`http://localhost:3000/sets/${response.data[0].id}`, setData);
          console.log(`Set ${setData.numero} atualizado`);
        } else {
          await axios.post('http://localhost:3000/sets', setData);
          console.log(`Set ${setData.numero} criado`);
        }
      });

      await Promise.all(setsPromises);
      console.log('Todos os sets foram enviados');
    } catch (error) {
      console.error('Erro ao enviar os sets:', error);
    }
  };

  const handleSave = async () => {
    try {
      await enviarPlacar();
      await enviarSets();
      const updatedJogos = jogos.map((jogo) =>
        jogo.id === jogoToEdit.id ? { ...jogo, placar: { setsTimeCasa: placar.sets.filter(set => set.pontosCasa > set.pontosVisitante).length, setsTimeVisitante: placar.sets.filter(set => set.pontosVisitante > set.pontosCasa).length }, sets: placar.sets } : jogo
      );
      setJogos(updatedJogos);
      setModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  const handleAddSet = () => {
    const newSet = { pontosCasa: 0, pontosVisitante: 0 };
    setPlacar({ ...placar, sets: [...placar.sets, newSet] });
  };

  return (
    <div className="flex flex-col min-h-screen font-inter">
      <Header />
      <div className="flex-grow">
        <BotaoVoltar />
        <div className="flex justify-center mt-4 mb-6">
          <h1 className="text-3xl font-bold text-custom-green-2 text-center">{campeonato.nome}</h1>
        </div>
        <div className="container mx-auto p-4 flex-grow">
          {jogos.map((jogo, index) => {
            const horarioInicio = new Date(jogo.horario).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={index}
                className="max-w-sm mx-auto shadow-md shadow-custom-green-2 border border-gray-300 overflow-hidden bg-white mb-4 rounded-2xl"
              >
                <div className="flex justify-between items-center p-6 bg-white">
                  <span className="text-xl font-bold text-custom-green-2 flex-1 text-center">
                    {jogo.timeCasaNome}
                  </span>
                  <span className="text-3xl font-extrabold text-custom-green-2 flex-none mx-4">
                    {jogo.placar?.setsTimeCasa} x {jogo.placar?.setsTimeVisitante}
                  </span>
                  <span className="text-xl font-bold text-custom-green-2 flex-1 text-center">
                    {jogo.timeVisitanteNome}
                  </span>
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
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col items-center flex-1">
                        <span className="text-sm font-semibold text-white">Previsão de Início</span>
                        <span className="text-lg font-bold text-white">{horarioInicio}</span>
                      </div>
                      {user && user.id === campeonato.organizadorId && (
                        <FontAwesomeIcon
                          icon={faPen}
                          className="cursor-pointer text-blue-500 text-xl"
                          onClick={() => handleEditClick(jogo)}
                        />
                      )}
                    </div>
                    <div className="mt-4">
                      {jogo.sets &&
                        jogo.sets.map((set, setIndex) => (
                          <div
                            key={setIndex}
                            className="flex justify-between text-white text-sm font-bold mb-1"
                          >
                            <span>{setIndex + 1} Set</span>
                            <span>
                              {set?.pontosCasa} x {set?.pontosVisitante}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </CSSTransition>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
      <ModalConfirmacao
        isOpen={modalOpen}
        onConfirm={handleSave}
        onCancel={() => setModalOpen(false)}
        message={
          <div>
            <h2 className="text-xl font-bold text-center mb-4 text-custom-green-2">Resultado Final</h2>
            <div className="mb-4 flex space-x-4 items-center">
              <div className="flex-1">
                <label className="block text-md font-semibold text-custom-green-1">
                  {placar.timeCasaNome}
                </label>
                <input
                  type="number"
                  value={placar.pontosCasa}
                  onChange={(e) => setPlacar({ ...placar, pontosCasa: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-custom-green-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 bg-white border-2 text-center"
                />
              </div>
              <span className="text-lg font-bold text-center">x</span>
              <div className="flex-1">
                <label className="block text-md font-semibold text-custom-green-1">
                  {placar.timeVisitanteNome}
                </label>
                <input
                  type="number"
                  value={placar.pontosVisitante}
                  onChange={(e) => setPlacar({ ...placar, pontosVisitante: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-custom-green-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 bg-white border-2 text-center"
                />
              </div>
            </div>
            <h3 className="text-lg font-bold text-center mb-4 text-custom-green-2">Resultado dos Sets</h3>
            {placar.sets.map((set, setIndex) => (
              <div key={setIndex} className="mb-4">
                <label className="block text-md font-semibold text-custom-green-1">
                  {setIndex + 1} Set
                </label>
                <div className="flex space-x-2 items-center">
                  <input
                    type="number"
                    value={set.pontosCasa}
                    onChange={(e) => {
                      const newSets = [...placar.sets];
                      newSets[setIndex] = { ...newSets[setIndex], pontosCasa: e.target.value };
                      setPlacar({ ...placar, sets: newSets });
                    }}
                    className="mt-1 block w-full rounded-lg border-custom-green-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 bg-white border-2 text-center"
                  />
                  <span className="text-lg font-bold text-center">x</span>
                  <input
                    type="number"
                    value={set.pontosVisitante}
                    onChange={(e) => {
                      const newSets = [...placar.sets];
                      newSets[setIndex] = { ...newSets[setIndex], pontosVisitante: e.target.value };
                      setPlacar({ ...placar, sets: newSets });
                    }}
                    className="mt-1 block w-full rounded-lg border-custom-green-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 bg-white border-2 text-center"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={handleAddSet}
              className="mt-4 w-full bg-custom-green-2 text-white py-2 rounded-lg shadow-sm hover:bg-custom-green-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green-2"
            >
              Adicionar Set
            </button>
          </div>
        }
      />
    </div>
  );
};

export default Jogos;