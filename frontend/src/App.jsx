import './App.css';
import { useEffect, useState } from 'react';

import Navbar from "./components/Navbar.jsx"
import Footer from './components/Footer.jsx';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';
import Charts from './components/Charts.jsx';
import Screener from './components/Screener.jsx';
import Profile from './components/Profile.jsx';

export default function App() {
  const [path, setPath] = useState(window.location.pathname || '/dashboard');

  useEffect(() => {
    const handlePop = () => {
      setPath(window.location.pathname || '/dashboard');
    };
    window.addEventListener('popstate', handlePop);
    if (window.location.pathname === '/') {
      window.history.replaceState(null, '', '/dashboard');
      setPath('/dashboard');
    }
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  let content = null;
  if (path === '/dashboard') content = <Dashboard />;
  else if (path === '/charts' || path.startsWith('/charts/')) content = <Charts />;
  else if (path === '/login') content = <Login />;
  else if (path === '/screener') content = <Screener />;
  else if (path === '/profile') content = <Profile />;
  else content = <Dashboard />;

  return (
    <>
      <Navbar />
      {content}
      <Footer />
    </>
  );
}
