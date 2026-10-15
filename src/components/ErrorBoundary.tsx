import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, RotateCcw, TriangleAlert } from 'lucide-react';
import { useOptionalGame } from '../data/GameDataContext';

interface Props {
  children: ReactNode;
  /** when this value changes (e.g. the route), a crashed boundary tries again */
  resetKey?: unknown;
  /** small card for a widget inside a page instead of the page-sized one */
  inline?: boolean;
}
interface State { error: Error | null }

/** A page or chunk that failed to load after a redeploy, not a bug in the page. */
export const isChunkError = (e: unknown) =>
  e instanceof Error && /dynamically imported module|Importing a module script failed|error loading dynamically imported|ChunkLoadError|Failed to fetch/i.test(`${e.name} ${e.message}`);

/** Catches render errors so one broken page never blanks the whole app. Offers "Try again" and "Reload page". */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Daevaforge] render error', error, info.componentStack);
  }

  componentDidUpdate(prev: Props) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) this.setState({ error: null });
  }

  render() {
    if (!this.state.error) return this.props.children;
    return <ErrorFallback error={this.state.error} inline={this.props.inline} onRetry={() => this.setState({ error: null })} />;
  }
}

function ErrorFallback({ error, inline, onRetry }: { error: Error; inline?: boolean; onRetry: () => void }) {
  const game = useOptionalGame();
  const t = game?.t;
  const chunk = isChunkError(error);
  return (
    <div className={`state-card error ${inline ? 'inline' : ''}`} role="alert">
      <TriangleAlert size={inline ? 20 : 28} aria-hidden />
      <h2>{t ? t('pageErrorTitle') : 'This page could not be shown'}</h2>
      <p>{t ? t(chunk ? 'pageErrorUpdate' : 'pageErrorText') : 'Something went wrong. Your build is safe.'}</p>
      <div className="state-actions">
        <button type="button" className="btn primary" onClick={() => location.reload()}>
          <RefreshCw size={16} aria-hidden /> {t ? t('reloadPage') : 'Reload page'}
        </button>
        {!chunk && (
          <button type="button" className="btn ghost" onClick={onRetry}>
            <RotateCcw size={16} aria-hidden /> {t ? t('tryAgain') : 'Try again'}
          </button>
        )}
      </div>
      <details className="state-details">
        <summary>{t ? t('errorDetails') : 'Technical details'}</summary>
        <code>{error.message || String(error)}</code>
      </details>
    </div>
  );
}
