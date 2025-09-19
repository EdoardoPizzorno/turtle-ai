import { Search, Bell, User, Sun, LogOut, Settings, UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DecryptedText from "./elements/DecryptedText";
import { getMe, logout, navigate } from "../services/auth";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [me, setMe] = useState(null);
  const searchRef = useRef(null);
  const notiRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getMe();
        if (!cancelled) setMe(res.user);
      } catch (_) {
        if (!cancelled) setMe(null);
      }
    })();
    const onDocClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
      if (notiRef.current && !notiRef.current.contains(e.target)) setShowNoti(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('click', onDocClick);
    return () => { cancelled = true; document.removeEventListener('click', onDocClick); };
  }, []);

  const onLogout = async () => {
    try { await logout(); } catch {}
    setMe(null);
    navigate('/login');
  };

  const isLogin = typeof window !== 'undefined' && window.location.pathname === '/login';

  return (
    <nav className="w-full bg-black text-gray-200 flex items-center px-6 h-14 shadow-md relative">
      {!isLogin && (
        <div className="flex items-center space-x-2 hover:cursor-pointer" onClick={() => { window.history.pushState(null, '', '/dashboard'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
          <div className="flex items-center justify-center">
            <img
              src="/tartaruga/LOGO.png"
              alt="Logo"
              className="h-8 object-contain"
            />
          </div>
          <DecryptedText
              text="TurtleAI"
              animateOn="both"
              revealDirection="center"
              className="text-lg font-semibold text-white"
            />
        </div>
      )}

      {isLogin && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <img src="/tartaruga/LOGO.png" alt="Logo" className="h-8 object-contain" />
          <DecryptedText
            text="TurtleAI"
            animateOn="both"
            revealDirection="center"
            className="text-lg font-semibold text-white"
          />
        </div>
      )}

      {!isLogin && (
        <ul className="flex items-center space-x-6 mx-auto text-sm font-medium">
          <li
            className="hover:text-white cursor-pointer transition-colors border-b-2 border-transparent hover:border-white"
            onClick={() => { window.history.pushState(null, '', '/dashboard'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          >
            Dashboard
          </li>
          <li
            className="hover:text-white cursor-pointer transition-colors border-b-2 border-transparent hover:border-white"
            onClick={() => { window.history.pushState(null, '', '/charts'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          >
            Charts
          </li>
        </ul>
      )}

      {!isLogin && (
      <div className="flex items-center space-x-4 relative">
        {/* Search */}
        <div className="relative" ref={searchRef}>
          <Search
            className="w-5 h-5 cursor-pointer hover:text-white"
            onClick={(e) => { e.stopPropagation(); setShowSearch((v) => !v); setShowNoti(false); setShowProfile(false); }}
          />
          {showSearch && (
            <div className="absolute right-0 top-8 w-72 bg-black border border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <input
                autoFocus
                placeholder="Cerca..."
                className="w-full bg-black text-gray-100 px-3 py-2 outline-none"
              />
            </div>
          )}
        </div>

        {/* Theme placeholder */}
        <Sun className="w-5 h-5 cursor-pointer hover:text-white" />

        {/* Notifications */}
        <div className="relative" ref={notiRef}>
          <Bell
            className="w-5 h-5 cursor-pointer hover:text-white"
            onClick={(e) => { e.stopPropagation(); setShowNoti((v) => !v); setShowSearch(false); setShowProfile(false); }}
          />
          {showNoti && (
            <div className="absolute right-0 top-8 w-72 bg-black border border-gray-700 rounded-lg shadow-lg p-3">
              <p className="text-sm text-gray-400">Nessuna notifica</p>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <div
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setShowProfile((v) => !v); setShowNoti(false); setShowSearch(false); }}
          >
            <User className="w-5 h-5" />
          </div>
          {showProfile && (
            <div className="absolute right-0 top-10 w-56 bg-black border border-gray-700 rounded-lg shadow-lg py-2 z-100">
              <button
                className="w-full text-left px-3 py-2 text-sm text-gray-300 flex items-center gap-2 hover:bg-gray-900 hover:cursor-pointer"
                onClick={() => { setShowProfile(false); navigate('/profile'); }}
              >
                <UserCircle className="w-4 h-4" />
                {me ? me.name : 'Ospite'}
              </button>
              {me ? (
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-900 flex items-center gap-2 text-red-400 hover:cursor-pointer"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-900 flex items-center gap-2"
                  onClick={() => navigate('/login')}
                >
                  <User className="w-4 h-4" /> Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      )}
    </nav>
  );
}
