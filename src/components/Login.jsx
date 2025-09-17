import React, { useEffect, useRef, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const googleBtnRef = useRef(null);

  const accent = "#00ff41";
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const navigate = (to) => {
    window.history.pushState(null, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      return;
    }
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: ({ credential }) => {
          const payload = parseJwt(credential) || {};
          const user = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
          };
          localStorage.setItem("authUser", JSON.stringify(user));
          localStorage.setItem("googleCredential", credential);
          navigate("/dashboard");
        },
      });
      if (googleBtnRef.current) {
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          logo_alignment: "left",
        });
      }
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!GOOGLE_CLIENT_ID) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: ({ credential }) => {
          const payload = parseJwt(credential) || {};
          const user = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
          };
          localStorage.setItem("authUser", JSON.stringify(user));
          localStorage.setItem("googleCredential", credential);
          navigate("/dashboard");
        },
      });
      if (googleBtnRef.current) {
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          logo_alignment: "left",
        });
      }
    };
    document.body.appendChild(script);
    return () => {
      try {
        document.body.removeChild(script);
      } catch {}
    };
  }, [GOOGLE_CLIENT_ID]);

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
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/90 border border-gray-700 rounded-2xl shadow-lg p-6">
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

          {!GOOGLE_CLIENT_ID && (
            <p className="text-xs text-yellow-400">
              Configura VITE_GOOGLE_CLIENT_ID per abilitare Google Login
            </p>
          )}

          <div ref={googleBtnRef} className="flex justify-center" />

          {GOOGLE_CLIENT_ID && (
            <button
              type="button"
              onClick={() => window.google?.accounts?.id?.prompt?.()}
              className="w-full py-2 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-900"
            >
              Accedi con Google
            </button>
          )}

          <div className="flex items-center justify-between text-xs text-gray-400">
            <a href="#" className="hover:text-gray-200">Password dimenticata?</a>
            <a href="#" className="hover:text-gray-200">Crea account</a>
          </div>
        </form>
      </div>
    </div>
  );
}


