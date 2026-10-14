/** Share state lives in the hash query: #/route?s=<base64url json> */
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

export function readHash(): { route: string; params: URLSearchParams } {
  const h = location.hash.replace(/^#/, '') || '/skills';
  const [route, query = ''] = h.split('?');
  return { route: route || '/skills', params: new URLSearchParams(query) };
}

export function buildShareUrl(route: string, state: unknown): string {
  const url = new URL(location.href);
  url.hash = `${route}?s=${encodeState(state)}`;
  return url.toString();
}

export async function copyText(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}
