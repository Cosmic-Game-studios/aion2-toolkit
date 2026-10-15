/** Share state lives in the hash query: #/route?b=<base64url json> */
export function encodeState(obj: unknown): string {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeState<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as T;
  } catch {
    return null;
  }
}

export interface HashRoute { route: string; base: string; param: string | null; params: URLSearchParams }

/** "#/community/abc?x=1" -> { route: "/community/abc", base: "/community", param: "abc" } */
export function readHash(): HashRoute {
  const h = location.hash.replace(/^#/, '') || '/';
  const [route, query = ''] = h.split('?');
  const parts = (route || '/').split('/').filter(Boolean);
  return {
    route: route || '/',
    base: parts.length ? `/${parts[0]}` : '/',
    param: parts[1] ? decodeURIComponent(parts[1]) : null,
    params: new URLSearchParams(query),
  };
}

/** planner pages a shared build may open on; anything else (home, database, guides …) opens the skills page */
const SHARE_ROUTES = ['/skills', '/stigma', '/daevanion', '/hotbar', '/combos'];
export const shareRoute = (route: string) => (SHARE_ROUTES.includes(route) ? route : '/skills');

export function buildShareUrl(route: string, build: unknown): string {
  const url = new URL(location.href);
  url.search = '';
  url.hash = `${shareRoute(route)}?b=${encodeState(build)}`;
  return url.toString();
}

export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'failed';

/**
 * Touch devices with a share sheet (WhatsApp, Discord …) get it; everywhere else the link is copied.
 * No UI here – useBuildActions().share() adds the toasts and the fallback dialog.
 */
export async function shareOrCopy(url: string, title: string): Promise<ShareResult> {
  const nav = typeof navigator !== 'undefined' ? navigator : null;
  const touch = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
  if (nav?.share && touch) {
    try {
      await nav.share({ title, url });
      return 'shared';
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelled';
      // NotAllowedError etc.: fall back to copying
    }
  }
  return (await copyText(url)) ? 'copied' : 'failed';
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const prev = document.activeElement as HTMLElement | null;
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.readOnly = true; // no on-screen keyboard on phones
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    } finally {
      prev?.focus?.({ preventScroll: true });
    }
  }
}
