import { API_BASE_URL, api } from './api';
import { setCookie, getCookie, deleteCookie } from './cookies';

const GOOGLE_INIT_URL = import.meta.env.VITE_GOOGLE_INIT_URL || `${API_BASE_URL}/api/auth/google/init`;

export async function loginWithGoogle() {
  // Chiede al backend l'auth URL e poi fa il redirect lato client
  const { url } = await api.get('/api/auth/google/init');
  if (!url) throw new Error('Auth URL non ricevuto');
  window.location.assign(url);
}

const ME_CACHE_KEY = 'turtleai_me';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function readMeCache() {
  const parsed = getCookie(ME_CACHE_KEY);
  if (!parsed || typeof parsed !== 'object') return null;
  return parsed;
}

function writeMeCache(value) { setCookie(ME_CACHE_KEY, { value, ts: Date.now() }, 365); }

function normalizeMeResponse(res) {
  const src = (res && typeof res === 'object' && res.user) ? res.user : res || {};
  const normalizedUser = {
    name: src?.name ?? '',
    email: src?.email ?? '',
    createdAt: src?.createdAt ?? null,
    subscription: {
      plan: src?.subscription?.plan ?? 'free',
      status: src?.subscription?.status ?? 'inactive',
      renewalAt: src?.subscription?.renewalAt ?? null,
      // spazio per metadata di livello, se esiste
      level: src?.subscription?.level ?? (src?.subscription?.plan ?? 'free'),
      meta: src?.subscription?.meta ?? null,
    },
  };
  return { user: normalizedUser };
}

export async function getMe({ force = true } = {}) {
  if (!force) {
    const cached = readMeCache();
    if (cached && typeof cached.ts === 'number' && Date.now() - cached.ts < ONE_DAY_MS) {
      // garantisce che i campi attesi da Profile.jsx siano presenti
      return normalizeMeResponse(cached.value);
    }
  }
  const res = await api.get('/api/auth/me');
  const normalized = normalizeMeResponse(res);
  writeMeCache(normalized);
  return normalized;
}

export function logout() {
  deleteCookie(ME_CACHE_KEY);
  return api.post('/api/auth/logout');
}

export function navigate(to) {
  window.history.pushState(null, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}


export async function requestPasswordReset(email) {
  if (!email || typeof email !== 'string') throw new Error('Email richiesta');
  const res = await api.post('/api/auth/password/forgot', { email });
  return res || { ok: true };
}

