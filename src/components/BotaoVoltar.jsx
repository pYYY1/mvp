import { useNavigate } from 'react-router-dom';

export default function BotaoVoltar() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      className="flex items-center p-2 transform transition-transform duration-200 hover:scale-105 active:scale-95 hover:text-custom-green-1"
      onClick={handleBack}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-custom-green-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="text-custom-green-1 font-bold font-inter">Voltar</span>
    </button>
  );
}
