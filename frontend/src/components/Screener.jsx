import { useEffect, useMemo, useState } from "react";
import { fetchScreenerData, formatPrice, classForChange } from "../services/screener";

export default function Screener({ limit }) {
    const [rows, setRows] = useState([]);
    const [query, setQuery] = useState("");
    const [sortKey, setSortKey] = useState("marketcap");
    const [sortDir, setSortDir] = useState("desc");

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
            return (a[sortKey] - b[sortKey]) * dir;
        });
        return out;
    }, [rows, query, sortKey, sortDir]);

    const headerBtn = (key, label) => (
        <button
            onClick={() => {
                if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                else { setSortKey(key); setSortDir("desc"); }
            }}
            className="flex items-center gap-1 hover:text-white"
        >
            {label}
            {sortKey === key && <span className="text-xs text-gray-400">{sortDir === "asc" ? "▲" : "▼"}</span>}
        </button>
    );

    return (
        <div className="bg-black rounded-2xl p-4 shadow-lg flex-1 border border-gray-800">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Screener</h2>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search asset..."
                    className="bg-black border border-gray-700 rounded-lg px-3 py-1 text-xs outline-none focus:border-gray-500"
                />
            </div>

            <div>
                <table className="w-full text-xs">
                    <thead>
                        <tr className="text-gray-400 uppercase text-xs">
                            <th className="text-left py-2">Asset</th>
                            <th className="text-center py-2">{headerBtn("price", "Price")}</th>
                            <th className="text-ri py-2">{headerBtn("change", "24h %")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(limit ? filtered.slice(0, limit) : filtered).map((asset) => (
                            <tr key={asset.symbol} className="hover:bg-gray-900/40 transition">
                                <td className="py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-7 w-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 text-[11px] font-semibold">
                                            {asset.symbol.substring(0, 2)}
                                        </div>
                                        <div>
                                            <div className="text-gray-100 font-medium text-[12px]">{asset.symbol}</div>
                                            <div className="text-[11px] text-gray-400">{asset.name || ""}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-left text-gray-100">{formatPrice(asset.price)}</td>
                                <td className={`text-left ${classForChange(asset.change)}`}>
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
