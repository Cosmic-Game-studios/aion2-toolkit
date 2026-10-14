import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameDataProvider } from './data/GameDataContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameDataProvider>
      <App />
    </GameDataProvider>
  </React.StrictMode>,
);
