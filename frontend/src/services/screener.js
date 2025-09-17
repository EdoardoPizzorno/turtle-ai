import { api } from './api';

export async function fetchScreenerData() {
  // placeholder: in futuro chiameremo un endpoint tipo /api/screener
  // per ora carichiamo da static_data
  const data = await import('../static_data/CREA_TU_IL_FILE.json');
  return data.default || data;
}

export function formatPrice(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
}

export function classForChange(pct) {
  if (pct > 0) return 'text-green-400';
  if (pct < 0) return 'text-red-400';
  return 'text-yellow-400';
}

export function classForRisk(risk) {
  if (risk > 0.6) return 'text-red-500';
  if (risk > 0.4) return 'text-yellow-400';
  return 'text-green-400';
}


