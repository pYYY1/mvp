import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserContext } from "../UserContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleCreateChampionship = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center h-auto bg-white p-4 sm:p-8">
        <img
          src="/img/Logo PNG (estranho).png"
          alt="Logo MVP"
          className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/4 xl:w-1/5 h-auto"
        />
      </div>
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-custom-green-1 font-inter mt-4">
        O JEITO{" "}
        <span className="text-custom-green-2 font-inter">MAIS FÁCIL</span> DE
        ORGANIZAR SEUS CAMPEONATOS/TORNEIOS
      </h2>
      <button
        className="flex items-center justify-center mx-auto mt-6 px-4 py-2 rounded-md bg-custom-green-1 font-bold text-custom-green-2 hover:bg-opacity-70"
        onClick={handleCreateChampionship}
      >
        <img
          src="/img/tropy.png"
          alt="Ícone de Troféu"
          className="mr-2 w-5 h-5 font-inter"
        />
        CRIAR UM CAMPEONATO
      </button>
      <div
        id="sobre"
        className="mt-12 px-4 sm:px-8 md:px-20 lg:px-32 max-w-full"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-custom-green-1 font-inter">
          Sobre o MVP
        </h2>
        <p className="mt-2 text-base sm:text-lg md:text-xl font-medium text-custom-green-2 font-inter">
          O MVP é um webapp que facilita a organização de torneios e
          campeonatos. Com ele, você gerencia tudo de forma prática e rápida,
          desde as inscrições até os resultados, sem complicação.
        </p>
      </div>
      <div
        id="beneficios"
        className="mt-12 flex flex-col sm:flex-row px-4 sm:px-8 md:px-20 lg:px-32"
      >
        <div className="w-full sm:w-1/2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-custom-green-1 font-inter">
            Benefícios
          </h2>
          <div className="mt-4">
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-5 h-5 sm:w-6 sm:h-6"
              />
              <p className="text-base sm:text-lg md:text-xl font-medium text-custom-green-2 font-inter">
                Exportar Súmulas
              </p>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-5 h-5 sm:w-6 sm:h-6"
              />
              <p className="text-base sm:text-lg md:text-xl font-medium text-custom-green-2 font-inter">
                Gestão fácil de torneios
              </p>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-5 h-5 sm:w-6 sm:h-6"
              />
              <p className="text-base sm:text-lg md:text-xl font-medium text-custom-green-2 font-inter">
                Inscrições simples
              </p>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-5 h-5 sm:w-6 sm:h-6"
              />
              <p className="text-base sm:text-lg md:text-xl font-medium text-custom-green-2 font-inter">
                Resultados em tempo real
              </p>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-5 h-5 sm:w-6 sm:h-6"
              />
              <p className="text-base sm:text-lg md:text-xl font-medium text-custom-green-2 font-inter">
                Redução de Erros
              </p>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-5 h-5 sm:w-6 sm:h-6"
              />
              <p className="text-base sm:text-lg md:text-xl font-medium text-custom-green-2 font-inter">
                Suporte ao Usuário
              </p>
            </div>
          </div>
        </div>
        <div className="hidden sm:block ml-auto mt-5 mr-10">
          <img
            src="/img/manchete.png"
            alt="Imagem relacionada"
            className="w-full max-w-[400px] h-auto"
          />
        </div>
      </div>
      <div
        id="experiencia"
        className="flex flex-col items-end mt-20 px-4 sm:px-8 md:px-20 lg:px-32"
      >
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-custom-green-1 font-inter text-right">
            Experiência de Torcedor
          </h2>
          <p className="mt-2 text-base sm:text-lg md:text-xl font-medium text-custom-green-2 font-inter text-right">
            Com o MVP, não são só os organizadores que ganham, os torcedores
            também podem acompanhar os resultados, estatísticas e destaques de
            qualquer lugar, tornando o campeonato mais interativo.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
