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

export function buildShareUrl(route: string, build: unknown): string {
  const url = new URL(location.href);
  url.hash = `${route}?b=${encodeState(build)}`;
  return url.toString();
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
