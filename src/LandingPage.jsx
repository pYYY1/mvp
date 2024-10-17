import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div>
      <div className="flex flex-col justify-start items-start w-full h-[109px] pl-10 pr-10 pt-3.5 pb-[15px] box-border bg-custom-green-2">
        <div className="flex flex-row justify-between items-center w-full h-full box-border">
          <a href="/" className="w-[100px] h-full">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/g9y2uzgjngo-176%3A7?alt=media&token=837249ef-06ff-4c65-aa2e-0c83dbdbcba6"
              alt="Logo MVP"
              className="w-[100px] h-full"
            />
          </a>
          <div className="flex flex-row space-x-10">
            <a
              href="#sobre"
              className="text-xl leading-5 font-inter font-[700] text-[#C7D59F] hover:text-[#A7B576]"
            >
              Sobre o MVP
            </a>
            <a
              href="#beneficios"
              className="text-xl leading-5 font-inter font-[700] text-[#C7D59F] hover:text-[#A7B576]"
            >
              Benefícios
            </a>
            <a
              href="#porque"
              className="text-xl leading-5 font-inter font-[700] text-[#C7D59F] hover:text-[#A7B576]"
            >
              Porque escolher o MVP
            </a>
            <a
              href="#experiencia"
              className="text-xl leading-5 font-inter font-[700] text-[#C7D59F] hover:text-[#A7B576]"
            >
              Experiência de Torcedor
            </a>
          </div>
          <div className="flex space-x-5 items-center">
            <a
              href="/register" // Link para a página de cadastro
              className="text-[15px] leading-[15px] font-inter font-[700] underline text-[#C7D59F] hover:text-[#A7B576]"
            >
              Cadastre-se
            </a>
            <button className="w-[100px] h-auto px-5 py-3 rounded-[15px] bg-[rgba(143,179,57,1)] shadow-md hover:bg-[rgba(143,179,57,0.8)]">
              <a
                href="/login"
                className="block w-full h-full font-inter font-[700] text-center text-white"
              >
                Entrar
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-400px bg-white">
        <img
          src="/img/Logo PNG (estranho).png"
          alt="Logo do Trabalho"
          className="max-w-[200px] h-auto"
        />
      </div>
      <h2 className="text-center text-2xl font-bold text-custom-green-1 font-inter">
        O JEITO{" "}
        <span className="text-custom-green-2 font-inter">MAIS FÁCIL</span>{" "}
        DE ORGANIZAR SEUS CAMPEONATOS/TORNEIOS
      </h2>
      <button className="flex items-center justify-center mx-auto mt-6 px-4 py-2 rounded-md bg-custom-green-1 font-bold text-custom-green-2 hover:bg-opacity-80">
        <img src="/img/tropy.png" alt="Ícone de Troféu" className="mr-2 w-5 h-5 font-inter" />
        CRIAR UM CAMPEONATO
      </button>
      <div id="sobre" className="mt-12 ml-20 max-w-[55%]">
        <h2 className="text-4xl font-bold text-custom-green-1 font-inter">Sobre o MVP</h2>
        <p className="mt-2 ml-5 font-medium text-lg text-custom-green-2 font-inter">
          O MVP é um webapp que facilita a organização de torneios e campeonatos. Com ele, você gerencia tudo de forma prática e rápida, desde as inscrições até os resultados, sem complicação.
        </p>
      </div>
      <div id="beneficios" className="mt-12 flex ml-20 mr-20">
        <div className="w-auto">
          <h2 className="text-4xl font-bold text-custom-green-1 font-inter">Benefícios</h2>
          <div className="ml-5">
            <div className="flex items-center mt-2">
              <img src="/img/check.png" alt="Ícone de check" className="mr-2 w-7 h-7" />
              <p className="font-medium text-lg text-custom-green-2 font-inter">Exportar Súmulas</p>
            </div>
            <div className="flex items-center mt-2">
              <img src="/img/check.png" alt="Ícone de check" className="mr-2 w-7 h-7" />
              <p className="font-medium text-lg text-custom-green-2 font-inter">Gestão fácil de torneios</p>
            </div>
            <div className="flex items-center mt-2">
              <img src="/img/check.png" alt="Ícone de check" className="mr-2 w-7 h-7" />
              <p className="font-medium text-lg text-custom-green-2 font-inter">Inscrições simples</p>
            </div>
            <div className="flex items-center mt-2">
              <img src="/img/check.png" alt="Ícone de check" className="mr-2 w-7 h-7" />
              <p className="font-medium text-lg text-custom-green-2 font-inter">Resultados em tempo real</p>
            </div>
            <div className="flex items-center mt-2">
              <img src="/img/check.png" alt="Ícone de check" className="mr-2 w-7 h-7" />
              <p className="font-medium text-lg text-custom-green-2 font-inter">Redução de Erros</p>
            </div>
            <div className="flex items-center mt-2">
              <img src="/img/check.png" alt="Ícone de check" className="mr-2 w-7 h-7" />
              <p className="font-medium text-lg text-custom-green-2 font-inter">Suporte ao Usuário</p>
            </div>
          </div>
        </div>
        <div className="ml-auto mt-5 mr-10">
          <img src="/img/manchete.png" alt="Imagem relacionada" className="w-[400px] h-auto" />
        </div>
      </div>
      <div id="porque" className="mt-12 ml-20 max-w-[55%]">
        <h2 className="text-4xl font-bold text-custom-green-1 font-inter">Porque escolher o MVP</h2>
        <ul className="list-disc list-inside mt-2">
          <li className="mt-2 ml-5 font-medium text-lg text-custom-green-2 font-inter">
            <span className="text-custom-green-1 font-semibold">Tudo em um só lugar:</span> Gerencie inscrições, tabelas e resultados de forma integrada.
          </li>
          <li className="mt-2 ml-5 font-medium text-lg text-custom-green-2 font-inter">
            <span className="text-custom-green-1 font-semibold">Foco na Experiência do Usuário:</span> Simples e intuitivo, perfeito para qualquer nível de experiência.
          </li>
          <li className="mt-2 ml-5 font-medium text-lg text-custom-green-2 font-inter">
            <span className="text-custom-green-1 font-semibold">Sempre Atualizado:</span> Nosso webapp está em constante evolução, trazendo novidades para melhorar a sua experiência.
          </li>
        </ul>
      </div>
      <div id="experiencia" className="flex justify-end mt-20 mr-20 mb-20">
        <div className="max-w-[55%]">
          <h2 className="text-4xl font-bold text-custom-green-1 font-inter text-right">Experiência de Torcedor</h2>
          <p className="mt-2 ml-5 font-medium text-lg text-custom-green-2 font-inter">
            Com o MVP, não são só os organizadores que ganham, os torcedores também podem acompanhar os resultados, estatísticas e destaques de qualquer lugar, tornando o campeonato mais interativo.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
