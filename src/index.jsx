import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LandingPage from './App/LandingPage';
import RegisterPage from './App/RegisterPage';
import DashBoard from './App/Dashboard';
import GameScreem1 from './App/GameScreem1';
import LoginPage from './App/LoginPage';
import { UserProvider } from './UserContext';
import ProtectedRoute from './components/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<DashBoard />} />} />
          <Route path="/gamescreen1" element={<GameScreem1 />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
