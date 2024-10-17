export default function Footer() {
  return (
    <footer className="bg-custom-green-2 text-white py-2 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-between px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">Entre em Contato</h2>
          <p className="mt-2">Email: contato@mvp.com</p>
        </div>
        <div className="flex space-x-6 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/img/facebook.png" alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/img/twitter.png" alt="Twitter" className="w-6 h-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/img/instagram.png" alt="Instagram" className="w-6 h-6" />
          </a>
        </div>
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} MVP. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
