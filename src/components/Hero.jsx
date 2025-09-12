import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">Insight finanziari, dalla A-Z con TurtleAI</h1>
          <p className="hero-subtitle">
            Dai benchmark globali agli indicatori proprietari di nicchia: una sola
            dashboard per capire il mercato in pochi secondi.
          </p>
          <div className="hero-actions">
            <a href="#app" className="cta cta-primary">Inizia ora</a>
            <a href="#docs" className="cta cta-ghost">Scopri come funziona</a>
          </div>
        </div>

        <div className="kpi-grid">
          {[
            { key: "S&P 500", value: "+0.84%", note: "$ 9,999", trend: "up" },
            { key: "NASDAQ", value: "+1.12%", note: "$ 9,999", trend: "up" },
            { key: "BTC", value: "-0.45%", note: "$ 9,999", trend: "down" },
            { key: "ETH", value: "+0.22%", note: "$ 9,999", trend: "up" },
            { key: "Turtle Index", value: "+0.37%", note: "0.62", trend: "up" },
            { key: "Risk-On Score", value: "42/100", note: "neutrale", trend: "flat" },
          ].map((kpi) => (
            <div key={kpi.key} className={`kpi-card ${kpi.trend}`}>
              <div className="kpi-header">
                <span className="kpi-name">{kpi.key}</span>
                <span className="kpi-trend">
                  {kpi.trend === "up" ? "▲" : kpi.trend === "down" ? "▼" : "•"}
                </span>
              </div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-note">{kpi.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


