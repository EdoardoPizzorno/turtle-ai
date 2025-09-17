import { API_BASE_URL, api } from './api';

const GOOGLE_INIT_URL = import.meta.env.VITE_GOOGLE_INIT_URL || `${API_BASE_URL}/api/auth/google/init`;

export async function loginWithGoogle() {
  // Chiede al backend l'auth URL e poi fa il redirect lato client
  const { url } = await api.get('/api/auth/google/init');
  if (!url) throw new Error('Auth URL non ricevuto');
  window.location.assign(url);
}

export function getMe() {
  return api.get('/api/auth/me');
}

export function logout() {
  return api.post('/api/auth/logout');
}

export function navigate(to) {
  window.history.pushState(null, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}


