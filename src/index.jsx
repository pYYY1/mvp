import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage'
import DashBoard from './Dashboard';
import GameScreem1 from './GameScreem1';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/gamescreen1" element={<GameScreem1 />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
