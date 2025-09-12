import React from "react";

export default function Hero() {
  const kpis = [
    { key: "S&P 500", value: "+0.84%", note: "$ 9,999", trend: "up" },
    { key: "NASDAQ", value: "+1.12%", note: "$ 9,999", trend: "up" },
    { key: "BTC", value: "-0.45%", note: "$ 9,999", trend: "down" },
    { key: "ETH", value: "+0.22%", note: "$ 9,999", trend: "up" },
    { key: "Turtle Index", value: "+0.37%", note: "0.62", trend: "up" },
    { key: "Risk-On Score", value: "42/100", note: "neutrale", trend: "flat" },
    { key: "VIX", value: "-1.5%", note: "basso", trend: "down" },
    { key: "Gold", value: "+0.15%", note: "$ 9,999", trend: "up" },
    { key: "Oil", value: "-0.30%", note: "$ 9,999", trend: "down" },
    { key: "EUR/USD", value: "+0.05%", note: "1.0999", trend: "up" },
    { key: "USD/JPY", value: "-0.10%", note: "109.99", trend: "down" },
    { key: "10Y Yield", value: "+0.03%", note: "1.23%", trend: "up" },
    { key: "Unemployment", value: "3.5%", note: "stabile", trend: "flat" }
  ];

  // Divide KPIs into two roughly equal rows
  const mid = Math.ceil(kpis.length / 2);
  const firstRow = kpis.slice(0, mid);
  const secondRow = kpis.slice(mid);

  return (
    <section className="px-5 pb-6 sm:px-4 sm:pb-4 bg-[radial-gradient(1000px_400px_at_10%_-10%,rgba(16,185,129,0.12),transparent),radial-gradient(800px_300px_at_90%_0%,rgba(52,211,153,0.08),transparent)] bg-white">
      <div className="max-w-[1100px] mx-auto pt-30 text-center">
        {/* Hero Copy */}
        <div className="max-w-[720px] mx-auto">
          <h1 className="text-slate-800 text-[44px] sm:text-[30px] leading-[1.1] mb-3 tracking-[0.2px] font-bold">
            Insight finanziari, dalla A-Z con{" "}
            <span className="text-emerald-600">TurtleAI</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed mb-4.5">
            Dai benchmark globali agli indicatori proprietari di nicchia: una
            sola dashboard per capire il mercato in pochi secondi.
          </p>
          {/* Actions */}
          <div className="flex justify-center gap-3 mb-6.5">
            <a
              href="#app"
              className="px-5 py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 transition-all duration-200 shadow-md shadow-emerald-400/25 hover:shadow-emerald-400/40"
            >
              Inizia ora
            </a>
            <a
              href="#docs"
              className="px-5 py-2.5 rounded-lg font-semibold text-emerald-700 border border-emerald-300 hover:bg-emerald-50 transition duration-200"
            >
              Scopri come funziona
            </a>
          </div>
        </div>

        {/* KPI Rows with horizontal scroll */}
        <div className="pt-10 space-y-4">
          {/* First row: scrolls right */}
          <div className="flex scrollbar-hide flex-row">
            {firstRow.map((kpi) => (
              <div
                key={kpi.key}
                className={`rounded-xl p-3 min-w-[180px] mx-2 bg-white border shadow-sm ${
                  kpi.trend === "up"
                    ? "border-emerald-400"
                    : kpi.trend === "down"
                    ? "border-red-400"
                    : "border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between text-slate-600 text-[12px]">
                  <span>{kpi.key}</span>
                  <span>
                    {kpi.trend === "up" ? "▲" : kpi.trend === "down" ? "▼" : "•"}
                  </span>
                </div>
                <div className="mt-1.5 text-[22px] text-slate-900 font-extrabold">
                  {kpi.value}
                </div>
                <div className="text-emerald-600 text-[12px] font-medium">
                  {kpi.note}
                </div>
              </div>
            ))}
          </div>
          <div className="flex scrollbar-hide flex-row-reverse">
            {secondRow.map((kpi) => (
              <div
                key={kpi.key}
                className={`rounded-xl p-3 min-w-[180px] mx-2 bg-white border shadow-sm ${
                  kpi.trend === "up"
                    ? "border-emerald-400"
                    : kpi.trend === "down"
                    ? "border-red-400"
                    : "border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between text-slate-600 text-[12px]">
                  <span>{kpi.key}</span>
                  <span>
                    {kpi.trend === "up" ? "▲" : kpi.trend === "down" ? "▼" : "•"}
                  </span>
                </div>
                <div className="mt-1.5 text-[22px] text-slate-900 font-extrabold">
                  {kpi.value}
                </div>
                <div className="text-emerald-600 text-[12px] font-medium">
                  {kpi.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
