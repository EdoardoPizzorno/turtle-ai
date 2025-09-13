export default function KpiCard({ kpi }) {
  const trendColor =
    kpi.trend === "up"
      ? "text-emerald-600"
      : kpi.trend === "down"
      ? "text-red-600"
      : "text-slate-500";

  return (
    <div className="rounded-2xl m-2 p-4 min-w-[170px] bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 shadow-lg flex-shrink-0 transition-transform hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
        <span className="uppercase tracking-wide">{kpi.key}</span>
        <span className={`text-lg ${trendColor}`}>
          {kpi.trend === "up" ? "▲" : kpi.trend === "down" ? "▼" : "•"}
        </span>
      </div>
      <div className="mt-2 text-3xl text-slate-900 font-extrabold drop-shadow-sm">{kpi.value}</div>
      {kpi.note && (
        <div className={`mt-2 text-xs font-medium ${trendColor} bg-slate-50 rounded px-2 py-1 inline-block`}>
          <span className="font-semibold">{kpi.note}</span>
        </div>
      )}
    </div>
  );
}
