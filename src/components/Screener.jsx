export default function Screener({ assets }) {
    return (
        <div className="bg-black rounded-2xl p-4 shadow-lg flex-1 overflow-hidden">
            <h2 className="text-lg font-semibold mb-2">Screener</h2>
            <table className="w-full text-sm font-mono">
                <thead>
                    <tr className="text-gray-400 uppercase text-xs">
                        <th className="text-left py-2">Asset</th>
                        <th className="text-right py-2">Price</th>
                        <th className="text-right py-2">24h %</th>
                        <th className="text-right py-2">Risk</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.symbol} className="hover:bg-black transition">
                            <td className="flex items-center gap-2">
                                {asset.symbol}{" "}
                                <span className="text-gray-400 text-xs">{asset.icon}</span>
                            </td>
                            <td className="text-right">{asset.price}</td>
                            <td
                                className={`text-right ${asset.change > 0
                                        ? "text-green-400"
                                        : asset.change < 0
                                            ? "text-red-400"
                                            : "text-yellow-400"
                                    }`}
                            >
                                {asset.change > 0
                                    ? `+${asset.change}%`
                                    : `${asset.change}%`}
                            </td>
                            <td
                                className={`text-right font-bold ${asset.risk > 0.6
                                        ? "text-red-500"
                                        : asset.risk > 0.4
                                            ? "text-yellow-400"
                                            : "text-green-400"
                                    }`}
                            >
                                {asset.risk}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
