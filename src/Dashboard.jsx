import Header from "./Header";

export default function DashBoard() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/img/Fundo.png')` }}
    >
      <Header />

      {/* Conteúdo principal */}
      <h1 className="text-black text-center text-3xl p-4">aaa</h1>
    </div>
  );
}
