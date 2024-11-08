import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { useContext } from 'react';

export default function DashBoard() {
  const userName = "Nome do Usuário";
  const navigate = useNavigate();
  const { user } = useContext(UserContext);


  const handleCreateChampionship = () => {
    navigate('/gamescreen1'); // Define a rota para a página desejada
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center mt-4">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/lmopow2dtsm-8%3A2?alt=media&token=d0775767-017f-4d44-8c34-4698253cbe84"
          alt="Ícone usuário"
          className="w-24 h-24 mt-4 mb-4"
        />
        {user ? (
          <h1 className="text-black text-2xl font-inter">Olá, {user.nome}</h1>
        ) : (
          <h1 className='text-black text-2xl font-inter'>Olá, {userName}</h1>
        )}
      </div>

      <div className="flex flex-col items-center mt-8 space-y-6 w-full px-6 font-inter">
        <div className="flex flex-col items-center bg-custom-green-2 rounded-xl w-11/12 max-w-sm p-4 shadow-md">
          <p className="text-base text-custom-green-3 mb-2">
            Criar Novo Campeonato
          </p>
          <button 
            className="bg-custom-green-1 text-white rounded-xl w-10/12 px-8 py-2 mt-2"
            onClick={handleCreateChampionship}
          >
            Clique Aqui!
          </button>
        </div>

        <div className="flex flex-col items-center bg-custom-green-2 rounded-xl w-11/12 max-w-sm p-4 shadow-md">
          <p className="text-base text-custom-green-3 mb-2">
            Lista de Campeonatos
          </p>
          <button className="bg-custom-green-1 text-white rounded-xl w-10/12 px-8 py-2 mt-2">
            Clique Aqui!
          </button>
        </div>

        <div className="flex flex-col items-center bg-custom-green-2 rounded-xl w-11/12 max-w-sm p-4 shadow-md">
          <p className="text-base text-custom-green-3 mb-2">
            Histórico de Campeonatos
          </p>
          <button className="bg-custom-green-1 text-white rounded-xl w-10/12 px-8 py-2 mt-2">
            Clique Aqui!
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
