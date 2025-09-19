import { API_BASE_URL, api } from './api';

const GOOGLE_INIT_URL = import.meta.env.VITE_GOOGLE_INIT_URL || `${API_BASE_URL}/api/auth/google/init`;

export async function loginWithGoogle() {
  // Chiede al backend l'auth URL e poi fa il redirect lato client
  const { url } = await api.get('/api/auth/google/init');
  if (!url) throw new Error('Auth URL non ricevuto');
  window.location.assign(url);
}

const ME_CACHE_KEY = 'turtleai_me_cache_v1';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function readMeCache() {
  try {
    const raw = localStorage.getItem(ME_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeMeCache(value) {
  try {
    const entry = { value, ts: Date.now() };
    localStorage.setItem(ME_CACHE_KEY, JSON.stringify(entry));
  } catch {}
}

export async function getMe({ force = false } = {}) {
  if (!force) {
    const cached = readMeCache();
    if (cached && typeof cached.ts === 'number' && Date.now() - cached.ts < ONE_DAY_MS) {
      return cached.value;
    }
  }
  const res = await api.get('/api/auth/me');
  writeMeCache(res);
  return res;
}

export function logout() {
  try { localStorage.removeItem(ME_CACHE_KEY); } catch {}
  return api.post('/api/auth/logout');
}

export function navigate(to) {
  window.history.pushState(null, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}


