import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource/cinzel/600.css';
import '@fontsource/cinzel/700.css';
import App from './App';
import { GameDataProvider } from './data/GameDataContext';
import { BuildProvider } from './state/BuildContext';
import { ToastProvider } from './components/Toast';
import { ConfirmProvider } from './components/ConfirmDialog';
import { BuildActionsProvider } from './components/BuildActions';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TooltipProvider } from './components/SkillTooltip';
import './styles.css';

// After a redeploy the old hashed chunks are gone: reload once to get the new version instead of a broken page.
window.addEventListener('vite:preloadError', (e) => {
  const KEY = 'aion2tk:chunk-reload';
  let last = 0;
  try { last = Number(sessionStorage.getItem(KEY)) || 0; } catch { /* private mode */ }
  if (Date.now() - last < 30_000) return; // reloaded a moment ago: let the error boundary show its card
  try { sessionStorage.setItem(KEY, String(Date.now())); } catch { /* ignore */ }
  e.preventDefault();
  location.reload();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameDataProvider>
      <ErrorBoundary>
        <BuildProvider>
          <ToastProvider>
            <ConfirmProvider>
              <TooltipProvider>
                <BuildActionsProvider>
                  <App />
                </BuildActionsProvider>
              </TooltipProvider>
            </ConfirmProvider>
          </ToastProvider>
        </BuildProvider>
      </ErrorBoundary>
    </GameDataProvider>
  </React.StrictMode>,
);
