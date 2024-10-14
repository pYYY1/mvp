export default function LadingPage() {
  return (
    <div className="flex flex-col justify-start items-start w-full h-[109px] pl-10 pr-10 pt-3.5 pb-[15px] box-border bg-[rgba(75,88,66,1)]">
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
            href="/cadastro"
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
  );
}
