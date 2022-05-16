import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './App.css';

import { Dash } from './components/dash';
import { Game } from './components/game';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<Game />} />
        <Route path="/dash" element={<Dash />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
