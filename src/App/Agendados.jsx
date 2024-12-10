import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { HiDotsVertical, HiSearch } from "react-icons/hi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BotaoVoltar from "../components/BotaoVoltar";
import ModalConfirmacao from "../components/ModalConfirmacao.jsx";

const Agendados = () => {
  const { user } = useContext(UserContext);
  const [campeonatos, setCampeonatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [campeonatoToDelete, setCampeonatoToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fetchCampeonatos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/organizadores/campeonatos/${user.id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar campeonatos");
        }

        const data = await response.json();
        const currentDate = new Date();
        const agendadosList = data.filter((campeonato) => {
          const campeonatoData = new Date(campeonato.dataCampeonato);
          return campeonatoData >= currentDate;
        });

        setCampeonatos(agendadosList);
      } catch (error) {
        console.error("Erro:", error);
        setError("Não foi possível carregar os campeonatos.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampeonatos();
  }, [user.id]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCopyLink = (linkAcesso) => {
    const link = `http://localhost:3000/campeonatos/public/${linkAcesso}`;
    navigator.clipboard.writeText(link)
      .then(() => alert("Link copiado com sucesso!"))
      .catch(() => alert("Erro ao copiar o link."));
  };

  const handleDelete = (id) => {
    setCampeonatoToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (campeonatoToDelete) {
      try {
        const response = await fetch(`http://localhost:3000/campeonatos/${campeonatoToDelete}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao excluir campeonato");
        }

        setCampeonatos((prev) => prev.filter((campeonato) => campeonato.id !== campeonatoToDelete));
        alert("Campeonato excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Falha ao excluir o campeonato.");
      }
    }
    setModalOpen(false);
    setCampeonatoToDelete(null);
  };

  const cancelDelete = () => {
    setModalOpen(false); 
    setCampeonatoToDelete(null); 
  };


  return (
    <div className="flex flex-col min-h-screen font-inter">
      <Header />
      <div className="flex-grow">
        <BotaoVoltar />
        <div className="flex-grow">
          <div className="flex justify-center mt-4">
            <h1 className="text-3xl font-bold text-custom-green-2">Campeonatos Agendados</h1>
          </div>
          <div className="flex justify-center mt-6">
            <div className="relative w-4/5 max-w-md">
              <input
                type="text"
                placeholder="Pesquisar Campeonato"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full py-3 pl-10 pr-4 rounded-full border-2 border-custom-green-2 focus:border-custom-green-1 outline-none transition-all"
              />
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-custom-green-2" size={20} />
            </div>
          </div>

          <div className="flex flex-col items-center mt-10 w-5/6 mx-auto">
            {campeonatos.length === 0 ? (
              <p className="text-center text-xl">Nenhum campeonato agendado encontrado.</p>
            ) : (
              <ul className="space-y-6 w-full max-w-4xl mx-auto">
                {campeonatos
                  .filter((campeonato) => campeonato.nome.toLowerCase().includes(searchTerm.toLowerCase())) // Filtro de pesquisa
                  .map((campeonato) => (
                    <li key={campeonato.id} className="p-4 bg-custom-green-2 text-white shadow-lg rounded-lg border-custom-green-1 flex justify-between items-center relative">
                      <h3 className="text-base font-semibold">{campeonato.nome}</h3>
                      <div className="flex items-center space-x-4">
                        <p className="text-lg font-medium">{new Date(campeonato.dataCampeonato).toLocaleDateString()}</p>
                        <div className="relative">
                          <button
                            className="text-white focus:outline-none"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label="Opções do campeonato"
                          >
                            <HiDotsVertical size={23} />
                          </button>
                          {menuOpen && (
                            <ul className="absolute right-0 top-12 bg-white text-black rounded-lg shadow-lg w-48 z-10 p-2 space-y-2 transition-all ease-in-out duration-300">
                              <li>
                                <Link
                                  to={`/jogos/${campeonato.linkAcesso}`}
                                  className="block px-4 py-2 hover:bg-gray-200 rounded-lg"
                                >
                                  Abrir Jogos
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    handleCopyLink(campeonato.linkAcesso);
                                    setMenuOpen(false);  
                                  }}
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
                                >
                                  Copiar Link
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    handleDelete(campeonato.id);
                                    setMenuOpen(false);  
                                  }}
                                  className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded-lg"
                                >
                                  Excluir
                                </button>
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        </div>
        <Footer />
        <ModalConfirmacao
          isOpen={modalOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message="Tem certeza de que deseja excluir este campeonato?"
        />
      </div>
  );
};

export default Agendados;
