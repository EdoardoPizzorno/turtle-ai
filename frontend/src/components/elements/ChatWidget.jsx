import React, { useEffect, useRef, useState } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [thread, setThread] = useState([]);
  const panelRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const send = () => {
    const text = message.trim();
    if (!text) return;
    setThread((t) => [...t, { role: 'user', content: text }]);
    setMessage('');
    // Placeholder assistant echo
    setTimeout(() => setThread((t) => [...t, { role: 'assistant', content: 'Ciao! Presto qui ci sarà il chatbot.' }]), 300);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[999] select-none">
      {open && (
        <div
          ref={panelRef}
          className="mb-2 w-72 sm:w-80 bg-black border border-gray-700 rounded-2xl shadow-xl overflow-hidden theme-light:bg-white theme-light:border-gray-200"
        >
          <div className="px-3 py-2 bg-gray-900 text-gray-200 text-sm flex items-center justify-between theme-light:bg-gray-100 theme-light:text-gray-900">
            <span>Chat</span>
            <button
              onClick={() => setOpen(false)}
              className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-black cursor-pointer theme-light:bg-gray-200 theme-light:text-gray-800"
              aria-label="Chiudi chat"
            >
              Chiudi
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto p-3 space-y-2 bg-black/80 theme-light:bg-white">
            {thread.length === 0 && (
              <div className="text-xs text-gray-400 theme-light:text-gray-500">Scrivi un messaggio per iniziare…</div>
            )}
            {thread.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <span className={`inline-block px-2 py-1 rounded-lg text-xs ${m.role === 'user' ? 'bg-emerald-600 text-black' : 'bg-gray-800 text-gray-200 theme-light:bg-gray-200 theme-light:text-gray-900'}`}>
                  {m.content}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2 flex items-center gap-2 bg-black/90 theme-light:bg-white">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              placeholder="Scrivi…"
              className="flex-1 bg-black border border-gray-700 rounded-md px-2 py-1 text-xs outline-none theme-light:bg-white theme-light:border-gray-300 theme-light:text-gray-900"
            />
            <button
              onClick={send}
              className="text-xs px-2 py-1 rounded bg-emerald-500 text-black hover:bg-emerald-400 cursor-pointer"
            >
              Invia
            </button>
          </div>
        </div>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="h-12 w-12 rounded-full bg-emerald-500 text-black shadow-lg border border-emerald-400 hover:bg-emerald-400 flex items-center justify-center cursor-pointer"
        title="Apri chat"
        aria-label="Apri chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M2 5a3 3 0 013-3h14a3 3 0 013 3v9a3 3 0 01-3 3H9l-4.5 3.375A1 1 0 013 19V5z"/>
        </svg>
      </button>
    </div>
  );
}


