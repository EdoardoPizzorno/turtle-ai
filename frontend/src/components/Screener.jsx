import { useEffect, useMemo, useState } from "react";
import { getCookie, setCookie } from "../services/cookies";
import { Maximize2 } from "lucide-react";
import { navigate } from "../services/auth";
import { fetchScreenerData, formatPrice, classForChange } from "../services/screener";

export default function Screener({ limit }) {
    const [rows, setRows] = useState([]);
    const [query, setQuery] = useState("");
    const [sortKey, setSortKey] = useState(() => getCookie('turtleai_screener_sortKey') || "marketcap");
    const [sortDir, setSortDir] = useState(() => getCookie('turtleai_screener_sortDir') || "desc");

    useEffect(() => {
        (async () => {
            const data = await fetchScreenerData();
            // enrich with mock marketcap for sorting
            setRows(
                data.map((d) => ({
                    ...d,
                    marketcap: Math.max(1, Math.round((d.price || 0) * 1e6 * 100)),
                }))
            );
        })();
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let out = rows.filter((r) => r.symbol.toLowerCase().includes(q) || (r.name || "").toLowerCase().includes(q));
        out.sort((a, b) => {
            const dir = sortDir === "asc" ? 1 : -1;
            const av = Number(a[sortKey] ?? 0);
            const bv = Number(b[sortKey] ?? 0);
            if (!Number.isNaN(av) && !Number.isNaN(bv)) return (av - bv) * dir;
            const as = String(a[sortKey] ?? '').toLowerCase();
            const bs = String(b[sortKey] ?? '').toLowerCase();
            return as.localeCompare(bs) * dir;
        });
        return out;
    }, [rows, query, sortKey, sortDir]);

    const headerBtn = (key, label) => (
        <button
            onClick={() => {
                if (sortKey === key) {
                    setSortDir((d) => {
                        const next = d === "asc" ? "desc" : "asc";
                        setCookie('turtleai_screener_sortDir', next);
                        return next;
                    });
                } else {
                    setSortKey(key);
                    setCookie('turtleai_screener_sortKey', key);
                    setSortDir("desc");
                    setCookie('turtleai_screener_sortDir', "desc");
                }
            }}
            className="flex items-center gap-1 text-gray-400 hover:text-gray-300 theme-light:text-gray-600 theme-light:hover:text-gray-800"
        >
            {label}
            {sortKey === key && <span className="text-xs text-gray-400">{sortDir === "asc" ? "▲" : "▼"}</span>}
        </button>
    );

    useEffect(() => {
        setCookie('turtleai_screener_sortKey', sortKey);
        setCookie('turtleai_screener_sortDir', sortDir);
    }, [sortKey, sortDir]);

    return (
        <div className="bg-black rounded-2xl p-3 shadow-lg flex-1 border border-gray-800 theme-light:bg-white theme-light:border-gray-200">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-white theme-light:text-gray-900">Screener</h2>
                <div className="flex items-center gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search asset..."
                        className="text-center bg-black border border-gray-700 rounded-md px-2 py-1 text-xs outline-none focus:border-gray-500 w-20 sm:w-28 md:w-40 theme-light:bg-white theme-light:border-gray-300 theme-light:text-gray-900"
                    />
                    {typeof window !== 'undefined' && window.location.pathname !== '/screener' && (
                        <button
                            onClick={() => navigate('/screener')}
                            className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-black"
                            title="Apri screener completo"
                            aria-label="Apri screener completo"
                        >
                            <Maximize2 className="w-4 h-4 hover:cursor-pointer" />
                        </button>
                    )}
                </div>
            </div>

            <div>
                <table className="w-full text-xs theme-light:text-gray-800">
                    <thead>
                        <tr className="text-gray-400 uppercase text-xs theme-light:text-gray-600 theme-light:hover:text-gray-900">
                            <th className="text-left py-2">Asset</th>
                            <th className="text-center py-2">{headerBtn("price", "Price")}</th>
                            <th className="text-right py-2">{headerBtn("change", "24h %")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(limit ? filtered.slice(0, limit) : filtered).map((asset, idx) => (
                            <tr key={asset.symbol} className={`transition ${idx % 2 === 0 ? 'bg-transparent' : 'bg-transparent'}`}>
                                <td className="py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-7 w-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 text-[11px] font-semibold theme-light:bg-gray-200 theme-light:text-gray-700">
                                            {asset.symbol.substring(0, 2)}
                                        </div>
                                        <div>
                                            <div className="text-gray-100 font-medium text-[12px] theme-light:text-gray-900">{asset.symbol}</div>
                                            <div className="text-[11px] text-gray-400 theme-light:text-gray-500">{asset.name || ""}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-left text-gray-100 theme-light:text-gray-900">{formatPrice(asset.price)}</td>
                                <td className={`text-right ${classForChange(asset.change)} theme-light:font-medium`}>
                                    {asset.change > 0 ? `+${asset.change}%` : `${asset.change}%`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
