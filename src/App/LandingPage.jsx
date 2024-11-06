import Footer from "../components/Footer";
import Header from "../components/Header";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-400px bg-white">
        <img
          src="/img/Logo PNG (estranho).png"
          alt="Logo do Trabalho"
          className="max-w-[200px] h-auto"
        />
      </div>
      <h2 className="text-center text-2xl font-bold text-custom-green-1 font-inter">
        O JEITO{" "}
        <span className="text-custom-green-2 font-inter">MAIS FÁCIL</span> DE
        ORGANIZAR SEUS CAMPEONATOS/TORNEIOS
      </h2>
      <button className="flex items-center justify-center mx-auto mt-6 px-4 py-2 rounded-md bg-custom-green-1 font-bold text-custom-green-2 hover:bg-opacity-70">
        <img
          src="/img/tropy.png"
          alt="Ícone de Troféu"
          className="mr-2 w-5 h-5 font-inter"
        />
        CRIAR UM CAMPEONATO
      </button>
      <div id="sobre" className="mt-12 ml-20 max-w-[55%]">
        <h2 className="text-4xl font-bold text-custom-green-1 font-inter">
          Sobre o MVP
        </h2>
        <p className="mt-2 ml-5 font-medium text-lg text-custom-green-2 font-inter">
          O MVP é um webapp que facilita a organização de torneios e
          campeonatos. Com ele, você gerencia tudo de forma prática e rápida,
          desde as inscrições até os resultados, sem complicação.
        </p>
      </div>
      <div id="beneficios" className="mt-12 flex ml-20 mr-20">
        <div className="w-auto">
          <h2 className="text-4xl font-bold text-custom-green-1 font-inter">
            Benefícios
          </h2>
          <div className="ml-5">
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-7 h-7"
              />
              <p className="font-medium text-lg text-custom-green-2 font-inter">
                Exportar Súmulas
              </p>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-7 h-7"
              />
              <p className="font-medium text-lg text-custom-green-2 font-inter">
                Gestão fácil de torneios
              </p>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-7 h-7"
              />
              <p className="font-medium text-lg text-custom-green-2 font-inter">
                Inscrições simples
              </p>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-7 h-7"
              />
              <p className="font-medium text-lg text-custom-green-2 font-inter">
                Resultados em tempo real
              </p>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-7 h-7"
              />
              <p className="font-medium text-lg text-custom-green-2 font-inter">
                Redução de Erros
              </p>
            </div>
            <div className="flex items-center mt-2">
              <img
                src="/img/check.png"
                alt="Ícone de check"
                className="mr-2 w-7 h-7"
              />
              <p className="font-medium text-lg text-custom-green-2 font-inter">
                Suporte ao Usuário
              </p>
            </div>
          </div>
        </div>
        <div className="ml-auto mt-5 mr-10">
          <img
            src="/img/manchete.png"
            alt="Imagem relacionada"
            className="w-[400px] h-auto"
          />
        </div>
      </div>
      <div id="porque" className="mt-12 ml-20 max-w-[55%]">
        <h2 className="text-4xl font-bold text-custom-green-1 font-inter">
          Porque escolher o MVP
        </h2>
        <ul className="list-disc list-inside mt-2">
          <li className="mt-2 ml-5 font-medium text-lg text-custom-green-2 font-inter">
            <span className="text-custom-green-1 font-semibold">
              Tudo em um só lugar:
            </span>{" "}
            Gerencie inscrições, tabelas e resultados de forma integrada.
          </li>
          <li className="mt-2 ml-5 font-medium text-lg text-custom-green-2 font-inter">
            <span className="text-custom-green-1 font-semibold">
              Foco na Experiência do Usuário:
            </span>{" "}
            Simples e intuitivo, perfeito para qualquer nível de experiência.
          </li>
          <li className="mt-2 ml-5 font-medium text-lg text-custom-green-2 font-inter">
            <span className="text-custom-green-1 font-semibold">
              Sempre Atualizado:
            </span>{" "}
            Nosso webapp está em constante evolução, trazendo novidades para
            melhorar a sua experiência.
          </li>
        </ul>
      </div>
      <div id="experiencia" className="flex justify-end mt-20 mr-20 mb-20">
        <div className="max-w-[55%]">
          <h2 className="text-4xl font-bold text-custom-green-1 font-inter text-right">
            Experiência de Torcedor
          </h2>
          <p className="mt-2 ml-5 font-medium text-lg text-custom-green-2 font-inter">
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
