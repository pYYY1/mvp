import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BotaoVoltar from '../components/BotaoVoltar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ChavesTimesContext } from '../ChavesTimesContext';

const GameScreen5 = () => {
  const { chaves, times, horarioInicio, tempoMedio } = useContext(ChavesTimesContext);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [position, setPosition] = useState('Jogo de Chave');
  const [confrontosIntercalados, setConfrontosIntercalados] = useState([]);
  const [semifinais, setSemifinais] = useState([]);
  const [terceiroLugar, setTerceiroLugar] = useState([]);
  const [final, setFinal] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTable, setEditTable] = useState('');

  useEffect(() => {
    const timesDivididos = dividirTimes(times, chaves.length);
    const confrontosChaves = timesDivididos.map(gerarConfrontos).map(embaralharArray);
    const maxConfrontos = Math.max(...confrontosChaves.map(c => c.length));
    const confrontosIntercaladosTemp = [];

    for (let i = 0; i < maxConfrontos; i++) {
      for (let j = 0; j < confrontosChaves.length; j++) {
        if (confrontosChaves[j][i]) {
          confrontosIntercaladosTemp.push(confrontosChaves[j][i]);
        }
      }
    }

    setConfrontosIntercalados(confrontosIntercaladosTemp);

    const semifinaisTemp = chaves.map((chave, index) => (
      `Primeiro da ${chave} vs Segundo da ${chaves[(index + 1) % chaves.length]}`
    ));
    setSemifinais(semifinaisTemp);

    setTerceiroLugar(['Perdedor da Semi 1 vs Perdedor da Semi 2']);
    setFinal(['Vencedor da Semi 1 vs Vencedor da Semi 2']);
  }, [chaves, times]);

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

  const gerarConfrontos = (times) => {
    const confrontos = [];
    for (let i = 0; i < times.length; i++) {
      for (let j = i + 1; j < times.length; j++) {
        confrontos.push(`${times[i]} vs ${times[j]}`);
      }
    }
    return confrontos;
  };

  const embaralharArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const calcularHorario = (inicio, duracao, index) => {
    const [horas, minutos] = inicio.split(':').map(Number);
    const totalMinutos = horas * 60 + minutos + duracao * index;
    const horasFinais = Math.floor(totalMinutos / 60);
    const minutosFinais = totalMinutos % 60;
    return `${String(horasFinais).padStart(2, '0')}:${String(minutosFinais).padStart(2, '0')}`;
  };

  const handleAddGame = () => {
    setShowForm(true);
  };

  const handleEditGame = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!team1 || !team2) {
      alert('Por favor, preencha os nomes dos times.');
      return;
    }
    const newGame = `${team1} vs ${team2}`;
    if (editIndex !== null) {
      if (editTable === 'Jogo de Chave') {
        const updatedConfrontos = confrontosIntercalados.map((confronto, index) =>
          index === editIndex ? newGame : confronto
        );
        setConfrontosIntercalados(updatedConfrontos);
      } else if (editTable === 'Semifinal') {
        const updatedSemifinais = semifinais.map((confronto, index) =>
          index === editIndex ? newGame : confronto
        );
        setSemifinais(updatedSemifinais);
      } else if (editTable === 'Terceiro Lugar') {
        const updatedTerceiroLugar = terceiroLugar.map((confronto, index) =>
          index === editIndex ? newGame : confronto
        );
        setTerceiroLugar(updatedTerceiroLugar);
      } else if (editTable === 'Final') {
        const updatedFinal = final.map((confronto, index) =>
          index === editIndex ? newGame : confronto
        );
        setFinal(updatedFinal);
      }
      setEditIndex(null);
      setEditTable('');
    } else {
      if (position === 'Jogo de Chave') {
        setConfrontosIntercalados([...confrontosIntercalados, newGame]);
      } else if (position === 'Semifinal') {
        setSemifinais([...semifinais, newGame]);
      } else if (position === 'Terceiro Lugar') {
        setTerceiroLugar([...terceiroLugar, newGame]);
      } else if (position === 'Final') {
        setFinal([...final, newGame]);
      }
    }
    setShowForm(false);
    setTeam1('');
    setTeam2('');
    setPosition('Jogo de Chave');
  };

  const handleDeleteGame = (index, table) => {
    if (table === 'Jogo de Chave') {
      const updatedConfrontos = confrontosIntercalados.filter((_, i) => i !== index);
      setConfrontosIntercalados(updatedConfrontos);
    } else if (table === 'Semifinal') {
      const updatedSemifinais = semifinais.filter((_, i) => i !== index);
      setSemifinais(updatedSemifinais);
    } else if (table === 'Terceiro Lugar') {
      const updatedTerceiroLugar = terceiroLugar.filter((_, i) => i !== index);
      setTerceiroLugar(updatedTerceiroLugar);
    } else if (table === 'Final') {
      const updatedFinal = final.filter((_, i) => i !== index);
      setFinal(updatedFinal);
    }
  };

  const handleEditClick = (index, table) => {
    setEditIndex(index);
    setEditTable(table);
    setShowForm(true);
    if (table === 'Jogo de Chave') {
      const [team1, team2] = confrontosIntercalados[index].split(' vs ');
      setTeam1(team1);
      setTeam2(team2);
    } else if (table === 'Semifinal') {
      const [team1, team2] = semifinais[index].split(' vs ');
      setTeam1(team1);
      setTeam2(team2);
    } else if (table === 'Terceiro Lugar') {
      const [team1, team2] = terceiroLugar[index].split(' vs ');
      setTeam1(team1);
      setTeam2(team2);
    } else if (table === 'Final') {
      const [team1, team2] = final[index].split(' vs ');
      setTeam1(team1);
      setTeam2(team2);
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
          <h1 className="text-3xl font-bold text-custom-green-2">
            Tabela de Jogos:
          </h1>
        </div>
        <div className="flex flex-col items-center mt-10 w-5/6 mx-auto">
          <div className="w-full mb-6">
            <table className="w-full border-collapse border border-custom-green-1 text-center">
              <tbody>
                {confrontosIntercalados.map((confronto, i) => (
                  <tr key={i}>
                    <td className="border border-custom-green-1 p-2">
                      {calcularHorario(horarioInicio, tempoMedio, i)}
                    </td>
                    <td className="border border-custom-green-1 p-2">{confronto}</td>
                    {editMode && (
                      <td className="border border-custom-green-1 p-2 flex justify-center items-center space-x-2">
                        <FontAwesomeIcon
                          icon={faPen}
                          className="cursor-pointer text-blue-500 text-lg sm:text-xl"
                          onClick={() => handleEditClick(i, 'Jogo de Chave')}
                        />
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="cursor-pointer text-red-500 text-lg sm:text-xl"
                          onClick={() => handleDeleteGame(i, 'Jogo de Chave')}
                        />
                      </td>
                    )}
                  </tr>
                ))}
                {semifinais.map((confronto, i) => (
                  <tr key={i}>
                    <td className="border border-custom-green-1 p-2">
                      {calcularHorario(horarioInicio, tempoMedio, confrontosIntercalados.length + i)}
                    </td>
                    <td className="border border-custom-green-1 p-2">{confronto}</td>
                    {editMode && (
                      <td className="border border-custom-green-1 p-2 flex justify-center items-center space-x-2">
                        <FontAwesomeIcon
                          icon={faPen}
                          className="cursor-pointer text-blue-500 text-lg sm:text-xl"
                          onClick={() => handleEditClick(i, 'Semifinal')}
                        />
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="cursor-pointer text-red-500 text-lg sm:text-xl"
                          onClick={() => handleDeleteGame(i, 'Semifinal')}
                        />
                      </td>
                    )}
                  </tr>
                ))}
                {terceiroLugar.map((confronto, i) => (
                  <tr key={i}>
                    <td className="border border-custom-green-1 p-2">
                      {calcularHorario(horarioInicio, tempoMedio, confrontosIntercalados.length + semifinais.length + i)}
                    </td>
                    <td className="border border-custom-green-1 p-2">{confronto}</td>
                    {editMode && (
                      <td className="border border-custom-green-1 p-2 flex justify-center items-center space-x-2">
                        <FontAwesomeIcon
                          icon={faPen}
                          className="cursor-pointer text-blue-500 text-lg sm:text-xl"
                          onClick={() => handleEditClick(i, 'Terceiro Lugar')}
                        />
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="cursor-pointer text-red-500 text-lg sm:text-xl"
                          onClick={() => handleDeleteGame(i, 'Terceiro Lugar')}
                        />
                      </td>
                    )}
                  </tr>
                ))}
                {final.map((confronto, i) => (
                  <tr key={i}>
                    <td className="border border-custom-green-1 p-2">
                      {calcularHorario(horarioInicio, tempoMedio, confrontosIntercalados.length + semifinais.length + terceiroLugar.length + i)}
                    </td>
                    <td className="border border-custom-green-1 p-2">{confronto}</td>
                    {editMode && (
                      <td className="border border-custom-green-1 p-2 flex justify-center items-center space-x-2">
                        <FontAwesomeIcon
                          icon={faPen}
                          className="cursor-pointer text-blue-500 text-lg sm:text-xl"
                          onClick={() => handleEditClick(i, 'Final')}
                        />
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="cursor-pointer text-red-500 text-lg sm:text-xl"
                          onClick={() => handleDeleteGame(i, 'Final')}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex space-x-4">
            <button
              className="mt-4 px-4 py-2 bg-custom-green-2 text-white rounded"
              onClick={handleAddGame}
            >
              Adicionar Jogo
            </button>
            <button
              className="mt-4 px-4 py-2 bg-custom-green-2 text-white rounded"
              onClick={handleEditGame}
            >
              {editMode ? 'Cancelar Edição' : 'Editar Jogo'}
            </button>
          </div>
          {showForm && (
            <form onSubmit={handleSubmit} className="mt-4 p-4 border border-custom-green-1 rounded">
              <div className="mb-4">
                <label className="block text-custom-green-2 mb-2">Time 1:</label>
                <input
                  type="text"
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  className="w-full p-2 border border-custom-green-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-custom-green-2 mb-2">Time 2:</label>
                <input
                  type="text"
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                  className="w-full p-2 border border-custom-green-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-custom-green-2 mb-2">Posição na Tabela:</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full p-2 border border-custom-green-1 rounded"
                >
                  <option value="Jogo de Chave">Jogo de Chave</option>
                  <option value="Semifinal">Semifinal</option>
                  <option value="Terceiro Lugar">Terceiro Lugar</option>
                  <option value="Final">Final</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-custom-green-2 text-white rounded"
              >
                {editIndex !== null ? 'Salvar' : 'Adicionar'}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GameScreen5;
