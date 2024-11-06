import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex flex-col justify-start items-start w-full h-[118px] pl-10 pr-10 pt-3.5 pb-[15px] box-border bg-custom-green-2">
      {/* Header para telas grandes */}
      <div className="flex flex-row justify-between items-center w-full h-full box-border">
        {/* Logo */}
        <a href="/" className="w-[100px] h-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/g9y2uzgjngo-176%3A7?alt=media&token=837249ef-06ff-4c65-aa2e-0c83dbdbcba6"
            alt="Logo MVP"
            className="w-[100px] h-full"
          />
        </a>
        <button
          className="text-white lg-1220:hidden transition-transform duration-300 transform hover:scale-105 active:scale-95 bg-custom-green-2 p-2 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <nav className="hidden lg-1220:flex flex-row space-x-10">
          <a
            href="/#sobre"
            className="text-xl leading-5 font-inter font-[700] text-custom-green-3 hover:text-custom-green-1 transition-colors duration-300"
          >
            Sobre o MVP
          </a>
          <a
            href="/#beneficios"
            className="text-xl leading-5 font-inter font-[700] text-custom-green-3 hover:text-custom-green-1 transition-colors duration-300"
          >
            Benefícios
          </a>
          <a
            href="/#porque"
            className="text-xl leading-5 font-inter font-[700] text-custom-green-3 hover:text-custom-green-1 transition-colors duration-300"
          >
            Porque escolher o MVP
          </a>
          <a
            href="/#experiencia"
            className="text-xl leading-5 font-inter font-[700] text-custom-green-3 hover:text-custom-green-1 transition-colors duration-300"
          >
            Experiência de Torcedor
          </a>
        </nav>
        <div className="hidden lg-1220:flex space-x-5 items-center">
          <a
            href="/register"
            className="text-[15px] leading-[15px] font-inter font-[700] underline text-custom-green-1 hover:text-custom-green-3 transition-colors duration-300"
          >
            Cadastre-se
          </a>
          <button className="w-[100px] h-auto px-5 py-3 rounded-[15px] bg-custom-green-1 shadow-md hover:bg-custom-green-2 transition-colors duration-300">
            <a
              href="/login"
              className="block w-full h-full font-inter font-[700] text-center text-white"
            >
              Entrar
            </a>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <nav
        className={`flex flex-col bg-custom-green-2 text-white py-4 lg-1220:hidden w-[55%] absolute z-50 top-[85px] right-0 transition-max-height duration-500 rounded-2xl shadow-xl ${
          menuOpen ? "max-h-[2000px]" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/lmopow2dtsm-8%3A2?alt=media&token=d0775767-017f-4d44-8c34-4698253cbe84" // Substitua pela URL da sua imagem
            alt="Ícone usuário"
            className="w-24 h-24 mt-4 mb-4"
          />
          <a
            href="/register"
            className={`text-center text-sm text-custom-green-3 underline transition-opacity duration-500 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Entre ou Cadastre-se
          </a>
        </div>
        <div
          className={`flex flex-col items-start mt-4 space-y-4 ml-6 transition-opacity duration-500 pt-10 underline ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href="/#sobre"
            className="text-xs leading-8 font-inter text-custom-green-3 text-left"
          >
            Sobre o MVP
          </a>
          <a
            href="/#beneficios"
            className="text-xs leading-8 font-inter text-custom-green-3 text-left"
          >
            Benefícios
          </a>
          <a
            href="/#porque"
            className="text-xs leading-8 font-inter text-custom-green-3 text-left"
          >
            Porque escolher o MVP
          </a>
          <a
            href="/#experiencia"
            className="text-xs leading-8 font-inter text-custom-green-3 text-left"
          >
            Experiência de Torcedor
          </a>
        </div>
        <hr className="w-4/5 mx-auto border-t-2 border-custom-green-3 mt-10 mb-10" />
        <div
          className={`flex flex-col items-start space-y-4 ml-6 transition-opacity duration-500 underline ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href="/"
            className="text-xs leading-8 font-inter text-custom-green-3 text-left"
          >
            Configurações
          </a>
          <a
            href="/"
            className="text-xs leading-8 font-inter text-custom-green-3 text-left"
          >
            Fale conosco
          </a>
          </div>
      </nav>
    </header>
  );
}
