export function setCookie(name, value, days = 365) {
  try {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    const val = encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value));
    document.cookie = `${name}=${val}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {}
}

export function getCookie(name) {
  try {
    const match = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
    if (!match) return null;
    const raw = decodeURIComponent(match.split('=')[1] || '');
    try { return JSON.parse(raw); } catch { return raw; }
  } catch {
    return null;
  }
}

export function deleteCookie(name) {
  try {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  } catch {}
}


