import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource/cinzel/600.css';
import '@fontsource/cinzel/700.css';
import App from './App';
import { GameDataProvider } from './data/GameDataContext';
import { BuildProvider } from './state/BuildContext';
import { ToastProvider } from './components/Toast';
import { TooltipProvider } from './components/SkillTooltip';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameDataProvider>
      <BuildProvider>
        <ToastProvider>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </ToastProvider>
      </BuildProvider>
    </GameDataProvider>
  </React.StrictMode>,
);
