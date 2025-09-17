import React, { useEffect, useState } from "react";
import { getMe, navigate, loginWithGoogle } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const accent = "#00ff41";
  // Se già autenticato lato backend, vai al dashboard
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getMe();
        if (!cancelled && res?.user) navigate('/dashboard');
      } catch (_) {}
    })();
    return () => { cancelled = true; };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Compila tutti i campi");
      return;
    }
    // Fake login flow: go back to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gradient-to-b from-black via-[#0b0b0b] to-black">
      <div className="w-full max-w-md bg-black/90 border border-gray-700 rounded-2xl shadow-lg p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <img src="/tartaruga/LOGO.png" alt="Turtle" className="h-8 w-8" />
          <h1 className="text-xl font-semibold text-white">Accedi</h1>
        </div>

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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm text-gray-300">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-xs text-gray-400 hover:text-gray-200"
              >
                {showPassword ? "Nascondi" : "Mostra"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2"
              style={{ boxShadow: `0 0 0 0px transparent`, caretColor: accent }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-medium text-black"
            style={{ backgroundColor: accent }}
          >
            Entra
          </button>

          <div className="flex items-center gap-3 my-2">
            <div className="h-px bg-gray-700 flex-1" />
            <span className="text-xs text-gray-400">oppure</span>
            <div className="h-px bg-gray-700 flex-1" />
          </div>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-900"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-4 w-4" />
            Accedi con Google
          </button>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <a href="#" className="hover:text-gray-200">Password dimenticata?</a>
            <a href="#" className="hover:text-gray-200">Crea account</a>
          </div>
        </form>
      </div>
    </div>
  );
}


