import React, { useState } from "react";
import { requestPasswordReset, navigate } from "../services/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const accent = "#00ff41";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Inserisci la tua email");
      return;
    }
    try {
      setLoading(true);
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err?.message || "Impossibile inviare la richiesta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gradient-to-b from-black via-[#0b0b0b] to-black">
      <div className="w-full max-w-md bg-black/90 border border-gray-700 rounded-2xl shadow-lg p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <img src="/tartaruga/LOGO.png" alt="Turtle" className="h-8 w-8" />
          <h1 className="text-xl font-semibold text-white">Password dimenticata</h1>
        </div>

        {!sent ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tuo@email.com"
                className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2"
                style={{ boxShadow: `0 0 0 0px transparent`, caretColor: accent }}
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg font-medium text-black cursor-pointer disabled:opacity-70"
              style={{ backgroundColor: accent }}
            >
              {loading ? "Invio in corso..." : "Invia link di reset"}
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full py-2 rounded-lg font-medium border border-gray-700 text-gray-200 hover:bg-gray-900 cursor-pointer"
            >
              Torna al login
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-200 text-sm">
              Se l'email esiste nei nostri sistemi, riceverai un link per reimpostare la password.
            </p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full py-2 rounded-lg font-medium border border-gray-700 text-gray-200 hover:bg-gray-900 cursor-pointer"
            >
              Torna al login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


