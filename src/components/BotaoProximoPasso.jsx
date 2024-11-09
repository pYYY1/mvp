import { useNavigate } from 'react-router-dom';

export default function BotaoProximoPasso({ nextPage }) {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(nextPage);
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        className="text-white font-inter bg-custom-green-1 hover:bg-custom-green-2 focus:ring-4 focus:outline-none focus:ring-custom-green-2 font-extrabold rounded-[12px] text-lg px-6 py-3 transition-colors duration-200 shadow-lg hover:shadow-xl active:shadow-none"
        onClick={handleNext}
      >
        Próximo Passo
      </button>
    </div>
  );
}
