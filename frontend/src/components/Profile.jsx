import { useEffect, useState } from 'react';
import { getMe } from '../services/auth';

export default function Profile() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getMe();
        if (!cancelled) setMe(res?.user || res);
      } catch (_) {
        if (!cancelled) setMe(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const name = me?.name || '—';
  const email = me?.email || '—';
  const createdAt = me?.createdAt ? new Date(me.createdAt).toLocaleDateString() : '—';
  const plan = me?.subscription?.plan || '—';
  const status = me?.subscription?.status || '—';
  const renewal = me?.subscription?.renewalAt ? new Date(me.subscription.renewalAt).toLocaleDateString() : '—';

  return (
    <div className="w-full min-h-[70vh] bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Il tuo profilo</h1>
        {loading ? (
          <div className="text-gray-400">Caricamento…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-800 p-4 bg-black/60">
              <h2 className="text-lg font-semibold mb-2">Dati account</h2>
              <ul className="text-sm text-gray-300 space-y-1">
                <li><span className="text-gray-400">Nome:</span> {name}</li>
                <li><span className="text-gray-400">Email:</span> {email}</li>
                <li><span className="text-gray-400">Registrato il:</span> {createdAt}</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-800 p-4 bg-black/60">
              <h2 className="text-lg font-semibold mb-2">Abbonamento</h2>
              <ul className="text-sm text-gray-300 space-y-1">
                <li><span className="text-gray-400">Piano:</span> {plan}</li>
                <li><span className="text-gray-400">Stato:</span> {status}</li>
                <li><span className="text-gray-400">Rinnovo:</span> {renewal}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


