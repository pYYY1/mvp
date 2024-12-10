import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Páginas
import LandingPage from './App/LandingPage';
import RegisterPage from './App/RegisterPage';
import LoginPage from './App/LoginPage';
import DashBoard from './App/Dashboard';
import GameScreen1 from './App/GameScreen1';
import GameScreen2 from './App/GameScreen2';
import GameScreen3 from './App/GameScreen3';
import GameScreen4 from './App/GameScreen4';
import GameScreen5 from './App/GameScreen5';
import Historico from './App/Historico';
import Agendados from "./App/Agendados";
import Jogos from "./App/Jogos"; // Importando a página Jogos

// Contexto
import { UserProvider } from './UserContext';
import { ChavesTimesProvider } from './CampeonatoContext';

// Componentes
import ProtectedRoute from './components/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ChavesTimesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<DashBoard />} />} />
            <Route path="/gamescreen1" element={<GameScreen1 />} />
            <Route path="/gamescreen2" element={<GameScreen2 />} />
            <Route path="/gamescreen3" element={<GameScreen3 />} />
            <Route path="/gamescreen4" element={<GameScreen4 />} />
            <Route path="/gamescreen5" element={<GameScreen5 />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/agendados" element={<Agendados />} />

            {/* Alteração na rota de Jogos */}
            <Route path="/jogos/:linkAcesso" element={<Jogos />} />
          </Routes>
        </Router>
      </ChavesTimesProvider>
    </UserProvider>
  </React.StrictMode>
);
