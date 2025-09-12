import React from "react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="brand">TurtleAI</div>
        <nav className="nav-links">
          <a href="#markets" className="nav-link">Markets</a>
          <a href="#analytics" className="nav-link">Analytics</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#docs" className="nav-link">Docs</a>
        </nav>
        <a href="#app" className="cta">Launch App</a>
      </div>
    </header>
  );
}


